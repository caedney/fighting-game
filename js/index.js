const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
context.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.75;
const jumpHeight = -20;
const speed = 5;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: 'images/background.png',
});

const player = new Fighter({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  color: 'red',
  offset: {
    x: 0,
    y: 0,
  },
});

const enemy = new Fighter({
  position: { x: 400, y: 100 },
  velocity: { x: 0, y: 0 },
  color: 'blue',
  offset: {
    x: -50,
    y: 0,
  },
});

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

decreaseTimer();

function animate() {
  window.requestAnimationFrame(animate);
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // Player
  if (player.pressedKeys[0] === 'a') {
    player.velocity.x = -speed;
  } else if (player.pressedKeys[0] === 'd') {
    player.velocity.x = speed;
  }

  // Enemy
  if (enemy.pressedKeys[0] === 'ArrowLeft') {
    enemy.velocity.x = -speed;
  } else if (enemy.pressedKeys[0] === 'ArrowRight') {
    enemy.velocity.x = speed;
  }

  // Detect player collision
  if (detectCollision(player, enemy) && player.isAttacking) {
    player.isAttacking = false;
    console.log('player attack');
    enemy.health -= 10;
    document.querySelector(
      '.enemy-health'
    ).firstElementChild.style.width = `${enemy.health}%`;
  }

  // Detect ememy collision
  if (detectCollision(enemy, player) && enemy.isAttacking) {
    enemy.isAttacking = false;
    console.log('enemy attack');
    player.health -= 10;
    document.querySelector(
      '.player-health'
    ).firstElementChild.style.width = `${player.health}%`;
  }

  // End game based on health
  if (player.health <= 0 || enemy.health <= 0) {
    determineWinner({ player, enemy, timerID });
  }
}

animate();

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'a': {
      player.addPressedKey('a');
      break;
    }
    case 'd': {
      player.addPressedKey('d');
      break;
    }
    case 'w': {
      player.velocity.y = jumpHeight;
      break;
    }
    case ' ': {
      player.attack();
      break;
    }
    case 'ArrowLeft': {
      enemy.addPressedKey('ArrowLeft');
      break;
    }
    case 'ArrowRight': {
      enemy.addPressedKey('ArrowRight');
      break;
    }
    case 'ArrowUp': {
      enemy.velocity.y = jumpHeight;
      break;
    }
    case 'ArrowDown': {
      enemy.attack();
      break;
    }
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'a': {
      player.removePressedKey('a');
      break;
    }
    case 'd': {
      player.removePressedKey('d');
      break;
    }
    case 'ArrowLeft': {
      enemy.removePressedKey('ArrowLeft');
      break;
    }
    case 'ArrowRight': {
      enemy.removePressedKey('ArrowRight');
      break;
    }
  }
});
