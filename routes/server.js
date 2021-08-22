//load.env
require("dotenv").config();

//server config
const database = require("./database");
const apiRoutes = require("./apiRoutes");
const userRoutes = require("./userRoutes");
const books = require("./books");
const favorites = require("./favorites");

const path = require("path");

const express = require("express");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["user_id"],
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// /books/endpoints
const books = express.Router();
books(books, database);
app.use("/books", books);

// /user/endpoints
const userRouter = express.Router();
userRoutes(userRouter, database);
app.use("/users", userRouter);

// /favorites endpoint
const favorites = express.Router();
favorites(favorites, database);
app.use("/favorites", favorites);

app.use(express.static(path.join(__dirname, "../public")));

app.get("/test", (req, res) => {
  res.send("🤗");
});

const port = process.env.PORT || 3000;
app.listen(port, (err) => console.log(err || `listening on port ${port} 😎`));
