import kaboom from "./kaboom/kaboom.mjs";
import loadGame from "./scripts/loadGame.js";
import _player from "./scripts/player.js";
import _map from "./scripts/map.js";
import _enemies from "./scripts/enemies.js";

const boomOptions = {
  width: 640,
  height: 800,
  canvas: document.getElementById("game-screen"),
  global: false,
  background: [0, 0, 0],
  scale: 1
}

const boom = kaboom(boomOptions)
// boom.debug.inspect = true
loadGame(boom)
