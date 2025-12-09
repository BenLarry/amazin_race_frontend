'use strict';

const loginButton = document.querySelector('#login-btn');
const createAccountButton = document.querySelector('#create-account-btn');
const loginDialog = document.querySelector('#login');
const createAccountDialog = document.querySelector('#create-account');
const errorMessage = document.querySelector('#error-message');
const gameMenuDialog = document.querySelector('#game-menu');
const gameDialog = document.querySelector('#game');
const loginMenu = document.querySelector('#login-menu');

async function fetchHighscoreList() {
  try {
    const response = await fetch('http://127.0.0.1:3000/highscore');

    if (!response.ok) {
      throw new Error('could not fetch highscore list');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function fillHighscoreList() {
  const highscore = document.querySelector('#highscore-list');
  const players = await fetchHighscoreList();
  for (let i = 1; i < players.length; i++) {
    console.log(players[i]);
    const li = document.createElement('li');
    li.classList.add('list-item');
    li.innerText = `${i} ${players[i].name} ${players[i].top_points}`;
    highscore.append(li);
  }
}

fillHighscoreList();

function loginClick(event) {
  event.preventDefault();
  loginMenu.classList.add('hide-element');
  console.log('login button clicked');
  loginDialog.showModal();
}

function createAccountClick(event) {
  event.preventDefault();
  loginMenu.classList.add('hide-element');
  console.log('Create account button clicked');
  createAccountDialog.showModal();
}

async function login(event) {
  event.preventDefault();
  console.log('Login submit clicked');

  const usernameInput = document.querySelector('#username-login').value;
  if (!usernameInput.includes('#')) {
    return (errorMessage.innerText = 'Invalid username format, username#ID');
  }

  const [username, ID] = usernameInput.split('#');
  try {
    const response = await fetch(
      `http://127.0.0.1:3000/login?name=${username}&player_ID=${ID}`
    );

    if (!response.ok) {
      throw new Error('Could not login');
    }

    const result = await response.json();
    console.log(result);
    if (!Object.keys(result).length) {
      console.log('user does not exist');
      return (errorMessage.innerText = 'user does not exist');
    }

    localStorage.setItem('username', result.name);
    localStorage.setItem('ID', result.ID);
    loginDialog.close();
  } catch (error) {
    console.log(error);
  }
}

async function createAccount(event) {
  event.preventDefault();
  console.log('Create account submit clicked');
  const usernameInput = document.querySelector(
    '#username-create-account'
  ).value;
  console.log(usernameInput);
  try {
    const response = await fetch(
      `http://127.0.0.1:3000/login?name=${usernameInput}`,
      {
        method: 'POST',
      }
    );

    if (!response.ok) {
      return (errorMessage.innerText = 'Could not create account');
    }

    const result = await response.json();
    localStorage.setItem('username', result.name);
    localStorage.setItem('ID', result.ID);
    createAccountDialog.close();
  } catch (error) {
    console.log(error);
  }
}

loginButton.addEventListener('click', loginClick);
createAccountButton.addEventListener('click', createAccountClick);

loginDialog.addEventListener('submit', login);
createAccountDialog.addEventListener('submit', createAccount);
