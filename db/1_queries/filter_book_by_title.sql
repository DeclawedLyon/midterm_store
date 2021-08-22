SELECT users.name, price, year, author, title, genre
FROM books
JOIN users ON owner_id = users.id
WHERE title LIKE '%Trees%'
ORDER BY title;
