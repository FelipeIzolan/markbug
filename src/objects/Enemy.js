
/*
{
  curr: 0 // index
  states: []
}
*/



export default function(k, x, y, sprite, states) {
  const enemy = k.add([
    k.z(1),
    k.sprite(sprite),
    k.pos(x, y),
    k.area(),
    'enemy',
    {
      hp: 8,
      dmg: 2,
      spd: 32,
      rps: 3, 
      machine: {
        curr: 0,
        states
      }
    }
  ]);

  enemy.pos.dx = enemy.pos.x;
  enemy.pos.dy = enemy.pos.y; 

  const player = k.get('player')[0];
  const score = k.get('score')[0];
  
  enemy.onCollide('bullet', obj => {
    obj.destroy();
  });

  enemy.onUpdate(() => {

  });

  return enemy;
}
