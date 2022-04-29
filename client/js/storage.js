let tempArr = [];

async function loadBricks() {
  const response = await fetch('/bricks');
  if (response.ok) {
    const data = await response.json();
    const cartBtn = document.querySelectorAll('.addToBasketButton-class');
    for (let i = 0; i < cartBtn.length; i++) {
      cartBtn[i].addEventListener('click', () => {
        // console.log(bricks[i]);
        // getExistingCart();
        // addSetItems(data, data[i].id, data[i]);
        // addCartNumbers(data[i]);
        // // addTotalCost(data[i]);
        // updateBasketNum();
        console.log(getExistingCart());
        getExistingCart();
        addSetItems(data, data[i].id, data[i]);
        addCartNumbers(data[i]);
        // addTotalCost(data[i]);
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

function addSetItems(itemArray, itemID, item) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  console.log(cartItems);
  console.log('Basket', tempArr);

  if (tempArr.some((selectedItem) => selectedItem.id === itemID)) {
    const itemIndex = tempArr.findIndex(key => key.id === item.id);
    if (tempArr[itemIndex].stock > tempArr[itemIndex].inCart) {
      tempArr[itemIndex].inCart += 1;
      console.log('IF HJERE');
    } else { alert(`You have reached the limit. We only have ${tempArr[itemIndex].stock} ${tempArr[itemIndex].name} in stock sorry`) }
  } else {
    console.log('ELSE');
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

// This function removes object duplicates in the tempArr
// https://stackoverflow.com/questions/40303637/how-to-add-non-duplicate-objects-in-an-array-in-javascript
function duplicateCheckCart(array) {
  const result = array.filter(function (e) {
    const key = Object.keys(e).map(k => e[k]).join('|');
    if (!this[key]) {
      this[key] = true;
      return true;
    }
  }, {});
  for (const basketItem of result) {
    if (basketItem.inCart === 0) {
      basketItem.inCart = 1;
    }
    // basketItem.inCart = 1;
  }
  localStorage.setItem('productsInCart', JSON.stringify(result));
}


let tempFavArr = [];
function getExistingFavCart() {
  let favItems = localStorage.getItem('productsInFav');
  favItems = JSON.parse(favItems);
  // If theres something in cart items
  if (favItems !== null) {
    tempFavArr = favItems;
  }
}

// Puts favourite items into an array of objects
function addFavSetItems(itemArray, itemID, item) {
  let favItems = localStorage.getItem('productsInFav');
  favItems = JSON.parse(favItems);
  console.log(favItems);
  console.log('Basket', tempFavArr);

  if (tempFavArr.some((selectedItem) => selectedItem.id === itemID)) {
    const itemIndex = tempFavArr.findIndex(key => key.id === item.id);
    tempFavArr[itemIndex].inCart = 1;
    console.log('IF HJERE');
  } else {
    console.log('ELSE');
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

function createBasketContent() {
  let basketItems = localStorage.getItem('productsInCart');
  basketItems = JSON.parse(basketItems);

  const productContainer = document.querySelector('.basket-products-container');

  const cartCost = localStorage.getItem('totalCost');

  if (basketItems && productContainer) {
    // Empty the page first
    productContainer.innerHTML = '';

    // After being empty, create the elements
    const newDiv = document.createElement('div');
    newDiv.className = 'basketTotalContainer';
    const newh4 = document.createElement('h4');
    newh4.className = 'basketTotal';
    newh4.textContent = `Your cart total is: £${cartCost}`;
    const clearBtn = document.createElement('button');
    clearBtn.className = 'clear-basket-btn';
    clearBtn.textContent = 'Clear Basket';
    const payBtn = document.createElement('button');
    payBtn.id = 'pay-basket-btn';
    payBtn.textContent = 'PAY';
    // payBtn.disabled = true;
    newDiv.append(newh4, clearBtn, payBtn);
    productContainer.append(newDiv);

    // Appends new products to the page
    Object.values(basketItems).map(lego => {
      const parentDiv = document.createElement('div');
      parentDiv.className = 'product';
      parentDiv.id = `${lego.name}`;

      const spanName = document.createElement('span');
      spanName.textContent = `${lego.name}`;
      spanName.className = 'desc-span';

      const imgElem = document.createElement('img');
      imgElem.src = `${lego.imgSrc}`;
      // imgElem.style = 'height: 15vh;';
      imgElem.alt = `Image of ${lego.name}`;

      const subBtn = document.createElement('button');
      subBtn.className = 'subtract-btn';
      subBtn.type = 'button';
      subBtn.textContent = '-';

      const spanQty = document.createElement('span');
      spanQty.className = 'qty-span';
      spanQty.textContent = `${lego.inCart}`;

      const addBtn = document.createElement('button');
      addBtn.className = 'plus-btn';
      addBtn.type = 'button';
      addBtn.textContent = '+';

      const removeBtn = document.createElement('button');
      removeBtn.className = 'remove-btn';
      removeBtn.type = 'button';
      removeBtn.textContent = 'X';

      const spanQtyXPrice = document.createElement('span');
      spanQtyXPrice.className = 'qty-x-price';
      spanQtyXPrice.textContent = `£${lego.inCart * lego.price}`;

      parentDiv.append(imgElem, spanName, subBtn, spanQty, addBtn, spanQtyXPrice, removeBtn);
      productContainer.append(parentDiv);
    });
  }
}

function createFavContent() {
  let favItems = localStorage.getItem('productsInFav');
  favItems = JSON.parse(favItems);
  const productContainer = document.querySelector('.fav-products-container');

  if (favItems && productContainer) {
    // Empty the page first
    productContainer.innerHTML = '';
    // After being empty, create the elements
    const newDiv = document.createElement('div');
    newDiv.className = 'favTotalContainer';

    const clearFavBtn = document.createElement('button');
    clearFavBtn.className = 'clear-fav-btn';
    clearFavBtn.textContent = 'Clear Favourites';
    newDiv.append(clearFavBtn);
    productContainer.append(newDiv);

    // Appends new products to the page
    Object.values(favItems).map(lego => {
      const parentDiv = document.createElement('div');
      parentDiv.className = 'product';
      parentDiv.id = `${lego.id}`;

      const newSpan = document.createElement('span');
      newSpan.className = 'fav-desc-span';
      newSpan.textContent = `${lego.name} for £${lego.price}`;

      const imgElem = document.createElement('img');
      imgElem.src = `${lego.imgSrc}`;
      imgElem.alt = `Image of ${lego.name}`;

      const removeFavbtn = document.createElement('button');
      removeFavbtn.type = 'button';
      removeFavbtn.className = 'remove-fav-btn';
      removeFavbtn.textContent = 'X';

      // This buttons add to cart from favourites
      const addToCartBtn = document.createElement('button');
      addToCartBtn.type = 'button';
      addToCartBtn.className = 'add-cart-btn';

      if (lego.stock < 1) {
        addToCartBtn.textContent = 'Out of stock';
        addToCartBtn.disabled = true;
        parentDiv.append(imgElem, newSpan, removeFavbtn, addToCartBtn);
        productContainer.append(parentDiv);
      } else {
        addToCartBtn.textContent = 'Add to basket';
        parentDiv.append(imgElem, newSpan, removeFavbtn, addToCartBtn);
        productContainer.append(parentDiv);
      }
    });
  }
}

function init() {
  loadBricks();
  updateBasketNum();
  createBasketContent();
  createFavContent();
}

init();

export { addSetItems, addCartNumbers, addTotalCost, updateBasketNum, duplicateCheckCart, createBasketContent };
