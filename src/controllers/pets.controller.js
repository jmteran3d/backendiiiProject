import { PetService } from "../services/pets.service.js";

const petService = new PetService();

export const getAllPets = async (req, res, next) => {
  try {
    const pets = await petService.getAllPets();
    res.status(200).json({ status: "success", payload: pets });
  } catch (error) {
    next(error);
  }
};

export const getPetById = async (req, res, next) => {
  try {
    const pet = await petService.getPetById(req.params.pid);
    res.status(200).json({ status: "success", payload: pet });
  } catch (error) {
    next(error);
  }
};

export const createPet = async (req, res, next) => {
  try {
    const newPet = await petService.createPet(req.body);
    res.status(201).json({ status: "success", payload: newPet });
  } catch (error) {
    next(error);
  }
};

export const updatePet = async (req, res, next) => {
  try {
    const updatedPet = await petService.updatePet(req.params.pid, req.body);
    res.status(200).json({ status: "success", payload: updatedPet });
  } catch (error) {
    next(error);
  }
};

export const deletePet = async (req, res, next) => {
  try {
    await petService.deletePet(req.params.pid);
    res.status(200).json({ status: "success", message: "Pet deleted successfully" });
  } catch (error) {
    next(error);
  }
};