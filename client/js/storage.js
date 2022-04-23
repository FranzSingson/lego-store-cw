
async function loadBricks() {
  const response = await fetch('/bricks');
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
        // addFavTotalCost(data[i]);
      });
    }
  } else {
    console.log('not working');
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
    const newDiv = document.createElement('div');
    newDiv.className = 'basketTotalContainer';
    const newh4 = document.createElement('h4');
    newh4.className = 'basketTotal';
    newh4.textContent = `Your Total is: £${cartCost}`;
    const clearBtn = document.createElement('button');
    clearBtn.className = 'clear-basket-btn';
    clearBtn.textContent = 'Clear Basket';
    const payBtn = document.createElement('button');
    payBtn.id = 'pay-basket-btn';
    payBtn.textContent = 'Pay';
    payBtn.disabled = true;
    newDiv.append(newh4, clearBtn, payBtn);
    productContainer.append(newDiv);

    // Appends new products to the page
    Object.values(basketItems).map(lego => {
      const parentDiv = document.createElement('div');
      parentDiv.className = 'product';
      parentDiv.id = `${lego.name}`;

      const spanName = document.createElement('span');
      spanName.textContent = `${lego.name} for £${lego.price}`;

      const imgElem = document.createElement('img');
      imgElem.src = `${lego.imgSrc}`;
      imgElem.style = 'height: 25vh;';

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
      removeBtn.textContent = 'Remove product';

      const spanQtyXPrice = document.createElement('span');
      spanQtyXPrice.className = 'qty-x-price';
      spanQtyXPrice.textContent = `£${lego.inCart * lego.price}`;

      parentDiv.append(spanName, imgElem, subBtn, spanQty, addBtn, removeBtn, spanQtyXPrice);
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
    newDiv.className = "favTotalContainer";

    const clearFavBtn = document.createElement("button")
    clearFavBtn.className = "clear-fav-btn";
    clearFavBtn.textContent = 'Clear Favourites';
    newDiv.append(clearFavBtn);
    productContainer.append(newDiv)

    // Appends new products to the page
    Object.values(favItems).map(lego => {
      const parentDiv = document.createElement("div")
      parentDiv.className = "product"
      parentDiv.id = `${lego.name}`;

      const newSpan = document.createElement('span')
      newSpan.textContent = `${lego.name} for £${lego.price}`;

      const imgElem = document.createElement("img")
      imgElem.src = `${lego.imgSrc}`;
      imgElem.alt = `This is an image ${lego.name}`;
      imgElem.style = "height: 25vh;"

      const removeFavbtn = document.createElement("button")
      removeFavbtn.type = "button";
      removeFavbtn.className = "remove-fav-btn";
      removeFavbtn.textContent = "Remove from favourites"

      parentDiv.append(newSpan, imgElem, removeFavbtn)
      productContainer.append(parentDiv)
    });
  }
}


loadBricks();
updateBasketNum();
createBasketContent();
createFavContent();

export { addSetItems, addCartNumbers, addTotalCost, updateBasketNum, duplicateCheckCart, createBasketContent };
