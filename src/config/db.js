import mongoose from "mongoose";
import { config } from "./env.js";

export const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(config.MONGO_URL, {dbName:config.DB_NAME});
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error de conexión MongoDB:", error);
    process.exit(1);
  }
};
