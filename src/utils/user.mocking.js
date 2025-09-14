import { faker } from "@faker-js/faker";
import { createHash } from "./bcrypt.js";

export function generateMockingUsers(num) {
  const users = [];
  const hashedPassword = createHash("coder123");

  for (let i = 0; i < num; i++) {
    users.push({
      _id: faker.database.mongodbObjectId(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: hashedPassword,
      role: faker.helpers.arrayElement(["user", "admin"]),
      pets: []
    });
  }
  return users;
}
