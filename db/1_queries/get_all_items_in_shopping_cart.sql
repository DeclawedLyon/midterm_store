SELECT carts.id, users.name AS user, books
FROM carts
JOIN users ON user_id = users.id
JOIN books ON book_id = books.id
WHERE users.id = 3
ORDER BY users.name
;
