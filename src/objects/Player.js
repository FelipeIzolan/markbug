import { clamp } from '../Math.js';

export default function(k) {
  const player = k.add([
    k.z(1),    
    k.sprite('player'),
    k.pos(125, 218),
    k.area({ shape: new k.Rect(k.vec2(0, 0), 6, 6) }),
    'player',
    {
      hp: 20,
      dmg: 2,
      spd: 40,
      rps: 3,
      timer: 0,
      upgrades: {
        purple: [],
        green: 0
      }
    }
  ]);

  player.pos.dx = player.pos.x;
  player.pos.dy = player.pos.y; 
  
  function moveX(dir, m, dt) {
    player.pos.dx = clamp(
      player.pos.dx + player.spd * m * dir * dt,
      56 - player.area.offset.x,
      200 - player.area.shape.width
    );
    player.pos.x = Math.trunc(player.pos.dx);
  }

  function moveY(dir, m, dt) {
    player.pos.dy = clamp(
      player.pos.dy + player.spd * m * dir * dt,
      -player.area.offset.y,
      240 - player.area.shape.height
    );
    player.pos.y = Math.trunc(player.pos.dy);
  }

  function bullet(x, y, spd) {
    k.add([
      k.z(0),
      k.area(),
      k.rect(1, 3),
      k.pos(player.pos.x + x, player.pos.y + y),
      k.color(225, 140, 250),
      k.move(270, spd),
      k.offscreen({ destroy: true, distance: 8 }),
      'bullet'
    ]);
  }

  player.onDraw(() => {
    if (player.upgrades.green >= 1)
      k.drawSprite({
        sprite: 'green-1',
        pos: k.vec2(0, 5)
      });
    if (player.upgrades.green >= 2)
      k.drawSprite({
        sprite: 'green-2',
        pos: k.vec2(-3, 5)
      });
    if (player.upgrades.green >= 3)
      k.drawSprite({
        sprite: 'green-3',
        pos: k.vec2(-2, 0)
      });
    if (player.upgrades.purple.length >= 1)
      k.drawSprite({
        sprite: 'purple-1',
        pos: k.vec2(0, -2)
      });
    if (player.upgrades.purple.length >= 2)
      k.drawSprite({
        sprite: 'purple-2',
        pos: k.vec2(-2, -1)
      });
    if (player.upgrades.purple.length >= 3)
      k.drawSprite({
        sprite: 'purple-3',
        pos: k.vec2(-4, 1)
      });
  });

  player.onUpdate(() => {
    let dt = k.dt();
    let shooting = k.isKeyDown('z');
    let m = shooting ? 0.5 : 1;
    if (k.isKeyDown('left'))
      moveX(-1, m, dt);
    if (k.isKeyDown('right'))
      moveX(1, m, dt);
    if (k.isKeyDown('up'))
      moveY(-1, m, dt);
    if (k.isKeyDown('down'))
      moveY(1, m, dt);
    if (shooting) {
      if (!player.upgrades.purple.length) {
        player.timer -= dt;
        if (player.timer <= 0) {
          bullet(2.5, 0, 200);
          player.timer = 1 / player.rps;
        }
      } else {
        let offset = [
          1, 4,
          -2, 7,
          -4, 9
        ];
        for (let i = 0; i < player.upgrades.purple.length; i++) {
          player.upgrades.purple[i] -= dt;
          if (player.upgrades.purple[i] <= 0) {
            let a = i * 2;
            let b = i + 1;
            let y = -5 + a;
            let spd = player.spd + 100 + 25 * b;
            bullet(offset[a], y, spd);
            bullet(offset[a + 1], y, spd);
            player.upgrades.purple[i] = 1 / (player.rps + b);
          }
        }
      }
    }
  });

  return player;
}
