'use strict';

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
