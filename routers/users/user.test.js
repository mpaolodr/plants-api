require("dotenv").config();
const db = require("../../data/db-config.js");
const Users = require("./user-model.js");

describe("TEST ENVIRONMENT FRO USERS ROUTER", () => {
  it("running on testing env", () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });

  it("fails test", () => {
    expect(true).toBe(true);
  });
});

describe("USER MODELS", () => {
  describe("adds to database", () => {
    beforeEach(async () => {
      await db.raw("TRUNCATE users, users RESTART IDENTITY CASCADE");
      await db.raw("TRUNCATE species, species RESTART IDENTITY CASCADE");
      await db.raw("TRUNCATE plants, plants RESTART IDENTITY CASCADE");
    });

    it("adds plants to database", async () => {
      await db("species").insert({ name: "default" });
      await db("users").insert({
        username: "TEST",
        password: "TEST",
        phone_number: "(000)000-000-000"
      });
      await Users.addPlant({
        user_id: 1,
        nickname: "test",
        h2o_frequency: "test",
        species_name: "default",
        image: null
      });

      const plants = await db("plants");

      expect(plants).toHaveLength(1);
      expect(plants).toEqual([
        {
          h2o_frequency: "test",
          id: 1,
          image: null,
          nickname: "test",
          species_name: "default",
          user_id: 1
        }
      ]);
      expect(plants[0].nickname).toBe("test");
    });
  });

  describe("updates entries in database", () => {
    beforeEach(async () => {
      await db.raw("TRUNCATE users, users RESTART IDENTITY CASCADE");
      await db.raw("TRUNCATE species, species RESTART IDENTITY CASCADE");
      await db.raw("TRUNCATE plants, plants RESTART IDENTITY CASCADE");
    });

    it("updates plants", async () => {
      await db("species").insert({ name: "edited" });
      await db("users").insert({
        username: "TEST_EDIT",
        password: "TEST_EDIT",
        phone_number: "(000)000-000-000"
      });
      await db("plants").insert({
        user_id: 1,
        nickname: "test",
        h2o_frequency: "test",
        species_name: "edited",
        image: null
      });
      const updatedVal = {
        user_id: 1,
        nickname: "edited",
        h2o_frequency: "edited",
        species_name: "edited",
        image: null
      };
      const editedPlant = await Users.updatePlant(updatedVal, 1);

      expect(editedPlant.nickname).toBe("edited");
      expect(editedPlant.h2o_frequency).toBe("edited");
    });
  });

  describe("deletes entries", () => {
    beforeEach(async () => {
      await db.raw("TRUNCATE users, users RESTART IDENTITY CASCADE");
      await db.raw("TRUNCATE species, species RESTART IDENTITY CASCADE");
      await db.raw("TRUNCATE plants, plants RESTART IDENTITY CASCADE");
    });

    it("delete the plant data", async () => {
      await db("species").insert({ name: "default" });
      await db("users").insert({
        username: "TEST_EDIT",
        password: "TEST_EDIT",
        phone_number: "(000)000-000-000"
      });
      await db("plants").insert({
        user_id: 1,
        nickname: "test",
        h2o_frequency: "test",
        species_name: "default",
        image: null
      });

      const deleted = await Users.removePlant(1);
      const plants = await db("plants");
      expect(plants).toHaveLength(0);

      expect(deleted).toBe(1);
    });
  });
});
