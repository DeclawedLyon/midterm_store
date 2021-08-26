const express = require("express");
const router = express.Router();
const database = require("../database");

router.get("/mymessages", (req, res) => {
  let userid = req.session.user_id;

  database
    .getMessageWithId(userid)
    .then((data) => {
      const templeteVars = { data };
      console.log("asbdkjabfblasbddddd", data);
      templeteVars.user = req.session.user_id ? req.session.user_id : null;
      res.render("mymessages", templeteVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/mymessages", (req, res) => {
  let userid = req.session.user_id;

  database
    .addMessage(userid)
    .then((data) => {
      const templeteVars = { data };
      templeteVars.user = req.session.user_id ? req.session.user_id : null;
      res.render("mybooks", templeteVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
