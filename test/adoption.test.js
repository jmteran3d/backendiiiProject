import mongoose from "mongoose";
import supertest from "supertest";
import { expect } from "chai";
import { config } from "../src/config/env.js";
import { connectDB } from "../src/config/db.js";
import { AdoptionModel } from "../src/dao/models/adoptions.model.js";
import { PetModel } from "../src/dao/models/pets.model.js";
import { UserModel } from "../src/dao/models/users.model.js";
import app from "../src/app.js";

const requester = supertest(app); // Usar la app directamente

describe("Adoption Router Functional Tests", function () {
  this.timeout(10000);

  let user, pet, adoptedPet, adoption;

  before(async () => {
    // La conexión a la DB se maneja en el `app.js`
    // Limpiar colecciones
    await AdoptionModel.deleteMany({});
    await UserModel.deleteMany({});
    await PetModel.deleteMany({});

    user = await UserModel.create({
      first_name: "Test",
      last_name: "User",
      email: "testuser@example.com",
      password: "password123",
    });

    pet = await PetModel.create({
      name: "Luna",
      specie: "cat", // Corregido de 'species' a 'specie'
      age: 3,
      adopted: false,
    });

    adoptedPet = await PetModel.create({
      name: "Rocky",
      specie: "dog", // Corregido de 'species' a 'specie'
      age: 5,
      adopted: true,
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });

  describe("POST /api/v1/adoptions/:uid/:pid", () => {
    it("should create an adoption successfully", async () => {
      const { statusCode, body } = await requester
        .post(`/api/v1/adoptions/${user._id}/${pet._id}`);

      expect(statusCode).to.equal(201);
      expect(body.status).to.equal("success");
      expect(body.payload).to.have.property("_id");
      adoption = body.payload; // Guardar para tests posteriores
    });

    it("should return 400 if pet is already adopted", async () => {
      const { statusCode, body } = await requester
        .post(`/api/v1/adoptions/${user._id}/${adoptedPet._id}`);

      expect(statusCode).to.equal(400);
      expect(body.status).to.equal("error");
      expect(body.message).to.equal("Pet already adopted");
    });

    it("should return 400 if user does not exist", async () => {
      const invalidUserId = new mongoose.Types.ObjectId();
      const { statusCode, body } = await requester
        .post(`/api/v1/adoptions/${invalidUserId}/${pet._id}`);

      expect(statusCode).to.equal(400);
      expect(body.status).to.equal("error");
      expect(body.message).to.equal("User not found");
    });

    it("should return 400 if pet does not exist", async () => {
      const invalidPetId = new mongoose.Types.ObjectId();
      const { statusCode, body } = await requester
        .post(`/api/v1/adoptions/${user._id}/${invalidPetId}`);

      expect(statusCode).to.equal(400);
      expect(body.status).to.equal("error");
      expect(body.message).to.equal("Pet not found");
    });
  });

  describe("GET /api/v1/adoptions", () => {
    it("should return all adoptions", async () => {
      const { statusCode, body } = await requester.get("/api/v1/adoptions");
      expect(statusCode).to.equal(200);
      expect(body.status).to.equal("success");
      expect(body.payload).to.be.an("array");
      expect(body.payload.length).to.be.at.least(1);
    });
  });

  describe("GET /api/v1/adoptions/:aid", () => {
    it("should return an adoption by its id", async () => {
      const { statusCode, body } = await requester.get(`/api/v1/adoptions/${adoption._id}`);
      expect(statusCode).to.equal(200);
      expect(body.status).to.equal("success");
      expect(body.payload).to.have.property("_id", adoption._id.toString());
    });

    it("should return 404 if adoption is not found", async () => {
      const invalidAdoptionId = new mongoose.Types.ObjectId();
      const { statusCode, body } = await requester.get(`/api/v1/adoptions/${invalidAdoptionId}`);
      expect(statusCode).to.equal(404);
      expect(body.status).to.equal("error");
      expect(body.message).to.equal("Adoption not found");
    });
  });

  describe("DELETE /api/v1/adoptions/:aid", () => {
    it("should delete an adoption successfully", async () => {
      const { statusCode, body } = await requester.delete(`/api/v1/adoptions/${adoption._id}`);
      expect(statusCode).to.equal(200);
      expect(body.status).to.equal("success");
      expect(body.message).to.equal("Adoption deleted successfully");

      // Verificar que la mascota ya no está adoptada
      const updatedPet = await PetModel.findById(pet._id);
      expect(updatedPet.adopted).to.be.false;
    });

    it("should return 404 if adoption to delete is not found", async () => {
      const invalidAdoptionId = new mongoose.Types.ObjectId();
      const { statusCode, body } = await requester.delete(`/api/v1/adoptions/${invalidAdoptionId}`);
      expect(statusCode).to.equal(404);
      expect(body.status).to.equal("error");
      expect(body.message).to.equal("Adoption not found");
    });
  });
});