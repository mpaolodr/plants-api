const router = require("express").Router();
const bc = require("bcryptjs");

const jwt = require("jsonwebtoken");
const Auth = require("./auth-models.js");

const { jwtSecret } = require("../../api/config/secrets.js");

router.post("/register", async (req, res) => {
  const userData = req.body;

  if (userData.username && userData.password && userData.phone_number) {
    try {
      const existingUser = await Auth.getBy({ username: userData.username });
      if (existingUser) {
        res.status(500).json({ error: "User already exists" });
      } else {
        try {
          bc.hash(userData.password, 10, async (err, hash) => {
            if (err) {
              res.status(500).json({
                error: "Sorry, we can't process your request at this moment"
              });
            } else {
              userData.password = hash;

              const token = getToken({
                username: userData.username,
                password: userData.password
              });
              const user = await Auth.add(userData);

              res.status(201).json({ user, token });
            }
          });
        } catch (err) {
          res.status(500).json({ error: "Error connecting to server" });
        }
      }
    } catch (err) {
      res.status(500).json({ error: "User already exists" });
    }
  } else {
    res.status(400).json({ error: "Please provide required information" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    try {
      const user = await Auth.getBy({ username });

      if (user && bc.compareSync(password, user.password)) {
        const token = getToken(user);
        res.status(200).json({ id: user.id, token });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ error: "No user was found with the credentials you provided" });
    }
  } else {
    res.status(400).json({ error: "Please provide username and password" });
  }
});

function getToken(user) {
  const payload = {
    userId: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "2h"
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
