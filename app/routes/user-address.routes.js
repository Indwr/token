const express = require("express");
const router = express.Router();
const { create } = require("../controllers/tbl_user_addresses.controller.js");

// Create a new Address
router.post("/api/v1/address", create);

module.exports = router;
