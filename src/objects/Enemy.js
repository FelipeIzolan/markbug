import status from '../components/Status.js';

export default function(k, x, y, sprite, states) {
  const enemy = k.add([
    k.z(1),
    k.pos(x, y),
    k.area({ isSensor: true }),
    k.sprite(sprite),
    status(8, 2, 32, 3),
    'enemy',
    {
      machine: {
        curr: 0,
        states
      }
    }
  ]); 

  enemy.onCollide('p-shoot', obj => {
    enemy.hit(obj.dmg);
    obj.destroy();
  });

  return enemy;
}
