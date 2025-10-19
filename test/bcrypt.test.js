import { expect } from "chai";
import { hashPassword, comparePassword } from "../src/utils/bcrypt.js";

describe("Bcrypt Utility Functions", () => {
  const password = "mySecretPassword123";
  let hashedPassword;

  it("should hash a password successfully", async () => {
    hashedPassword = await hashPassword(password);
    expect(hashedPassword).to.be.a("string");
    expect(hashedPassword).not.to.equal(password);
  });

  it("should correctly compare a valid password", async () => {
    const isValid = await comparePassword(password, hashedPassword);
    expect(isValid).to.be.true;
  });

  it("should correctly reject an invalid password", async () => {
    const isInvalid = await comparePassword("wrongPassword", hashedPassword);
    expect(isInvalid).to.be.false;
  });
});