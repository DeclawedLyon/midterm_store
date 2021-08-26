const express = require("express");
const router = express.Router();
const database = require("../database");

router.get("/favorites", (req, res) => {
  let userid = req.session.user_id;
  database
    .getAllFavorites(userid)
    .then((data) => {
      const templeteVars = { data };
      templeteVars.user = req.session.user_id ? req.session.user_id : null;
      res.render("favorites", templeteVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/favorites/:id", (req, res) => {
  let userid = req.session.user_id;
  let bookid = req.params.id;
  database
    .addFavorite({ userid, bookid })
    .then((data) => {
      const templeteVars = { data };
      templeteVars.user = req.session.user_id ? req.session.user_id : null;
      res.redirect("/favorites");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
