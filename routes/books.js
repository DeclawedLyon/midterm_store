const express = require("express");
const router = express.router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM books WHERE id = $1`;
  });
};
