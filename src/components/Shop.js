import Sprite from './Sprite';
import shopImage from 'public/images/shop.png';

const Shop = new Sprite({
  position: {
    x: 620,
    y: 128,
  },
  imageSrc: shopImage,
  scale: 2.75,
  framesMax: 6,
});

export default Shop;
