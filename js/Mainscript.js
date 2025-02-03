// Define tile types
const EMPTY = 0;
const WALL = 1;
const BREAKABLE = 2;
const BOMB = 3;
const PLAYER = 4;

const initialMap = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 4, 0, 2, 2, 2, 0, 2, 2, 2, 0, 0, 1],
  [1, 0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 0, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 0, 1],
  [1, 0, 0, 2, 2, 2, 0, 2, 2, 2, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let currentMap = JSON.parse(JSON.stringify(initialMap));

// Function to get tile class name based on tile type
function getTileClass(tileType) {
  switch (tileType) {
    case WALL:
      return "wall";
    case BREAKABLE:
      return "breakable";
    case BOMB:
      return "bomb";
    case PLAYER:
      return "player";
    default:
      return "empty";
  }
}

// Function to render the map
function renderMap() {
  const mapElement = document.getElementById("map");
  mapElement.style.gridTemplateColumns = `repeat(${currentMap[0].length}, 40px)`;
  mapElement.innerHTML = "";

  currentMap.forEach((row, rowIndex) => {
    row.forEach((tile, colIndex) => {
      const tileElement = document.createElement("div");
      tileElement.className = `tile ${getTileClass(tile)}`;
      tileElement.dataset.row = rowIndex;
      tileElement.dataset.col = colIndex;

      // Add click handler for placing/removing breakable blocks
      tileElement.addEventListener("click", () => {
        if (tile === EMPTY) {
          currentMap[rowIndex][colIndex] = BREAKABLE;
        } else if (tile === BREAKABLE) {
          currentMap[rowIndex][colIndex] = EMPTY;
        }
        renderMap();
      });

      mapElement.appendChild(tileElement);
    });
  });
}

// Initial render
renderMap();

// Add keyboard controls for player movement
document.addEventListener("keydown", (event) => {
  // Find current player position
  let playerRow, playerCol;
  currentMap.forEach((row, rowIndex) => {
    row.forEach((tile, colIndex) => {
      if (tile === PLAYER) {
        playerRow = rowIndex;
        playerCol = colIndex;
      }
    });
  });

  // Calculate new position based on key press
  let newRow = playerRow;
  let newCol = playerCol;

  switch (event.key) {
    case "ArrowUp":
      newRow--;
      break;
    case "ArrowDown":
      newRow++;
      break;
    case "ArrowLeft":
      newCol--;
      break;
    case "ArrowRight":
      newCol++;
      break;
    case " ": // Spacebar for bomb
      if (currentMap[playerRow][playerCol] === PLAYER) {
        currentMap[playerRow][playerCol] = BOMB;
        setTimeout(() => {
          if (currentMap[playerRow][playerCol] === BOMB) {
            currentMap[playerRow][playerCol] = EMPTY;
            renderMap();
          }
        }, 2000);
      }
      renderMap();
      return;
  }

  // Check if new position is valid (not a wall or breakable block)
  if (
    newRow >= 0 &&
    newRow < currentMap.length &&
    newCol >= 0 &&
    newCol < currentMap[0].length &&
    currentMap[newRow][newCol] === EMPTY
  ) {
    // Move player
    currentMap[playerRow][playerCol] = EMPTY;
    currentMap[newRow][newCol] = PLAYER;
    renderMap();
  }
});
