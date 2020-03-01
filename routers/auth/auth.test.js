require("dotenv").config();
const server = require("../../api/server.js");
const request = require("supertest")(server);
const db = require("../../data/db-config.js");

describe("TEST ENVIRONMENT", () => {
  it("running on testing env", () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });

  it("sanity check", () => {
    expect(true).toBe(true);
  });
});

describe("AUTH ROUTER ENDPOINTS", () => {
  afterAll(() => {
    return db("users").cleanUp();
  });

  describe("POST /register", () => {
    beforeEach(() => {
      return db.raw("TRUNCATE users, users RESTART IDENTITY CASCADE");
    });

    it("returns status code 201 created", () => {
      return request
        .post("/api/auth/register")
        .send({
          username: "TEST",
          password: "TEST",
          phone_number: "(000)000-000-000"
        })
        .then(res => {
          expect(res.status).toBe(201);
          expect(res.type).toMatch(/json/);
          expect(res.body.user.id).toBe(1);
          expect(res.body.token).toBeTruthy();
        });
    });

    it("returns status 400 when missing a field", () => {
      return request
        .post("/api/auth/register")
        .send({
          username: "TEST"
        })
        .then(res => {
          expect(res.status).toBe(400);
          expect(res.body).toEqual({
            error: "Please provide required information"
          });
        });
    });
  });

  describe("POST /login", () => {
    beforeEach(done => {
      return request
        .post("/api/auth/register")
        .send({
          username: "TEST",
          password: "TEST",
          phone_number: "(000)000-000-000"
        })
        .end(err => {
          if (err) done(err);
          done();
        });
    });
    afterEach(() => {
      return db.raw("TRUNCATE users, users RESTART IDENTITY CASCADE");
    });

    it("returns 200 OK", () => {
      return request
        .post("/api/auth/login")
        .send({ username: "TEST", password: "TEST" })
        .then(res => {
          expect(res.status).toBe(200);
          expect(res.body.id).toBe(1);
          expect(res.body.token).toBeTruthy();
        });
    });

    it("returns 400 Bad request when username and password are missing", () => {
      return request.post("/api/auth/login").then(res => {
        expect(res.status).toBe(400);
        expect(res.body.error).not.toBeNull();
        expect(res.body.error).toBe("Please provide username and password");
      });
    });
  });
});

describe("AUTH MODELS", () => {
  afterAll(() => {
    return db("users").cleanUp();
  });

  beforeEach(() => {
    return db.raw("TRUNCATE users, users RESTART IDENTITY CASCADE");
  });

  it("adds user to database", async () => {
    await db("users").insert({
      username: "TEST",
      password: "TEST",
      phone_number: "(000)000-000-000"
    });

    const users = await db("users");
    expect(users).toHaveLength(1);
  });

  it("returns a user by filter", async () => {
    await db("users").insert({
      username: "TEST",
      password: "TEST",
      phone_number: "(000)000-000-000"
    });

    const user = await db("users")
      .where({ username: "TEST" })
      .first();
    expect(user).toEqual({
      id: 1,
      username: "TEST",
      password: "TEST",
      phone_number: "(000)000-000-000"
    });
  });
});
