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
  const userid = req.session.user_id;
  database.filterBooksByUser(userid)
  .then((data) => {
    const salesObject = {
      currentUser: req.session.user_id,
      email_address: req.body.emailAddress,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      phone: req.body.phoneNumber,
      shipping_address: req.body.shippingAddress,
      city: req.body.city,
      province: req.body.province,
      postal_code: req.body.postalCode,
      card_number: req.body.cardNumber,
      expiration: req.body.expirationDate,
      securityCode: req.body.securityCode,
      creditFName: req.body.creditFirstName,
      creditLName: req.body.creditLastName,
      saleItems: []
    }
    data.forEach(element => {
      salesObject.saleItems.push(element.id);
    })
    // res.json(salesObject);
    // res.json(data);
    res.render("thankyou")
  })
})

module.exports = router;


