import _player from "./player.js";
import _map from "./map.js";
import _enemies from "./enemies.js";

async function loadGame(boom){
  const playerAnimSet = { 
    sliceX: 2, 
    anims: { 
      "idle": { from: 0, to: 0 }, 
      "move": { from: 1, to: 1 } 
    }
  }

  boom.loadSound("player_hurt", "./assets/player_hurt.wav")
  boom.loadSound("player_hit", "./assets/player_hit.wav")
  boom.loadSound("enemy_death", "./assets/enemy_death.wav")
  boom.loadSound("player_death", "./assets/player_death.wav")
  boom.loadSound("player_buff", "./assets/player_buff.wav")
  boom.loadSound("music", "./assets/music.wav")

  boom.loadSprite("gameover", "./assets/gameover.png")
  boom.loadSprite("title", "./assets/title.png")
  boom.loadSprite("background", "./assets/background.png")
  boom.loadSprite("player", "./assets/player.png", playerAnimSet)
  boom.loadSprite("player_bullet", "./assets/player_bullet.png")
  boom.loadSprite("map_life", "./assets/map_life.png")
  boom.loadSprite("map_double", "./assets/map_double.png")
  boom.loadSprite("map_guided", "./assets/map_guided.png")
  boom.loadSprite("player_life", "./assets/player_life.png")
  boom.loadSprite("enemy1", "./assets/enemy_1.png")
  boom.loadSprite("enemy2", "./assets/enemy_2.png")
  boom.loadSprite("enemy3", "./assets/enemy_3.png")
  boom.loadSprite("enemy4", "./assets/enemy_4.png")
  boom.loadSprite("enemy5", "./assets/enemy_5.png")

  boom.volume(0.2)

  boom.scene("menu", () => {
    boom.add([
      boom.sprite("background"),
      boom.scale(8),
      boom.pos(0, 64)
    ])

    boom.add([
      boom.sprite("title"),
      boom.scale(6),
      boom.origin("center"),
      boom.pos(320, 64)
    ])

    boom.add([
      boom.text("Made by Felipe Izolan / Markjam#1", { size: 14 }),
      boom.pos(160, 780),
      boom.origin("center")
    ])

    let rotateSpeed = 75
    const bug = boom.add([
      boom.sprite("player"),
      boom.scale(5),
      boom.area(),
      boom.origin("center"),
      boom.pos(320, 350),
      boom.rotate(0)
    ])

    bug.onUpdate(() => {
      if (bug.isHovering()) rotateSpeed = 300
      else rotateSpeed = 75

      bug.angle += rotateSpeed * boom.dt()
    })
    
    const text = boom.add([
      boom.text("PRESS ENTER", { size: 21 }),
      boom.pos(320, 512),
      boom.origin("center"),
      boom.opacity(0)
    ])

    text.onUpdate(() => {
      let opacityINT = Math.trunc(text.opacity)
      if (opacityINT !== 1) text.opacity += 1 * boom.dt()
      else text.opacity = 0 
    })


    boom.onKeyPress("enter", () => boom.go("play"))
  })

  boom.scene("play", () => {
    const player = _player(boom)
    const map = _map(boom, player)
    const enemies = _enemies(boom, player) 
  })

  boom.scene("gameover", (score) => {
    boom.play("player_death")

    boom.add([
      boom.sprite("gameover"),
      boom.scale(5),
      boom.pos(320, 320),
      boom.origin("center")
    ])

    boom.add([
      boom.text("GAME OVER", { size: 25 }),
      boom.pos(320, 380),
      boom.origin("center")
    ])

    boom.add([
      boom.text("score: " + score, { size: 16 }),
      boom.pos(320, 400),
      boom.origin("center")
    ])

    boom.wait(4, () => boom.go("menu"))
  })

  boom.go("menu")
}

export default loadGame
