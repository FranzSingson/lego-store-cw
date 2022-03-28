import { bricks } from './bricks.mjs';

const carts = document.querySelectorAll('.addToBasketButton-class');

function init1() {
  for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
      // console.log(bricks[i]);
      cartNumbers(bricks[i]);
      totalCost(bricks[i]);
    });
  }
}

function updateBasketNum() {
  const productNumbers = localStorage.getItem('cartQty');
  if (productNumbers) {
    document.querySelector('.basket span').textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem('cartQty');

  productNumbers = parseInt(productNumbers);
  console.log(productNumbers);

  // If productNumbers exist
  if (productNumbers) {
    localStorage.setItem('cartQty', productNumbers + 1);
    document.querySelector('.basket span').textContent = productNumbers + 1;
  }
  // If there is products beforehand
  else {
    localStorage.setItem('cartQty', 1);
    document.querySelector('.basket span').textContent = 1;
  }
  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.name] === undefined) {
      cartItems = {
        ...cartItems,
        [product.name]: product,
      };
    }
    cartItems[product.name].inCart += 1;
  } else {
    product.inCart = 1;

    cartItems = {
      [product.name]: product,
    };
  }
  localStorage.setItem('productsInCart', JSON.stringify(cartItems));
  // plusBtn(product)
  console.log('my cartItems are', cartItems);
}

function totalCost(product) {
  let cartCost = localStorage.getItem('totalCost');

  //   Use parseFloat instead of parseInt as we have decimal.
  console.log(typeof cartCost);

  if (cartCost != null) {
    cartCost = parseFloat(cartCost);
    console.log('My CartCost is ', cartCost);
    localStorage.setItem('totalCost', cartCost + product.price);
  } else {
    localStorage.setItem('totalCost', product.price);
  }
}


// createBasketContent has to be here
createBasketContent();
// plusBtn();
// init1();


function quantityButtons() {
  // Plus button
  const plusProducts = document.querySelectorAll('.plus-btn');
  for (let i = 0; i < plusProducts.length; i++) {
    plusProducts[i].addEventListener('click', () => {
      // console.log(bricks[i]);
      cartNumbers(bricks[i]);
      totalCost(bricks[i]);
    });
  }

  // Subtract buttton#
  const subtractProducts = document.querySelectorAll('.subtract-btn');
  for (let i = 0; i < subtractProducts.length; i++) {
    subtractProducts[i].addEventListener('click', () => {
      // console.log(bricks[i]);
      cartNumbers2(bricks[i]);
      totalCost2(bricks[i]);
    });
  }
}

function cartNumbers2(product) {
  let productNumbers = localStorage.getItem('cartQty');

  productNumbers = parseInt(productNumbers);
  console.log(productNumbers);

  // If productNumbers exist
  if (productNumbers) {
    localStorage.setItem('cartQty', productNumbers - 1);
    document.querySelector('.basket span').textContent = productNumbers - 1;
  }
  // If there is products beforehand
  else {
    localStorage.setItem('cartQty', 1);
    document.querySelector('.basket span').textContent = 1;
  }
  setItems2(product);
}

function setItems2(product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.name] === undefined) {
      cartItems = {
        ...cartItems,
        [product.name]: product,
      };
    }
    cartItems[product.name].inCart -= 1;
  } else {
    product.inCart = 1;

    cartItems = {
      [product.name]: product,
    };
  }
  localStorage.setItem('productsInCart', JSON.stringify(cartItems));
  // plusBtn(product)
  console.log('my cartItems are', cartItems);
}

function totalCost2(product) {
  let cartCost = localStorage.getItem('totalCost');

  //   Use parseFloat instead of parseInt as we have decimal.
  console.log(typeof cartCost);

  if (cartCost != null) {
    cartCost = parseFloat(cartCost);
    console.log('My CartCost is ', cartCost);
    localStorage.setItem('totalCost', cartCost - product.price);
  } else {
    localStorage.setItem('totalCost', product.price);
  }
}

/* Notes
Atm, + and - button works but needs the page to be refreshed to update the createBasketContent page
When Quantity is 1 and negative button is pressed, it should remove the prodcut from the page. Therefore update local storage.
*/


function createBasketContent() {
  let basketItems = localStorage.getItem('productsInCart');
  basketItems = JSON.parse(basketItems);
  const productContainer = document.querySelector('.products-container');

  const cartCost = localStorage.getItem('totalCost');

  if (basketItems && productContainer) {
    productContainer.innerHTML = '';
    productContainer.innerHTML += `
    <div class="basketTotalContainer">
        <h4 class="basketTotal">Your Total is: £${cartCost}</h4>
    `;
    Object.values(basketItems).map(item => {
      productContainer.innerHTML += `
        <div class="product" id="${item.name}" >
        <span>${item.name} for £${item.price}</span>
        <img src="${item.imgSrc}">
        <button class="subtract-btn" type="button">-</button>
        <span>Quantity: ${item.inCart}</span>
        <button class="plus-btn" type="button">+</button>
        <button id="remove-button" type="button">Remove Product</button>
        <span>£${item.inCart * item.price}</span>
        </div>

        `;
    });
  }
  // removeObject(basketItems);
  // console.log(bask)
}

init1();
updateBasketNum();
quantityButtons();
