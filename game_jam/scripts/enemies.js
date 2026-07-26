import isBetween from "./isBetween.js";

function getEnemiesQuantity(score){
  if(score > 500) return 2
  if(score > 1000) return 3
  if(score > 5000) return 4
  if(score > 10000) return 5
  if(score > 20000) return 6
  if(score > 30000) return 7
  if(score > 40000) return 8
  if(score > 50000) return 9
  return 1
}

const enemies = (boom, player) => {
  boom.loop(1, () => {
    const enemiesQuantity = getEnemiesQuantity(player.SCORE)
    for(let i = 0; i < enemiesQuantity; i++){
      let sprite = `enemy${Math.ceil(Math.random() * 5)}`
      let color = (() => {
        switch (sprite) {
          case "enemy1": return {r: 225, g: 50, b: 50}
          case "enemy2": return {r: 50, g: 100, b: 255}
          case "enemy3": return {r: 130, g: 200, b: 255}
          case "enemy4": return {r: 60, g: 255, b: 125}
          case "enemy5": return {r: 45, g: 170, b: 55}
        }
      })()

      let enemy = boom.add([
        boom.sprite(sprite),
        boom.scale(2),
        boom.pos(boom.rand(-100, 740), boom.rand(-200, -32)),
        boom.area(),
        boom.state("movement"),
        "enemy"
      ])

      let bulletSpeed = boom.rand(300, 600)
      let bulletInterval = boom.rand(1, 5)
      let dirX = Math.round(boom.rand(-100, 740))
      let dirY = Math.round(boom.rand(-100, 450))

      enemy.onStateUpdate("movement", () => {
        let posX = Math.floor(enemy.pos.x)
        let posY = Math.floor(enemy.pos.y)

        let speedX = dirX > posX ? 150 : -150
        let speedY = dirY > posY ? 150 : -150  
        
        if (!isBetween(posX, dirX)) enemy.move(speedX, 0)
        else dirX = Math.round(boom.rand(-100, 740))

        if (!isBetween(posY, dirY)) enemy.move(0, speedY)
        else dirY = Math.round(boom.rand(-100, 450))
      })

      let bulletLoop = boom.loop(bulletInterval, () => {
        if (!enemy.exists()) return bulletLoop()

        let bullet = boom.add([
          boom.sprite("player_bullet"),
          boom.color(color.r, color.g, color.b),
          boom.pos(boom.vec2(enemy.pos.x + 42, enemy.pos.y)),
          boom.move(boom.DOWN, bulletSpeed),
          boom.area(),
          boom.lifespan(3),
          "enemy_bullet"
        ])

        bullet.onUpdate(() => {
         boom.add([
            boom.pos(bullet.pos),
            boom.lifespan(0.2, { fade: 1 }),
            boom.rect(3, 3),
            boom.area(),
            boom.color(color.r, color.g, color.b),
            boom.body({solid: false})
          ]).jump(boom.rand(100, 500)) 
        })
      })

      enemy.onCollide("player_bullet", (bullet) => {
        for(let i = 0; i < 6; i++){
          boom.add([
            boom.pos(enemy.pos),
            boom.lifespan(1, { fade: 1 }),
            boom.rect(5, 5),
            boom.area(),
            boom.color(color.r, color.g, color.b),
            boom.body({solid: false}),
            boom.move(boom.choose([boom.LEFT, boom.RIGHT]), boom.rand(100, 360))
        ]).jump(boom.rand(100, 500))
        }

        boom.play("enemy_death")
        player.SCORE += 5 + Math.floor(player.SCORE / 100)
        bullet.destroy()
        enemy.destroy()
      })
    }
  })
}

export default enemies
