const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'midterm'
});

const getAllBooks = function(limit) {
  return pool
  .query(`
    SELECT *
    FROM books
    LIMIT $1
    `, [limit])
  .then((result) => result.rows[0])
  .catch((err) => err.message);
}
exports.getAllBooks = getAllBooks;

const getAllFavorites = function(userId) {
  return pool
  .query(`
  SELECT favorites.id, users.name, books.title
  FROM favorites
  JOIN users ON user_id = users.id
  JOIN books ON book_id = books.id
  WHERE name = 'Mila';
`)
.then((result) => result.rows[0])
.catch((err) => err.message);
}

const getUserWithEmail = function(email) {
  return pool
  .query(`
    SELECT *
    FROM users
    WHERE email = $1
    `, [email])
  .then((result) => result.rows[0])
  .catch((err) => err.message);
}
exports.getUserWithEmail = getUserWithEmail;

const addUser =  function(user) {
  const name = user.name;
  const email = user.email;
  const password = user.password;
  return pool
    .query(`
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *
      `, [name, email, password])
    .then((result) => result.rows)
    .catch((err) => err.message);
}
exports.addUser = addUser;
