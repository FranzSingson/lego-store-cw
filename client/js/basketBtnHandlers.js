// import { bricks } from './bricks.mjs';
import { createBasketContent } from './storage.js';

async function loadBricks() {
  const response = await fetch('/bricks');
  if (response.ok) {
    const data = await response.json();
    quantityButtons(data);
  } else {
    console.log('not working');
  }
}

// The only way to add/sub product quantity is in the basket.html page
function quantityButtons(dataArray) {
  // Plus button
  const plusBtn = document.querySelectorAll('.plus-btn');
  for (let i = 0; i < plusBtn.length; i++) {
    plusBtn[i].addEventListener('click', () => {
      for (const brick of dataArray) {
        if (brick.name === plusBtn[i].parentElement.id) {
          addOne(brick, plusBtn[i].parentElement.id);
          updateBasketPageTotal();
        }
      }
    });
  }

  // Subtract buttton
  const subtractBtn = document.querySelectorAll('.subtract-btn');
  for (let i = 0; i < subtractBtn.length; i++) {
    subtractBtn[i].addEventListener('click', () => {
      for (const brick of dataArray) {
        if (brick.name === subtractBtn[i].parentElement.id) {
          subOne(brick, subtractBtn[i].parentElement.id);
          updateBasketPageTotal();
        }
      }
    });
  }
}

function addOne(item, elemId) {
  const basketItems = JSON.parse(localStorage.getItem('productsInCart'));
  const totalCost = JSON.parse(localStorage.getItem('totalCost'));

  let tempArr = [];
  tempArr = basketItems;
  for (let i = 0; i < tempArr.length; i++) {
    if (tempArr[i].name === item.name) {
      // tempArr[i].inCart += 1;
      tempArr[i].inCart += 1;
      localStorage.setItem('totalCost', totalCost + item.price);

      // This will update the QTY span
      const qtySpan = document.querySelector(`#${elemId} > .qty-span`);
      qtySpan.textContent = tempArr[i].inCart;
      // This will update the qty x price span
      const qtyTimesPrice = document.querySelector(`#${elemId} > .qty-x-price`);
      qtyTimesPrice.textContent = `£${tempArr[i].inCart * tempArr[i].price}`;
    }
  }
  localStorage.setItem('productsInCart', JSON.stringify(tempArr));
}

function subOne(item, elemId) {
  const basketItems = JSON.parse(localStorage.getItem('productsInCart'));
  const totalCost = JSON.parse(localStorage.getItem('totalCost'));

  let tempArr = [];
  tempArr = basketItems;
  for (let i = 0; i < tempArr.length; i++) {
    if (tempArr[i].name === item.name) {
      console.log(tempArr[i].inCart);
      if (tempArr[i].inCart === 1) {
        if (tempArr.length === 1) { // If there is one product left in the basketItems array with quantity of 1
          removeFromLocalStorage(elemId);
          localStorage.clear();
          makeEmptyBasketContent();
        } else {
          console.log(elemId);
          removeFromLocalStorage(elemId);
          // clearBasket();
        }
      } else {
        // tempArr[i].inCart += 1;
        tempArr[i].inCart -= 1;
        localStorage.setItem('totalCost', totalCost - item.price);

        // This will update the QTY span
        const qtySpan = document.querySelector(`#${elemId} > .qty-span`);
        qtySpan.textContent = tempArr[i].inCart;
        // This will update the qty x price span
        const qtyTimesPrice = document.querySelector(`#${elemId} > .qty-x-price`);
        qtyTimesPrice.textContent = `£${tempArr[i].inCart * tempArr[i].price}`;
        localStorage.setItem('productsInCart', JSON.stringify(tempArr));
      }
    }
  }
}

function updateBasketPageTotal() {
  const totalCost = JSON.parse(localStorage.getItem('totalCost'));
  const basketTotalDiv = document.querySelector('.basketTotal');
  basketTotalDiv.textContent = `Your Total is: £${totalCost}`;
}

function removeProduct() {
  const removeBtn = document.querySelectorAll('.remove-btn');
  for (let i = 0; i < removeBtn.length; i++) {
    const parentId = removeBtn[i].parentElement.id;
    removeBtn[i].addEventListener('click', () => {
      removeFromLocalStorage(parentId);
      createBasketContent();
    });
  }
}

function removeFromLocalStorage(id) {
  const basketItems = JSON.parse(localStorage.getItem('productsInCart'));
  const totalCost = JSON.parse(localStorage.getItem('totalCost'));

  console.log(basketItems);

  let tempArr = [];
  tempArr = basketItems;
  for (let i = 0; i < tempArr.length; i++) {
    if (tempArr[i].name === id) {
      if (tempArr.length === 1) { // When the product is the last item in the basket and user presses remove product button)
        localStorage.clear();
        makeEmptyBasketContent();
      } else {
        console.log(basketItems[i]);
        const qtyXprice = basketItems[i].inCart * basketItems[i].price;
        tempArr.splice([i], 1);
        localStorage.setItem('totalCost', totalCost - qtyXprice);
        localStorage.setItem('productsInCart', JSON.stringify(tempArr));
      }
    }
  }
  location.reload();
}

function clearBasket() {
  const clearBasketBtn = document.querySelector('.clear-basket-btn');
  clearBasketBtn.addEventListener('click', () => {
    // const favItems = JSON.parse(localStorage.getItem('productsInFav'));
    // const favQty = JSON.parse(localStorage.getItem('favQty'));
    // localStorage.clear();
    // localStorage.setItem('productsInFav', JSON.stringify(favItems));
    // localStorage.setItem('favQty', favQty);
    localStorage.removeItem('productsInCart')
    localStorage.removeItem('totalCost')
    localStorage.removeItem('cartQty')
    makeEmptyBasketContent();
  });
}

function makeEmptyBasketContent() {
  const container = document.querySelector('.basket-products-container');

  const productDivs = document.querySelectorAll('.product');
  document.querySelector('.basketTotalContainer').remove();
  for (const productDiv of productDivs) {
    productDiv.remove();
  }
  document.querySelector('.basket span').textContent = 0;
  const h3Elem = document.createElement('h3');
  h3Elem.textContent = 'Your basket is empty at the moment.';
  container.append(h3Elem);
}

function nextBtnHandler() {
  document.querySelector('.next-basket-btn').addEventListener('click', () => {
    location.href = './payment.html';
  });
}

loadBricks();
removeProduct();
clearBasket();
nextBtnHandler();
