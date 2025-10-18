import { UserManager } from "../dao/managers/users.manager.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";

const userManager = new UserManager();

export const getAllUsers = async (req, res) => {
  try {
    const users = await userManager.getAll();
    res.json({ status: "success", payload: users });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userManager.getById(req.params.id);
    res.json({ status: "success", payload: user });
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = await userManager.create(req.body);
    res.status(201).json({ status: "success", payload: newUser });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await userManager.update(req.params.id, req.body);
    res.json({ status: "success", payload: updatedUser });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userManager.delete(req.params.id);
    res.json({ status: "success", payload: deletedUser });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password, role } = req.body;
    if (!first_name || !last_name || !email || !age || !password) {
      return res
        .status(400)
        .render("error", { message: "All fields are required" });
    }

    const hashedPassword = createHash(password);
    await userManager.create({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword,
      role,
    });

    res.redirect("/login");
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .render("error", { message: "Email already registered." });
    }
    res.status(500).render("error", { message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).render("error", { message: "Email and password are required" });
    }

    const user = await userManager.getByEmail(email);

    if (!user || !isValidPassword(password, user.password)) {
      return res.status(401).render("error", { message: "Invalid credentials" });
    }

    req.session.user = {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    };

    res.redirect("/profile");
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
};