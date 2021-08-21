SELECT owners.name, price, year, author, type, title, genre
FROM books
JOIN owners ON owners.id = owner_id;
