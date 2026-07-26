import { clamp } from '../Math.js';

export default function(k) {
  const player = k.add([
    k.sprite('player'),
    k.pos (125, 218),
    'player',
    {
      // POS (float) 
      x: 125,
      y: 218,
      // STATUS
      hp: 20,
      dmg: 2,
      spd: 32,
      rps: 3,
      // TIMER
      T_rps: 0,
      // BOUNDS
      bounds: { 
        x: 0,
        y: 0,
        w: 6, 
        h: 6
      }
    }
  ])

  function move(key, s, e) {
    let dir = k[key.toUpperCase()];
    let axis = dir.x != 0 ? 'x' : 'y';
    player[axis] = clamp(
      player[axis] + player.spd * dir[axis] * k.dt(),
      s - player.bounds[axis],
      e - player.bounds[axis == 'x' ? 'w' : 'h']
    );
    player.pos[axis] = Math.trunc(player[axis]);
  }

  function bullet(x, y, spd) {
    k.add([
      k.pos(player.pos.x + x, player.pos.y + y),
      k.rect(1, 3),
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

      if (!pu[0].opacity) {
        player.T_rps -= dt;
        if (player.T_rps <= 0) {
          bullet(2.5, -3, 200);
          player.T_rps = 1 / player.rps;
        }
      }

      for (let i in pu) {
        let u = pu[i];
        if (u.opacity < 1)
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
