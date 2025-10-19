import { UserRepository } from "../repositories/users.repository.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";

export class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async createUser(userData) {
    const { first_name, last_name, email, password } = userData;
    if (!first_name || !last_name || !email || !password) {
      throw new Error("Validation Error: All fields are required.");
    }

    const existingUser = await this.repository.getByEmail(email);
    if (existingUser) {
      throw new Error("Conflict: User with this email already exists.");
    }

    const hashedPassword = await hashPassword(password);
    const newUser = {
      ...userData,
      password: hashedPassword,
    };

    return await this.repository.create(newUser);
  }

  async getUserById(id) {
    const user = await this.repository.getById(id);
    if (!user) {
      throw new Error(`Not Found: User with id ${id} not found.`);
    }
    return user;
  }

  async getAllUsers() {
    return await this.repository.getAll();
  }

  async checkUserCredentials(email, password) {
    const user = await this.repository.getByEmail(email);
    if (!user) {
      return null; // O lanzar error, dependiendo de la lógica de login
    }
    const isValid = await comparePassword(password, user.password);
    return isValid ? user : null;
  }
}