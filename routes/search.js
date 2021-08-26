const express = require("express");
const router = express.Router();
const database = require("../database");

router.get("/search", (req, res) => {
  max = req.query.max;
  min = req.query.min;
  database
    .filterBooksByPrice(min, max)
    .then((books) => {
      const templeteVars = { books };

      templeteVars.user = req.session.user_id ? req.session.user_id : null;
      res.render("search", templeteVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
