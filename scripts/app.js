'use strict';

const loginButton = document.querySelector('#login-btn');
const createAccountButton = document.querySelector('#create-account-btn');
const loginDialog = document.querySelector('#login');
const createAccountDialog = document.querySelector('#create-account');
const errorMessageLogin = document.querySelector('#error-message-login');
const errorMessageCreateAccount = document.querySelector(
  '#error-message-create-account'
);
const gameMenuDialog = document.querySelector('#game-menu');
const gameDialog = document.querySelector('#game');
const loginMenu = document.querySelector('#login-menu');
const exitButtons = Array.from(document.querySelectorAll('.exit-button'));
const logoutButtons = Array.from(document.querySelectorAll('.logout-btn'));
const newGameButton = document.querySelector('#new-game');
const gameList = document.querySelector('#game-list');
const playerName = document.querySelector('#player-name');
const playerPoints = document.querySelector('#points');
const CO2 = document.querySelector('#CO2');
const endAirport = document.querySelector('#end-airport');

const oldGamesArray = [];

async function fetchHighscoreList() {
  try {
    const response = await fetch('http://127.0.0.1:3000/highscore');

    if (!response.ok) {
      throw new Error('could not fetch highscore list');
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function fillHighscoreList() {
  const highscore = document.querySelector('#highscore-list');
  const players = await fetchHighscoreList();
  for (let i = 0; i < players.length; i++) {
    const li = document.createElement('li');
    li.classList.add('list-item');
    li.innerText = `${i + 1} ${players[i].name} ${players[i].top_points}`;
    highscore.append(li);
  }
}

async function login(event) {
  event.preventDefault();
  console.log('Login submit clicked');

  const usernameInput = document.querySelector('#username-login').value;
  if (!usernameInput.includes('#')) {
    return (errorMessageLogin.innerText =
      'Invalid username format, username#ID');
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
      return (errorMessageLogin.innerText = 'user does not exist');
    }

    localStorage.setItem('username', result.name);
    localStorage.setItem('ID', result.ID);

    await fillOldGameList();

    loginDialog.close();
    gameMenuDialog.showModal();
  } catch (error) {
    console.log(error);
    return (errorMessageLogin.innerText = 'Could not login');
  }
}

async function createAccount(event) {
  event.preventDefault();
  console.log('Create account submit clicked');
  const usernameInput = document.querySelector('#username-create-account');
  if (!usernameInput.value || usernameInput.value.includes('#')) {
    return (errorMessageCreateAccount.innerText =
      'Please enter valid username');
  }
  try {
    const response = await fetch(
      `http://127.0.0.1:3000/login?name=${usernameInput.value}`,
      {
        method: 'POST',
      }
    );

    if (!response.ok) {
      return (errorMessageCreateAccount.innerText = 'Could not create account');
    }

    const result = await response.json();
    localStorage.setItem('username', result.name);
    localStorage.setItem('ID', result.ID);

    await fillOldGameList();

    createAccountDialog.close();
    gameMenuDialog.showModal();
  } catch (error) {
    console.log(error);
    return (errorMessageCreateAccount.innerText = 'Could not create account');
  }
}

async function createNewGame() {
  //if local strogra empty logout
  //GIVE ERROR MESSAGE
  console.log();
  try {
    const response = await fetch(
      `http://127.0.0.1:3000/game?player_ID=${localStorage.getItem('ID')}`,
      {
        method: 'POST',
      }
    );

    if (!response.ok) {
      console.log('couldnt create game');
      return;
    }

    const result = await response.json();

    return loadGame(result);
  } catch (error) {
    console.log(error);
  }
}

async function fetchOldGames() {
  try {
    const response = await fetch(
      `http://127.0.0.1:3000/game?player_ID=${localStorage.getItem('ID')}`
    );

    if (!response.ok) {
      console.log('copuldnt fetch old on going games');
      return;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

function loadGame(gameData) {
  //if game null cannot load game

  console.log(gameData);
  playerName.innerText = `Pelaajan nimi: ${localStorage.getItem(
    'username'
  )}#${localStorage.getItem('ID')}`;
  playerPoints.innerText = `Pisteet: ${gameData.points}`;
  CO2.innerText = `CO2 päästöt: ${gameData.co2_consumed}`;
  endAirport.innerText = `Lopetus lentokenttä: ${gameData.end_airport}`;

  gameMenuDialog.close();
  game.showModal();
}

function handleOldGameClick(event) {
  loadGame(oldGamesArray[event.target.id]);
}

async function fillOldGameList() {
  const oldGames = await fetchOldGames();

  for (let i = 0; i < oldGames.length; i++) {
    oldGamesArray.push(oldGames[i]);
    const li = document.createElement('li');
    li.classList.add('list-item');
    li.id = i;
    li.innerText = `${i + 1} Peli player ID ${localStorage.getItem('ID')}`;
    li.addEventListener('click', handleOldGameClick);
    gameList.append(li);
  }
}

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

function handleLoginMenu(event) {
  event.target.parentNode.close();
  loginMenu.classList.remove('hide-element');
}

function logout(event) {
  console.log('clicked logout');
  oldGamesArray.length = 0;
  localStorage.clear();
  clearOldGames();
  if (game.open) {
    game.close();
  }

  if (gameMenuDialog.open) {
    gameMenuDialog.close();
  }

  loginMenu.classList.remove('hide-element');
}

function clearOldGames() {
  gameList.innerHTML = '';
}

function isLoggedIn() {
  let username = localStorage.getItem('username');
  let ID = localStorage.getItem('ID');

  if (username && ID) {
    fillOldGameList();
    loginMenu.classList.add('hide-element');
    gameMenuDialog.showModal();
  }
}

const map = L.map('map', { tap: false });
L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
}).addTo(map);
map.setView([60, 24], 7);

loginButton.addEventListener('click', loginClick);
createAccountButton.addEventListener('click', createAccountClick);

loginDialog.addEventListener('submit', login);
createAccountDialog.addEventListener('submit', createAccount);

for (const exitButton of exitButtons) {
  exitButton.addEventListener('click', handleLoginMenu);
}

for (const logoutButton of logoutButtons) {
  logoutButton.addEventListener('click', logout);
}

newGameButton.addEventListener('click', createNewGame);

//gameDialog.showModal();
fillHighscoreList();
isLoggedIn();
