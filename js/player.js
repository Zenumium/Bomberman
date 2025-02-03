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
    this.playerElement.style.backgroundColor = "red";
    this.playerElement.style.zIndex = "";

    this.playerElement.style.left = playerTile.offsetLeft + "px";
    this.playerElement.style.top = playerTile.offsetTop + "px";

    gameBoard.appendChild(this.playerElement);
  }

  placeBomb() {
    if (this.map[this.y][this.x] === 3) {
      this.map[this.y][this.x] = 4; // 4 represents a bomb
      this.renderBomb();
    }
  }

  renderBomb() {
    const gameBoard = document.getElementById("gameBoard");
    const bombTile = gameBoard.querySelector(
      `[data-x="${this.x}"][data-y="${this.y}"]`
    );

    const existingBomb = document.querySelector(
      `.bomb[data-x="${this.x}"][data-y="${this.y}"]`
    );
    if (existingBomb) existingBomb.remove();

    if (!bombTile) return;

    const bombElement = document.createElement("div");
    bombElement.classList.add("bomb");
    bombElement.style.position = "absolute";
    bombElement.style.width = `${this.tileSize}px`;
    bombElement.style.height = `${this.tileSize}px`;
    bombElement.style.backgroundColor = "black";
    bombElement.style.zIndex = "";

    bombElement.style.left = bombTile.offsetLeft + "px";
    bombElement.style.top = bombTile.offsetTop + "px";

    bombElement.setAttribute("data-x", this.x);
    bombElement.setAttribute("data-y", this.y);

    gameBoard.appendChild(bombElement);
  }

  move(dx, dy) {
    const newX = this.x + dx;
    const newY = this.y + dy;

    if (
      newX >= 0 &&
      newX < this.map[0].length &&
      newY >= 0 &&
      newY < this.map.length &&
      this.map[newY][newX] !== 1 && // wall
      this.map[newY][newX] !== 4 // bomb
    ) {
      this.map[this.y][this.x] = 0;
      this.x = newX;
      this.y = newY;
      this.map[this.y][this.x] = 3;
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
        case " ":
          this.placeBomb();
          break;
      }
    });
  }
}
