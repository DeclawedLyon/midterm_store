const express = require("express");
const router = express.Router();

const database = require("../database");

router.get("/", (req, res) => {
  //test for connecting to databaset and query all data from widgets table
  database
    .getWidgets()
    .then((data) => {
      res.render("index", { data });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
