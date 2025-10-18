import { UserModel } from "../dao/models/users.model.js";
import { PetModel } from "../dao/models/pets.model.js";
import { UserManager } from "../dao/managers/users.manager.js";
import { PetManager } from "../dao/managers/pets.manager.js";
import { AdoptionManager } from "../dao/managers/adoption.manager.js";

const userManager = new UserManager();
const petManager = new PetManager();
const adoptionManager = new AdoptionManager();

export const renderHomePage = (req, res) => {
  res.render("home", { title: "Mocking API con Express" });
};

export const renderUsersPage = async (req, res) => {
  try {
    const users = await userManager.getAll();
    res.render("users", { title: "Usuarios", users: users.map(user => user.toObject()) });
  } catch (error) {
    res.status(500).render("error", { message: "Error loading users" });
  }
};

export const renderPetsPage = async (req, res) => {
  try {
    const pets = await petManager.getAll();
    res.render("pets", { title: "Mascotas", pets: pets.map(pet => pet.toObject({ virtuals: true })) });
  } catch (error) {
    res.status(500).render("error", { message: "Error loading pets" });
  }
};

export const renderAdoptionsPage = async (req, res) => {
  try {
    const adoptions = await adoptionManager.getAll();
    res.render("adoptions", {
      title: "Adoptions",
      adoptions: adoptions.map((adoption) => adoption.toObject({ virtuals: true })),
    });
  } catch (error) {
    res.status(500).render("error", { message: "Error loading adoptions" });
  }
};

export const renderMocksPage = (req, res) => {
  res.render("mocks", { title: "Mocks" });
};