import { addCartNumbers, updateBasketNum } from './storage.js';

let tempArr = [];

async function loadBricks() {
  const response = await fetch('/bricks');
  if (response.ok) {
    const data = await response.json();
    const btns = document.querySelectorAll('.add-cart-btn');

    for (let i = 0; i < data.length; i++) {
      for (const btn of btns) {
        btn.addEventListener('click', () => {
          const btnIndex = parseInt(btn.parentElement.id);
          if (data[i].id === btnIndex) {
            const legoIndex = btn.parentElement.id;
            console.log(data[legoIndex]);
            getExistingCart();
            favToCart(data, data[legoIndex].id, data[legoIndex]);
            addCartNumbers(data[legoIndex]);
            updateBasketNum();
          }
        });
      }
    }
    console.log('working');
  } else {
    console.log('not working');
  }
}

function getExistingCart() {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  // If theres something in cart items
  if (cartItems !== null) {
    tempArr = cartItems;
  }
}

function favToCart(itemArray, itemID, item) {
  let cartItems = localStorage.getItem('itemsInCart');
  cartItems = JSON.parse(cartItems);
  console.log(cartItems);
  console.log('Basket', tempArr);

  if (tempArr.some((selectedItem) => selectedItem.id === itemID)) {
    const itemIndex = tempArr.findIndex(key => key.id === item.id);
    if (tempArr[itemIndex].stock > tempArr[itemIndex].inCart) {
      tempArr[itemIndex].inCart += 1;
      console.log('IF HJERE');
    } else { alert(`Item already in basket and you have reached the stock limit in your basket. We only have ${tempArr[itemIndex].stock} ${tempArr[itemIndex].name} in stock sorry.`); }
  } else {
    console.log('ELSE');
    const selectedItem = itemArray.find((item) => item.id === itemID);
    tempArr.push({ ...selectedItem, inCart: 1 });
  }
  localStorage.setItem('productsInCart', JSON.stringify(tempArr));
  addTotalCost();
}

function addTotalCost() {
  const basketItems = JSON.parse(localStorage.getItem('productsInCart'));

  if (basketItems != null) {
    let totalCost = 0;
    for (const basketItem of basketItems) {
      const newPrice = basketItem.inCart * basketItem.price;
      totalCost += newPrice;
      localStorage.setItem('totalCost', totalCost);
    }
  } else {
    localStorage.setItem('totalCost', basketItems[0].price);
  }
}

function removeFav() {
  const removeBtn = document.querySelectorAll('.remove-fav-btn');
  for (const btn of removeBtn) {
    const parentId = btn.parentElement.id;
    btn.addEventListener('click', () => {
      removeFromLocalStorage(parentId);
      console.log(parentId);
      // createBasketContent();
    });
  }
}

function removeFromLocalStorage(itemId) {
  const favItems = JSON.parse(localStorage.getItem('productsInFav'));
  const favQty = JSON.parse(localStorage.getItem('favQty'));

  console.log(favItems);
  const productId = parseInt(itemId);
  let tempArr = [];
  tempArr = favItems;
  for (let i = 0; i < tempArr.length; i++) {
    if (tempArr[i].id === productId) {
      if (tempArr.length === 1) { // When the product is the last item in the basket and user presses remove product button)
        localStorage.removeItem('productsInFav');
        localStorage.removeItem('favQty');
        makeEmptyFavContent();
      } else {
        console.log(favItems[i]);
        tempArr.splice([i], 1);
        localStorage.setItem('productsInFav', JSON.stringify(tempArr));
      }
      // const favQty = JSON.parse(localStorage.getItem('favQty'));
      localStorage.setItem('favQty', favQty - 1);
    }
  }
  location.reload();
}

function clearFav() {
  const clearBasketBtn = document.querySelector('.clear-fav-btn');
  clearBasketBtn.addEventListener('click', () => {
    localStorage.removeItem('productsInFav');
    localStorage.removeItem('favQty');
    localStorage.removeItem('favTotalCost');
    makeEmptyFavContent();
  });
}

function makeEmptyFavContent() {
  const container = document.querySelector('.fav-products-container');

  const productDivs = document.querySelectorAll('.product');
  document.querySelector('.favTotalContainer').remove();
  for (const productDiv of productDivs) {
    productDiv.remove();
  }
  document.querySelector('.favourites span').textContent = 0;
  const h3Elem = document.createElement('h3');
  h3Elem.textContent = 'Your Favourites is empty at the moment.';
  container.append(h3Elem);
}

function init() {
  loadBricks();
  removeFav();
  clearFav();
}

init();
