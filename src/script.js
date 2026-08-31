import './style.css';

import Game from './Game.js';

import TitleScreen from './scenes/TitleScreen.js';
import Gameplay from './scenes/Gameplay.js';

const canvas = document.querySelector('canvas');
const game = new Game(canvas, 160, 192);

game.load([
  [
    '/player.png',
    [
      ['player', 0, 8, 6, 6],
      ['purple-1', 22, 0, 6, 3],
      ['purple-2', 20, 4, 10, 4],
      ['purple-3', 18, 9, 14, 6],
      ['purple-4', 0, 0, 7, 7],
      ['purple-shoot-1', 7, 8, 4, 3],
      ['purple-shoot-2', 12, 8, 3, 3],
      ['purple-shoot-3', 16, 8, 1, 3],
      ['green-1', 37, 0, 6, 6],
      ['green-2', 35, 6, 10, 6],
      ['green-3', 33, 12, 14, 3],
      ['green-4', 8, 0, 7, 7],
    ]
  ],
  [
    '/enemy.png',
    [
      ['enemy-1', 0, 0, 12, 10],
      ['enemy-2', 13, 0, 12, 10],
      ['enemy-3', 26, 0, 12, 10],
      ['enemy-4', 0, 11, 11, 9],
      ['enemy-5', 12, 11, 11, 9],
      ['enemy-6', 24, 11, 11, 9],
      ['drone-1', 0, 21, 5, 5],
      ['drone-2', 6, 21, 5, 5],
      ['drone-3', 12, 21, 5, 5],
      ['drone-4', 18, 23, 3, 3],
      ['drone-5', 22, 23, 4, 3],
      ['drone-6', 27, 23, 3, 3],
    ]
  ],
  [
    '/overlay.png',
    [
      ['hp', 0, 0, 7, 7],
      ['dmg', 8, 0, 7, 7],
      ['spd', 16, 0, 7 ,7],
      ['rps', 24, 0, 7, 7],
      ['upgrade-1', 0, 8, 5, 5],
      ['upgrade-2', 6, 8, 5, 5],
      ['upgrade-3', 12, 8, 5, 5],
      ['upgrade-4', 18, 8, 5, 5],
      ['upgrade-5', 24, 8, 5, 5],
      ['upgrade-6', 30, 8, 5, 5],
    ]
  ]
]);

game.scene('title-screen', TitleScreen); 
game.scene('gameplay', Gameplay); 
game.start('gameplay');
