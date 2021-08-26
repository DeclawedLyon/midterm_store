const express = require("express");
const { reset } = require("nodemon");
const router = express.Router();
const database = require("../database");

router.get("/register", (req, res) => {
  const templeteVars = {};
  templeteVars.user = req.session.user_id ? req.session.user_id : null;
  console.log("2222222222", templeteVars);
  res.render("register", templeteVars);
});

router.post("/register", (req, res) => {
  const user = req.body;
  database
    .addUser(user)
    .then((user) => {
      req.session.user_id = user.id;
      console.log("111111111111111111", req.session.user_id);
      res.redirect("/");
    })
    .catch((e) => res.send(e));
});
module.exports = router;
