// TileMap.js

// 0 - empty space
// 1 - wallMap
// 2 - Breakwall
// 3 - player
export class TileMap {
  constructor() {
    this.tileSize = 32;
    this.map = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
  }

  draw() {
    const gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = "";
    gameBoard.style.display = "grid";
    gameBoard.style.gridTemplateColumns = `repeat(${this.map[0].length}, ${this.tileSize}px)`;

    this.map.forEach((row, y) => {
      row.forEach((tile, x) => {
        const tileElement = document.createElement("div");
        tileElement.style.width = `${this.tileSize}px`;
        tileElement.style.height = `${this.tileSize}px`;

        switch (tile) {
          case 0: // Empty
            tileElement.style.backgroundColor = "#306230";
            break;
          case 1: // Wall
            tileElement.style.backgroundColor = "#383838";
            break;
          case 2: // Breakable
            tileElement.style.backgroundImage =
              "url('/assests/src-game/Crate.png')";
            tileElement.style.backgroundSize = "cover";
            break;
          case 3: // Player
            tileElement.style.backgroundImage = "url('player.png')";
            tileElement.style.backgroundSize = "cover";
            break;
        }

        tileElement.dataset.x = x;
        tileElement.dataset.y = y;
        gameBoard.appendChild(tileElement);
      });
    });
  }

  getTile(x, y) {
    return this.map[y][x];
  }

  setTile(x, y, value) {
    this.map[y][x] = value;
    this.draw();
  }
}
