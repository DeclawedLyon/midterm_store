SELECT carts.id, books.title, price
FROM carts
JOIN users ON user_id = users.id
JOIN books ON book_id = books.id
WHERE users.id = 3
GROUP BY carts.id, books.title, books.price;
