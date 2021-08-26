const express = require("express");
const router = express.Router();
const database = require("../database");

router.get("/register", (req, res) => {
  const templeteVars = {
    user: req.session.user_id ? req.session.user_id : null,
  };
  res.render("register", templeteVars);
});

router.post("/register", (req, res) => {
  const user = req.body;
  database
    .addUser(user)
    .then((user) => {
      req.session.user_id = user.id;
      res.redirect("/");
    })
    .catch((e) => res.send(e));
});
module.exports = router;
