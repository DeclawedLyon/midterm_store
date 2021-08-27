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
    .then((result) => result.rows[0])
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
    WHERE recipient_id = $1 OR sender_id =$1
    ORDER BY id
  `,
      [id]
    )
    .then((result) => result.rows)
    .catch((err) => err.message);
};
exports.getMessageWithId = getMessageWithId;

const getAllItemsInCart = function (user_id) {
  return pool.query(
    `
    SELECT carts.id, users.name AS user, books.owner_id, books.title, books.author, books.bookcover, books.year, books.price
    FROM carts
    JOIN users ON user_id = users.id
    JOIN books ON book_id = books.id
    WHERE users.id = $1
    ORDER BY users.name
    ;
  `,
    [user_id]
  );
};
exports.getAllItemsInCart = getAllItemsInCart;

const getDetailsOfItemsInCart = function (user_id) {
  return pool.query(
    `
  SELECT carts.id, books.title, price
  FROM carts
  JOIN users ON user_id = users.id
  JOIN books ON book_id = books.id
  WHERE users.id = $
  GROUP BY carts.id, books.title, books.price;
  `,
    [user_id]
  );
};
exports.getDetailsOfItemsInCart = getDetailsOfItemsInCart;

const getSumOfAllItemsInCart = function (user_id) {
  return pool.query(
    `
  SELECT users.name, SUM(books.price)
  FROM carts
  JOIN users ON user_id = users.id
  JOIN books ON book_id = books.id
  WHERE users.id = $
  GROUP BY users.id
  ORDER BY SUM(books.price);
  `,
    [user_id]
  );
};
exports.getSumOfAllItemsInCart = getSumOfAllItemsInCart;

const createSale = function (saleObject) {
  const userid = salesObject.user_id;
  const storeId = salesObject.store_id;
  const cartId = salesObject.cart_id;
  const soldDate = Now();
  const firstName = salesObject.first_name;
  const lastName = saleObject.last_name;
  const email = saleObject.email;
  const phone = saleObject.phone;
  const shippingAddress = saleObject.shipping_address;
  const city = saleObject.city;
  const province = saleObject.province;
  const postalCode = saleObject.postalCode;
  return pool
    .query(
      `
    INSERT INTO sales (user_id, store_id, cart_id, sold_date, first_name, last_name, email, phone, shipping_address, city, province, postal_code)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
  `,
      [
        userid,
        storeId,
        cartId,
        soldDate,
        firstName,
        lastName,
        email,
        phone,
        shippingAddress,
        city,
        province,
        postalCode,
      ]
    )
    .then((result) => result.rows)
    .catch((err) => err.message);
};

exports.createSale = createSale;
const addFavorite = function (text) {
  const userid = text.userid;
  const bookid = text.bookid;
  return pool
    .query(
      `
      INSERT INTO favorites (user_id,book_id)
      VALUES ($1, $2)
      RETURNING *
      `,
      [userid, bookid]
    )
    .then((result) => result.rows)
    .catch((err) => err.message);
};

exports.addFavorite = addFavorite;

const addToCart = function (id) {
  userid = id.userid;
  book_id = id.book_id;
  return pool
    .query(
      `
    INSERT INTO carts (user_id, book_id)
    VALUES ($1, $2)
    RETURNING *
    `,
      [userid, book_id]
    )
    .then((result) => result.rows)
    .catch((err) => err.message);
};

exports.addToCart = addToCart;
