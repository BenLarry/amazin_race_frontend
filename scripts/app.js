const login = document.querySelector('#login');
const createAccount = document.querySelector('#create-account');

async function accountLogin(name) {
  // check if name is in correct format and if not return error message in window
  // if correct format fetch to server if user exist
  // if user exist object len is not 0
}

async function createAccountLogin(name) {
  //remove eventlistener to login
  //limit how short and long name can be
  //create player and return name#id for player so he can use it in future
}

login.addEventListener('submit', accountLogin);

createAccount.addEventListener('click', createAccountLogin);
