// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.use(
  cookieSession({
    name: "session",
    keys: ["user_id"],
  })
);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded",
  })
);
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const books = require("./routes/books");
const login = require("./routes/login");
const register = require("./routes/register");
const favorites = require("./routes/favorites");
const database = require("./database");
const search = require("./routes/search");
const mybooks = require("./routes/mybooks");
const addbook = require("./routes/addbook");
const sold = require("./routes/sold");
const messages = require("./routes/messages");
const remove = require("./routes/remove");
const mymessages = require("./routes/mymessage");
const cart = require("./routes/cart");
const removecart = require("./routes/removecart");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/", books);
app.use("/", login);
app.use("/", register);
app.use("/", search);
app.use("/", mybooks);
app.use("/", favorites);
app.use("/", addbook);
app.use("/", sold);
app.use("/", messages);
app.use("/", remove);
app.use("/", mymessages);
app.use("/", cart);
app.use("/", removecart);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  database
    .getAllBooks(10)
    .then((data) => {
      const templeteVars = {
        data,
      };

      templeteVars.user = req.session.user_id ? req.session.user_id : null;

      res.render("index", templeteVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.post("/logout", (req, res) => {
  req.session.user_id = null;
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
