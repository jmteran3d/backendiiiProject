import { AdoptionRepository } from "../repositories/adoptions.repository.js";
import { UserRepository } from "../repositories/users.repository.js";
import { PetRepository } from "../repositories/pets.repository.js";

export class AdoptionService {
  constructor() {
    this.adoptionRepository = new AdoptionRepository();
    this.userRepository = new UserRepository();
    this.petRepository = new PetRepository();
  }

  async createAdoption(userId, petId) {
    const user = await this.userRepository.getById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const pet = await this.petRepository.getById(petId);
    if (!pet) {
      throw new Error("Pet not found");
    }

    if (pet.adopted) {
      throw new Error("Pet already adopted");
    }

    const adoption = await this.adoptionRepository.create({ owner: userId, pet: petId });
    pet.adopted = true;
    pet.owner = userId;
    await this.petRepository.update(petId, pet);

    return adoption;
  }

  async getAllAdoptions() {
    return await this.adoptionRepository.getAll();
  }

  async getAdoptionById(id) {
    const adoption = await this.adoptionRepository.getById(id);
    if (!adoption) {
      throw new Error("Adoption not found");
    }
    return adoption;
  }

  async deleteAdoption(id) {
    const adoption = await this.adoptionRepository.getById(id);
    if (!adoption) {
      throw new Error("Adoption not found");
    }

    // Revertir el estado de la mascota a "no adoptada"
    const pet = await this.petRepository.getById(adoption.pet);
    if (pet) {
      pet.adopted = false;
      pet.owner = null;
      await this.petRepository.update(pet._id, pet);
    }

    return await this.adoptionRepository.delete(id);
  }
}