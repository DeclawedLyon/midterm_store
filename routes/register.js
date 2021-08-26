const express = require("express");
const router = express.Router();
const database = require("../database");

router.get("/register", (req, res) => {
  const templeteVars = {};
  templeteVars.user = req.session.user_id ? req.session.user_id : null;
  res.render("register", templeteVars);
});

router.post("/register", (req, res) => {
  const userinfo = req.body;
  database
    .addUser(userinfo)
    .then((user) => {
      req.session.user_id = user.id;

      res.redirect("/books");
    })
    .catch((e) => res.send(e));
});
module.exports = router;
