// import { handle } from 'express/lib/application';
import { bricks } from './bricks.mjs';

const maxProducts = bricks.length + 1;
let bricksStock = 0;

let basket = [];


function makeGrid() {
  for (let i = 1; i < maxProducts; i++) {
    const newSection = document.createElement('div');
    newSection.id = `product${i}`;
    newSection.className = 'allBoxes-class';

    // const newPara = document.createElement('p');
    // newPara.textContent = 'Div box'
    // newSection.appendChild(newPara);

    const elemMain = document.getElementById('main-board');
    elemMain.appendChild(newSection);
    console.log('MakeGrid is working');
  }
}

function divideBoxes() {
  let count = 1;
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

    // const newPara = document.createElement("p"); uncomment this
    // newPara.textContent = 'Product desc goes here'; uncomment this

    // picDesc.append(newPara); uncomment this
    // picDesc.textContent = 'Product desc goes here';
    eachBox.append(picDesc);
  }
}

function insertProduct() {
  const allBoxes = document.querySelectorAll('.allBoxes-class');
  for (const allBox of allBoxes) {
    // insert image on each picDiv-class
    const picDiv = allBox.querySelector('.picDiv-class');
    const imgElem = document.createElement('img');
    imgElem.src = bricks[bricksStock].imgSrc;
    picDiv.appendChild(imgElem);
    imgElem.setAttribute('style', 'height: 100%; display: block; margin-left: auto; margin-right: auto; ');

    const descDiv = allBox.querySelector('.descDiv-class');
    descDiv.id = `descDiv-id${bricks[bricksStock].id}`;
    const newIDElem = document.createElement('p');
    newIDElem.id = `${bricks[bricksStock].id}`;
    newIDElem.textContent = `${'ID: ' + bricks[bricksStock].id}`;

    const newColElem = document.createElement('p');
    newColElem.textContent = `${'Colour: ' + bricks[bricksStock].colour}`;

    const newPriceElem = document.createElement('p');
    newPriceElem.textContent = `${'Price: ' + bricks[bricksStock].price}`;

    const button = createButton(bricks[bricksStock].id);
    descDiv.append(newIDElem, newColElem, newPriceElem, button);
    // descDiv.append(newColElem);
    // descDiv.append(newPriceElem);
    // createButton()

    bricksStock++;
  }
}

function createButton(id) {
  const makeBtn = document.createElement('button');
  makeBtn.textContent = 'Add to basket';
  makeBtn.type = 'button';
  makeBtn.dataset.id = id;
  makeBtn.className = 'addToBasketButton-class';
  return makeBtn;
}

function addToBasket(e) {
  // console.log(bricks[e.target.dataset.id]);
  for (let i = 0; i < bricks.length; i++) {
    if (bricks[i] === bricks[e.target.dataset.id]) {
      // console.log(bricks[e.target.dataset.id])


      // storeLocally(bricks[e.target.dataset.id])

      basket.push(bricks[e.target.dataset.id])
    }
  }

  storeLocally(basket);
  // console.log(basket);
}

// use filter, where = id
// Possibly use map or object,

function storeLocally(data) {
  // console.log(data)
  localStorage.setItem('myObject', JSON.stringify(data));
  // console.log(e.target.dataset)
  const cat = localStorage.getItem('myObject');
}


function handleClick() {
  const buttons = document.querySelectorAll('.addToBasketButton-class');
  for (const button of buttons) {
    button.addEventListener('click', addToBasket);
  }
}


makeGrid();
divideBoxes();
insertProduct();
createButton();
handleClick();

// addToBasket();
