module.exports = function (router, database) {
  router.get("/books", (req, res) => {
    database
      .getAllBooks(req.query, 20)
      .then((books) => res.send({ books }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

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
