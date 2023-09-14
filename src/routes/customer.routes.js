const { Router } = require("express");
const {
	listCustomers,
	listCustomerMetrics,
	createCustomer,
} = require("../controllers/customerController");
const customerSchema = require("../schemas/customerSchema");
const customerRoutes = Router();
const validatorCreateCustomer = require("../middlewares/validatorCreateCustomer");

customerRoutes.get("/", listCustomers);
customerRoutes.get("/metrics", listCustomerMetrics);
customerRoutes.post(
	"/",
	validatorCreateCustomer(customerSchema),
	createCustomer
);

module.exports = customerRoutes;
