import Player from '../objects/Player.js'; 
import Enemy from '../objects/Enemy.js';
import Overlay from '../objects/Overlay.js';

// z(0) = projectile
// z(1) = entity
// z(8) = overlay
// z(9) = overlay

export default function (k, payload) {
  k.add([
    k.pos(56, 0),
    k.rect(144, 240),
    k.color(12, 12, 12)
  ]);
  
  const player = Player(k);
  const overlay = Overlay(k);

  Enemy(k, 56 + Math.round(Math.random() * 112), 8);
  Enemy(k, 56 + Math.round(Math.random() * 112), 8);
  Enemy(k, 56 + Math.round(Math.random() * 112), 8);
  Enemy(k, 56 + Math.round(Math.random() * 112), 8);
  Enemy(k, 56 + Math.round(Math.random() * 112), 8);
}
