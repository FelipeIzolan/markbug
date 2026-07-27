export default function(k, x, y) {
  const enemy = k.add([ 
    k.sprite('enemy-' + (Math.floor(Math.random() * 3) + 1)),
    k.pos(x, y),
    k.area(),
    'enemy',
    {
      hp: 8,
      dmg: 2,
      spd: 32,
      rps: 3, 
    }
  ]);

  enemy.pos.dx = enemy.pos.x;
  enemy.pos.dy = enemy.pos.y; 

  const player = k.get('player')[0];
  const score = k.get('score')[0];
  
  enemy.onCollide('bullet', obj => {
    obj.destroy();
  });

  return enemy;
}
