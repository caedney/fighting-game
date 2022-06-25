import Fighter from './Fighter';

const Player = new Fighter({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  color: 'red',
  offset: {
    x: 0,
    y: 0,
  },
  imageSrc: 'public/images/samuraiMack/Idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 156,
  },
  sprites: {
    idle: {
      imageSrc: 'public/images/samuraiMack/Idle.png',
      framesMax: 8,
    },
    run: {
      imageSrc: 'public/images/samuraiMack/Run.png',
      framesMax: 8,
    },
    jump: {
      imageSrc: 'public/images/samuraiMack/Jump.png',
      framesMax: 2,
    },
    fall: {
      imageSrc: 'public/images/samuraiMack/Fall.png',
      framesMax: 2,
    },
    attack1: {
      imageSrc: 'public/images/samuraiMack/Attack1.png',
      framesMax: 6,
    },
    takeHit: {
      imageSrc: 'public/images/samuraiMack/Take Hit - white silhouette.png',
      framesMax: 4,
    },
    death: {
      imageSrc: 'public/images/samuraiMack/Death.png',
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

export default Player;
