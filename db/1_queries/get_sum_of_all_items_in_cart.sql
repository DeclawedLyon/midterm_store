SELECT *
FROM books
WHERE  user_id = $1
ORDER BY id


-- SELECT users.name, SUM(books.price)
-- FROM carts
-- JOIN users ON user_id = users.id
-- JOIN books ON book_id = books.id
-- WHERE users.id = 3
-- GROUP BY users.id
-- ORDER BY SUM(books.price);
