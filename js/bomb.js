// Bomb.js
export class Bomb {
  constructor(x, y, tileMap) {
    this.x = x;
    this.y = y;
    this.tileMap = tileMap;
    this.element = null;
    this.explosionTimeout = 2000; // 2 seconds until explosion
    console.log(`Bomb coordinates: x=${x}, y=${y}`);
    console.log(`Tile size: ${tileMap.tileSize}px`);
    console.log(
      `Game container element: ${document.getElementById("gameContainer")}`
    );
  }

  plant() {
    console.log(`Planting bomb at x=${this.x}, y=${this.y}`);
    this.element = document.createElement("div");
    this.element.className = "bomb";
    this.element.style.width = `${this.tileMap.tileSize - 8}px`;
    this.element.style.height = `${this.tileMap.tileSize - 8}px`;
    this.element.style.backgroundColor = "#000";
    this.element.style.position = "absolute";
    this.element.style.left = `${this.x * this.tileMap.tileSize + 4}px`;
    this.element.style.top = `${this.y * this.tileMap.tileSize + 4}px`;
    this.element.style.borderRadius = "50%";

    document.getElementById("gameContainer").appendChild(this.element);

    setTimeout(() => this.explode(), this.explosionTimeout);
  }

  explode() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }

    // Create explosion effect
    const explosionElement = document.createElement("div");
    explosionElement.className = "explosion";
    explosionElement.style.width = `${this.tileMap.tileSize}px`;
    explosionElement.style.height = `${this.tileMap.tileSize}px`;
    explosionElement.style.backgroundColor = "#f00"; // Red color for explosion
    explosionElement.style.position = "absolute";
    explosionElement.style.left = `${this.x * this.tileMap.tileSize}px`;
    explosionElement.style.top = `${this.y * this.tileMap.tileSize}px`;
    explosionElement.style.borderRadius = "50%";
    explosionElement.style.animation = "explode 0.5s"; // Add animation effect

    document.getElementById("gameContainer").appendChild(explosionElement);

    // Remove explosion effect after animation completes
    setTimeout(() => {
      if (explosionElement && explosionElement.parentNode) {
        explosionElement.parentNode.removeChild(explosionElement);
      }
    }, 500); // 0.5 seconds
  }
}
