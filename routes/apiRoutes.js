module.exports = function (router, database) {
  router.get("/books", (req, res) => {
    database
      .getAllProperties(req.query, 20)
      .then((properties) => res.send({ properties }))
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
      .getAllReservations(userId)
      .then((reservations) => res.send({ reservations }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  router.post("/books", (req, res) => {
    const userId = req.session.userId;
    database
      .addProperty({ ...req.body, owner_id: userId })
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
