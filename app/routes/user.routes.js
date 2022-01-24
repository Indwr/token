const express = require("express");
const router = express.Router();
const {
  create,
  findAll,
  findOne,
  update,
  deleteAll,
} = require("../controllers/tbl_users.controller.js");

// Create a new users
router.post("/api/v1/user", create);

// Retrieve all users
router.get("/api/v1/user", findAll);

// Retrieve a single user with id
router.get("/api/v1/user:id", findOne);

// Update a user with id
router.put("/api/v1/user/:id", update);

// Delete all users
router.delete("/api/v1/user", deleteAll);

module.exports = router;
