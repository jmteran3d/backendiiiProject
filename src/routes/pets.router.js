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
router.get("/:id", getPetById);
router.post("/", createPet);
router.put("/:id", updatePet);
router.delete("/:id", deletePet);