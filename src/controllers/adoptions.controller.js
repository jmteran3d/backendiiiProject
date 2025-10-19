import { AdoptionManager } from "../dao/managers/adoption.manager.js";
import { AdoptionService } from "../services/adoptions.service.js";

const adoptionManager = new AdoptionManager();
const adoptionService = new AdoptionService();

// Función helper para manejar errores de forma centralizada
const handleError = (res, error) => {
  const errorMessage = error.message.toLowerCase();

  if (errorMessage.includes("user not found") || errorMessage.includes("pet not found")) {
    // Estos casos, según el test, deben ser 400
    return res.status(400).json({ status: "error", message: error.message });
  }
  if (errorMessage.includes("adoption not found")) {
    // Este sí es un 404
    return res.status(404).json({ status: "error", message: error.message });
  }
  if (errorMessage.includes("already adopted")) {
    return res.status(400).json({ status: "error", message: error.message });
  }
  
  // Para cualquier otro error
  return res.status(500).json({ status: "error", message: "Internal Server Error", details: error.message });
};

export const getAllAdoptions = async (req, res) => {
  try {
    const adoptions = await adoptionService.getAllAdoptions();
    res.status(200).json({ status: "success", payload: adoptions });
  } catch (error) {
    handleError(res, error);
  }
};

export const getAdoptionById = async (req, res) => {
  try {
    const adoption = await adoptionService.getAdoptionById(req.params.aid);
    res.status(200).json({ status: "success", payload: adoption });
  } catch (error) {
    handleError(res, error);
  }
};

export const createAdoption = async (req, res) => {
  try {
    const { uid, pid } = req.params;
    const adoption = await adoptionService.createAdoption(uid, pid);
    res.status(201).json({ status: "success", payload: adoption });
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteAdoption = async (req, res) => {
  try {
    await adoptionService.deleteAdoption(req.params.aid);
    res.status(200).json({ status: "success", message: "Adoption deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
};