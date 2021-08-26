const express = require("express");
const router = express.Router();
const database = require("../database");
// const moment = require("moment-timezone");
// const { data } = require("jquery");
// const users = require("./users");

router.get("/messages/:id", (req, res) => {
  const templeteVars = {};
  templeteVars.user = req.session.user_id ? req.session.user_id : null;

  res.render("messages", { user: req.session.user_id, ownerid: req.params.id });
});

router.post("/messages/:id", (req, res) => {
  const sender_id = req.session.user_id;
  // console.log("seeeeeeeeee", req.body.ownerid);
  const recipient_id = req.params.id;
  // console.log("recccccccccc", req);
  const content = req.body.message;

  database
    .addMessage({ sender_id, recipient_id, content })
    .then((data) => {
      console.log("message", data);
      res.redirect("/books");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
// // READ - view message history between two users
// router.get('/:id', (req, res) => {
//   db
//   .query(`
//     SELECT users.name as name, timestamp, message, recipient_id
//     FROM messages
//     JOIN users ON users.id = recipient_id
//     WHERE sender_id = $1
//     AND recipient_id = $2
//     ORDER BY timestamp;`
//   ,[req.session.user_id, req.params.id])
//     .then(data => {
//       const messages = data.rows.map(message => {
//         const timestamp = moment.tz(message.timestamp, 'America/Vancouver').format('YYYY-MM-DD hh:mm A');
//         return { ...message, timestamp };
//       });
//       console.log('messages new: ', messages);
//       let name = '';
//       if (data.rows[0]) {
//         name = data.rows[0].name;
//       }
//       res.render('message_show', {messages, user:req.session.user_id, ownerID:req.params.id, name:name });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });

// // ADD - message
// router.post('/:id', (req, res) => {
//   db
//   .query(`
//   INSERT INTO messages (sender_id, recipient_id, message)
//    VALUES ($1, $2, $3) RETURNING *;`,
//   [req.session.user_id, req.params.id, req.body.message])
//     .then(data => {
//       res.redirect(`/messages/${req.params.id}`);
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });

// return router;
