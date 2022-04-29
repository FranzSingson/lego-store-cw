export function createBasketContent() {
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
    payBtn.disabled = true;
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

export function createFavContent() {
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
