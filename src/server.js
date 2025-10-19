import app from "./app.js";
import { connectDB } from "./config/db.js";
import { config } from "./config/env.js";

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