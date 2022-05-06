class Sprite {
  constructor({ position, imageSrc }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  draw() {
    context.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
    this.draw();
  }
}

class Fighter {
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
    this.health = 100;
  }

  draw() {
    const { x, y } = this.position;
    context.fillStyle = this.color;
    context.fillRect(x, y, this.width, this.height);
    // attackBox
    if (this.isAttacking) {
      context.fillStyle = 'green';
      context.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
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
