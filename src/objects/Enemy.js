import machine from '../components/Machine.js';
import status from '../components/Status.js';

export default function(k, x, y, sprite, states) {
  const enemy = k.add([
    k.z(1),
    k.pos(x, y),
    k.area({ isSensor: true }),
    k.sprite(sprite),
    status(8, 2, 32, 3),
    machine(k, states),
    'enemy',
    {}
  ]); 

  enemy.onCollide('p-shot', obj => {
    enemy.hit(obj.dmg);
    obj.destroy();
  });

  enemy.onUpdate(() => {

  });

  return enemy;
}
