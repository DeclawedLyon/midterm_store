SELECT users.name, price, year, author, title, genre
FROM books
JOIN users ON user_id = users.id
WHERE title LIKE '%Trees%'
ORDER BY title;
