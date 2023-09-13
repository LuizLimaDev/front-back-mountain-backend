const { Router } = require("express");
const customerRoutes = Router();

customerRoutes.get("/customer");
customerRoutes.get("/customer/metrics");
customerRoutes.post("/customer");

module.exports = customerRoutes;
