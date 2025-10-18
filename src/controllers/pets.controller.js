import { PetManager } from "../dao/managers/pets.manager.js";

const petManager = new PetManager();

export const getAllPets = async (req, res, next) => {
  try {
    const pets = await petManager.getAll();
    res.status(200).json({ status: "success", payload: pets });
  } catch (error) {
    next(error);
  }
};

export const getPetById = async (req, res, next) => {
  try {
    const pet = await petManager.getById(req.params.pid);
    res.status(200).json({ status: "success", payload: pet });
  } catch (error) {
    next(error);
  }
};

export const createPet = async (req, res, next) => {
  try {
    const newPet = await petManager.create(req.body);
    res.status(201).json({ status: "success", payload: newPet });
  } catch (error) {
    next(error);
  }
};

export const updatePet = async (req, res, next) => {
  try {
    const updatedPet = await petManager.update(req.params.pid, req.body);
    res.status(200).json({ status: "success", payload: updatedPet });
  } catch (error) {
    next(error);
  }
};

export const deletePet = async (req, res, next) => {
  try {
    await petManager.delete(req.params.pid);
    res.status(200).json({ status: "success", message: "Pet deleted successfully" });
  } catch (error) {
    next(error);
  }
};