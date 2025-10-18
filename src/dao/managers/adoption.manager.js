import { AdoptionModel } from "../models/adoptions.model.js";
import { UserModel } from "../models/users.model.js";
import { PetModel } from "../models/pets.model.js";
import mongoose from "mongoose";

export class AdoptionManager {
  async getAll() {
// ... existing code ...
    return await AdoptionModel.find()
      .populate("owner", "first_name last_name email")
      .populate("pet", "name species age");
  }

  async getById(id) {
// ... existing code ...
    const adoption = await AdoptionModel.findById(id)
      .populate("owner", "first_name last_name email")
      .populate("pet", "name species age");
    if (!adoption) throw new Error("Adoption not found");
    return adoption;
  }

  async create(ownerId, petId) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const user = await UserModel.findById(ownerId).session(session);
      if (!user) throw new Error("User not found");

      const pet = await PetModel.findById(petId).session(session);
      if (!pet) throw new Error("Pet not found");

      if (pet.adopted) throw new Error("Pet already adopted");

      pet.adopted = true;
      await pet.save({ session });

      const adoption = (
        await AdoptionModel.create(
          [
            {
              owner: ownerId,
              pet: petId,
            },
          ],
          { session }
        )
      )[0];

      await session.commitTransaction();
      session.endSession();

      return await adoption.populate("owner pet");
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async delete(id) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const adoption = await AdoptionModel.findById(id).session(session);
      if (!adoption) throw new Error("Adoption not found");

      const pet = await PetModel.findById(adoption.pet).session(session);
      if (pet) {
        pet.adopted = false;
        await pet.save({ session });
      }

      await AdoptionModel.findByIdAndDelete(id).session(session);

      await session.commitTransaction();
      session.endSession();

      return { message: "Adoption deleted successfully" };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}