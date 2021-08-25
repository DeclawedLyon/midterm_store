const express = require("express");
const router = express.Router();
const database = require("../database");

router.get("/addbook", (req, res) => {
  const templeteVars = {};
  templeteVars.user = req.session.user_id ? req.session.user_id : null;
  res.render("addbook", templeteVars);
});

router.post("/addbook", (req, res) => {
  const owner_id = req.session.user_id;
  const price = req.body.price;
  const author = req.body.author;
  const title = req.body.title;
  const genre = req.body.genre;
  const year = req.body.year;
  const bookcover = req.body.bookcover;
  console.log("post successssssssssss", req.body);
  database
    .addBook({ owner_id, price, author, title, genre, year, bookcover })
    .then((data) => {
      console.log("data1111111111222", data);
      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
