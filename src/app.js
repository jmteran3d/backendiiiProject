import express from "express";
import mongoose from "mongoose";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import { router as indexRouter } from "./routes/index.js";
import { router as viewsRouter } from "./routes/views.router.js";
import { config } from "./config/env.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Rutas vistas
app.use("/", viewsRouter);

// Rutas API
app.use("/api", indexRouter);

// Conexión DB y servidor
connectDB().then(() => {
  app.listen(config.PORT, () =>
    console.log(`🚀 Server running on http://localhost:${config.PORT}`)
  );
});
