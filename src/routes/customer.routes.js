const { Router } = require("express");
const customerRoutes = Router();
const validatorCreateCustomer = require("../middlewares/validatorCreateCustomer");
const customerSchema = require("../schemas/customerSchema");

const {
	listCustomers,
	listCustomerMetrics,
	createCustomer,
} = require("../controllers/customerController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

customerRoutes.post(
	"/",
	ensureAuthenticated,
	validatorCreateCustomer(customerSchema),
	createCustomer
);
customerRoutes.get("/", ensureAuthenticated, listCustomers);
customerRoutes.get("/metrics", ensureAuthenticated, listCustomerMetrics);

module.exports = customerRoutes;
