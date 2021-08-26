const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const pool = new Pool(dbParams);
pool.connect();

const filterBooksByTitle = function (title) {
  return pool
    .query(
      `
    SELECT *
    FROM books
    WHERE title LIKE '%$1%'
    ORDER BY title
  `,
      [title]
    )
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};
exports.filterBooksByTitle = filterBooksByTitle;

const filterBooksByUser = function (id) {
  return pool
    .query(
      `
    SELECT *
    FROM books
    WHERE  owner_id = $1
    ORDER BY id
  `,
      [id]
    )
    .then((result) => result.rows)
    .catch((err) => err.message);
};
exports.filterBooksByUser = filterBooksByUser;

const filterBooksByAuthor = function (author) {
  return pool
    .query(
      `
    SELECT *
    FROM books
    WHERE author LIKE '%$1%'
    ORDER BY author
  `,
      [author]
    )
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};
exports.filterBooksByAuthor = filterBooksByAuthor;

const filterBooksByGenre = function (genre) {
  return pool
    .query(
      `
    SELECT *
    FROM books
    WHERE genre LIKE '%$1'
    ORDER BY genre, title
  `,
      [genre]
    )
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};
exports.filterBooksByGenre = filterBooksByGenre;

const filterBooksByPrice = function (min, max) {
  return pool
    .query(
      `
    SELECT *
    FROM books
    WHERE price > $1 and price <$2
    ORDER BY price;
  `,
      [min, max]
    )
    .then((result) => result.rows)
    .catch((err) => err.message);
};
exports.filterBooksByPrice = filterBooksByPrice;

const getAllBooks = function (limit) {
  return pool
    .query(
      `
    SELECT *
    FROM books
    LIMIT $1
    `,
      [limit]
    )
    .then((result) => result.rows)
    .catch((err) => err.message);
};
exports.getAllBooks = getAllBooks;

const getAllFavorites = function (userId) {
  return pool
    .query(
      `
  SELECT books.bookcover, books.price, books.author
  FROM favorites
  JOIN users ON user_id = users.id
  JOIN books ON book_id = books.id
  WHERE user_id = $1;
`,
      [userId]
    )
    .then((result) => result.rows)
    .catch((err) => err.message);
};
exports.getAllFavorites = getAllFavorites;

const getUserWithEmail = function (email) {
  return pool
    .query(
      `
    SELECT *
    FROM users
    WHERE email = $1
    `,
      [email]
    )
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};
exports.getUserWithEmail = getUserWithEmail;

const getPassWordWithEmail = function (email) {
  return pool
    .query(
      `
    SELECT *
    FROM users
    WHERE email = $1
    `,
      [password]
    )
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};
exports.getPassWordWithEmail = getPassWordWithEmail;

const getUserWithId = function (id) {
  return pool
    .query(
      `
    SELECT *
    FROM users
    WHERE id = $1
  `
    )
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};
exports.getUserWithId = getUserWithId;

const addUser = function (user) {
  const name = user.name;
  const email = user.email;
  const password = user.password;
  return pool
    .query(
      `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [name, email, password]
    )
    .then((result) => result.rows)
    .catch((err) => err.message);
};
exports.addUser = addUser;

const addBook = function (book) {
  const owner_id = book.owner_id;
  const price = book.price;
  const author = book.author;
  const title = book.title;
  const genre = book.genre;
  const year = book.year;
  const bookcover = book.bookcover;

  return pool
    .query(
      `
      INSERT INTO books (owner_id, price, author, title, genre, year,bookcover,sold) VALUES ($1, $2, $3, $4, $5, $6,$7,false) RETURNING *
      `,
      [owner_id, price, author, title, genre, year, bookcover]
    )
    .then((result) => result.rows)
    .catch((err) => err.message);
};
exports.addBook = addBook;

const soldBook = function (id) {
  return pool
    .query(
      `
      UPDATE books
      SET sold = true
      WHERE id = $1
      RETURNING *
  `,
      [id]
    )
    .then((result) => result.rows)
    .catch((err) => err.message);
};
exports.soldBook = soldBook;

const removeBook = function (id) {
  return pool
    .query(
      `
      DELETE FROM books
      WHERE id = $1
      RETURNING *
  `,
      [id]
    )
    .then((result) => result.rows)
    .catch((err) => err.message);
};
exports.removeBook = removeBook;

///test
const getWidgets = function () {
  return pool
    .query(
      `
    SELECT *
    FROM widgets

  `
    )
    .then((result) => result.rows)
    .catch((err) => err.message);
};
exports.getWidgets = getWidgets;

const addMessage = function (text) {
  const sender_id = text.sender_id;
  const recipient_id = text.recipient_id;
  const content = text.content;
  return pool
    .query(
      `
      INSERT INTO messages (sender_id, recipient_id, content)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [sender_id, recipient_id, content]
    )
    .then((result) => result.rows)
    .catch((err) => err.message);
};

exports.addMessage = addMessage;

const getMessageWithId = function (id) {
  return pool
    .query(
      `
    SELECT *
    FROM messages
    WHERE recipient_id = $1
    ORDER BY id
  `,
      [id]
    )
    .then((result) => result.rows)
    .catch((err) => err.message);
};
exports.getMessageWithId = getMessageWithId;
