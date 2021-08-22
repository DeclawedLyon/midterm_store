const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/search", (req, res) => {
    db.query(sql, params).then((data) => {});
  });
  return router;
};
