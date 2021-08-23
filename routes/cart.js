const express = require("express");
const router = express.Router();

const database = require("../database");

router.get("/cart", (req, res) => {
  res.render("cart");
});

router.get("/cart", (req, res) => {
  database
    .getAllBooks(10)
    .then((data) => {
      console.log("book11", data);
      res.render("cart", { data });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;


