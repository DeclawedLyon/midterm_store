SELECT carts.id, users.name AS user, books.title AS title
FROM carts
JOIN users ON user_id = users.id
JOIN books ON book_id = books.id
ORDER BY users.name
;
