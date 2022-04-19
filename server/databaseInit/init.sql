/* Creates the database*/
CREATE DATABASE legoStore;

CREATE TABLE products (
    id INT PRIMARY KEY,
    name TEXT NOT NULL,
    price INT NOT NULL,
    imgSrc TEXT NOT NULL,
    colour TEXT NOT NULL,
    inCart INT NOT NULL,
)

INSERT INTO products (id, name, price, imgSrc, colour, inCart) VALUES 
('0', 'brick0', 0.50, './images/brick0.jpg', 'White', 0 ),
('1', 'brick1', 0.50, './images/brick1.jpg', 'Brown', 0),
('2', 'brick2', 0.50, './images/brick2.jpg', 'Blue - Medium Azure', 0),
('3', 'brick3', 0.50, './images/brick3.jpg', 'Brown - Brick Yellow', 0),
('4', 'brick4', 0.50, './images/brick4.jpg', 'Yellow - Bright Yellow', 0),
('5', 'brick5', 0.50, './images/brick5.jpg', 'Blue - Bright Blue', 0),
('6', 'brick6', 0.50, './images/brick6.jpg', 'Red - Dark Red', 0),
('7', 'brick7', 0.50, './images/brick7.jpg', 'Blue - Medium Blue', 0),
('8', 'brick8', 0.50, './images/brick8.jpg', 'Green - Sand Green', 0),
('9', 'brick9', 0.50, './images/brick9.jpg', 'Brown - Medium Nougat', 0)

DROP TABLE products

