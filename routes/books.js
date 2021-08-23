const express = require("express");
const router = express.Router();

const database = require("../database");

router.get("/books", (req, res) => {
  const title = req.params;
  //test for connecting to databaset and query all data from widgets table
  database
    .getAllBooks(10)
    .then((data) => {
      console.log("book11", data);
      res.render("books", { data });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
