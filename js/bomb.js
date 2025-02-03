// Bomb.js
export class Bomb {
  constructor(x, y, tileMap) {
    this.x = x;
    this.y = y;
    this.tileMap = tileMap;
    this.element = null;
    this.explosionRange = 2;
  }

  plant() {
    this.element = document.createElement("div");
    this.element.className = "bomb";
    this.element.style.width = `${this.tileMap.tileSize - 8}px`;
    this.element.style.height = `${this.tileMap.tileSize - 8}px`;
    this.element.style.backgroundColor = "#000";
    this.element.style.borderRadius = "50%";
    this.element.style.position = "absolute";
    this.element.style.left = `${this.x * this.tileMap.tileSize + 4}px`;
    this.element.style.top = `${this.y * this.tileMap.tileSize + 4}px`;

    document.getElementById("gameContainer").appendChild(this.element);

    setTimeout(() => this.explode(), 2000);
  }

  explode() {
    this.element.remove();

    // Check explosion in all directions
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    directions.forEach(([dx, dy]) => {
      for (let i = 1; i <= this.explosionRange; i++) {
        const newX = this.x + dx * i;
        const newY = this.y + dy * i;

        if (this.tileMap.getTile(newX, newY) === 2) {
          this.tileMap.setTile(newX, newY, 0);
          break;
        } else if (this.tileMap.getTile(newX, newY) === 1) {
          break;
        }
      }
    });
  }
}
