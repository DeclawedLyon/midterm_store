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
      res.cookie("user_id", user.id);
      res.redirect("/user");
    })
    .catch((e) => res.send(e));
});
module.exports = router;
