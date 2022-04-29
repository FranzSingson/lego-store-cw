# Application Engineering Coursework README

## About it

This is the coursework of UP2011325. It is a Lego Store website which allows online users to purchase products as a set or an individual brick from our store. When payment confirmation is completed, the Lego Store's database is updated to the correct stock.

## Key features & usage

- From the Home page, the user can add product to the basket.
- From the Home page, the user can add product to the favourites.
- From favourites, the user can move the item to the basket.
- They can also clear or remove specific items from favourites.
- Within the basket, the user can: add and minus quantity the quanity of the product.
- The user would not be able to buy more than the stock level of a product.
- When the quantiy is 1 and the user presses "minus", the product is removed from the cart.
- They can also remove a specific item from the basket or clear the cart.
- Only registered users can continue to purchase products, verified through Auth0.
- After payment, stock levels are updated. Out of stock products are displayed but not available for purchase. Indicates that they are coming back.
-Filter is partially completed due to minor issues, only filters, product type at the moment.

## Details of design and implementation rationale

- My products are fetched from the result of the database initialisaition. I have a handler for GET requests inside my server. This would match the request to the /bricks.

- Firslty within index.js, I created a grid of divs which is then divided into 2 sub divs, I inserted the image in sub div 1, the description & other appropriate elements are inserted in sub div 2. Seperation of the image and description makes modifying CSS simpler.

- Fetching the products before I run any code within my program is important because it stores the array of objects. The reason behind this is that it allows me to get hold of the selectd product using its index.

- This enables me to manipulate the array by storing selected products into a temporary array. From this temporary array, I would store the selected products into local storage for basket array or wishlist array purposes. I opt to manipulate the temporary array because I wouldnt be able to make any changes to the fetched array as its coming database.

- Functionality of my "Add To Favoruites"  is very similar to my "Add To Basket" because they would be using local storage to store an array of objects.

- When the Pay button is clicked, key data are sent to the server like id and the object payload as a PUT request. The reason behinds this allows my  server to responds to the PUT request and runs a query function to update my database.

## Lists unfinished and future work

- Improve CSS.
- Further modularisation.
- Implement a method to allow users type in a quantity amount instead of pressing a button many times.
- Filters could include colours and price in the future.
- Host each product with a unique web page URL.
- Implement an admin user to add new products.
- Add a search bar and update the displayed content.

## Bugs / problems

- Sometimes, Auth0 takes some time to load.
- After filter is set to Brick, If Filter is set to Set, it produces no output.
- When the user Logs In on the basket.html page, it sends them back to the index.html.

## Image reference

- Item0 - Lego. (n.d.). Item0. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/300101.jpg
- Item1 - Lego. (n.d.). Item1. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/300121.jpg
- Item2 - Lego. (n.d.). Item2. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/300126.jpg
- Item3 - Lego. (n.d.). Item3. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/4153827.jpg
- Item4 - Lego. (n.d.). Item4. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/4106356.jpg
- Item5 - Lego. (n.d.). Item5. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/4114319.jpg
- Item6 - Lego. (n.d.). Item6. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/4211085.jpg
- Item7 - Lego. (n.d.). Item7. https://www.lego.com/cdn/cs/set/assets/blt0b2057b44f21d3bb/21051.jpg?fit=bounds&format=jpg&quality=80&width=1600&height=1600&dpr=1
- Item8 - Lego. (n.d.). Item8. https://www.lego.com/cdn/cs/set/assets/blt6b245e151cedec52/21057.png?fit=bounds&format=png&width=1600&height=1600&dpr=1
- Item9 - Lego. (n.d.). Item9. https://www.lego.com/cdn/cs/set/assets/blte43eb44c1411b445/21028.jpg?fit=bounds&format=jpg&quality=80&width=1600&height=1600&dpr=1
- Item10 - Lego. (n.d.). Item10. https://www.lego.com/cdn/cs/set/assets/bltfd3e8e59d950ac57/21044.jpg?fit=bounds&format=jpg&quality=80&width=1600&height=1600&dpr=1
- Item11 - Lego. (n.d.). Item11. https://www.lego.com/cdn/cs/set/assets/blt98d7ba0b6a8b2997/21034.jpg?fit=bounds&format=jpg&quality=80&width=1600&height=1600&dpr=1
- Item12 - Lego. (n.d.). Item12. https://www.lego.com/cdn/cs/set/assets/blt10cbc9ffc0459599/21056.jpg?fit=bounds&format=jpg&quality=80&width=1600&height=1600&dpr=1
- Item13 - Lego. (n.d.). Item13. https://www.lego.com/cdn/cs/set/assets/blt86423e4ec25d4312/10276.jpg?fit=bounds&format=jpg&quality=80&width=1600&height=1600&dpr=1
- Item14 - Lego. (n.d.). Item14. https://www.lego.com/cdn/cs/set/assets/bltd3bf7710d31e0526/40497.jpg?fit=bounds&format=webply&quality=80&width=800&height=800&dpr=1
- Item15 - Lego. (n.d.). Item15. https://www.lego.com/cdn/cs/set/assets/bltffa1c8fb04838837/40544.png?fit=bounds&format=webply&quality=80&width=800&height=800&dpr=1
- Item16 - Lego. (n.d.). Item16. https://www.lego.com/cdn/cs/set/assets/bltc4564e8d80a842a8/40469.jpg?fit=bounds&format=webply&quality=80&width=800&height=800&dpr=1
- Item17 - Lego. (n.d.). Item17. https://www.lego.com/cdn/cs/set/assets/blt3b8cfa51af241104/40468.jpg?fit=bounds&format=webply&quality=80&width=800&height=800&dpr=1

