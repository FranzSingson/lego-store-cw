// import { clearBasket } from './basketBtnHandlers';


async function loadBricks() {
  const response = await fetch('/bricks');
  if (response.ok) {
    const data = await response.json();
    getCartItems(data);
    displayTotal();
    makeBackToHomeBtn();
  } else {
    console.log('not working');
  }
}


function getCartItems(cartArray) {
  const cartItems = JSON.parse(localStorage.getItem('productsInCart'));
  const totalCost = JSON.parse(localStorage.getItem('totalCost'));
  console.log(cartArray);
  console.log(cartItems);
  console.log(totalCost);
}

function displayTotal() {
  const totalCost = JSON.parse(localStorage.getItem('totalCost'));
  const h3Elem = document.querySelector('#basket-total');
  h3Elem.textContent = `Your total is: £${totalCost}`;
}

function makeBackToHomeBtn() {
  const newDiv = document.createElement('div');
  newDiv.id = 'btn-div';

  const newBtn = document.createElement('button');
  newBtn.id = 'back-to-home';
  newBtn.type = 'button';
  newBtn.textContent = 'Back to home';
  newBtn.addEventListener('click', () => {
    // clearBasket();
    console.log('back');
    localStorage.removeItem('productsInCart');
    localStorage.removeItem('totalCost');
    localStorage.removeItem('cartQty');
    location.href = './index.html';
  });

  newDiv.append(newBtn);
  const parentElem = document.querySelector('#confirmation-body');
  parentElem.append(newDiv);
}


loadBricks();

console.log('we are in paymenthandler');
