// Pause.js
export class PauseManager {
  constructor(game) {
    this.game = game;
    this.isPaused = false;
    this.pauseMenu = this.createPauseMenu();
    document.addEventListener("keydown", (event) => this.handleKeyPress(event));
  }

  createPauseMenu() {
    const menu = document.createElement("div");
    menu.id = "pauseMenu";
    menu.style.display = "none";
    menu.style.position = "absolute";
    menu.style.top = "50%";
    menu.style.left = "50%";
    menu.style.transform = "translate(-50%, -50%)";
    menu.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    menu.style.color = "white";
    menu.style.padding = "20px";
    menu.innerHTML = `
            <h2>Game Paused</h2>
        `;
    document.getElementById("gameContainer").appendChild(menu);
    return menu;
  }

  togglePause() {
    if (!this.isPaused) {
      this.isPaused = true;
      this.pauseMenu.style.display = "block";
    }
  }

  handleKeyPress(event) {
    if (event.key === "Escape") {
      this.togglePause();
    }
  }
}
