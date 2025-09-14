import { Router } from "express";
import { PetModel } from "../dao/models/pets.model.js";
import { UserModel } from "../dao/models/users.model.js";

export const router = Router();

// GET - Obtener todas las mascotas
router.get("/", async (req, res) => {
  try {
    const pets = await PetModel.find().populate('owner');
    res.json({ status: "success", payload: pets });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// GET - Obtener mascota por ID
router.get("/:id", async (req, res) => {
  try {
    const pet = await PetModel.findById(req.params.id).populate('owner');
    if (!pet) return res.status(404).json({ status: "error", message: "Mascota no encontrada" });
    res.json({ status: "success", payload: pet });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// POST - Crear mascota
router.post("/", async (req, res) => {
  try {
    const newPet = await PetModel.create(req.body);
    res.status(201).json({ status: "success", payload: newPet });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

// PUT - Actualizar mascota
router.put("/:id", async (req, res) => {
  try {
    const updatedPet = await PetModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPet) return res.status(404).json({ status: "error", message: "Mascota no encontrada" });
    res.json({ status: "success", payload: updatedPet });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

// DELETE - Eliminar mascota
router.delete("/:id", async (req, res) => {
  try {
    const deletedPet = await PetModel.findByIdAndDelete(req.params.id);
    if (!deletedPet) return res.status(404).json({ status: "error", message: "Mascota no encontrada" });
    res.json({ status: "success", payload: deletedPet });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});
