const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
context.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.75;
const jumpHeight = -20;
const speed = 5;

class Sprite {
  constructor({ position, velocity, color, offset }) {
    this.position = position;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.pressedKeys = [];
    this.color = color;
    this.isAttacking = false;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset,
      width: 100,
      height: 50,
    };
  }

  draw() {
    const { x, y } = this.position;
    context.fillStyle = this.color;
    context.fillRect(x, y, this.width, this.height);
    // attackBox
    // if (this.isAttacking) {
    context.fillStyle = 'green';
    context.fillRect(
      this.attackBox.position.x,
      this.attackBox.position.y,
      this.attackBox.width,
      this.attackBox.height
    );
    // }
  }

  update() {
    this.draw();

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }

  attack() {
    this.isAttacking = true;

    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }

  addPressedKey(key) {
    if (this.pressedKeys.indexOf(key) < 0) {
      this.pressedKeys.unshift(key);
    }
  }

  removePressedKey(key) {
    const index = this.pressedKeys.indexOf(key);

    if (index > -1) {
      this.pressedKeys.splice(index, 1);
    }
  }
}

const player = new Sprite({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  color: 'red',
  offset: {
    x: 0,
    y: 0,
  },
});

const enemy = new Sprite({
  position: { x: 400, y: 100 },
  velocity: { x: 0, y: 0 },
  color: 'blue',
  offset: {
    x: -50,
    y: 0,
  },
});

function animate() {
  window.requestAnimationFrame(animate);
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
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

  // Detect a collision
  if (
    player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
    player.attackBox.position.x <= enemy.position.x + enemy.width &&
    player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
    player.attackBox.position.y <= enemy.position.y + enemy.height &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    console.log('collision');
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
