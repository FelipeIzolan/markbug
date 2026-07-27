import { clamp } from '../Math.js';

export default function(k) {
  const player = k.add([
    k.sprite('player'),
    k.pos(125, 218),
    k.area({ shape: new k.Rect(k.vec2(0, 0), 6, 6) }),
    'player',
    {
      hp: 20,
      dmg: 2,
      spd: 32,
      rps: 3, 
    }
  ]);

  player.pos.dx = player.pos.x;
  player.pos.dy = player.pos.y; 

  function move(key, s, e) {
    let dir = k[key.toUpperCase()];
    let a = dir.x != 0 ? 'x' : 'y';
    let da = 'd' + a;
    player.pos[da] = clamp(
      player.pos[da] + player.spd * dir[a] * k.dt(),
      s - player.area.offset[a],
      e - player.area.shape[a == 'x' ? 'width' : 'height']
    );
    player.pos[a] = Math.trunc(player.pos[da]);
  }

  function bullet(x, y, spd) {
    k.add([
      k.area(),
      k.rect(1, 3),
      k.pos(player.pos.x + x, player.pos.y + y),
      k.color(225, 140, 250),
      k.move(270, spd),
      k.offscreen({ destroy: true, distance: 1 }),
      'bullet'
    ]);
  }

  player.add([
    k.sprite('purple-1'),
    k.pos(0, -2),
    k.opacity(0),
    'purple',
    {
      spd: 160,
      rps: 3,
      // TIMER
      T_rps: 0,
      // POSITION
      L_x: 1,
      R_x: 4
    }
  ]);
  
  player.add([
    k.sprite('purple-2'),
    k.pos(-2, -1),
    k.opacity(0),
    'purple',
    {
      spd: 180,
      rps: 5,
      // TIMER
      T_rps: 0,
      // POSITION
      L_x: -2,
      R_x: 7
    }
  ]);
  
  player.add([
    k.sprite('purple-3'),
    k.pos(-4, 1),
    k.opacity(0),
    'purple',
    {
      spd: 200,
      rps: 9,
      // TIMER
      T_rps: 0,
      // POSITION
      L_x: -4,
      R_x: 9
    }
  ]);

  player.add([
    k.sprite('green-1'),
    k.pos(0, 5),
    k.opacity(0),
  ]);

  player.add([
    k.sprite('green-2'),
    k.pos(-3, 6),
    k.opacity(0),
  ]);

  player.add([
    k.sprite('green-3'),
    k.pos(-2, 9),
    k.opacity(0),
  ]);

  player.onKeyDown(['up', 'down', 'left', 'right'], key => {
    switch (key) {
      case 'up':
      case 'down':
        move(key, 0, 240);
        break;
      case 'left':
      case 'right':
        move(key, 56, 200);
        break;
    }
  });

  player.onUpdate(() => {
    if (k.isKeyDown('z')) {
      let dt = k.dt();
      let pu = player.get('purple');

      let u1 = pu[0]; 
      if (!u1.opacity) {
        u1.T_rps -= dt;
        if (u1.T_rps <= 0) {
          bullet(2.5, -3, 200);
          u1.T_rps = 1 / player.rps;
        } 
      }
      
      for (let i in pu) {
        let u = pu[i];
        if (!u.opacity)
          continue;
        u.T_rps -= dt;
        if (u.T_rps <= 0) {
          let y = -5 + i * 2;
          bullet(u.L_x, y, player.spd + u.spd);
          bullet(u.R_x, y, player.spd + u.spd);
          u.T_rps = 1 / (player.rps + u.rps);
        }
      }
    }
  });

  return player;
}
