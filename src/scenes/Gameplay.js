import Player from '../objects/Player.js'; 
import HUD from '../objects/HUD.js';

export default function (payload) {
  this.add([
    this.pos(56, 0),
    this.rect(144, 240),
    this.color(12, 12, 12)
  ]);

  const hud = HUD(this);
  const player = Player(this);
}
