const { Router } = require("express");
const usersRoutes = Router();
const { validateRequestBody } = require("../middlewares/validatorCreateUser");
const { userSchema, sessionsUserSchema, editUsersSchema } = require("../schemas/userSchema");

const { createUsers, sessionsUsers, profileUsers, editUsers } = require("../controllers/usersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

usersRoutes.post("/", validateRequestBody(userSchema), createUsers);
usersRoutes.put("/", ensureAuthenticated, validateRequestBody(editUsersSchema), editUsers);
usersRoutes.post("/sessions", validateRequestBody(sessionsUserSchema), sessionsUsers);
usersRoutes.get("/profile", ensureAuthenticated, profileUsers);

module.exports = {
	usersRoutes,
};
