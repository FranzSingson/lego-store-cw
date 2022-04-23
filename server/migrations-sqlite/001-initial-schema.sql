-- Up
CREATE TABLE products( id INT, itemName TEXT NOT NULL, price INT NOT NULL, imgSrc TEXT NOT NULL, itemType TEXT NOT NULL, colour TEXT NOT NULL, inCart INT NOT NULL, stock INT NOT NULL)

-- CREATE TABLE Messages (
--   id   CHAR(36) PRIMARY KEY,
--   msg  TEXT     NOT NULL,
--   time DATETIME
-- );
INSERT INTO products (id, itemName, price, imgSrc, itemType, colour, inCart, stock) VALUES ("0", 'Item0', "0.50", './images/brick0.jpg', 'brick', 'White', "0", "50");
-- INSERT INTO products(id, itemName, price, imgSrc, itemType, colour, inCart, stock) VALUES
-- (0, 'Item0', 0.50, './images/brick0.jpg', 'brick', 'White', 0, 50), 
-- (1, 'Item1', 0.50, './images/brick1.jpg', 'brick', 'Brown', 0, 50), 
-- (2, 'Item2', 0.50, './images/brick2.jpg', 'brick', 'Blue - Azure', 0, 50), 
-- (3, 'Item3', 0.50, './images/brick3.jpg', 'brick', 'Brown - Yellow', 0, 50), 
-- (4, 'Item4', 0.50, './images/brick4.jpg', 'brick', 'Yellow - Bright', 0, 50), 
-- (5, 'Item5', 0.50, './images/brick5.jpg', 'brick', 'Blue - Bright', 0, 50), 
-- (6, 'Item6', 0.50, './images/brick6.jpg', 'brick', 'Red - Dark', 0, 50), 
-- (7, 'Item7', 0.50, './images/brick7.jpg', 'brick', 'Blue - Medium', 0, 50), 
-- (8, 'Item8', 0.50, './images/brick8.jpg', 'brick', 'Green - Sand', 0, 50), 
-- (9, 'Item9', 0.50, './images/brick9.jpg', 'brick', 'Brown - Medium', 0, 50), 
-- (10, 'Item10', 50, './images/set10.jpg', 'set', 'Multi', 0, 50), 
-- (11, 'Item11', 50, './images/set11.jpg', 'set', 'Multi', 0, 50), 
-- (12, 'Item12', 50, './images/set12.jpg', 'set', 'Multi', 0, 50), 
-- (13, 'Item13', 50, './images/set13.jpg', 'set', 'Multi', 0, 50);


-- Down
DROP TABLE products;