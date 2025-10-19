import { PetModel } from "../dao/models/pets.model.js";

export class PetRepository {
  constructor() {
    this.model = PetModel;
  }

  async getAll() {
    return await this.model.find().populate("owner");
  }

  async getById(id) {
    return await this.model.findById(id).populate("owner");
  }

  async create(petData) {
    return await this.model.create(petData);
  }

  async update(id, petData) {
    return await this.model.findByIdAndUpdate(id, petData, { new: true });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }
}