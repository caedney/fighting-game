export default function determineWinner({ Player, Enemy, timerID }) {
  clearTimeout(timerID);
  document.querySelector('#display-text').style.display = 'flex';

  if (Player.health === Enemy.health) {
    document.querySelector('#display-text').innerHTML = 'TIE';
  } else if (Player.health > Enemy.health) {
    document.querySelector('#display-text').innerHTML = 'Player 1 Wins!';
  } else {
    document.querySelector('#display-text').innerHTML = 'Player 2 Wins!';
  }
}
