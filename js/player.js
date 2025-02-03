// Player.js
export class Player {
  constructor(x, y, tileMap, collisionManager) {
    this.x = x;
    this.y = y;
    this.tileMap = tileMap;
    this.collisionManager = collisionManager;
    this.speed = 3;
    this.element = this.createPlayerElement();
  }

  createPlayerElement() {
    const player = document.createElement("div");
    player.id = "player";
    player.style.width = `${this.tileMap.tileSize - 4}px`;
    player.style.height = `${this.tileMap.tileSize - 4}px`;
    player.style.backgroundColor = "#FF0000";
    player.style.position = "absolute";
    player.style.borderRadius = "50%";
    document.getElementById("gameContainer").appendChild(player);
    return player;
  }

  move(direction) {
    let newX = this.x;
    let newY = this.y;

    switch (direction) {
      case "up":
        newY -= this.speed;
        break;
      case "down":
        newY += this.speed;
        break;
      case "left":
        newX -= this.speed;
        break;
      case "right":
        newX += this.speed;
        break;
    }

    if (!this.collisionManager.checkCollision(newX, newY)) {
      this.x = newX;
      this.y = newY;
      this.updatePosition();
    }
  }

  updatePosition() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }

  placeBomb() {
    const tileX = Math.floor(this.x / this.tileMap.tileSize);
    const tileY = Math.floor(this.y / this.tileMap.tileSize);

    if (this.tileMap.getTile(tileX, tileY) === 0) {
      const bomb = new Bomb(tileX, tileY, this.tileMap);
      bomb.plant();
    }
  }
}
