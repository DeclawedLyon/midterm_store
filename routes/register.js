const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const database = require("../database");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 12);
  database
    .addUser(user)
    .then((user) => {
      if (!user) {
        res.send({ error: "error" });
        return;
      }
      req.session.userId = user.id;
      res.redirect("/");
    })
    .catch((e) => res.send(e));
});
module.exports = router;
