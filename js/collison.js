// Collision.js
export class CollisionManager {
  constructor(tileMap) {
    this.tileMap = tileMap;
  }

  checkCollision(x, y) {
    const tileX = Math.floor(x / this.tileMap.tileSize);
    const tileY = Math.floor(y / this.tileMap.tileSize);

    if (
      tileX < 0 ||
      tileX >= this.tileMap.map[0].length ||
      tileY < 0 ||
      tileY >= this.tileMap.map.length
    ) {
      return true;
    }

    return this.tileMap.getTile(tileX, tileY) !== 0;
  }
}
