import { Router } from "express";
import {
  createAdoption,
  deleteAdoption,
  getAllAdoptions,
  getAdoptionById,
} from "../controllers/adoptions.controller.js";

export const adoptionRouter = Router();

adoptionRouter.get("/", getAllAdoptions);
adoptionRouter.get("/:aid", getAdoptionById);
adoptionRouter.post("/:uid/:pid", createAdoption);
adoptionRouter.delete("/:aid", deleteAdoption);