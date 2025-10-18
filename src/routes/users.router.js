import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  registerUser,
  loginUser,
} from "../controllers/users.controller.js";

export const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);