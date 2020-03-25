const { Router } = require("express");
const User = require("./controllers/UserController");
const routes = Router();

routes.post("/createUser", User.store);
routes.get("/getUsers", User.index);
routes.get("/login", User.login);

module.exports = routes;
