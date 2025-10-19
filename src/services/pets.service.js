import { PetRepository } from "../repositories/pets.repository.js";

export class PetService {
  constructor() {
    this.repository = new PetRepository();
  }

  async createPet(petData) {
    if (!petData.name || !petData.specie) { // Corregido: de 'species' a 'specie'
      throw new Error("Validation Error: Pet name and species are required.");
    }
    return await this.repository.create(petData);
  }

  async getPetById(id) {
    const pet = await this.repository.getById(id);
    if (!pet) {
      throw new Error(`Not Found: Pet with id ${id} not found.`);
    }
    return pet;
  }

  async getAllPets() {
    return await this.repository.getAll();
  }

  async updatePet(id, petData) {
    return await this.repository.update(id, petData);
  }

  async deletePet(id) {
    return await this.repository.delete(id);
  }
}