export default function (k, vec2, dmg, spd, angle, sprite, tag) {
  let shoot = k.add([
    k.pos(vec2),
    k.area({ isSensor: true }),
    k.move(angle, spd),
    k.offscreen({ destroy: true, distance: 8 }),
    k.sprite(sprite),
    tag,
    { dmg }
  ]);

  return shoot;
}
