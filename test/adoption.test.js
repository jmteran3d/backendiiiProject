import mongoose from "mongoose";
import supertest from "supertest";
import { expect } from "chai";
import { config } from "../src/config/env.js";
import { connectDB } from "../src/config/db.js";
import { AdoptionModel } from "../src/dao/models/adoptions.model.js";
import { PetModel } from "../src/dao/models/pets.model.js";
import { UserModel } from "../src/dao/models/users.model.js";
import app from "../src/app.js";

const requester = supertest(`http://localhost:${config.PORT}`);

describe("Adoption Router Functional Tests", function () {
  this.timeout(10000);

  let user, pet, adoption;

  before(async () => {
    await connectDB();
    await AdoptionModel.deleteMany({});
    await UserModel.deleteMany({});
    await PetModel.deleteMany({});

    user = await UserModel.create({
      first_name: "Test",
      last_name: "User",
      email: "testuser@example.com",
      password: "12345",
    });

    pet = await PetModel.create({
      name: "Luna",
      species: "cat",
      age: 3,
      adopted: false,
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it("POST /api/adoptions/:uid/:pid - should create an adoption", async () => {
    const { status, body } = await requester.post(`/api/adoptions/${user._id}/${pet._id}`);
    expect(status).to.equal(201);
    expect(body.payload).to.have.property("_id");
    adoption = body.payload;
  });

  it("GET /api/adoptions - should return all adoptions", async () => {
    const { status, body } = await requester.get("/api/adoptions");
    expect(status).to.equal(200);
    expect(body.payload).to.be.an("array");
  });

  it("GET /api/adoptions/:aid - should return adoption by id", async () => {
    const { status, body } = await requester.get(`/api/adoptions/${adoption._id}`);
    expect(status).to.equal(200);
    expect(body.payload).to.have.property("_id", adoption._id);
  });

  it("DELETE /api/adoptions/:aid - should delete adoption", async () => {
    const { status, body } = await requester.delete(`/api/adoptions/${adoption._id}`);
    expect(status).to.equal(200);
    expect(body.message).to.include("successfully");
  });
});
