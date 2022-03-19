const express = require("express");
const router = express.Router();
const {
  create,
  getBnbBalance,
  getBebTokenBalance,
} = require("../controllers/tbl_user_addresses.controller.js");

// Create a new Address
router.post("/api/v1/address", create);

router.post("/api/v1/bnb_balance", getBnbBalance);
router.post("/api/v1/getBebTokenBalance", getBebTokenBalance);

module.exports = router;
