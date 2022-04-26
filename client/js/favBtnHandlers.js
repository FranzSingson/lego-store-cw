import { addSetItems, createBasketContent, duplicateCheckCart } from './storage.js';

async function loadBricks() {
  const response = await fetch('/bricks');
  if (response.ok) {
    const data = await response.json();
    const btns = document.querySelectorAll('.add-cart-btn');

    for (let i = 0; i < data.length; i++) {
      for (const btn of btns) {
        btn.addEventListener("click", () => {
          if (data[i].id == btn.parentElement.id) {
            const legoIndex = btn.parentElement.id
            addSetItems(data[legoIndex]);
            // duplicateCheckCart()
          }
        })
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
        localStorage.removeItem("productsInFav")
        localStorage.removeItem("favQty")
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
