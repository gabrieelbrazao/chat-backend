require("dotenv").config();
const jwt = require("jsonwebtoken");

function auth(socket, next) {
  const token = socket[1].token;

  const pieces = token.split(" ");

  if (pieces[0] !== "Bearer") return next(new Error("Invalid Token"));

  jwt.verify(pieces[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next(new Error("Invalid Token"));

    socket[1].name = decoded.name;

    next();
  });
}

module.exports = auth;
