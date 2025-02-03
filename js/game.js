import { TileMap } from "./Tilemap.js";
import { CollisionManager } from "./collison.js";
import { Player } from "./player.js";
import { PauseManager } from "./pause.js";

// Game.js
export class Game {
  constructor() {
    this.tileMap = new TileMap();
    this.collisionManager = new CollisionManager(this.tileMap);
    this.player = new Player(32, 32, this.tileMap, this.collisionManager);
    this.pauseManager = new PauseManager(this);
    this.setupControls();
  }

  setupControls() {
    document.addEventListener("keydown", (e) => {
      if (this.pauseManager.isPaused) return;

      switch (e.key) {
        case "ArrowUp":
          this.player.move("up");
          break;
        case "ArrowDown":
          this.player.move("down");
          break;
        case "ArrowLeft":
          this.player.move("left");
          break;
        case "ArrowRight":
          this.player.move("right");
          break;
        case " ":
          this.player.placeBomb();
          break;
        case "Escape":
          this.pauseManager.togglePause();
          break;
      }
    });
  }

  start() {
    this.tileMap.draw();
    this.player.updatePosition();
  }
}
