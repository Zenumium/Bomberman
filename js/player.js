export class Player {
  constructor(tileMap) {
    if (!tileMap || !tileMap.map || !tileMap.map.length) {
      throw new Error("Invalid TileMap provided");
    }
    this.tileMap = tileMap;
    this.findInitialPosition();
    this.playerElement = null;
  }

  findInitialPosition() {
    for (let y = 0; y < this.tileMap.map.length; y++) {
      for (let x = 0; x < this.tileMap.map[y].length; x++) {
        if (this.tileMap.map[y][x] === 3) {
          this.x = x;
          this.y = y;
          return;
        }
      }
    }
    // If no player start position is found, default to first row
    this.x = 0;
    this.y = 0;
    console.warn("No player start position found. Defaulting to (0,0)");
  }

  render() {
    const existingPlayer = document.querySelector(".player");
    if (existingPlayer) existingPlayer.remove();

    const gameBoard = document.getElementById("gameBoard");
    const playerTile = gameBoard.querySelector(
      `[data-x="${this.x}"][data-y="${this.y}"]`
    );

    if (!playerTile) {
      console.error("Unable to find player tile");
      return;
    }

    this.playerElement = document.createElement("div");
    this.playerElement.classList.add("player");
    this.playerElement.style.position = "absolute";
    this.playerElement.style.width = `${this.tileMap.tileSize}px`;
    this.playerElement.style.height = `${this.tileMap.tileSize}px`;
    this.playerElement.style.backgroundColor = "red";
    this.playerElement.style.zIndex = "10";

    this.playerElement.style.left = playerTile.offsetLeft + "px";
    this.playerElement.style.top = playerTile.offsetTop + "px";

    gameBoard.appendChild(this.playerElement);
  }

  move(dx, dy) {
    const newX = this.x + dx;
    const newY = this.y + dy;

    if (
      newX >= 0 &&
      newX < this.tileMap.map[0].length &&
      newY >= 0 &&
      newY < this.tileMap.map.length &&
      this.tileMap.getTile(newX, newY) !== 1
    ) {
      this.tileMap.setTile(this.x, this.y, 0);
      this.x = newX;
      this.y = newY;
      this.tileMap.setTile(this.x, this.y, 3);
      this.render();
    }
  }

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
      }
    });
  }
}
