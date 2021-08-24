const express = require("express");
const router = express.Router();
const database = require("../database");

router.get("/", (req, res) => {
  res.render("favorites");
});

module.exports = router;