- Bonsai - Lego. (n.d.). Bonsai Set. https://www.lego.com/cdn/cs/set/assets/blt326a7116fcba7be1/10281.jpg?fit=bounds&format=webply&quality=80&width=528&height=528&dpr=1
- Plant - Lego. (n.d.). Plant. https://www.lego.com/cdn/cs/set/assets/blt8c48d3acf78f70fc/10289.jpg?fit=bounds&format=webply&quality=80&width=528&height=528&dpr=1
- Flowers - Lego. (n.d.). Flowers. https://www.lego.com/cdn/cs/set/assets/blteb721c337ed3052d/40187.jpg?fit=bounds&format=webply&quality=80&width=528&height=528&dpr=1
- Bouquet - Lego. (n.d.). Bouquet. https://www.lego.com/cdn/cs/set/assets/blt8a090b8576daf164/10280.jpg?fit=bounds&format=webply&quality=80&width=528&height=528&dpr=1
- Tulips - Lego. (n.d.). Tulips. https://www.lego.com/cdn/cs/set/assets/blt5633fe2e6f7d1710/40461.jpg?fit=bounds&format=webply&quality=80&width=528&height=528&dpr=1
- Tree House - Lego. (n.d.). Tree House. https://www.lego.com/cdn/cs/set/assets/blt177e3adbf9069c6f/21318.jpg?fit=bounds&format=webply&quality=80&width=320&height=320&dpr=1.5

- 1x2plate1 - Lego. (n.d.). 1x2plate1. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/362301.jpg
- 1x2plate2 - Lego. (n.d.). 1x2plate2. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/362321.jpg
- 1x2plate3 - Lego. (n.d.). 1x2plate3. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/362324.jpg
- 1x2plate4 - Lego. (n.d.). 1x2plate4. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/362323.jpg

- 2x2brick1 - Lego. (n.d.). 2x2brick1. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/300301.jpg
- 2x2brick2 - Lego. (n.d.). 2x2brick2. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/300321.jpg
- 2x2brick3 - Lego. (n.d.). 2x2brick3. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/4153825.jpg
- 2x2brick4 - Lego. (n.d.). 2x2brick4. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/300328.jpg
- 2x2brick5 - Lego. (n.d.). 2x2brick5. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/4296785.jpg

- 2x6plate1 - Lego. (n.d.). 2x6plate1. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/379501.jpg
- 2x6plate2 - Lego. (n.d.). 2x6plate2. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/379521.jpg
- 2x6plate3 - Lego. (n.d.). 2x6plate3. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/379523.jpg
- 2x6plate4 - Lego. (n.d.). 2x6plate4. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/379524.jpg

- roof1 - Lego. (n.d.). roof1. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/303901.jpg
- roof2 - Lego. (n.d.). roof2. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/303921.jpg
- roof3 - Lego. (n.d.). roof3. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/303926.jpg
- roof4 - Lego. (n.d.). roof4. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/4118828.jpg

- 2x2plate1 - Lego. (n.d.). 2x2plate1. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/302201.jpg
- 2x2plate2 - Lego. (n.d.). 2x2plate2. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/302221.jpg
- 2x2plate3 - Lego. (n.d.). 2x2plate3. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/302224.jpg
- 2x2plate4 - Lego. (n.d.). 2x2plate4. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/302226.jpg
- 2x2plate5 - Lego. (n.d.). 2x2plate5. https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/302223.jpg

## Code reference

- AddSetItems and AddFavSetItems function - Code Explained. (n.d.). Create a Shopping Cart With Vanilla JavaScript | ES6 [Video]. YouTube. https://www.youtube.com/watch?v=UcrypywtAm0
- Auth0.js - Portsoc. (n.d.). Portsoc/auth0-example. GitHub. https://github.com/portsoc/auth0-example