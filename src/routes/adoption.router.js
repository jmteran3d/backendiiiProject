import { Router } from "express";
import {
  createAdoption,
  deleteAdoption,
  getAllAdoptions,
  getAdoptionById,
} from "../controllers/adoption.controller.js";

export const adoptionRouter = Router();

// ✅ GET all adoptions
adoptionRouter.get("/", getAllAdoptions);

// ✅ GET adoption by ID
adoptionRouter.get("/:aid", getAdoptionById);

// ✅ POST create adoption
adoptionRouter.post("/:uid/:pid", createAdoption);

// ✅ DELETE adoption
adoptionRouter.delete("/:aid", deleteAdoption);