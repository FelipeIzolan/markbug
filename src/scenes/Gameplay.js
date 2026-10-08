import Player from '../objects/Player.js'; 
import Enemy from '../objects/Enemy.js';
import Overlay from '../objects/Overlay.js';

// z(0) = projectile / particles
// z(1) = entity
// z(8) = overlay
// z(9) = overlay

export default function (k, payload) {
  k.add([
    k.z(0),
    k.pos(32, 0),
    k.rect(96, 192),
    k.color(12, 12, 12)
  ]);

  const overlay = Overlay(k);
  const player = Player(k);

//   Enemy(k, 48, 32, 'enemy-1', { ..._test });
//   Enemy(k, 61, 32, 'enemy-1', { ..._test });
}
