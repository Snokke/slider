import 'phaser';
import GAME_CONFIG from './core/game-config';
import MainScene from './states/main-scene';
import PreloadScene from './states/preload-scene';

class Main extends Phaser.Game {
  constructor(GAME_CONFIG: any) {
    super(GAME_CONFIG);

    this.scene.add('Game', MainScene);
    this.scene.add('Preloader', PreloadScene, true);
  }
}

window.addEventListener('load', () => {
  new Main(GAME_CONFIG);
});

// (function () { var script = document.createElement('script'); script.onload = function () { var stats = new Stats(); document.body.appendChild(stats.dom); requestAnimationFrame(function loop() { stats.update(); requestAnimationFrame(loop) }); }; script.src = '//mrdoob.github.io/stats.js/build/stats.min.js'; document.head.appendChild(script); })()
