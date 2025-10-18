import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "./env.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load YAML files
const usersSwaggerDoc = YAML.load(path.join(__dirname, "../docs/users.swagger.yaml"));
const petsSwaggerDoc = YAML.load(path.join(__dirname, "../docs/pets.swagger.yaml"));
const adoptionsSwaggerDoc = YAML.load(path.join(__dirname, "../docs/adoptions.swagger.yaml"));

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Backend III - Final Project",
      version: "1.0.0",
      description: "Complete API documentation (Users, Pets, and Adoptions).",
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}`,
        description: "Local development server",
      },
    ],
  },
  apis: [path.join(__dirname, "../routes/**/*.js")],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

// Merge documentation
swaggerSpecs.paths = {
  ...(swaggerSpecs.paths || {}),
  ...(usersSwaggerDoc.paths || {}),
  ...(petsSwaggerDoc.paths || {}),
  ...(adoptionsSwaggerDoc.paths || {}),
};
swaggerSpecs.components = {
  ...(swaggerSpecs.components || {}),
  ...(usersSwaggerDoc.components || {}),
  ...(petsSwaggerDoc.components || {}),
  ...(adoptionsSwaggerDoc.components || {}),
};

export const setupSwagger = (app) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
};