import { Router } from "express";
import {UserModel} from "../dao/models/users.model.js";
import {PetModel} from "../dao/models/pets.model.js";

const router = Router();

// Página principal
router.get("/", (req, res) => {
  res.render("home", { title: "Mocking API con Express" });
});

// Vista de usuarios
router.get("/users", async (req, res) => {
  const users = await UserModel.find().lean();
  res.render("users", { title: "Usuarios", users });
});

// Vista de mascotas
router.get("/pets", async (req, res) => {
  const pets = await PetModel.find().lean();
  res.render("pets", { title: "Mascotas", pets });
});

// Vista de mocks
router.get("/mocks", (req, res) => {
  res.render("mocks", { title: "Mocks" });
});

export { router };
