const express = require("express");
const router = express.Router();
const database = require("../database");

router.get("/search", (req, res) => {
  max = req.query.max;
  min = req.query.min;
  database
    .filterBooksByPrice(min, max)
    .then((books) => {
      console.log("1111122222222", books);
      res.render("search", { books });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
