import { TileMap } from "./Tilemap.js";
import { CollisionManager } from "./collison.js";
import { Player } from "./player.js";
import { PauseManager } from "./pause.js";
import { Bomb } from "./bomb.js";

const tileMap = new TileMap();
tileMap.draw();
const player = new Player(tileMap.map);
player.render();
player.setupControls();
// Game.js
export class Game {
  constructor() {
    this.tileMap = new TileMap();
    this.collisionManager = new CollisionManager(this.tileMap);
    this.player = new Player(this.tileMap, this.collisionManager); // where the player is positioned
    this.pauseManager = new PauseManager(this);
    this.setupControls();
  }

  setupControls() {
    document.addEventListener("keydown", (e) => {
      if (this.pauseManager.isPaused) return;
      console.log("keys pressed"); // log the keypress

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
