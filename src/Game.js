import kaplay from 'kaplay';

class Game {
  constructor(canvas, width, height) {
    this.k = kaplay({
      width,
      height,
      canvas,
      crisp: true,
      letterbox: true,
      global: false
    });
  }

  load(list) {
    for (let [src, obj] of list) {
      let ext = src.slice(src.lastIndexOf('.') + 1);
      switch (ext) {
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'webp':
          if (typeof obj == 'string')
            this.k.loadSprite(obj, src);
          else
            this.k.loadSpriteAtlas(
              src,
              obj.reduce((prev, curr) => {
                let [name, x, y, width, height] = curr;
                prev[name] = { x, y, width, height };
                return prev;
              }, {})
            )
          break;
        case 'mp3':
        case 'wav':
        case 'ogg':
          this.k.loadSound(obj, src);
        case 'ttf':
        case 'otf':
        case 'woff':
          this.k.loadFont(obj, src, { filter: 'nearest' });
      }
    }
  }

  scene(name, callback) {
    this.k.scene(name, payload => callback(this.k, payload))
  }

  start(scene) {
    this.k.onLoad(() => {
      this.k.go(scene);
    });
  }
}

export default Game;
