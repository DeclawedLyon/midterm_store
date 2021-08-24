const express = require("express");
const router = express.Router();

const database = require("../database");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const user = req.body;
  database
    .addUser(user)
    .then((user) => {
      req.session.userId = user.id;
      res.redirect("/");
    })
    .catch((e) => res.send(e));
});
module.exports = router;
