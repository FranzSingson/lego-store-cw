import { bricks } from './bricks.mjs';

const carts = document.querySelectorAll('.addToBasketButton-class');


for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    // console.log(bricks[i]);
    addCartNumbers(bricks[i]);
    addTotalCost(bricks[i]);
  });
}

// Function called outside
function updateBasketNum() {
  const productNumbers = localStorage.getItem('cartQty');
  if (productNumbers) {
    document.querySelector('.basket span').textContent = productNumbers;
  }
}

updateBasketNum();

// Function called by global loop
function addCartNumbers(product) {
  let productNumbers = localStorage.getItem('cartQty');

  productNumbers = parseInt(productNumbers);
  // console.log(productNumbers);

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
  addSetItems(product);
}

// Function called by another function
function addSetItems(product) {
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
function addTotalCost(product) {
  let cartCost = localStorage.getItem('totalCost');

  //   Use parseFloat instead of parseInt as we have decimal.
  if (cartCost != null) {
    cartCost = parseFloat(cartCost);
    localStorage.setItem('totalCost', cartCost + product.price);
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
        <img src="${lego.imgSrc}">
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

// Clears the basket
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

createBasketContent();
clearBasket();

export { addCartNumbers, addSetItems, addTotalCost };
