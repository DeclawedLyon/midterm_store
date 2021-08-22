const express = require("express");
const router = express.router();

module.exports = (db) => {
  router.get("/favorites", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.error("Please login first!");
      return;
    }
    database
      .getAllFavorites(userId)
      .then((favorties) => res.send({ favorites }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });
  return router;
};
