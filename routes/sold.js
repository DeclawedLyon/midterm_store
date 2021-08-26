const express = require("express");
const router = express.Router();
const database = require("../database");

router.get("/sold/:id", (req, res) => {
  const bookid = req.params.id;

  database
    .soldBook(bookid)
    .then((data) => {
      const templeteVars = { data };
      templeteVars.user = req.session.user_id ? req.session.user_id : null;
      res.render("mybooks", templeteVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/delete/:id", (req, res) => {
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
