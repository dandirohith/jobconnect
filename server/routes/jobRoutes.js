const express = require("express");
const router = express.Router();

const { create, findAll } = require("../controllers/jobController");

// Create a new Job
router.post("/", create);
// Retrieve all Jobs
router.get("/", findAll);

module.exports = router;
