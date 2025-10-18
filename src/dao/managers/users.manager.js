import { UserModel } from "../models/users.model.js";

export class UserManager {
  async getAll() {
    return await UserModel.find();
  }

  async getById(id) {
    const user = await UserModel.findById(id);
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  }

  async getByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async create(user) {
    return await UserModel.create(user);
  }

  async update(id, user) {
    const updatedUser = await UserModel.findByIdAndUpdate(id, user, { new: true });
    if (!updatedUser) throw new Error("Usuario no encontrado");
    return updatedUser;
  }

  async delete(id) {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) throw new Error("Usuario no encontrado");
    return deletedUser;
  }
}