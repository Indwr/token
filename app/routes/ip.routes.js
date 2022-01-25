const express = require("express");
const router = express.Router();
const { create } = require("../controllers/tbl_ips.controller.js");

// Create a new Address
router.post("/api/v1/ip", create);

module.exports = router;
