const express = require("express");
const router = express.Router();

const database = require("../database");

router.get("/books", (req, res) => {
  database
    .getAllBooks(10)
    .then((data) => {
      res.render("index", { data });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
