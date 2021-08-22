const express = require("express");
const router = express.router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    database
      .getAllBooks(req.query, 5)
      .then((books) => res.send({ books }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  router.post("/books", (req, res) => {
    const userId = req.session.userId;
    database
      .addBooks({ ...req.body, owner_id: userId })
      .then((property) => {
        res.send(property);
      })
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  return router;
};
