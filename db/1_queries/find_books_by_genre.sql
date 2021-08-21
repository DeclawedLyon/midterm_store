SELECT users.name AS owner_name, price, year, author, title, genre, bookcover
FROM books
JOIN users ON users.id = owner_id
WHERE genre LIKE '%horror%'
;
