import { bricks } from './bricks.mjs';

const carts = document.querySelectorAll('.addToBasketButton-class');


for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    // console.log(bricks[i]);
    cartNumbers(bricks[i]);
    totalCost(bricks[i]);
  });
}

function onLoadCartNumbers() {
  const productNumbers = localStorage.getItem('cartNumbers');

  if (productNumbers) {
    document.querySelector('.basket span').textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.basket span').textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.basket span').textContent = 1;
  }
  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  //   console.log('my cartItems are', cartItems);

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
}


function totalCost(product) {
  let cartCost = localStorage.getItem('totalCost');

  //   Use parseFloat instead of parseInt as we have decimal.
  console.log('My CartCost is ', cartCost);
  console.log(typeof cartCost);

  if (cartCost != null) {
    cartCost = parseFloat(cartCost);
    localStorage.setItem('totalCost', cartCost + product.price);
  } else {
    localStorage.setItem('totalCost', product.price);
  }
}


function showBasket() {
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
        <div class="product">
        <span>${item.name} for £${item.price}</span>
        <img src="${item.imgSrc}">
        <button type="button">Add one</button>
        <span>Quantity: ${item.inCart}</span>
        <button type="button">Delete one</button>
        <button type="button">Remove Product</button>
        <span>£${item.inCart * item.price}</span>
        </div>

        `;
    });
  }
}


onLoadCartNumbers();
showBasket();
