'use strict';

//BTNS PART
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// NUMBERS PART 
let score0Text = document.querySelector('#score--0');
let score1Text = document.querySelector('#score--1');

let current0Text = document.querySelector('#current--0');
let current1Text = document.querySelector('#current--1');

// let score0 = Number(score0Text.textContent);

const current = [0, 0];
const score = [0, 0];

const zeroCurrent = function () {
  current[0] = 0;
  current[1] = 0;
  current0Text.textContent = current[0];
  current1Text.textContent = current[1];
};

const zeroScore = function () {
  score[0] = 0;
  score[1] = 0;
  score0Text.textContent = score[0];
  score1Text.textContent = score[1];
};

// NEW GAME BTN
btnNew.addEventListener('click', function () {
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  zeroCurrent();
  zeroScore();
});

//Players PART
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const players = [player0, player1];

//remove dices
const removeDice = function () {
  let dices = document.querySelectorAll('.dice');
  for (let i = 0; i < 6; i++) {
    dices[i].classList.add('hidden');
  }
}

const winner = function () {
  if (score[0] >= 100) {
    player0.classList.add('player--winner');
    player1.classList.remove('player--active');
    removeDice()
  } else if (score[1] >= 100) {
    player1.classList.add('player--winner');
    player0.classList.remove('player--active');
    removeDice()
  }
}


const hold = function () {
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  if (!player0.classList.contains('player--active')) {
    score[0] += current[0];
    score0Text.textContent = score[0];
  } else if (!player1.classList.contains('player--active')) {
    score[1] += current[1];
    score1Text.textContent = score[1];
  }
  zeroCurrent();
};


//  HOLD BTN
btnHold.addEventListener('click', function () {
  if (score[1] < 100 && score[0] < 100) {
    hold();
  }
  winner();
});


// NEW ROLL BTN
btnRoll.addEventListener('click', function () {

  if (score[1] < 100 && score[0] < 100) {
    const randomNumber = Math.trunc(Math.random() * 6) + 1; //total = 6
    let dice = document.querySelectorAll('.dice');
    // dice.src = `dice-${randomNumber}.png`;

    removeDice();

    if (randomNumber - 1 > 0) {
      dice[randomNumber - 1].classList.remove('hidden');

      if (player0.classList.contains('player--active')) {
        current[0] += randomNumber;
        current0Text.textContent = current[0];
      } else if (player1.classList.contains('player--active')) {
        current[1] += randomNumber;
        current1Text.textContent = current[1];
      }
    } else if (randomNumber - 1 === 0) {
      dice[randomNumber - 1].classList.remove('hidden');
      zeroCurrent();
      hold();
    }
  }
});


