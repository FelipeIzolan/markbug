export default function(k) {
  let container = k.add([ k.z(8) ]);
  container.onDraw(() => { 
    k.drawRect({
      width: 32,
      height: 192,
      pos: k.vec2(0, 0),
      color: k.BLACK
    });
    k.drawRect({
      width: 32,
      height: 192,
      pos: k.vec2(128, 0),
      color: k.BLACK
    });
    k.drawSprite({
      sprite: "hp",
      pos: k.vec2(4, 4)
    });
    k.drawSprite({
      sprite: "dmg",
      pos: k.vec2(4, 12)
    });
    k.drawSprite({
      sprite: "spd",
      pos: k.vec2(4, 20)
    });
    k.drawSprite({
      sprite: "rps",
      pos: k.vec2(4, 28)
    });
    k.drawSprite({
      sprite: "upgrade-1",
      pos: k.vec2(132, 4)
    });
    k.drawSprite({
      sprite: "upgrade-2",
      pos: k.vec2(138, 4)
    });
    k.drawSprite({
      sprite: "upgrade-3",
      pos: k.vec2(144, 4)
    });
    k.drawSprite({
      sprite: "upgrade-4",
      pos: k.vec2(132, 10)
    });
    k.drawSprite({
      sprite: "upgrade-5",
      pos: k.vec2(138, 10)
    });
    k.drawSprite({
      sprite: "upgrade-6",
      pos: k.vec2(144, 10)
    });
    k.drawSprite({
      sprite: "purple-4",
      pos: k.vec2(132, 16)
    });
    k.drawSprite({
      sprite: "green-4",
      pos: k.vec2(132, 24)
    });
  });
}
