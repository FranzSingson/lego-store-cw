function makeGrid() {
    const maxProducts = 50;
    for (let i = 1; i < maxProducts; i++) {
        const newSection = document.createElement('div')
        newSection.id = `product${i}`;
        newSection.className = 'allBoxes-class'

        const newPara = document.createElement('p')
        // newPara.textContent = 'Div box'

        newSection.appendChild(newPara);

        const elemMain = document.getElementById('main-board')
        elemMain.appendChild(newSection);
        console.log("MakeGrid is working")
    }
}

function divideBoxes() {
    const allBoxes = document.querySelectorAll('.allBoxes-class');
    for (const eachBox of allBoxes) {
        const picDiv = document.createElement('div');
        picDiv.className = `picDiv-class`;
        picDiv.textContent = 'Product image goes here';
        eachBox.append(picDiv);
    }

    for (const eachBox of allBoxes) {
        const picDesc = document.createElement('div');
        picDesc.className = `picDesc-class`;
        picDesc.textContent = 'Product desc goes here';
        eachBox.append(picDesc);
    }
}

makeGrid();
divideBoxes();