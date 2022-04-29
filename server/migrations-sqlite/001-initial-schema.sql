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
    (0, 'Bonsai-Set', 50, './images/bonsai.jpg', 'set', 'Multi', 50), 
    (1, 'Bonsai-Leaf', 10, './images/bonsaiLeaf.jpg', 'set', 'Multi', 50), 
    (2, 'Tree-House-Set', 50, './images/treeSet.jpg', 'set', 'Multi', 50), 
    (3, 'Tree-Leaves', 10, './images/treeLeaves.jpg', 'set', 'Mutli', 50), 
    (4, 'Tulips', 12, './images/tulips.jpg', 'set', 'Mutli', 50), 
    (5, 'Plant', 12, './images/plant.jpg', 'set', 'Mutli', 50), 
    (6, 'Bouquet', 12, './images/bouquet.jpg', 'set', 'Mutli', 50), 
    (7, 'Flowers', 12, './images/flowers.jpg', 'set', 'Mutli', 50), 
    (8, 'Brick-White-2x4', 1, './images/brick0.jpg', 'brick', 'White', 500),
    (9, 'Brick-Red-2x4', 1, './images/brick1.jpg', 'brick', 'Red', 500), 
    (10, 'Brick-Black-2x4', 1, './images/brick2.jpg', 'brick', 'Black', 500), 
    (11, 'Brick-Orange-2x4', 1, './images/brick3.jpg', 'brick', 'Orange', 500), 
    (12, 'Brick-Green-2x4', 1, './images/brick4.jpg', 'brick', 'Green', 500), 
    (13, 'Brick-Yellow-2x4', 1, './images/brick5.jpg', 'brick', 'Yellow', 500), 
    (14, 'Brick-Grey-2x4', 1, './images/brick6.jpg', 'brick', 'Grey', 0), 
    (15, 'Tokyo-Set', 50, './images/item7.jpg', 'set', 'Multi', 50), 
    (16, 'Singapore-Set', 50, './images/item8.jpg', 'set', 'Mutli', 7), 
    (17, 'New-York-Set', 50, './images/item9.jpg', 'set', 'Multi', 9), 
    (18, 'Paris-Set', 50, './images/item10.jpg', 'set', 'Multi', 50), 
    (19, 'London-Set', 50, './images/item11.jpg', 'set', 'Multi', 50), 
    (20, 'Taj-Mahal', 50, './images/item12.jpg', 'set', 'Multi', 50), 
    (21, 'Colosseum', 50, './images/item13.jpg', 'set', 'Multi', 50),
    (22, 'Owl-Set', 10, './images/item14.jpg', 'set', 'Multi', 50),
    (23, 'Dog-Set', 10, './images/item15.jpg', 'set', 'Multi', 50),
    (24, 'Tuktuk', 25, './images/item16.jpg', 'set', 'Multi', 50),
    (25, 'Taxi', 25, './images/item17.jpg', 'set', 'Multi', 50);

-- Down
DROP TABLE products;
