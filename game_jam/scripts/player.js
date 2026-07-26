const player = (boom) => {
  let keys = ["a", "w", "d", "left", "up", "right"] 
  let entity = boom.add([
    boom.sprite("player"),
    boom.pos(boom.center().x, 700),
    boom.scale(2),
    boom.area(),
    boom.solid(),
    boom.z(1),
    "player",
    { 
      SPEED: 400,
      LIFE: 3,
      SCORE: 0,
      IS_INVULNERABLE: false,
      MODE: "normal"
    }
  ])
  
  boom.onKeyPress("space", () => {
    boom.play("player_hit")
    
    if (entity.MODE === "normal") {
      let bullet = boom.add([
        boom.sprite("player_bullet"),
        boom.pos(boom.vec2(entity.pos.x + 32, entity.pos.y)),
        boom.move(boom.UP, 500),
        boom.area(),
        boom.lifespan(3),
        "player_bullet"
      ])
 
      bullet.onUpdate(() => {
        boom.add([
          boom.pos(bullet.pos),
          boom.lifespan(0.2, { fade: 1 }),
          boom.rect(3, 3),
          boom.area(),
          boom.color(223, 255, 0),
          boom.body({solid: false})
        ]).jump(boom.rand(100, 500))
      })
    }

    if (entity.MODE === "double") {
      for(let i = 0; i < 2; i++){
        let marginX = i === 1 ? 16 : 46
        let bullet = boom.add([
          boom.sprite("player_bullet"),
          boom.pos(boom.vec2(entity.pos.x + marginX, entity.pos.y)),
          boom.move(boom.UP, 600),
          boom.area(),
          boom.lifespan(3),
          "player_bullet"
        ])
 
        bullet.onUpdate(() => {
          boom.add([
            boom.pos(bullet.pos),
            boom.lifespan(0.2, { fade: 1 }),
            boom.rect(3, 3),
            boom.area(),
            boom.color(223, 255, 0),
            boom.body({solid: false})
          ]).jump(boom.rand(100, 500))
        })
      }
    }

    if (entity.MODE === "guided") { 
        let bullet = boom.add([
          boom.sprite("player_bullet"),
          boom.pos(boom.vec2(entity.pos.x + 32, entity.pos.y)),
          boom.area(),
          boom.rotate(0),
          boom.lifespan(5),
          "player_bullet"
        ])
 
        let enemies = boom.get("enemy")
        let enemy = enemies[Math.floor(Math.random() * enemies.length)]

        bullet.onUpdate(() => {
          if (!enemy.exists()) bullet.destroy()

          let angle = enemy.angle
          let dir = enemy.pos.sub(bullet.pos).unit()
          
          bullet.move(dir.scale(400)) 
          bullet.angle = angle

          boom.add([
            boom.pos(bullet.pos),
            boom.lifespan(0.2, { fade: 1 }),
            boom.rect(3, 3),
            boom.area(),
            boom.color(223, 255, 0),
            boom.body({solid: false})
          ]).jump(boom.rand(10, 100))
        })
      }
  })

  boom.onKeyDown(["w", "up"], () => { entity.move(0, -entity.SPEED); entity.play("idle")})
  boom.onKeyDown(["s", "down"], () => { entity.move(0, entity.SPEED); entity.play("idle") })
  boom.onKeyDown(["a", "left"], () => { entity.move(-entity.SPEED, 0); entity.play("move"); entity.flipX(true) })
  boom.onKeyDown(["d", "right"], () => { entity.move(entity.SPEED, 0); entity.play("move"); entity.flipX(false) })
  boom.onKeyRelease(keys, () => entity.play("idle"))

  entity.onUpdate(() => {
    for(let i = 0; i < entity.LIFE; i++){
      boom.add([
        boom.lifespan(0.001),
        boom.scale(3),
        boom.sprite("player_life"),
        boom.pos(boom.vec2(32 + (32 * i), 32))
      ])
    }

    boom.add([
      boom.text(entity.SCORE, { size: 32 }),
      boom.pos(512, 32),
      boom.lifespan(0.001)
    ]) 

    if (entity.LIFE === 0){
      boom.go("gameover", entity.SCORE)
    }
  })

  entity.onCollide("enemy_bullet", (bullet) => {
    if (!entity.IS_INVULNERABLE){
      boom.play("player_hurt")
      boom.shake(10)
      entity.LIFE -= 1
      entity.IS_INVULNERABLE = true
      boom.wait(1, () => entity.IS_INVULNERABLE = false)
    }

    bullet.destroy()
  })

  entity.onCollide("map_life", (box) => {
    box.destroy()
    boom.play("player_buff")
    if(entity.LIFE + 1 <= 3) entity.LIFE += 1
  })

  entity.onCollide("map_double", (box) => {
    box.destroy()
    boom.play("player_buff")
    entity.MODE = "double"
  })

  entity.onCollide("map_guided", (box) => {
    box.destroy()
    boom.play("player_buff")
    entity.MODE = "guided"
  })

  return entity
}

export default player
