const express = require("express");
const router = express.Router();

const database = require("../database");

router.get("/books", (req, res) => {
  database
    .getAllBooks(10)
    .then((data) => {
      const templeteVars = { data };
      templeteVars.user = req.session.user_id ? req.session.user_id : null;
      res.render("books", templeteVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
