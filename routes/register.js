const express = require("express");
const router = express.Router();

const database = require("../database");

router.get("/", (req, res) => {
  res.render("Register");
});

router.post("/", (req, res) => {
  const user = req.body;

  const password = user.password;
  database
    .addUser(user)
    .then((user) => {
      if (!user) {
        res.send({ error: "error" });
        return;
      }
      req.session.userId = user.id;
      res.render("register", { data });
    })
    .catch((e) => res.send(e));
});
module.exports = router;
