const mainWindow = document.querySelector('#window');
const loginForm = document.querySelector('#login');

function checkIfUserLoggedIn() {
  const username = localStorage.getItem('username');
  const usernameID = localStorage.getItem('usernameID');
  if (username === null || usernameID === null) {
    return false;
  }
  return true;
}

async function accountLogin(event) {
  event.preventDefault();
  const name = document.querySelector('#login-username');
  if (name.value.includes('#')) {
    [username, id] = name.value.split('#');
    console.log(username, id);
    localStorage.setItem('username', username);
    localStorage.setItem('usernameID', id);

    loginForm.removeEventListener('submit', accountLogin);

    //remove login form and render gamewindow

    /*try {
      const response = await fetch('127.0.0.1:3000');
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {}*/
  } else {
    console.log('Invalid usernameform');
  }
}

let isUserLoggedIn = checkIfUserLoggedIn();

if (isUserLoggedIn) {
  loginForm.close();
  // IF USER IS LOGGED IN RENDER GAME WINDOW
} else {
  loginForm.show();
}

loginForm.addEventListener('submit', accountLogin);
