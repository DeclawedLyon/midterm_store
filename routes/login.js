const express = require("express");
const router = express.Router();

const database = require("../database");

router.get("/login", (req, res) => {
  res.render("login");
});

const login = function (email, password) {
  return database.getUserWithEmail(email).then((user) => {
    if (bcrypt.compareSync(password, user.password)) {
      console.log(user)
      return user;
    }
    return null;
  });
};
exports.login = login;


router.post("/", (req, res) => {
  const { email, password } = req.body;
  login(email, password)
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
