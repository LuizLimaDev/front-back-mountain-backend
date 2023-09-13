const { Router } = require("express");
const usersRoutes = Router();
const { validateRequestBody } = require("../middlewares/validatorCreateUser");
const { userSchema, sessionsUserSchema } = require("../schemas/userSchema");

const { createUsers, sessionsUsers } = require("../controllers/usersController");

usersRoutes.post("/", validateRequestBody(userSchema), createUsers);
usersRoutes.put("/");
usersRoutes.post("/sessions", validateRequestBody(sessionsUserSchema), sessionsUsers);
usersRoutes.get("/profile");

module.exports = {
	usersRoutes,
};
