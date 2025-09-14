import { Router } from "express";
import { router as mocksRouter } from "./mocks.router.js";
import { router as usersRouter } from "./users.router.js";
import { router as petsRouter } from "./pets.router.js";

export const router = Router();

router.use("/mocks", mocksRouter);
router.use("/users", usersRouter);
router.use("/pets", petsRouter);
