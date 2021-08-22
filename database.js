const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'midterm'
});

const findAllBooks = function() {
  return pool
  .query(`
    SELECT *
    FROM books
    `)
  .then((result) => result.rows[0])
  .catch((err) => err.message);
}
exports.findAllBooks = findAllBooks;
