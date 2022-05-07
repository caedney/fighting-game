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

const shop = new Sprite({
  position: {
    x: 620,
    y: 128,
  },
  imageSrc: 'images/shop.png',
  scale: 2.75,
  framesMax: 6,
});

const player = new Fighter({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  color: 'red',
  offset: {
    x: 0,
    y: 0,
  },
  imageSrc: 'images/samuraiMack/Idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 156,
  },
  sprites: {
    idle: {
      imageSrc: 'images/samuraiMack/Idle.png',
      framesMax: 8,
    },
    run: {
      imageSrc: 'images/samuraiMack/Run.png',
      framesMax: 8,
    },
    jump: {
      imageSrc: 'images/samuraiMack/Jump.png',
      framesMax: 2,
    },
    fall: {
      imageSrc: 'images/samuraiMack/Fall.png',
      framesMax: 2,
    },
    attack1: {
      imageSrc: 'images/samuraiMack/Attack1.png',
      framesMax: 6,
    },
    takeHit: {
      imageSrc: 'images/samuraiMack/Take Hit - white silhouette.png',
      framesMax: 4,
    },
    death: {
      imageSrc: 'images/samuraiMack/Death.png',
      framesMax: 6,
    },
  },
  attackBox: {
    offset: {
      x: 85,
      y: 50,
    },
    width: 160,
    height: 50,
  },
});

const enemy = new Fighter({
  position: { x: 400, y: 100 },
  velocity: { x: 0, y: 0 },
  color: 'blue',
  imageSrc: 'images/kenji/Idle.png',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 170,
  },
  sprites: {
    idle: {
      imageSrc: 'images/kenji/Idle.png',
      framesMax: 4,
    },
    run: {
      imageSrc: 'images/kenji/Run.png',
      framesMax: 8,
    },
    jump: {
      imageSrc: 'images/kenji/Jump.png',
      framesMax: 2,
    },
    fall: {
      imageSrc: 'images/kenji/Fall.png',
      framesMax: 2,
    },
    attack1: {
      imageSrc: 'images/kenji/Attack1.png',
      framesMax: 4,
    },
    takeHit: {
      imageSrc: 'images/kenji/Take hit.png',
      framesMax: 3,
    },
    death: {
      imageSrc: 'images/kenji/Death.png',
      framesMax: 7,
    },
  },
  attackBox: {
    offset: {
      x: -180,
      y: 50,
    },
    width: 180,
    height: 50,
  },
});

decreaseTimer();

function animate() {
  window.requestAnimationFrame(animate);
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();
  context.fillStyle = 'rgba(255, 255, 255, 0.18)';
  context.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  // Player
  player.velocity.x = 0;

  if (player.pressedKeys[0] === 'a') {
    player.velocity.x = -speed;
    player.switchSprite('run');
  } else if (player.pressedKeys[0] === 'd') {
    player.velocity.x = speed;
    player.switchSprite('run');
  } else {
    player.switchSprite('idle');
  }

  if (player.velocity.y < 0) {
    player.switchSprite('jump');
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall');
  }

  // Enemy
  enemy.velocity.x = 0;

  if (enemy.pressedKeys[0] === 'ArrowLeft') {
    enemy.velocity.x = -speed;
    enemy.switchSprite('run');
  } else if (enemy.pressedKeys[0] === 'ArrowRight') {
    enemy.velocity.x = speed;
    enemy.switchSprite('run');
  } else {
    enemy.switchSprite('idle');
  }

  if (enemy.velocity.y < 0) {
    enemy.switchSprite('jump');
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite('fall');
  }

  // Detect player collision
  if (
    detectCollision(player, enemy) &&
    player.isAttacking &&
    player.framesCurrent === 4
  ) {
    enemy.takeHit();
    player.isAttacking = false;

    gsap.to('#enemy-health-gauge', {
      width: `${enemy.health}%`,
    });
  }

  // Player misses attack
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false;
  }

  // Detect ememy collision
  if (
    detectCollision(enemy, player) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 2
  ) {
    player.takeHit();
    enemy.isAttacking = false;

    gsap.to('#player-health-gauge', {
      width: `${player.health}%`,
    });
  }

  // Enemy misses attack
  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false;
  }

  // End game based on health
  if (player.health <= 0 || enemy.health <= 0) {
    determineWinner({ player, enemy, timerID });
  }
}

animate();

window.addEventListener('keydown', (event) => {
  if (!player.dead) {
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
    }
  }

  if (!enemy.dead) {
    switch (event.key) {
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
