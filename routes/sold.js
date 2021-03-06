const express = require("express");
const router = express.Router();
const database = require("../database");

router.get("/sold/:id", (req, res) => {
  const bookid = req.params.id;
console.log(bookid);
  database
    .soldBook(bookid)
    .then((data) => {
      console.log(data);
      const templeteVars = { data };
      templeteVars.user = req.session.user_id ? req.session.user_id : null;
      console.log('template', templeteVars);
      res.render("mybooks", templeteVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
