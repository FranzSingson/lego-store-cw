// import { clearBasket } from './basketBtnHandlers';


async function loadBricks() {
  const response = await fetch('/bricks');
  if (response.ok) {
    const data = await response.json();
    updateStock(data)
    displayTotal();
    makeBackToHomeBtn();
  } else {
    console.log('not working');
  }
}

function displayTotal() {
  const totalCost = JSON.parse(localStorage.getItem('totalCost'));
  const h3Elem = document.querySelector('#basket-total');
  h3Elem.textContent = `Total: £${totalCost}`;
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

function updateStock() {
  const cartItems = JSON.parse(localStorage.getItem('productsInCart'));
  // console.log(cartArray);
  localStorage.setItem('productsBought', JSON.stringify(cartItems));
  for (const cartItem of cartItems) {
    console.log(cartItem.id, cartItem.inCart)
    // updateDbStock(cartItem.id, cartItem.inCart);
  }

}


loadBricks();

