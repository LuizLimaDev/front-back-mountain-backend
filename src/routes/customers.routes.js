const { Router } = require("express");
const customersRoutes = Router();
const { validateRequestBody } = require("../middlewares/validateRequestBody");
const customersSchema = require("../schemas/customersSchema");

const {
	listCustomers,
	listCustomersMetrics,
	createCustomers,
} = require("../controllers/customersController");

customersRoutes.post(
	"/",
	validateRequestBody(customersSchema),
	createCustomers
);
customersRoutes.get("/", listCustomers);
customersRoutes.get("/metrics", listCustomersMetrics);

module.exports = customersRoutes;
