import Player from '../components/Player';
import Enemy from '../components/Enemy';
import determineWinner from './determineWinner';

let timer = 60;
let timerID;

function decreaseTimer() {
  if (timer > 0) {
    timer -= 1;
    document.getElementById('timer').innerHTML = timer;
    timerID = setTimeout(decreaseTimer, 1000);
  }

  if (timer === 0) {
    determineWinner({ Player, Enemy, timerID });
  }
}

export { decreaseTimer as default, timerID };
