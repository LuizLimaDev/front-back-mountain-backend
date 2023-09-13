const { Router } = require("express");
const { validateRequestBody } = require("../middlewares/validatorCreateUser");
const { userSchema } = require("../schemas/userSchema");
const usersRoutes = Router();

usersRoutes.post("/", validateRequestBody(userSchema));
usersRoutes.put("/");
usersRoutes.get("/sessions");
usersRoutes.get("/profile");

module.exports = {
	usersRoutes,
};
