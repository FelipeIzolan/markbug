import './style.css';

import Game from './Game.js';
import Gameplay from './scenes/Gameplay.js';

const canvas = document.querySelector('canvas');
const game = new Game(canvas, 256, 240, 4);

game.load([
  // IMAGES 
  // -- PLAYER
  ['player', '/player.png'],
  // -- PLAYER-UPGRADES
  ['green-1', '/green-1.png'],
  ['green-2', '/green-2.png'],
  ['green-3', '/green-3.png'],
  ['green-4', '/green-4.png'],
  ['green-hud-1', '/green-hud-1.png'],
  ['green-hud-2', '/green-hud-2.png'],
  ['green-hud-3', '/green-hud-3.png'],
  ['purple-1', '/purple-1.png'],
  ['purple-2', '/purple-2.png'],
  ['purple-3', '/purple-3.png'],
  ['purple-4', '/purple-4.png'],
  ['purple-hud-1', '/purple-hud-1.png'],
  ['purple-hud-2', '/purple-hud-2.png'],
  ['purple-hud-3', '/purple-hud-3.png'],
  // -- ENEMIES
  // SOUNDS
  // FONTS
  ['Regule5', '/Regule5.otf']
]);

game.scene('gameplay', Gameplay); 
game.k.go('gameplay');
