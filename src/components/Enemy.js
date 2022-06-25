import Fighter from './Fighter';

import kenjiIdleImage from 'public/images/kenji/Idle.png';
import kenjiRunImage from 'public/images/kenji/Run.png';
import kenjiJumpImage from 'public/images/kenji/Jump.png';
import kenjiFallImage from 'public/images/kenji/Fall.png';
import kenjiAttackImage from 'public/images/kenji/Attack1.png';
import kenjiHitImage from 'public/images/kenji/Take hit.png';
import kenjiDeathImage from 'public/images/kenji/Death.png';

const Enemy = new Fighter({
  position: { x: 400, y: 100 },
  velocity: { x: 0, y: 0 },
  color: 'blue',
  imageSrc: kenjiIdleImage,
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 170,
  },
  sprites: {
    idle: {
      imageSrc: kenjiIdleImage,
      framesMax: 4,
    },
    run: {
      imageSrc: kenjiRunImage,
      framesMax: 8,
    },
    jump: {
      imageSrc: kenjiJumpImage,
      framesMax: 2,
    },
    fall: {
      imageSrc: kenjiFallImage,
      framesMax: 2,
    },
    attack1: {
      imageSrc: kenjiAttackImage,
      framesMax: 4,
    },
    takeHit: {
      imageSrc: kenjiHitImage,
      framesMax: 3,
    },
    death: {
      imageSrc: kenjiDeathImage,
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
