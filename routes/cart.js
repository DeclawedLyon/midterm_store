const express = require("express");
const router = express.Router();
const database = require("../database");


router.get("/cart", (req, res) => {
  const userid = req.session.user_id;
  database
    .filterBooksByUser(userid)
    .then((data) => {
      const finalPrice = data.reduce((total, currentItem) => {
        return total.price + currentItem.price;
      })
      const taxes = finalPrice * 0.15;
      const shipping = 5;
      const totalPrice = finalPrice + taxes + shipping;
      const templateVars = { data, finalPrice, taxes, shipping, totalPrice };
      templateVars.user = req.session.user_id ? req.session.user_id : null;
      res.render("cart", templateVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message })
    })
});


router.post("/cart", (req, res) => {
  res.json(req.body)
  res.render("thankyou")
})

module.exports = router;


