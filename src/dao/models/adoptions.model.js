import mongoose from "mongoose";

const adoptionsCollection = "adoptions";

const adoptionsSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },
    adoptedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

export const AdoptionModel = mongoose.model(adoptionsCollection, adoptionsSchema);