import { Bomb } from "./bomb.js";

export class Player {
  constructor(map) {
    if (!map || !Array.isArray(map) || map.length === 0) {
      throw new Error("Invalid map provided");
    }
    this.tileSize = 32;
    this.map = map;
    this.findInitialPosition();
    this.playerElement = null;
  }

  findInitialPosition() {
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        if (this.map[y][x] === 3) {
          this.x = x;
          this.y = y;
          return;
        }
      }
    }
    // Default to first available non-wall tile
    this.x = 2;
    this.y = 2;
  }

  render() {
    const gameBoard = document.getElementById("gameBoard");
    const playerTile = gameBoard.querySelector(
      `[data-x="${this.x}"][data-y="${this.y}"]`
    );

    const existingPlayer = document.querySelector(".player");
    if (existingPlayer) existingPlayer.remove();

    if (!playerTile) return;

    this.playerElement = document.createElement("div");
    this.playerElement.classList.add("player");
    this.playerElement.style.position = "absolute";
    this.playerElement.style.width = `${this.tileSize}px`;
    this.playerElement.style.height = `${this.tileSize}px`;
    this.playerElement.style.backgroundColor = "blue";
    this.playerElement.style.zIndex = "";

    this.playerElement.style.left = playerTile.offsetLeft + "px";
    this.playerElement.style.top = playerTile.offsetTop + "px";

    gameBoard.appendChild(this.playerElement);
  }

  // place the bomb on the map
  placeBomb() {
    console.log(`Trying to place bomb at (${this.x}, ${this.y})`);
    if (this.map[this.y][this.x] !== 1 && this.map[this.y][this.x] !== 4) {
      console.log(`Placing bomb at (${this.x}, ${this.y})`);
      this.map[this.y][this.x] = 4; // 4 represents a bomb
      const bomb = new Bomb(this.map, this.x, this.y, this.tileSize);
      bomb.render();
      bomb.explode();
    } else if (this.map[this.y][this.x] === 2) {
      console.log(`Placing bomb on breakable tile at (${this.x}, ${this.y})`);
      this.map[this.y][this.x] = 4; // 4 represents a bomb
      const bomb = new Bomb(this.map, this.x, this.y, this.tileSize);
      bomb.render();
      bomb.explode();
    } else {
      console.log(
        `Cannot place bomb at (${this.x}, ${this.y}) - tile is occupied`
      );
    }
  }

  // allows the player to move in the Tilemap
  move(dx, dy) {
    const newX = this.x + dx;
    const newY = this.y + dy;

    if (
      newX >= 0 &&
      newX < this.map[0].length &&
      newY >= 0 &&
      newY < this.map.length &&
      this.map[newY][newX] !== 1 && // wall
      this.map[newY][newX] !== 2 && // breakable tile
      this.map[newY][newX] !== 4 // bomb
    ) {
      this.map[this.y][this.x] = 0;
      this.x = newX;
      this.y = newY;
      this.map[this.y][this.x] = 3;
      this.render();
    }
  }

  // setup the controls for the player
  setupControls() {
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.move(0, -1);
          break;
        case "ArrowDown":
          this.move(0, 1);
          break;
        case "ArrowLeft":
          this.move(-1, 0);
          break;
        case "ArrowRight":
          this.move(1, 0);
          break;
        case " ":
          this.placeBomb();
          break;
      }
    });
  }
}
