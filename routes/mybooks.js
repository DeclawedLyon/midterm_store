const express = require("express");
const router = express.Router();
const database = require("../database");

router.get("/mybooks", (req, res) => {
  let userid = req.session.user_id;

  database
    .filterBooksByUser(userid)
    .then((data) => {
      const templeteVars = { data };
      templeteVars.user = req.session.user_id ? req.session.user_id : null;
      res.render("mybooks", templeteVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
