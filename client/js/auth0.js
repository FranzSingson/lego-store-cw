export async function fetchAuthConfig() {
  const response = await fetch('/auth-config');
  if (response.ok) {
    return response.json();
  } else {
    throw response;
  }
}

// global variable that is our entry point to the auth library
let auth0 = null;

async function initializeAuth0Client() {
  const config = await fetchAuthConfig();

  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
  });
}

// update the state of all authentication-related elements
async function updateAuthUI() {
  const isAuthenticated = await auth0.isAuthenticated();

  document.getElementById('login').disabled = isAuthenticated;
  document.getElementById('logout').disabled = !isAuthenticated;

  if (isAuthenticated) {
    const user = await auth0.getUser();

    const mainBoard = document.querySelector('#main-board');
    const paymentBody = document.querySelector('#confirmation-body');
    const cartContainer = document.querySelector('#basket-title');
    const favContainer = document.querySelector('.fav-products-container');

    // When user is is the index.html
    if (mainBoard !== null) {
      const elem1 = document.getElementById('greeting');
      elem1.textContent = `Hello ${user.name}!`;
    } else if (paymentBody !== null) { // When the user is in payment.html
      const elem2 = document.querySelector('#confirmation-msg');
      elem2.textContent = `Thank you for your purchase ${user.name}!`;
      const elem3 = document.querySelector('#receipt-msg');
      elem3.textContent = `Your e-receipt has been sent to ${user.email}.`;
    } else if (cartContainer !== null) { // When the user is in basket.html
      const payBtn = document.querySelector('#pay-basket-btn');
      if (payBtn !== null) {
        payBtn.disabled = false;
        const elem1 = document.getElementById('greeting');
        elem1.textContent = `Hello ${user.name}!`;
      } else {
        const elem1 = document.getElementById('greeting');
        elem1.textContent = `Hello ${user.name}! Please add items to your cart.`;
      }
    } else if (favContainer !== null) {
      const elemMsg = document.querySelector('#greeting');
      elemMsg.textContent = `Hello ${user.name}!`;
    }
  }
}

async function login() {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin,
  });
}

function logout() {
  auth0.logout({
    returnTo: window.location.origin,
  });
}

// check for the code and state parameters from Auth0 login redirect
async function handleAuth0Redirect() {
  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) return;

  const query = window.location.search;
  if (query.includes('state=')) {
    try {
      // process the login state
      await auth0.handleRedirectCallback();
    } catch (e) {
      window.alert(e.message || 'authentication error, sorry');
      logout();
    }

    // remove the query parameters
    window.history.replaceState({}, document.title, '/');

    await updateAuthUI();
  }
}

// make sure all interactive elements in the page have code attached to them
function setupListeners() {
  document.getElementById('login').addEventListener('click', login);
  document.getElementById('logout').addEventListener('click', logout);
}

// this will run when the page loads
async function init() {
  await initializeAuth0Client();
  await setupListeners();
  await updateAuthUI();
  await handleAuth0Redirect();
}

window.addEventListener('load', init);
