import { PetModel } from "../models/pets.model.js";

export class PetManager {
  async getAll() {
    return await PetModel.find().populate("owner");
  }

  async getById(id) {
    const pet = await PetModel.findById(id).populate("owner");
    if (!pet) throw new Error("Mascota no encontrada");
    return pet;
  }

  async create(pet) {
    return await PetModel.create(pet);
  }

  async update(id, pet) {
    const updatedPet = await PetModel.findByIdAndUpdate(id, pet, { new: true });
    if (!updatedPet) throw new Error("Mascota no encontrada");
    return updatedPet;
  }

  async delete(id) {
    const deletedPet = await PetModel.findByIdAndDelete(id);
    if (!deletedPet) throw new Error("Mascota no encontrada");
    return deletedPet;
  }

  async insertMany(pets) {
    return await PetModel.insertMany(pets);
  }
}