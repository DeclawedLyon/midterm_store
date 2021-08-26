const express = require("express");
const router = express.Router();
const database = require("../database");

router.post("/remove/:id", (req, res) => {
  const bookid = req.params.id;

  database
    .removeBook(bookid)
    .then((data) => {
      const templeteVars = { data };
      templeteVars.user = req.session.user_id ? req.session.user_id : null;
      res.redirect("/mybooks");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});
module.exports = router;
