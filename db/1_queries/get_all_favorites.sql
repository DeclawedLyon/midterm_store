SELECT favorites.id, users.name, books.title
FROM favorites
JOIN users ON user_id = users.id
JOIN books ON book_id = books.id
WHERE name = 'Mila'
;
