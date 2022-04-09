import { bricks } from './bricks.mjs';
import { createBasketContent } from './storage.js';

function quantityButtons() {
  // Plus button
  const plusProducts = document.querySelectorAll('.plus-btn');
  for (let i = 0; i < plusProducts.length; i++) {
    plusProducts[i].addEventListener('click', () => {
      for (const brick of bricks) {
        if (brick.name === plusProducts[i].parentElement.id) {
          addOne(brick, plusProducts[i].parentElement.id);
          updateBasketPageTotal();
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
          subOne(brick, plusProducts[i].parentElement.id);
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
      console.log(tempArr[i].inCart)
      if (tempArr[i].inCart === 1) {
        if (tempArr.length === 1) { // If there is one product left in the basketItems array with quantity of 1
          removeFromLocalStorage(elemId)
          localStorage.clear();
          makeEmptyBasketContent();
        } else {
          console.log(elemId)
          removeFromLocalStorage(elemId)
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
    removeBtn[i].addEventListener('click', e => {
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
      if (tempArr.length === 1) { //When the product is the last item in the basket and user presses remove product button)
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
    localStorage.clear();
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

quantityButtons();
removeProduct();
clearBasket();

// Issues atm, when I added brick0 in the cart, and click add to cart on brick0 again, it will be added, find solution for this
// It will only be fixed once a new item is selected and therefore replacing the last item in the array
// cartQty is also bugged when you add to basket a brick twice.
// Note for future self, when inCart is 0, call fucntion remove product.
