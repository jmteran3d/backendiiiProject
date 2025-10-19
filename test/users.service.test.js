import { expect } from "chai";
import sinon from "sinon";
import { UserService } from "../src/services/users.service.js";
import { UserRepository } from "../src/repositories/users.repository.js";

describe("UserService Unit Tests", () => {
  let userService;
  let userRepositoryMock;

  beforeEach(() => {
    userRepositoryMock = sinon.createStubInstance(UserRepository);
    userService = new UserService();
    userService.repository = userRepositoryMock;
  });

  it("should create a user with a hashed password", async () => {
    const userData = {
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      password: "password123",
    };
    const expectedUser = { _id: "some_id", ...userData, password: "hashed_password" };

    userRepositoryMock.getByEmail.resolves(null); // No user exists
    userRepositoryMock.create.resolves(expectedUser);

    const result = await userService.createUser(userData);

    expect(userRepositoryMock.create.calledOnce).to.be.true;
    const creationArgs = userRepositoryMock.create.firstCall.args[0];
    
    expect(creationArgs.password).to.not.equal(userData.password);
    expect(result).to.deep.equal(expectedUser);
  });

  it("should throw an error if user already exists", async () => {
    const userData = { email: "exists@example.com", password: "123", first_name: "a", last_name: "b" };
    userRepositoryMock.getByEmail.resolves({ email: "exists@example.com" });

    try {
      await userService.createUser(userData);
      expect.fail("should have thrown a conflict error");
    } catch (error) {
      expect(error.message).to.include("Conflict");
      expect(userRepositoryMock.create.called).to.be.false;
    }
  });
});