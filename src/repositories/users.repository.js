import { UserModel } from "../dao/models/users.model.js";

export class UserRepository {
  constructor() {
    this.model = UserModel;
  }

  async getAll() {
    return await this.model.find();
  }

  async getById(id) {
    return await this.model.findById(id);
  }

  async getByEmail(email) {
    return await this.model.findOne({ email });
  }

  async create(userData) {
    return await this.model.create(userData);
  }

  async update(id, userData) {
    return await this.model.findByIdAndUpdate(id, userData, { new: true });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }
}