// import { clearBasket } from './basketBtnHandlers';


async function loadBricks() {
  const response = await fetch('/bricks');
  if (response.ok) {
    const data = await response.json();
    displayTotal();
    makeBackToHomeBtn();
    updateStock()
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

async function updateStock() {
  const boughtItems = JSON.parse(localStorage.getItem('productsBought'));
  // console.log(cartArray);
  localStorage.setItem('productsBought', JSON.stringify(boughtItems));
  for (const cartItem of boughtItems) {
    console.log(cartItem.id, cartItem.inCart)
    const id = cartItem.id;
    const payload = cartItem;

    console.log('Payload', payload)
    const response = await fetch(`/bricks/bought/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const cart = await response.json();
    } else {
      console.log('failed to send product', response);
    }
  }
}



loadBricks();

