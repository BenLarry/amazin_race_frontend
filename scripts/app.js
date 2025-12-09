'use strict';

const loginButton = document.querySelector('#login-btn');
const createAccountButton = document.querySelector('#create-account-btn');
const loginDialog = document.querySelector('#login');
const createAccountDialog = document.querySelector('#create-account');

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
  console.log('login button clicked');
  loginDialog.showModal();
}

function createAccountClick(event) {
  event.preventDefault();
  console.log('Create account button clicked');
  createAccountDialog.showModal();
}

async function login(event) {
  event.preventDefault();
  console.log('Login submit clicked');

  const username = document.querySelector('#username-login').value;
  if (!username.includes('#')) {
  }
  const x = 'perk';
  const y = 72;
  try {
    const response = fetch(
      `http://127.0.0.1:3000/login?name=${x}&player_ID=${y}`
    );
  } catch (error) {}
}

async function createAccount(event) {
  event.preventDefault();
  console.log('Create account submit clicked');
  try {
  } catch (error) {}
}

loginButton.addEventListener('click', loginClick);
createAccountButton.addEventListener('click', createAccountClick);

loginDialog.addEventListener('submit', login);
createAccountDialog.addEventListener('submit', createAccount);
