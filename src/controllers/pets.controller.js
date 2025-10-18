import { PetManager } from "../dao/managers/pets.manager.js";

const petManager = new PetManager();

export const getAllPets = async (req, res) => {
  try {
    const pets = await petManager.getAll();
    res.json({ status: "success", payload: pets });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const getPetById = async (req, res) => {
  try {
    const pet = await petManager.getById(req.params.id);
    res.json({ status: "success", payload: pet });
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
};

export const createPet = async (req, res) => {
  try {
    const newPet = await petManager.create(req.body);
    res.status(201).json({ status: "success", payload: newPet });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const updatePet = async (req, res) => {
  try {
    const updatedPet = await petManager.update(req.params.id, req.body);
    res.json({ status: "success", payload: updatedPet });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const deletePet = async (req, res) => {
  try {
    const deletedPet = await petManager.delete(req.params.id);
    res.json({ status: "success", payload: deletedPet });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};