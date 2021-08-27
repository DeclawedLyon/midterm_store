const express = require("express");
const router = express.Router();
const database = require("../database");

router.get("/cart", (req, res) => {
  const userid = req.session.user_id;
  database
    .getAllItemsInCart(userid)
    .then((data) => {
      const books = data.rows;
      let finalPrice = 0;
      books.forEach((element) => {
        finalPrice += element.price;
      });
      const taxes = finalPrice * 0.15;
      const shipping = 5;
      const totalPrice = finalPrice + taxes + shipping;
      const templateVars = { books, finalPrice, taxes, shipping, totalPrice };
      templateVars.user = req.session.user_id ? req.session.user_id : null;
      res.render("cart", templateVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/cart/:id", (req, res) => {
  let userid = req.session.user_id;
  let bookid = req.params.id;
  database
    .addToCart({ userid, bookid })
    .then((data) => {
      console.log("111111111111", data);
      const templeteVars = { data };
      templeteVars.user = req.session.user_id ? req.session.user_id : null;
      res.redirect("/cart");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/cart", (req, res) => {
  const userid = req.session.user_id;
  database.filterBooksByUser(userid).then((data) => {
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
      saleItems: [],
    };
    data.forEach((element) => {
      salesObject.saleItems.push(element.id);
    });
    // res.json(salesObject);
    // res.json(data);
    res.render("thankyou");
  });
});

router.post("cart/delete/:id", (req, res) => {
  const bookid = req.params.id;

  database
    .removeBookFromCart(bookid)
    .then((data) => {
      const templeteVars = { data };
      templeteVars.user = req.session.user_id ? req.session.user_id : null;
      res.redirect("/cart");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
