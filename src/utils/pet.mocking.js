import { faker } from "@faker-js/faker";

export function generateMockingPets(num) {
  const pets = [];
  for (let i = 0; i < num; i++) {
    pets.push({
      _id: faker.database.mongodbObjectId(),
      name: faker.animal.dog(),
      type: "dog",
      age: faker.number.int({ min: 1, max: 15 }),
      adopted: faker.datatype.boolean(),
      owner: null
    });
  }
  return pets;
}
