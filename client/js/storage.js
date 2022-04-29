import { createBasketContent, createFavContent } from './pageContentMaker.js';

let tempArr = [];
let tempFavArr = [];

async function loadBricks() {
  const response = await fetch('/bricks');
  if (response.ok) {
    const data = await response.json();
    const cartBtn = document.querySelectorAll('.addToBasketButton-class');
    for (let i = 0; i < cartBtn.length; i++) {
      cartBtn[i].addEventListener('click', () => {
        getExistingCart();
        addSetItems(data, data[i].id, data[i]);
        addCartNumbers(data[i]);
        updateBasketNum();
      });
    }

    const favBtn = document.querySelectorAll('.add-favourites-btn-class');
    for (let i = 0; i < favBtn.length; i++) {
      favBtn[i].addEventListener('click', () => {
        getExistingFavCart();
        addFavSetItems(data, data[i].id, data[i]);
        addFavCartNumbers(data[i]);
      });
    }
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
    return tempArr;
  }
}

// Reference: Code Explained. (n.d.). Create a Shopping Cart With Vanilla JavaScript | ES6 [Video]. YouTube. https://www.youtube.com/watch?v=UcrypywtAm0
function addSetItems(itemArray, itemID, item) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  console.log(cartItems);

  if (tempArr.some((selectedItem) => selectedItem.id === itemID)) {
    const itemIndex = tempArr.findIndex(key => key.id === item.id);
    if (tempArr[itemIndex].stock > tempArr[itemIndex].inCart) {
      tempArr[itemIndex].inCart += 1;
    } else { alert(`You have reached the limit. We only have ${tempArr[itemIndex].stock} ${tempArr[itemIndex].name} in stock sorry.`); }
  } else {
    const selectedItem = itemArray.find((item) => item.id === itemID);
    tempArr.push({ ...selectedItem, inCart: 1 });
  }
  localStorage.setItem('productsInCart', JSON.stringify(tempArr));
  addTotalCost();
}

function addCartNumbers() {
  let productNumbers = localStorage.getItem('productsInCart');
  productNumbers = JSON.parse(productNumbers);

  // If productNumbers exist
  if (productNumbers) {
    localStorage.setItem('cartQty', productNumbers.length);
    document.querySelector('.basket span').textContent = productNumbers.length;
  }
  // If there is no products beforehand
  else {
    localStorage.setItem('cartQty', 1);
    document.querySelector('.basket span').textContent = 1;
  }
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

function updateBasketNum() {
  let productNumbers = localStorage.getItem('productsInCart');
  productNumbers = JSON.parse(productNumbers);

  if (productNumbers) {
    document.querySelector('.basket span').textContent = productNumbers.length;
  }
  const addFavNumbers = localStorage.getItem('favQty');
  if (addFavNumbers) {
    document.querySelector('.favourites span').textContent = addFavNumbers;
  }
}

function getExistingFavCart() {
  let favItems = localStorage.getItem('productsInFav');
  favItems = JSON.parse(favItems);
  // If theres something in cart items
  if (favItems !== null) {
    tempFavArr = favItems;
  }
}

// Puts favourite items into an array of objects
// Reference: Code Explained. (n.d.). Create a Shopping Cart With Vanilla JavaScript | ES6 [Video]. YouTube. https://www.youtube.com/watch?v=UcrypywtAm0
function addFavSetItems(itemArray, itemID, item) {
  let favItems = localStorage.getItem('productsInFav');
  favItems = JSON.parse(favItems);
  console.log(favItems);

  if (tempFavArr.some((selectedItem) => selectedItem.id === itemID)) {
    const itemIndex = tempFavArr.findIndex(key => key.id === item.id);
    tempFavArr[itemIndex].inCart = 1;
  } else {
    const selectedItem = itemArray.find((item) => item.id === itemID);
    tempFavArr.push({ ...selectedItem, inCart: 1 });
  }
  localStorage.setItem('productsInFav', JSON.stringify(tempFavArr));
}

function addFavCartNumbers() {
  let productNumbers = localStorage.getItem('productsInFav');
  productNumbers = JSON.parse(productNumbers);

  // If productNumbers exist
  if (productNumbers) {
    localStorage.setItem('favQty', productNumbers.length);
    document.querySelector('.favourites span').textContent = productNumbers.length;
  }
  // If there is no products beforehand
  else {
    localStorage.setItem('favtQty', 1);
    document.querySelector('.favourites span').textContent = 1;
  }
}

function init() {
  loadBricks();
  updateBasketNum();
  createBasketContent();
  createFavContent();
}

init();

export { addSetItems, addCartNumbers, addTotalCost, updateBasketNum };
