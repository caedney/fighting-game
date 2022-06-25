import { context, canvas } from 'utils/gameSetup';
import Background from 'components/Background';
import Shop from 'components/Shop';
import Player from 'components/Player';
import Enemy from 'components/Enemy';

import detectCollision from 'utils/detectCollision';
import determineWinner from 'utils/determineWinner';
import decreaseTimer, { timerID } from 'utils/decreaseTimer';

import 'styles/index.scss';

decreaseTimer();

function animate() {
  window.requestAnimationFrame(animate);
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
  Background.update();
  Shop.update();
  context.fillStyle = 'rgba(255, 255, 255, 0.18)';
  context.fillRect(0, 0, canvas.width, canvas.height);
  Player.update();
  Enemy.update();

  // Player
  Player.velocity.x = 0;

  if (Player.pressedKeys[0] === 'a') {
    Player.velocity.x = -Player.speed;
    Player.switchSprite('run');
  } else if (Player.pressedKeys[0] === 'd') {
    Player.velocity.x = Player.speed;
    Player.switchSprite('run');
  } else {
    Player.switchSprite('idle');
  }

  if (Player.velocity.y < 0) {
    Player.switchSprite('jump');
  } else if (Player.velocity.y > 0) {
    Player.switchSprite('fall');
  }

  // Enemy
  Enemy.velocity.x = 0;

  if (Enemy.pressedKeys[0] === 'ArrowLeft') {
    Enemy.velocity.x = -Enemy.speed;
    Enemy.switchSprite('run');
  } else if (Enemy.pressedKeys[0] === 'ArrowRight') {
    Enemy.velocity.x = Enemy.speed;
    Enemy.switchSprite('run');
  } else {
    Enemy.switchSprite('idle');
  }

  if (Enemy.velocity.y < 0) {
    Enemy.switchSprite('jump');
  } else if (Enemy.velocity.y > 0) {
    Enemy.switchSprite('fall');
  }

  // Detect Player collision
  if (
    detectCollision(Player, Enemy) &&
    Player.isAttacking &&
    Player.framesCurrent === 4
  ) {
    Enemy.takeHit();
    Player.isAttacking = false;

    gsap.to('#enemy-health-gauge', {
      width: `${Enemy.health}%`,
    });
  }

  // Player misses attack
  if (Player.isAttacking && Player.framesCurrent === 4) {
    Player.isAttacking = false;
  }

  // Detect ememy collision
  if (
    detectCollision(Enemy, Player) &&
    Enemy.isAttacking &&
    Enemy.framesCurrent === 2
  ) {
    Player.takeHit();
    Enemy.isAttacking = false;

    gsap.to('#player-health-gauge', {
      width: `${Player.health}%`,
    });
  }

  // Enemy misses attack
  if (Enemy.isAttacking && Enemy.framesCurrent === 2) {
    Enemy.isAttacking = false;
  }

  // End game based on health
  if (Player.health <= 0 || Enemy.health <= 0) {
    determineWinner({ Player, Enemy, timerID });
  }
}

animate();

window.addEventListener('keydown', (event) => {
  if (!Player.dead) {
    switch (event.key) {
      case 'a': {
        Player.addPressedKey('a');
        break;
      }
      case 'd': {
        Player.addPressedKey('d');
        break;
      }
      case 'w': {
        Player.velocity.y = Player.jumpHeight;
        break;
      }
      case ' ': {
        Player.attack();
        break;
      }
    }
  }

  if (!Enemy.dead) {
    switch (event.key) {
      case 'ArrowLeft': {
        Enemy.addPressedKey('ArrowLeft');
        break;
      }
      case 'ArrowRight': {
        Enemy.addPressedKey('ArrowRight');
        break;
      }
      case 'ArrowUp': {
        Enemy.velocity.y = Enemy.jumpHeight;
        break;
      }
      case 'ArrowDown': {
        Enemy.attack();
        break;
      }
    }
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'a': {
      Player.removePressedKey('a');
      break;
    }
    case 'd': {
      Player.removePressedKey('d');
      break;
    }
    case 'ArrowLeft': {
      Enemy.removePressedKey('ArrowLeft');
      break;
    }
    case 'ArrowRight': {
      Enemy.removePressedKey('ArrowRight');
      break;
    }
  }
});
