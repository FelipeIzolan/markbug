import Shoot from './Shoot.js';
import status from '../components/Status.js';

export default function(k) {
  const player = k.add([
    k.z(1),    
    k.sprite('player'),
    k.pos(48, 160),
    k.area({ shape: new k.Rect(k.vec2(0, 0), 6, 6) }),
    status(20, 2, 40, 6),
    'player',
    {
      timer: 0,
      upgrades: {
        purple: 3,
        green: 0
      }
    }
  ]);

  player.onKeyDown('z', () => {
    let dt = k.dt();
    let offset = [
      0, 3,
      -3, 6,
      -5, 8
    ];
    player.timer -= dt;
    if (player.timer <= 0) {
      Shoot(
        k,
        player.pos.add(k.vec2(1, -3)),
        player.dmg * 2,
        200,
        270,
        'purple-shoot-1',
        'p-shoot'
      ); 
      for (let i = 0; i < player.upgrades.purple; i++) {
        let a = i * 2;
        for (let j = 0; j < 2; j++) {
          Shoot(
            k,
            player.pos.add(k.vec2(offset[a + j], -5 + a)),
            player.dmg,
            player.spd + 160 - 8 * i,
            270,
            'purple-shoot-2',
            'p-shoot'
          );
        } 
      }
      player.timer = 1 / player.rps;
    }
  });

  player.onKeyDown(['left', 'right', 'up', 'down'], key => {
    let dir = k[key.toUpperCase()];
    let spd = k.isKeyDown('z') ? player.spd / 2 : player.spd;
    player.move(dir.scale(spd));
    if (key == 'left' || key == 'right')
      player.pos.x = k.clamp(
        player.pos.x,
        32 - player.area.offset.x,
        128 - player.area.shape.width
      );
    else
      player.pos.y = k.clamp(
        player.pos.y,
        -player.area.offset.y,
        192 - player.area.shape.height
      );
  });

  player.onDraw(() => {
    if (player.upgrades.green >= 1)
      k.drawSprite({
        sprite: 'green-1',
        pos: k.vec2(0, 5)
      });
    if (player.upgrades.green >= 2)
      k.drawSprite({
        sprite: 'green-2',
        pos: k.vec2(-2, 5)
      });
    if (player.upgrades.green >= 3)
      k.drawSprite({
        sprite: 'green-3',
        pos: k.vec2(-4, 6)
      });
    if (player.upgrades.purple >= 1)
      k.drawSprite({
        sprite: 'purple-1',
        pos: k.vec2(0, -2)
      });
    if (player.upgrades.purple >= 2)
      k.drawSprite({
        sprite: 'purple-2',
        pos: k.vec2(-2, -1)
      });
    if (player.upgrades.purple >= 3)
      k.drawSprite({
        sprite: 'purple-3',
        pos: k.vec2(-4, 1)
      });
  });
  
  return player;
}
