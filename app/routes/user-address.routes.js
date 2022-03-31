const express = require("express");
const router = express.Router();
const {
  create,
  getBnbBalance,
  getBebTokenBalance,
  getTotalStackedToken,
  getListingLockedToken,
  getAbiData,
  getTokenPrice,
  getTotalStackedAccordingToPackage,
} = require("../controllers/tbl_user_addresses.controller.js");

// Create a new Address
router.post("/api/v1/createStackRecord", create);
router.get("/api/v1/getTotalStackedToken", getTotalStackedToken);
router.post("/api/v1/getListingLockedToken", getListingLockedToken);
router.post("/api/v1/bnb_balance", getBnbBalance);
router.post("/api/v1/getBebTokenBalance", getBebTokenBalance);
router.post("/api/v1/getAbiData", getAbiData);
router.post("/api/v1/getTokenPrice", getTokenPrice);
router.get(
  "/api/v1/getTotalStackedAccordingToPackage",
  getTotalStackedAccordingToPackage
);

module.exports = router;
