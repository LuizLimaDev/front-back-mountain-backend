const { Router } = require("express");
const usersRoutes = Router();

usersRoutes.post("/");
usersRoutes.put("/");
usersRoutes.get("/sessions");
usersRoutes.get("/profile");

module.exports = {
    usersRoutes,
};
