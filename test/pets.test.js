import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import { PetModel } from "../src/dao/models/pets.model.js";
import app from "../src/app.js"; // Corrected: Use default import

const requester = supertest(app);

describe("Pets Router Functional Tests", function () {
  let server; // 2. Variable para el servidor

  // Hook para conectar a la base de datos y levantar el servidor
  before(async function () {
    this.timeout(10000);
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URL_TEST);
    }
    // 3. Iniciar el servidor
    await new Promise(resolve => {
      server = app.listen(8080, () => {
        console.log("Server up for testing");
        resolve();
      });
    });
  });

  // Hook para limpiar la colección de mascotas después de cada test
  afterEach(async function () {
    await PetModel.deleteMany({});
  });

  // Hook para cerrar la conexión y el servidor después de todos los tests
  after(async function () {
    await mongoose.connection.close();
    // 4. Cerrar el servidor
    await new Promise(resolve => {
      server.close(() => {
        console.log("Server down");
        resolve();
      });
    });
  });

  describe("POST /api/v1/pets", function () {
    it("should create a pet successfully", async function () {
      const petMock = {
        name: "Firulais",
        specie: "Dog", // Asegúrate que el modelo use 'specie'
        birthDate: "2022-01-15",
      };

      const response = await requester.post("/api/v1/pets").send(petMock);

      expect(response.statusCode).to.equal(201); // 201 Created
      expect(response.body.status).to.equal("success");
      expect(response.body.payload).to.have.property("_id");
      expect(response.body.payload.name).to.equal(petMock.name);
    });

    it("should return 400 if required fields are missing", async function () {
      const petMock = {
        name: "Incompleto",
        // Falta 'specie'
      };

      const response = await requester.post("/api/v1/pets").send(petMock);

      expect(response.statusCode).to.equal(400);
    });
  });

  describe("GET /api/v1/pets", function () {
    it("should return an empty array if there are no pets", async function () {
      const response = await requester.get("/api/v1/pets");

      expect(response.statusCode).to.equal(200);
      expect(response.body.status).to.equal("success");
      expect(response.body.payload).to.be.an("array").that.is.empty;
    });

    it("should return all pets in an array", async function () {
      // Primero, creamos una mascota para que la base de datos no esté vacía
      const petMock = { name: "Panchito", specie: "Cat", birthDate: "2021-10-20" };
      await requester.post("/api/v1/pets").send(petMock);

      const response = await requester.get("/api/v1/pets");

      expect(response.statusCode).to.equal(200);
      expect(response.body.status).to.equal("success");
      expect(response.body.payload).to.be.an("array").with.lengthOf(1);
      expect(response.body.payload[0].name).to.equal(petMock.name);
    });
  });
});