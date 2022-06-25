import Sprite from './Sprite';

const Shop = new Sprite({
  position: {
    x: 620,
    y: 128,
  },
  imageSrc: 'public/images/shop.png',
  scale: 2.75,
  framesMax: 6,
});

export default Shop;
