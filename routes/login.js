const express = require("express");
const router = express.Router();

const database = require("../database");

router.get("/", (req, res) => {
  res.render("login");
});

const login = function (email, password) {
  return database.getPassWordWithEmail(email).then((user) => {
    console.log("user11111", user);
  });
};
exports.login = login;

module.exports = router;

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  login(email, password)
    .then((user) => {
      if (!user) {
        res.send({ error: "error" });
        return;
      }
      req.session.userId = user.id;
      res.send({ user: { name: user.name, email: user.email, id: user.id } });
    })
    .catch((e) => res.send(e));
});
