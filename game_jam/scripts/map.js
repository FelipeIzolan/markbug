const map = (boom, player) => {
  const music = boom.play("music", { loop: true })

  const background = boom.add([
    boom.sprite("background"),
    boom.scale(8),
    boom.pos(0, -800),
    boom.move(boom.DOWN, 100)
  ])

  background.onUpdate(() => {
    if (background.pos.y > 0) {
      background.pos.y = -800
    }
  })

  const wall_up = boom.add([
    boom.rect(640, 1),
    boom.pos(0, 500),
    boom.solid(),
    boom.area(),
    boom.opacity(0)
  ])

  const wall_down = boom.add([
    boom.rect(640, 1),
    boom.pos(0, 800),
    boom.solid(),
    boom.area(),
    boom.opacity(0)
  ])

  const wall_left = boom.add([
    boom.rect(1, 300),
    boom.pos(0, 500),
    boom.solid(),
    boom.area(),
    boom.opacity(0)
  ])

  const wall_right = boom.add([
    boom.rect(1, 300),
    boom.pos(640, 500),
    boom.solid(),
    boom.area(),
    boom.opacity(0)
  ])

  boom.onUpdate(() => player.LIFE === 0 ? music.stop() : null)
  boom.onUpdate(() => player.LIFE >= 3 ? boom.destroyAll("map_life") : null)

  boom.loop(10, () => {
    if (player.LIFE < 3) {
      const box = boom.add([
        boom.sprite("map_life"),
        boom.area(),
        boom.scale(2),
        boom.pos(boom.rand(0, 640), boom.rand(500, 800)),
        "map_life"
      ])

      for(let i = 0; i < 5; i++){
          boom.add([
            boom.pos(box.pos.x + 16, box.pos.y + 16),
            boom.lifespan(1, { fade: 1 }),
            boom.rect(5, 5),
            boom.area(),
            boom.color(155, 155, 155),
            boom.origin("center"),
            boom.body({ solid: false }),
            boom.move(boom.choose([boom.LEFT, boom.RIGHT, boom.UP]), boom.rand(100, 360))
        ]).jump(boom.rand(300, 600))
      }
    }
  })

  boom.wait(1, () => {
    const box = boom.add([
      boom.sprite("map_double"),
      boom.pos(544, 600),
      boom.area(),
      boom.scale(2),
      "map_double"
    ])

    for(let i = 0; i < 5; i++){
      boom.add([
        boom.pos(box.pos.x + 16, box.pos.y + 16),
        boom.lifespan(1, { fade: 1 }),
        boom.rect(5, 5),
        boom.area(),
        boom.color(155, 155, 155),
        boom.origin("center"),
        boom.body({ solid: false }),
        boom.move(boom.choose([boom.LEFT, boom.RIGHT, boom.UP]), boom.rand(100, 360))
      ]).jump(boom.rand(300, 600))
    }
  })

  boom.wait(1, () => {
    const box = boom.add([
      boom.sprite("map_guided"),
      boom.pos(96, 600),
      boom.area(),
      boom.scale(2),
      "map_guided"
    ])

    for(let i = 0; i < 5; i++){
      boom.add([
        boom.pos(box.pos.x + 16, box.pos.y + 16),
        boom.lifespan(1, { fade: 1 }),
        boom.rect(5, 5),
        boom.area(),
        boom.color(155, 155, 155),
        boom.origin("center"),
        boom.body({ solid: false }),
        boom.move(boom.choose([boom.LEFT, boom.RIGHT, boom.UP]), boom.rand(100, 360))
      ]).jump(boom.rand(300, 600))
    }
  })

  boom.wait(5, () => {
    boom.destroyAll("map_guided")
    boom.destroyAll("map_double")
  })

  return { 
    background: background,
    music: music,
    walls: [
      wall_up,
      wall_down,
      wall_left,
      wall_right
    ] 
  }
}

export default map
