import { AdoptionManager } from "../dao/managers/adoption.manager.js";

const adoptionManager = new AdoptionManager();

export const getAllAdoptions = async (req, res, next) => {
  try {
    const adoptions = await adoptionManager.getAll();
    res.status(200).json({ status: "success", payload: adoptions });
  } catch (error) {
    next(error);
  }
};

export const getAdoptionById = async (req, res, next) => {
  try {
    const adoption = await adoptionManager.getById(req.params.aid);
    res.status(200).json({ status: "success", payload: adoption });
  } catch (error) {
    next(error);
  }
};

export const createAdoption = async (req, res, next) => {
  try {
    const { uid, pid } = req.params;
    const adoption = await adoptionManager.create(uid, pid);
    res.status(201).json({ status: "success", payload: adoption });
  } catch (error) {
    next(error);
  }
};

export const deleteAdoption = async (req, res, next) => {
  try {
    await adoptionManager.delete(req.params.aid);
    res.status(200).json({ status: "success", message: "Adoption deleted successfully" });
  } catch (error) {
    next(error);
  }
};