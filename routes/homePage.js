const express = require("express");
const router = express.Router();

const database = require("../database");

router.get("/books", (req, res) => {
  database
    .getAllBooks(10)
    .then((data) => {
      req.session.user_id = user.id;
      res.render("index", { data });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});
router.post("/logout", (req, res) => {
  req.session.userId = null;
  res.send({});
});

module.exports = router;
