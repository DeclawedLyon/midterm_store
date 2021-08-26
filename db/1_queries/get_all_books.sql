SELECT users.name, price, year, author, title, genre
FROM books
JOIN users ON owner_id = users.id
ORDER BY name;
