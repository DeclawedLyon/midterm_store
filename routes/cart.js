const express = require("express");
const router = express.Router();

const database = require("../database");


router.get("/cart", (req, res) => {
  // const user_id = req.body.user;
  const user_id = req.session.user_id;
  database
    .getUserWithId(user_id)
    .then((data) => {
      const templeteVars = { data };
      templeteVars.user = req.session.user_id ? req.session.user_id : null;
      res.render("cart", templeteVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message })
    })
});

// router.post("/cart", (req, res) => {
//   const user_id = req.body.user_id;
//   console.log(user_id);
//   database
//     .getAllItemsInCart(user_id)
//     .then((data) => {
//       console.log("book11", data);
//       res.render("cart", { data });
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err.message });
//     });
// });

module.exports = router;


