import { UserModel } from "../models/users.model.js";

export class UserManager {
  async getAll() {
    return await UserModel.find().lean();
  }

  async insertMany(users) {
    return await UserModel.insertMany(users);
  }
}
