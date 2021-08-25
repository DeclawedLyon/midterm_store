SELECT users.name, price, year, author, title, genre
FROM books
JOIN users ON user_id = users.id
ORDER BY name;
