const window = document.querySelector('#window');

// CHECK LOCAL STORAGE IF PLAYER LOGGED IN

const login = document.querySelector('#login');
const createAccount = document.querySelector('#create-account');

async function accountLogin(event) {
  event.preventDefault();
  const name = document.querySelector('#login-username');
  if (name.value.includes('#')) {
    [username, id] = name.value.split('#');
    console.log(username, id);
    try {
      const response = await fetch('127.0.0.1:3000');
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {}
  }
  // check if name is in correct format and if not return error message in window
  // if correct format fetch to server if user exist
  // if user exist object len is not 0
  // set localstorage player id
}

async function createAccountLogin(name) {
  //remove eventlistener to login
  //limit how short and long name can be
  //create player and return name#id for player so he can use it in future
  // set localstorage player id
}

login.addEventListener('submit', accountLogin);

createAccount.addEventListener('click', createAccountLogin);
