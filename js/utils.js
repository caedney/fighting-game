function detectCollision(rect1, rect2) {
  return (
    rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x &&
    rect1.attackBox.position.x <= rect2.position.x + rect2.width &&
    rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y &&
    rect1.attackBox.position.y <= rect2.position.y + rect2.height
  );
}

function determineWinner({ player, enemy, timerID }) {
  clearTimeout(timerID);
  document.querySelector('#display-text').style.display = 'flex';

  if (player.health === enemy.health) {
    document.querySelector('#display-text').innerHTML = 'TIE';
  } else if (player.health > enemy.health) {
    document.querySelector('#display-text').innerHTML = 'Player 1 Wins!';
  } else {
    document.querySelector('#display-text').innerHTML = 'Player 2 Wins!';
  }
}

let timer = 60;
let timerID;

function decreaseTimer() {
  if (timer > 0) {
    timer -= 1;
    document.getElementById('timer').innerHTML = timer;
    timerID = setTimeout(decreaseTimer, 1000);
  }

  if (timer === 0) {
    determineWinner({ player, enemy, timerID });
  }
}
