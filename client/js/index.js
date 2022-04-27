async function loadBricks() {
  const response = await fetch('/bricks');
  if (response.ok) {
    const data = await response.json();
    const maxProducts = data.length + 1;
    const bricksStock = 0;
    makeGrid(maxProducts);
    divideBoxes();
    // for (const item of data) {
    insertProduct(data, bricksStock);
    // }
    console.log(data);
  } else {
    console.log('not working');
  }
}

function makeGrid(maxProducts) {
  for (let i = 1; i < maxProducts; i++) {
    const newSection = document.createElement('div');
    newSection.id = `Item${i}`;
    newSection.className = 'allBoxes-class';

    const elemMain = document.getElementById('main-board');
    elemMain.appendChild(newSection);
  }
}

function divideBoxes() {
  let count = 0;
  const allBoxes = document.querySelectorAll('.allBoxes-class');
  for (const eachBox of allBoxes) {
    const picDiv = document.createElement('div');
    picDiv.className = 'picDiv-class';
    picDiv.id = `picDiv-id${count}`;
    count++;
    // picDiv.textContent = 'Product image goes here';
    eachBox.append(picDiv);
  }

  for (const eachBox of allBoxes) {
    const picDesc = document.createElement('div');
    picDesc.className = 'descDiv-class';

    eachBox.append(picDesc);
  }
}

function insertProduct(dataArray, brickIndex) {
  const allBoxes = document.querySelectorAll('.allBoxes-class');
  for (const allBox of allBoxes) {
    // insert image on each picDiv-class
    // if (dataArray[brickIndex].type === 'brick') {
    const picDiv = allBox.querySelector('.picDiv-class');
    const imgElem = document.createElement('img');
    imgElem.src = dataArray[brickIndex].imgSrc;
    imgElem.alt = `Image for ${dataArray[brickIndex].name}`;
    picDiv.appendChild(imgElem);
    // imgElem.setAttribute('style', 'height: 80%; display: block; margin-left: auto; margin-right: auto; ');

    const descDiv = allBox.querySelector('.descDiv-class');
    descDiv.className = `descDiv-class ${dataArray[brickIndex].itemType}`;
    descDiv.id = `descDiv-id${dataArray[brickIndex].id}`;

    const newIDElem = document.createElement('p');
    newIDElem.id = `${dataArray[brickIndex].id}`;
    newIDElem.textContent = `${dataArray[brickIndex].name}`;

    const newColElem = document.createElement('p');
    newColElem.textContent = `${'Colour: ' + dataArray[brickIndex].colour}`;

    const newPriceElem = document.createElement('p');
    newPriceElem.textContent = `${'Price: £' + dataArray[brickIndex].price}`;

    const stockElem = document.createElement('p');
    stockElem.textContent = `${dataArray[brickIndex].stock} in stock left!`;

    const outOfStockElem = document.createElement('p');
    outOfStockElem.textContent = 'Item coming back soon!';


    const addToFavButton = createFavouritesBtn(dataArray[brickIndex].id);

    // If product stock is < 1, make button not clickable
    if (dataArray[brickIndex].stock < 1) {
      const addToBasketButton = createButton(dataArray[brickIndex].id, dataArray[brickIndex].stock);
      descDiv.append(newIDElem, newColElem, newPriceElem, addToBasketButton, addToFavButton, outOfStockElem);
    } else if (dataArray[brickIndex].stock < 10) {
      const addToBasketButton = createButton(dataArray[brickIndex].id, dataArray[brickIndex].stock);
      descDiv.append(newIDElem, newColElem, newPriceElem, addToBasketButton, addToFavButton, stockElem);
    } else {
      const addToBasketButton = createButton(dataArray[brickIndex].id);
      descDiv.append(newIDElem, newColElem, newPriceElem, addToBasketButton, addToFavButton);
    }
    // const addToBasketButton = createButton(dataArray[brickIndex].id);

    brickIndex++;
    // }
  }
}

export function createButton(id, stockQty) {
  const makeBtn = document.createElement('button');
  makeBtn.textContent = 'Add to basket';
  makeBtn.type = 'button';
  makeBtn.dataset.id = id;
  makeBtn.className = 'addToBasketButton-class plus-btn';
  if (stockQty < 1) {
    makeBtn.disabled = true;
    makeBtn.textContent = 'Out of stock';
    return makeBtn;
  } else {
    return makeBtn;
  }
}

function createFavouritesBtn(id) {
  const makeFavBtn = document.createElement('button');
  makeFavBtn.textContent = '❤';
  makeFavBtn.type = 'button';
  makeFavBtn.dataset.id = id;
  makeFavBtn.className = 'add-favourites-btn-class';
  return makeFavBtn;
}

function makeApplyChangesBtn(elements) {
  const divFilterContainer = document.querySelector('#div-filter');
  const newBtn = document.createElement('button');
  newBtn.id = 'save-filter-btn';
  newBtn.textContent = 'Apply changes';

  if (divFilterContainer.lastChild.id !== 'save-filter-btn') {
    const divFilter = document.querySelector('#div-filter');
    divFilter.append(newBtn);
  }

  newBtn.addEventListener('click', () => {
    if (elements !== undefined) {
      for (const productSet of elements) {
        const outerDiv = productSet.parentElement;
        outerDiv.remove();
      }
    } else {
      location.reload();
    }
  });
}

function filterHandlers() {
  const boxAll = document.querySelector('#btn-all');
  const boxBrick = document.querySelector('#btn-brick');
  const boxSet = document.querySelector('#btn-set');

  boxAll.addEventListener('change', (e) => {
    const box = e.target;
    if (box.checked) {
      makeApplyChangesBtn();
    } else if (!box.checked) {
      const filterBtn = document.querySelector('#save-filter-btn');
      filterBtn.remove();
    }
  });

  boxBrick.addEventListener('change', (e) => {
    const box = e.target;
    if (box.checked) {
      console.log('ticked');
      const productSets = document.querySelectorAll('.set');
      makeApplyChangesBtn(productSets);
    } else if (!box.checked) {
      const filterBtn = document.querySelector('#save-filter-btn');
      filterBtn.remove();
    }
  });

  boxSet.addEventListener('change', (e) => {
    const box = e.target;
    if (box.checked) {
      console.log('ticked');
      const productBricks = document.querySelectorAll('.brick');
      makeApplyChangesBtn(productBricks);
    } else if (!box.checked) {
      const filterBtn = document.querySelector('#save-filter-btn');
      filterBtn.remove();
    }
  });
}


filterHandlers();
loadBricks();
