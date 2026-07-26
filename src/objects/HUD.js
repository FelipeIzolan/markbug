export default function(k) {
  // z(8) == hud background
  // z(9) == hud elements
  k.add([
    k.z(8),
    k.rect(56, 240),
    k.color(0, 0, 0)
  ]);
  
  k.add([
    k.z(8),
    k.pos(200, 0),
    k.rect(56, 240),
    k.color(0, 0, 0)
  ]);

  let font = { 
    size: 6,
    font: 'Regule5',
    letterSpacing: 0
  };

  k.add([  
    k.z(9),
    k.text('000000000', font),
    k.pos(10,219),
    'score',
    { value: 0 }
  ])

  k.add([
    k.z(9),
    k.text('HP: 20\nDMG: 02\nSPD: 32\nRPS: 03', font),
    k.pos(10, 16),
    'status'
  ]);
  
  k.add([
    k.z(9),
    k.sprite('purple-4'),
    k.pos(10, 55)
  ]);

  k.add([
    k.z(9),
    k.sprite('green-4'),
    k.pos(10, 64)
  ]);

  k.add([
    k.z(9),
    k.text('0', font),
    k.pos(19, 56),
    'purple-count'
  ]); 
  
  k.add([
    k.z(9),
    k.text('0', font),
    k.pos(19, 65),
    'green-count'
  ]);
  
  function upgrade(index) {
    for (const color of ['purple', 'green']) {
      let x = 10 + 6 * index;
      let y = 41 + (color == 'green' ? 7 : 0);
      let tag = color + '-hud-' + (index + 1);
      k.add([
        k.z(9),
        k.opacity(0.4),
        k.sprite(tag),
        k.pos(x, y),
        tag
      ]);
    }
  }

  upgrade(0);
  upgrade(1);
  upgrade(2);
}
