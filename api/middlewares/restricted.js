const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secrets.js");

const restricted = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(500).json({ error: "Invalid token" });
      } else {
        res.user = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Please login" });
  }
};

module.exports = restricted;
