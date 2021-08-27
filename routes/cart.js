const express = require("express");
const router = express.Router();
const database = require("../database");

const salesObject = {};
salesObject.cart_id = []
salesObject.owner_id = [];

router.get("/cart", (req, res) => {
  const userid = req.session.user_id;
  database
    .getAllItemsInCart(userid)
    .then((data) => {
      const books = data.rows;
      let finalPrice = 0;
      // res.json(data);
      books.forEach((element) => {
        finalPrice += element.price;
        salesObject.cart_id.push(element.cart_id);
        salesObject.owner_id.push(element.owner_id);
      });
      const taxes = finalPrice * 0.15;
      const shipping = 5;
      const totalPrice = finalPrice + taxes + shipping;
      salesObject.total = totalPrice;
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
  // res.json(salesObject);
  database.filterBooksByUser(userid)
  .then((data) => {
      salesObject.user_id = req.session.user_id
      salesObject.email = req.body.emailAddress
      salesObject.first_name = req.body.firstName
      salesObject.last_name = req.body.lastName
      salesObject.phone = req.body.phoneNumber
      salesObject.shipping_address = req.body.shippingAddress
      salesObject.city = req.body.city
      salesObject.province = req.body.province
      salesObject.postal_code = req.body.postalCode
      salesObject.card_number = req.body.cardNumber
      salesObject.expiration = req.body.expirationDate
      salesObject.securityCode = req.body.securityCode
      salesObject.creditFName = req.body.creditFirstName
      salesObject.creditLName = req.body.creditLastName
      salesObject.saleItems = []
      data.forEach((element) => {
        salesObject.saleItems.push(element.id);
      });
      console.log(salesObject);
      // database.createSale(salesObject)
      // .then((data) => {
      //   const templateVars = { data }
      //   templeteVars.user = req.session.user_id ? req.session.user_id : null;
      //   res.render("thankyou", templateVars);
      // })
      // .catch((err) => {
      //   res.status(500).json({ error: err.message })
      // })
    // res.json(salesObject);
    // res.json(req.body)
    // res.json(data);
    res.render("thankyou");
  });
});

module.exports = router;



// CREATE TABLE sales (
//   id SERIAL PRIMARY KEY NOT NULL,
//   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
//   store_id INTEGER REFERENCES stores(id) ON DELETE CASCADE,
//   cart_id INTEGER REFERENCES carts(id) ON DELETE CASCADE,
//   sold_date DATE NOT NULL,
//   first_name VARCHAR(225) NOT NULL,
//   last_name VARCHAR(225) NOT NULL,
//   email VARCHAR(225) NOT NULL,
//   phone VARCHAR(225) NOT NULL,
//   shipping_address VARCHAR(225) NOT NULL,
//   city VARCHAR(225) NOT NULL,
//   province VARCHAR(225) NOT NULL,
//   postal_code VARCHAR(225) NOT NULL
// );
