import Fighter from './Fighter';

const Enemy = new Fighter({
  position: { x: 400, y: 100 },
  velocity: { x: 0, y: 0 },
  color: 'blue',
  imageSrc: 'public/images/kenji/Idle.png',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 170,
  },
  sprites: {
    idle: {
      imageSrc: 'public/images/kenji/Idle.png',
      framesMax: 4,
    },
    run: {
      imageSrc: 'public/images/kenji/Run.png',
      framesMax: 8,
    },
    jump: {
      imageSrc: 'public/images/kenji/Jump.png',
      framesMax: 2,
    },
    fall: {
      imageSrc: 'public/images/kenji/Fall.png',
      framesMax: 2,
    },
    attack1: {
      imageSrc: 'public/images/kenji/Attack1.png',
      framesMax: 4,
    },
    takeHit: {
      imageSrc: 'public/images/kenji/Take hit.png',
      framesMax: 3,
    },
    death: {
      imageSrc: 'public/images/kenji/Death.png',
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

export default Enemy;
