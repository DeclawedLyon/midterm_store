const express = require("express");
const router = express.Router();

const database = require("../database");

router.get("/login", (req, res) => {
  res.render("login");
});

const login = function (email, password) {
  return database
  .getUserWithEmail(email)
  .then((user) => {
    if (password === user.password) {
      return user;
    }
    return null;
  });
};
exports.login = login;


router.post("/login", (req, res) => {
  login(req.body.email, req.body.password)
    .then((user) => {
      if (!user) {
        res.send({ error: "Wrong password or Wrong email!" });
        return;
      }
      console.log("req.userId");
      req.userId = user.id;
      res.redirect("/");
    })
    .catch((e) => res.send(e));
});

module.exports = router;
