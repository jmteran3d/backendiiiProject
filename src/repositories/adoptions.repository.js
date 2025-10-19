import { AdoptionModel } from "../dao/models/adoptions.model.js";

export class AdoptionRepository {
  constructor() {
    this.model = AdoptionModel;
  }

  async getAll() {
    return await this.model.find().populate("owner").populate("pet");
  }

  async getById(id) {
    return await this.model.findById(id).populate("owner").populate("pet");
  }

  async create(adoptionData) {
    return await this.model.create(adoptionData);
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }
}