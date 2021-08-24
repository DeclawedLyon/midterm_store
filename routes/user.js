const express = require("express");
const router = express.Router();
const database = require("../database");

router.get("/user", (req, res) => {
  res.render("user");
});

module.exports = router;
