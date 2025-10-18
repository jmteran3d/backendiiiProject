import { Router } from "express";
import { generateMockingUsers } from "../utils/user.mocking.js";
import { generateMockingPets } from "../utils/pet.mocking.js";
import { UserManager } from "../dao/managers/users.manager.js";
import { PetManager } from "../dao/managers/pets.manager.js";

export const router = Router();
const userManager = new UserManager();
const petManager = new PetManager();

// GET → mockingpets
router.get("/mockingpets", (req, res) => {
  const pets = generateMockingPets(100);
  res.status(200).json({ status: "success", payload: pets });
});

// GET → mockingusers
router.get("/mockingusers", (req, res) => {
  const users = generateMockingUsers(50);
  res.status(200).json({ status: "success", payload: users });
});

// POST → generateData
router.post("/generateData", async (req, res) => {
  try {
    const { users = 0, pets = 0 } = req.body;

    const newUsers = generateMockingUsers(users);
    const newPets = generateMockingPets(pets);

    if (newUsers.length > 0) await userManager.insertMany(newUsers);
    if (newPets.length > 0) await petManager.insertMany(newPets);

    res.status(201).json({
      status: "success",
      message: "Datos generados e insertados correctamente",
      inserted: { users: newUsers.length, pets: newPets.length }
    });
  } catch (error) {
    console.error("❌ Error en /generateData:", error);
    res.status(500).json({ status: "error", error: error.message });
  }
});
