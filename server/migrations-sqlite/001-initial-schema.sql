-- Up
CREATE TABLE products( id INT, 
    name TEXT NOT NULL, 
    price INT NOT NULL, 
    imgSrc TEXT NOT NULL, 
    itemType TEXT NOT NULL, 
    colour TEXT NOT NULL, 
    stock INT NOT NULL
);

-- INSERT INTO products (id, itemName, price, imgSrc, itemType, colour, inCart, stock) VALUES ("0", 'Item0', "0.50", './images/brick0.jpg', 'brick', 'White', "0", "50");
INSERT INTO products(id, name, price, imgSrc, itemType, colour, stock) VALUES
    (0, 'Brick-White-2x4', 0.50, './images/brick0.jpg', 'brick', 'White', 50), 
    (1, 'Brick-Red-2x4', 0.50, './images/brick1.jpg', 'brick', 'Red', 50), 
    (2, 'Brick-Black-2x4', 0.50, './images/brick2.jpg', 'brick', 'Black', 50), 
    (3, 'Brick-Orange-2x4', 0.50, './images/brick3.jpg', 'brick', 'Orange', 50), 
    (4, 'Brick-Green-2x4', 0.50, './images/brick4.jpg', 'brick', 'Green', 50), 
    (5, 'Brick-Yellow-2x4', 0.50, './images/brick5.jpg', 'brick', 'Yellow', 50), 
    (6, 'Brick-Grey-2x4', 0.50, './images/brick6.jpg', 'brick', 'Grey', 0), 
    (7, 'Tokyo-Set', 50, './images/item7.jpg', 'set', 'Multi', 50), 
    (8, 'Singapore-Set', 50, './images/item8.jpg', 'set', 'Mutli', 7), 
    (9, 'New-York-Set', 50, './images/item9.jpg', 'set', 'Multi', 9), 
    (10, 'Paris-Set', 50, './images/item10.jpg', 'set', 'Multi', 50), 
    (11, 'London-Set', 50, './images/item11.jpg', 'set', 'Multi', 50), 
    (12, 'Taj-Mahal', 50, './images/item12.jpg', 'set', 'Multi', 50), 
    (13, 'Colosseum', 50, './images/item13.jpg', 'set', 'Multi', 50),
    (14, 'Owl-Set', 10, './images/item14.jpg', 'set', 'Multi', 50),
    (15, 'Dog-Set', 10, './images/item15.jpg', 'set', 'Multi', 50),
    (16, 'Tuktuk', 25, './images/item16.jpg', 'set', 'Multi', 50),
    (17, 'Taxi', 25, './images/item17.jpg', 'set', 'Multi', 50);

-- Down
DROP TABLE products;
