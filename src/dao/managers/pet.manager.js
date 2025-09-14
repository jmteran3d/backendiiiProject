import { PetModel } from "../models/pets.model.js";

export class PetManager {
  async getAll() {
    return await PetModel.find().lean();
  }

  async insertMany(pets) {
    return await PetModel.insertMany(pets);
  }
}
