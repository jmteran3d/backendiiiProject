import { Router } from "express";
import { UserModel } from "../dao/models/users.model.js";
import mongoose from "mongoose";

export const router = Router();

// GET - Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json({ status: "success", payload: users });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// GET - Obtener usuario por ID
router.get("/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ status: "error", message: "Usuario no encontrado" });
    res.json({ status: "success", payload: user });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// POST - Crear usuario
router.post("/", async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.status(201).json({ status: "success", payload: newUser });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

// PUT - Actualizar usuario
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
    res.json({ status: "success", payload: updatedUser });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

// DELETE - Eliminar usuario
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res
        .status(404)
        .json({ status: "error", message: "Usuario no encontrado" });
    res.json({ status: "success", payload: deletedUser });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});
