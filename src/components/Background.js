import Sprite from './Sprite';
import backgroundImage from 'public/images/background.png';

const Background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: backgroundImage,
});

export default Background;
