import { bricks } from './bricks.mjs';

const maxProducts = 50;
let bricksStock = 0;


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
    picDiv.textContent = 'Product image goes here';
    eachBox.append(picDiv);
  }

  for (const eachBox of allBoxes) {
    const picDesc = document.createElement('div');
    picDesc.className = 'descDiv-class';

    // const newPara = document.createElement("p"); uncomment this
    // newPara.textContent = 'Product desc goes here'; uncomment this

    // picDesc.append(newPara); uncomment this
    picDesc.textContent = 'Product desc goes here';
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
    imgElem.setAttribute('style', 'height: 75%;');

    const descDiv = allBox.querySelector('.descDiv-class');
    const paraElem = document.createElement('p');
    paraElem.textContent = `${'ID: ' + bricks[bricksStock].id + ' Colour: ' + bricks[bricksStock].colour + ' Price: ' + bricks[bricksStock].price}`;

    descDiv.append(paraElem);
    bricksStock++;
  }
}


makeGrid();
divideBoxes();
insertProduct();

// loop through the class of allBoxes-class
