import { bricks } from './bricks.mjs';
import { addCartNumbers, addTotalCost } from './storage.js';

function quantityButtons() {
  // Plus button
  const plusProducts = document.querySelectorAll('.plus-btn');
  for (let i = 0; i < plusProducts.length; i++) {
    plusProducts[i].addEventListener('click', () => {
      for (const brick of bricks) {
        if (brick.name === plusProducts[i].parentElement.id) {
          addCartNumbers(brick);
          addTotalCost(brick);
          updateBasket(plusProducts[i]);
        }
      }
    });
  }

  // Subtract buttton
  const subtractProducts = document.querySelectorAll('.subtract-btn');
  for (let i = 0; i < subtractProducts.length; i++) {
    subtractProducts[i].addEventListener('click', () => {
      // console.log(bricks[i]);
      for (const brick of bricks) {
        if (brick.name === plusProducts[i].parentElement.id) {
          subCartNumbers(brick);
          subTotalCost(brick);
          updateBasket(subtractProducts[i]);
        }
      }
    });
  }
}

function subCartNumbers(product) {
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
  subSetItems(product);
}

// This minus' 1 in inCart of product
function subSetItems(product) {
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

// This minus' product price from total cost
function subTotalCost(product) {
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

// Clears the basket
function clearBasket() {
  const container = document.querySelector('.basket-products-container');
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

function removeBtn() {
  const removeBtns = document.querySelectorAll('.remove-btn');
  let basketItems = JSON.parse(localStorage.getItem('productsInCart'));


  for (let i = 0; i < removeBtns.length; i++) {
    removeBtns[i].addEventListener('click', () => {
      // testing2(bricks[i]);
      const brickNum = removeBtns[i].parentElement.id
      // console.log(basketItems);
      // console.log(brickNum)
      // temp.push(basketItems)
      // const brickNum = "brick0"

      // console.log(...brickNum)
      let tempArr;
      const cartItems = Object.values(basketItems);
      tempArr = cartItems;

      // console.log(brickNum)
      for (let i = 0; i < tempArr.length; i++) {
        // console.log(temp[i].name)
        if (brickNum == tempArr[i].name) {
          // console.log("arr before", tempArr)
          // tempArr.splice(i, 1)
          // console.log("Arr after", tempArr)
          console.log(brickNum)
          // localStorage.setItem('productsInCart', JSON.stringify(tempArr));
        }
      }
    });
  }
}

// Notes, if array[i].name is equal to brick10, then remove that index and update the array
// Set the array as the new localStorage cart

function testing2() {
  const basketItems = JSON.parse(localStorage.getItem('productsInCart'));

  // const brickNum
  console.log(basketItems);
}

// updateBasket();
quantityButtons();
clearBasket();
removeBtn();
