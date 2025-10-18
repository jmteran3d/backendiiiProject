import { Router } from "express";
import {
  createPet,
  deletePet,
  getAllPets,
  getPetById,
  updatePet,
} from "../controllers/pets.controller.js";

export const router = Router();

router.get("/", getAllPets);
router.get("/:pid", getPetById); // Cambiado a :pid para consistencia
router.post("/", createPet);
router.put("/:pid", updatePet); // Cambiado a :pid para consistencia
router.delete("/:pid", deletePet); // Cambiado a :pid para consistencia