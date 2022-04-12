import { addSetItems, addCartNumbers, addTotalCost, updateBasketNum, createBasketContent } from './storage.js'

async function loadBricks() {
  const response = await fetch('/bricks');
  if (response.ok) {
    const data = await response.json();
    const btn = document.querySelectorAll('.fav-to-basket');
    for (let i = 0; i < btn.length; i++) {
      for (const item of data) {
        if (item.name === btn[i].parentElement.id) {
          btn[i].addEventListener('click', () => {
            console.log(btn[i].parentElement.id);
            console.log(item.name);
            // addSetItems(data[i]);
            // addCartNumbers(data[i]);
            // addTotalCost(data[i]);
            // updateBasketNum();
          });
        }
      }

    }

    console.log('working');
  } else {
    console.log('not working');
  }
}

function removeFav() {
  const removeBtn = document.querySelectorAll('.remove-fav-btn');
  for (let i = 0; i < removeBtn.length; i++) {
    const parentId = removeBtn[i].parentElement.id;
    removeBtn[i].addEventListener('click', () => {
      removeFromLocalStorage(parentId);
      createBasketContent();
    });
  }
}

function removeFromLocalStorage(id) {
  const favItems = JSON.parse(localStorage.getItem('productsInFav'));
  const favQty = JSON.parse(localStorage.getItem('favQty'));

  let tempArr = [];
  tempArr = favItems;
  for (let i = 0; i < tempArr.length; i++) {
    if (tempArr[i].name === id) {
      if (tempArr.length === 1) { // When the product is the last item in the basket and user presses remove product button)
        localStorage.clear();
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
  console.log(favItems);
}

function clearFav() {
  const clearBasketBtn = document.querySelector('.clear-fav-btn');
  clearBasketBtn.addEventListener('click', () => {
    localStorage.removeItem("productsInFav");
    localStorage.removeItem("favQty");
    localStorage.removeItem("favTotalCost");
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

loadBricks();
removeFav();
clearFav();
