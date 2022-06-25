import Fighter from './Fighter';

import samuraiMackIdleImage from 'public/images/samuraiMack/Idle.png';
import samuraiMackRunImage from 'public/images/samuraiMack/Run.png';
import samuraiMackJumpImage from 'public/images/samuraiMack/Jump.png';
import samuraiMackFallImage from 'public/images/samuraiMack/Fall.png';
import samuraiMackAttackImage from 'public/images/samuraiMack/Attack1.png';
import samuraiMackHitImage from 'public/images/samuraiMack/Take Hit - white silhouette.png';
import samuraiMackDeathImage from 'public/images/samuraiMack/Death.png';

const Player = new Fighter({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  color: 'red',
  offset: {
    x: 0,
    y: 0,
  },
  imageSrc: samuraiMackIdleImage,
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 156,
  },
  sprites: {
    idle: {
      imageSrc: samuraiMackIdleImage,
      framesMax: 8,
    },
    run: {
      imageSrc: samuraiMackRunImage,
      framesMax: 8,
    },
    jump: {
      imageSrc: samuraiMackJumpImage,
      framesMax: 2,
    },
    fall: {
      imageSrc: samuraiMackFallImage,
      framesMax: 2,
    },
    attack1: {
      imageSrc: samuraiMackAttackImage,
      framesMax: 6,
    },
    takeHit: {
      imageSrc: samuraiMackHitImage,
      framesMax: 4,
    },
    death: {
      imageSrc: samuraiMackDeathImage,
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
