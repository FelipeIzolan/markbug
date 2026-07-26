import kaplay from 'kaplay';

class Game {
  constructor(canvas, width, height, scale) {
    this.k = kaplay({
      scale,
      width,
      height,
      canvas,
      global: false
    });
  }

  load(list) {
    for (let [name, src] of list) {
      let ext = src.slice(src.lastIndexOf('.') + 1);
      switch (ext) {
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'webp':
          this.k.loadSprite(name, src);
          break;
        case 'mp3':
        case 'wav':
        case 'ogg':
          this.k.loadSound(name, src);
        case 'ttf':
        case 'otf':
        case 'woff':
          this.k.loadFont(name, src, { filter: 'nearest' });
      }
    }
  }

  scene(name, callback) {
    callback = callback.bind(this.k)
    this.k.scene(name, callback)
  }
}

export default Game;
