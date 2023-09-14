const { Router } = require("express");
const chargesRoutes = Router();
const { validateRequestBody } = require("../middlewares/validateRequestBody");
const {chargesSchema} = require("../schemas/chargesSchema");

const { createCharges, listCharges, listChargesMetrics } = require("../controllers/chargesController");

chargesRoutes.post(
	"/",
	validateRequestBody(chargesSchema),
	createCharges
);
chargesRoutes.get("/", listCharges);
chargesRoutes.get("/metrics", listChargesMetrics);

module.exports = chargesRoutes;
