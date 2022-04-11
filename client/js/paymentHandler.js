
async function loadBricks() {
    const response = await fetch('/bricks');
    if (response.ok) {
        const data = await response.json();
        getCartItems(data)
    } else {
        console.log('not working');
    }
}

function getCartItems(cartArray) {
    const cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    const totalCost = JSON.parse(localStorage.getItem('totalCost'));
    console.log(cartArray)
    console.log(cartItems)
    console.log(totalCost)
}

loadBricks();

// We want to display the total of the basket here