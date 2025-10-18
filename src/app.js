import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import { config } from "./config/env.js";
import { setupSwagger } from "./config/swagger.js";
import { router as indexRouter } from "./routes/index.js";
import { router as viewsRouter } from "./routes/views.router.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import { errorHandler } from "./middlewares/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.MONGO_URL,
      dbName: config.DB_NAME,
      ttl: 120,
    }),
    secret: "c0d3rh0us3",
    resave: true,
    saveUninitialized: true,
  })
);

// Handlebars configuration
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Swagger UI
setupSwagger(app);

// View routes
app.use("/", viewsRouter);

// API routes
app.use("/api/v1", indexRouter);

// Error Handling Middleware
app.use(errorHandler);

// DB connection and server startup
connectDB()
  .then(() => {
    app.listen(config.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${config.PORT}`);
      console.log(
        `📘 Swagger docs available at http://localhost:${config.PORT}/api/docs`
      );
    });
  })
  .catch((err) => {
    console.error("❌ Error connecting to database:", err);
  });

// Export for testing
export default app;