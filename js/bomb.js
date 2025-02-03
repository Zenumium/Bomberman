export class Bomb {
  constructor(map, x, y, tileSize) {
    this.map = map;
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
  }

  // render the bomb in the map
  render() {
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
    bombElement.style.zIndex = "";

    bombElement.style.left = bombTile.offsetLeft + "px";
    bombElement.style.top = bombTile.offsetTop + "px";

    bombElement.setAttribute("data-x", this.x);
    bombElement.setAttribute("data-y", this.y);
    // Create an img element for the bomb image
    const bombImage = document.createElement("img");
    bombImage.src = "/assests/src-game/bomb.png";
    bombImage.style.width = "100%";
    bombImage.style.height = "100%";
    bombImage.style.objectFit = "cover";

    bombElement.appendChild(bombImage);

    gameBoard.appendChild(bombElement);
  }

  // func that make the bomb explode after 2sec with timer
  explode() {
    console.log(`Exploding bomb at coordinates (${this.x}, ${this.y})`);
    setTimeout(() => {
      this.map[this.y][this.x] = 0; // reset the tile to empty
      const bombElement = document.querySelector(
        `.bomb[data-x="${this.x}"][data-y="${this.y}"]`
      );
      if (bombElement) bombElement.remove();

      const explosionElement = document.createElement("div");
      explosionElement.classList.add("explosion");
      explosionElement.style.position = "absolute";
      explosionElement.style.width = `${this.tileSize}px`;
      explosionElement.style.height = `${this.tileSize}px`;
      explosionElement.style.zIndex = "";
      explosionElement.style.left = `${this.x * this.tileSize}px`;
      explosionElement.style.top = `${this.y * this.tileSize}px`;

      explosionElement.style.animation = "explode 0.5s";

      // Create an img element for the explosion image
      const explosionImage = document.createElement("img");
      explosionImage.src = "/assests/src-game/explosion.png";
      explosionImage.style.width = "100%";
      explosionImage.style.height = "100%";
      explosionImage.style.objectFit = "cover";

      explosionElement.appendChild(explosionImage);

      const gameBoard = document.getElementById("gameBoard");
      gameBoard.appendChild(explosionElement);

      // Remove the explosion element after the animation finishes
      setTimeout(() => {
        explosionElement.remove();
      }, 500); // 500ms = 0.5 seconds
    }, 2000); // 2000ms = 2 seconds
  }
}
