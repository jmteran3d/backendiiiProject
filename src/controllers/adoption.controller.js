import { AdoptionManager } from "../dao/managers/adoption.manager.js";

const adoptionManager = new AdoptionManager();

export const getAllAdoptions = async (req, res) => {
  try {
    const adoptions = await adoptionManager.getAll();
    res.status(200).json({ status: "success", payload: adoptions });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const getAdoptionById = async (req, res) => {
  try {
    const adoption = await adoptionManager.getById(req.params.aid);
    res.status(200).json({ status: "success", payload: adoption });
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
};

export const createAdoption = async (req, res) => {
  try {
    const adoption = await adoptionManager.create(req.params.uid, req.params.pid);
    res.status(201).json({ status: "success", payload: adoption });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const deleteAdoption = async (req, res) => {
  try {
    const result = await adoptionManager.delete(req.params.aid);
    res.status(200).json({ status: "success", message: result.message });
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
};