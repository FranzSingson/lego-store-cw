// import { bricks } from './bricks.mjs';


async function loadBricks() {
  const response = await fetch('/bricks')
  if (response.ok) {
    const data = await response.json();
    const carts = document.querySelectorAll('.addToBasketButton-class');
    for (let i = 0; i < carts.length; i++) {
      carts[i].addEventListener('click', () => {
        // console.log(bricks[i]);
        addSetItems(data[i]);
        addCartNumbers(data[i]);
        addTotalCost(data[i]);
        updateBasketNum();
      });
    }

    const favBtn = document.querySelectorAll('.add-favourites-btn-class');
    for (let i = 0; i < favBtn.length; i++) {
      favBtn[i].addEventListener('click', () => {
        addFavNumbers(data[i]);
      });
    }
  } else {
    console.log("not working")
  }
}

// const carts = document.querySelectorAll('.addToBasketButton-class');
// for (let i = 0; i < carts.length; i++) {
//   carts[i].addEventListener('click', () => {
//     // console.log(bricks[i]);
//     addSetItems(bricks[i]);
//     addCartNumbers(bricks[i]);
//     addTotalCost(bricks[i]);
//     updateBasketNum();
//   });
// }


// Function called outside
function updateBasketNum() {
  let productNumbers = localStorage.getItem('productsInCart');
  productNumbers = JSON.parse(productNumbers);

  if (productNumbers) {
    document.querySelector('.basket span').textContent = productNumbers.length;
  }
  const addFavNumbers = localStorage.getItem('favQty');
  if (addFavNumbers) {
    document.querySelector('.favourites span').textContent = addFavNumbers;
  }
}

// Function called by global loop
function addCartNumbers() {
  let productNumbers = localStorage.getItem('productsInCart');
  productNumbers = JSON.parse(productNumbers);
  console.log(productNumbers);
  // If productNumbers exist
  if (productNumbers) {
    localStorage.setItem('cartQty', productNumbers.length);
    document.querySelector('.basket span').textContent = productNumbers.length;
  }
  // If there is no products beforehand
  else {
    localStorage.setItem('cartQty', 1);
    document.querySelector('.basket span').textContent = 1;
  }
}

// Function called by another function
function addSetItems(product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  let tempArr = [];

  if (cartItems != null) {
    tempArr = cartItems;
    tempArr.push(product);
    duplicateCheck(tempArr, cartItems);
  } else {
    console.log('cart is empty so we add', product);
    product.inCart = 1;
    tempArr.push(product);
    localStorage.setItem('productsInCart', JSON.stringify(tempArr));
  }

  // let tempArr1 = [];
  // tempArr1 = cartItems;
  // for (const basketItem of tempArr1) {
  //   basketItem.inCart = 1;
  // }
  // localStorage.setItem('productsInCart', JSON.stringify(tempArr1));
}

// This function removes object duplicates in the tempArr
// https://stackoverflow.com/questions/40303637/how-to-add-non-duplicate-objects-in-an-array-in-javascript
function duplicateCheck(array) {
  const result = array.filter(function (e) {
    const key = Object.keys(e).map(k => e[k]).join('|');
    if (!this[key]) {
      this[key] = true;
      return true;
    }
  }, {});
  for (const basketItem of result) {
    basketItem.inCart = 1;
  }
  localStorage.setItem('productsInCart', JSON.stringify(result));
}

// Function called by global loop
function addTotalCost() {
  const basketItems = JSON.parse(localStorage.getItem('productsInCart'));

  if (basketItems != null) {
    let totalCost = 0;
    for (const basketItem of basketItems) {
      totalCost += basketItem.price;
      localStorage.setItem('totalCost', totalCost);
    }
  } else {
    localStorage.setItem('totalCost', basketItems[0].price);
  }
}

function createBasketContent() {
  let basketItems = localStorage.getItem('productsInCart');
  basketItems = JSON.parse(basketItems);

  const productContainer = document.querySelector('.basket-products-container');

  const cartCost = localStorage.getItem('totalCost');

  if (basketItems && productContainer) {
    // Empty the page first
    productContainer.innerHTML = '';
    // After being empty, create the elements
    productContainer.innerHTML += `
    <div class="basketTotalContainer">
        <h4 class="basketTotal">Your Total is: £${cartCost}</h4>
        <button class="clear-basket-btn">Clear Basket</button>
        <button class="next-basket-btn">Next</button>
    </div>
    `;
    // Appends new products to the page
    Object.values(basketItems).map(lego => {
      productContainer.innerHTML += `
        <div class="product" id="${lego.name}" >
        <span>${lego.name} for £${lego.price}</span>
        <img style = "height: 25vh;" src="${lego.imgSrc}">
        <button class="subtract-btn" type="button">-</button>
        <span class="qty-span">${lego.inCart}</span>
        <button class="plus-btn" type="button">+</button>
        <button class="remove-btn" type="button">Remove Product</button>
        <span class="qty-x-price">£${lego.inCart * lego.price}</span>
        </div>
        `;
    });
  }
}

// Stores favourites quantity
function addFavNumbers(product) {
  let productNumbers = localStorage.getItem('favQty');

  productNumbers = parseInt(productNumbers);
  // console.log(productNumbers);

  // If productNumbers exist
  if (productNumbers) {
    localStorage.setItem('favQty', productNumbers + 1);
    document.querySelector('.favourites span').textContent = productNumbers + 1;
  }
  // If there is no products beforehand
  else {
    localStorage.setItem('favQty', 1);
    document.querySelector('.favourites span').textContent = 1;
  }
  addFavItems(product);
}

// Stores item in productsInFav
function addFavItems(product) {
  let favItems = localStorage.getItem('productsInFav');
  favItems = JSON.parse(favItems);

  if (favItems != null) {
    if (favItems[product.name] === undefined) {
      favItems = {
        ...favItems,
        [product.name]: product,
      };
    }
    favItems[product.name].inCart += 1;
  } else {
    product.inCart = 1;

    favItems = {
      [product.name]: product,
    };
  }
  localStorage.setItem('productsInFav', JSON.stringify(favItems));
  // plusBtn(product)
  console.log('my favItems are', favItems);
}

function createFavContent() {
  let favItems = localStorage.getItem('productsInFav');
  favItems = JSON.parse(favItems);
  const productContainer = document.querySelector('.fav-products-container');

  if (favItems && productContainer) {
    // Empty the page first
    productContainer.innerHTML = '';
    // After being empty, create the elements
    productContainer.innerHTML += `
    <div class="basketTotalContainer">
        <button class="clear-fav-btn">Clear Favourites</button>
    </div>
    `;
    // Appends new products to the page
    Object.values(favItems).map(lego => {
      productContainer.innerHTML += `
        <div class="product" id="${lego.name}" >
        <span>${lego.name} for £${lego.price}</span>
        <img src="${lego.imgSrc}">
        <button class="" type="button">-</button>
        <span class="qty-span">${lego.inCart}</span>
        <button class="" type="button">+</button>
        <button class="remove-btn" type="button">Remove Product</button>
        <span class="qty-x-price">£${lego.inCart * lego.price}</span>
        </div>
        `;
    });
  }
}


loadBricks();
updateBasketNum();
createBasketContent();
createFavContent();

// Uncomment this for it to work
// clearFavList();


/*
Atm clearFavList works but + and - button does not work with it.
Still need to work on remove product button
Start on payment page
Add more lego bricks
*/
export { addCartNumbers, addSetItems, addTotalCost, createBasketContent };
