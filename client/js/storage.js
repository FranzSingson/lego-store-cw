
async function loadBricks() {
  const response = await fetch('/bricks')
  if (response.ok) {
    const data = await response.json();
    const carts = document.querySelectorAll('.addToBasketButton-class');
    for (let i = 0; i < carts.length; i++) {
      carts[i].addEventListener('click', () => {
        // console.log(bricks[i]);
        addSetItems(data[i]);
        addCartNumbers(data[i]);
        addTotalCost(data[i]);
        updateBasketNum();
      });
    }

    const favBtn = document.querySelectorAll('.add-favourites-btn-class');
    for (let i = 0; i < favBtn.length; i++) {
      favBtn[i].addEventListener('click', () => {
        addFavSetItems(data[i]);
        addFavCartNumbers(data[i]);
        addFavTotalCost(data[i]);
        // updateBasketNum();
      });
    }
  } else {
    console.log("not working")
  }
}

// Puts cart items into an array of objects
function addSetItems(product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  let tempArr = [];

  if (cartItems != null) {
    tempArr = cartItems;
    tempArr.push(product);
    duplicateCheckCart(tempArr, cartItems);
  } else {
    console.log('cart is empty so we add', product);
    product.inCart = 1;
    tempArr.push(product);
    localStorage.setItem('productsInCart', JSON.stringify(tempArr));
  }
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
      totalCost += basketItem.price;
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
    basketItem.inCart = 1;
  }
  localStorage.setItem('productsInCart', JSON.stringify(result));
}

// Puts favourite items into an array of objects
function addFavSetItems(product) {
  let cartItems = localStorage.getItem('productsInFav');
  cartItems = JSON.parse(cartItems);
  let tempArr = [];

  if (cartItems != null) {
    tempArr = cartItems;
    tempArr.push(product);
    duplicateCheckFav(tempArr, cartItems);
  } else {
    console.log('Fav is empty so we add', product);
    product.inCart = 1;
    tempArr.push(product);
    localStorage.setItem('productsInFav', JSON.stringify(tempArr));
  }

  // let tempArr1 = [];
  // tempArr1 = cartItems;
  // for (const basketItem of tempArr1) {
  //   basketItem.inCart = 1;
  // }
  // localStorage.setItem('productsInCart', JSON.stringify(tempArr1));
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

function addFavTotalCost() {
  const basketItems = JSON.parse(localStorage.getItem('productsInFav'));

  if (basketItems != null) {
    let totalCost = 0;
    for (const basketItem of basketItems) {
      totalCost += basketItem.price;
      localStorage.setItem('favTotalCost', totalCost);
    }
  } else {
    localStorage.setItem('favTotalCost', basketItems[0].price);
  }
}

function duplicateCheckFav(array) {
  const result = array.filter(function (e) {
    const key = Object.keys(e).map(k => e[k]).join('|');
    if (!this[key]) {
      this[key] = true;
      return true;
    }
  }, {});
  for (const basketItem of result) {
    basketItem.inCart = 1;
  }
  localStorage.setItem('productsInFav', JSON.stringify(result));
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
    productContainer.innerHTML += `
    <div class="basketTotalContainer">
        <h4 class="basketTotal">Your Total is: £${cartCost}</h4>
        <button class="clear-basket-btn">Clear Basket</button>
        <button class="next-basket-btn">Next</button>
    </div>
    `;
    // Appends new products to the page
    Object.values(basketItems).map(lego => {
      productContainer.innerHTML += `
        <div class="product" id="${lego.name}" >
        <span>${lego.name} for £${lego.price}</span>
        <img style = "height: 25vh;" src="${lego.imgSrc}">
        <button class="subtract-btn" type="button">-</button>
        <span class="qty-span">${lego.inCart}</span>
        <button class="plus-btn" type="button">+</button>
        <button class="remove-btn" type="button">Remove Product</button>
        <span class="qty-x-price">£${lego.inCart * lego.price}</span>
        </div>
        `;
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
    productContainer.innerHTML += `
    <div class="favTotalContainer">
        <button class="clear-fav-btn">Clear Favourites</button>
    </div>
    `;
    // Appends new products to the page
    Object.values(favItems).map(lego => {
      productContainer.innerHTML += `
        <div class="product" id="${lego.name}" >
        <span>${lego.name} for £${lego.price}</span>
        <img style = "height: 25vh;" src="${lego.imgSrc}">
        <button class="fav-to-basket" type="button">Add to basket</button>
        <button class="remove-fav-btn" type="button">Remove from Favourites</button>
        </div>
        `;
    });
  }
}


loadBricks();
updateBasketNum();
createBasketContent();
createFavContent();

export { addSetItems, addCartNumbers, addTotalCost, updateBasketNum, duplicateCheckCart, createBasketContent };
