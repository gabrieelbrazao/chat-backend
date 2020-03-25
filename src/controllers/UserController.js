require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
  async store(req, res) {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password
      });
    }

    return res.json(user);
  },

  async index(req, res) {
    const users = await User.find();

    return res.json(users);
  },

  async login(req, res) {
    const user = await User.findOne({
      email: new RegExp(req.query.email, "i")
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (user.password != req.query.password) {
      return res.status(401).send("Incorrect data");
    }

    const token = jwt.sign({ name: user.name }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    return res.send({ token });
  }
};
