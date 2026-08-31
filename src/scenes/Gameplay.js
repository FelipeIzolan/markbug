import Player from '../objects/Player.js'; 
import Enemy from '../objects/Enemy.js';
import Overlay from '../objects/Overlay.js';

// z(0) = projectile / particles
// z(1) = entity
// z(8) = overlay
// z(9) = overlay

export default function (k, payload) {
  k.add([
    k.pos(32, 0),
    k.rect(96, 192),
    k.color(12, 12, 12)
  ]);
  const player = Player(k);
  const overlay = Overlay(k);

  Enemy(k, 56, 16, 'enemy-1', []);
  Enemy(k, 80, 16, 'enemy-1', []);
}
