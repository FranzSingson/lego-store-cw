import { bricks } from './bricks.mjs';

const carts = document.querySelectorAll('.addToBasketButton-class');


for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    // console.log(bricks[i]);
    cartNumbers(bricks[i]);
    totalCost(bricks[i]);
  });
}

// Function called outside
function updateBasketNum() {
  const productNumbers = localStorage.getItem('cartQty');
  if (productNumbers) {
    document.querySelector('.basket span').textContent = productNumbers;
  }
}

// Function called by global loop
function cartNumbers(product) {
  let productNumbers = localStorage.getItem('cartQty');

  productNumbers = parseInt(productNumbers);
  console.log(productNumbers);

  // If productNumbers exist
  if (productNumbers) {
    localStorage.setItem('cartQty', productNumbers + 1);
    document.querySelector('.basket span').textContent = productNumbers + 1;
  }
  // If there is no products beforehand
  else {
    localStorage.setItem('cartQty', 1);
    document.querySelector('.basket span').textContent = 1;
  }
  setItems(product);
}

// Function called by another function
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

// Function called by global loop
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
  // If there is no products beforehand
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
        <button class="clear-basket-btn">Clear Basket</button>
        <button class="next-basket-btn">Next</button>
    </div>
    `;
    Object.values(basketItems).map(item => {
      productContainer.innerHTML += `
        <div class="product" id="${item.name}" >
        <span>${item.name} for £${item.price}</span>
        <img src="${item.imgSrc}">
        <button class="subtract-btn" type="button">-</button>
        <span class="qty-span">${item.inCart}</span>
        <button class="plus-btn" type="button">+</button>
        <button class="remove-btn" type="button">Remove Product</button>
        <span class="qty-x-price">£${item.inCart * item.price}</span>
        </div>
        `;
    });
  }
  // removeObject(basketItems);
  // console.log(bask)
}

updateBasketNum();
quantityButtons();


// Loop through + buttons
const plusBtn = document.querySelectorAll('.plus-btn');

for (let i = 0; i < plusBtn.length; i++) {
  plusBtn[i].addEventListener('click', () => {
    updateBasket(plusBtn[i]);
    // totalCost(bricks[i]);
  });
}

// Loops through - buttons
const subtractBtn = document.querySelectorAll('.subtract-btn');

for (let i = 0; i < subtractBtn.length; i++) {
  subtractBtn[i].addEventListener('click', () => {
    updateBasket(subtractBtn[i]);
  });
}

function updateBasket(elem) {
  const elemParentId = elem.parentElement.id;

  let basketItems = localStorage.getItem('productsInCart');
  const totalCost = localStorage.getItem('totalCost');
  basketItems = JSON.parse(basketItems);

  // This updates the Quantity
  const spans = document.querySelector(`#${elemParentId} > .qty-span`);
  spans.textContent = basketItems[elemParentId].inCart;

  // This updates the total
  const basketTotalDiv = document.querySelector('.basketTotal');
  basketTotalDiv.textContent = `Your Total is: £${totalCost}`;

  // This will update the Qty x Price
  const qtyTimesPrice = document.querySelector(`#${elemParentId} > .qty-x-price`);
  qtyTimesPrice.textContent = `£${basketItems[elemParentId].inCart * basketItems[elemParentId].price}`;
}


// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// When product is qty zero, make sure it calls the remove button.

// Stuck on remove product button atm

// Loop through Remove Product buttons
const removeProductBtns = document.querySelectorAll('.remove-btn');

for (let i = 0; i < removeProductBtns.length; i++) {
  removeProductBtns[i].addEventListener('click', () => {
    removeProductBtn(removeProductBtns[i]);
  });
}

function removeProductBtn(elem) {
  const temp = [];
  const removeBtn = document.querySelector('.remove-btn');
  const brickId = elem.parentElement.id;

  let basketItems = localStorage.getItem('productsInCart');
  // let totalCost = localStorage.getItem("totalCost")
  basketItems = JSON.parse(basketItems);

  temp.push(basketItems);

  console.log(temp.brickId);
  // console.log(basketItems[brickId]);

  // localStorage.removeItem("productsInCar[brickId])

  // console.log(localStorage)
  console.log(brickId);
}

// Clear Basket button works!
function clearBasket() {
  const container = document.querySelector('.products-container');
  const clearBasketBtn = document.querySelector('.clear-basket-btn');
  clearBasketBtn.addEventListener('click', () => {
    localStorage.clear();

    const productDivs = document.querySelectorAll('.product');
    document.querySelector('.basketTotalContainer').remove();
    for (const productDiv of productDivs) {
      productDiv.remove();
    }
    document.querySelector('.basket span').textContent = 0;

    const h3Elem = document.createElement('h3');
    h3Elem.textContent = 'Your basket is empty at the moment.';
    container.append(h3Elem);
  });
}

clearBasket();
