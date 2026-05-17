// towerOfHonoi.js
const towers = document.querySelectorAll(".tower");
const moveCounter = document.getElementById("move-counter");
const resetButton = document.getElementById("reset");
const startGameButton = document.getElementById("start-game");
const diskCountInput = document.getElementById("disk-count");

let selectedDisk = null;
let moveCount = 0;
let diskCount = 0;

// Function to update move counter
function updateMoveCounter() {
  moveCounter.textContent = `Moves: ${moveCount}`;
}

// Function to reset the game
function resetGame() {
  moveCount = 0;
  updateMoveCounter();
  towers.forEach((tower) => (tower.innerHTML = ""));
  initializeGame(diskCount);
}

// Initialize the game with disks on the first tower
function initializeGame(diskCount) {
  const tower1 = document.getElementById("tower1");
  for (let i = diskCount; i > 0; i--) {
    const disk = document.createElement("div");
    disk.textContent = i;
    disk.style.width = `${40 + i * 20}px`; // Dynamic width
    tower1.appendChild(disk);
  }

  // Enable the Reset button and towers
  resetButton.disabled = false;
}

// Function to handle tower click
function handleTowerClick(e) {
  const tower = e.currentTarget;

  // If no disk is selected, pick the top disk from the current tower
  if (!selectedDisk) {
    if (tower.lastElementChild) {
      selectedDisk = tower.lastElementChild;
      tower.removeChild(selectedDisk);
    }
  } else {
    // Place the disk on the target tower if the move is valid
    const topDisk = tower.lastElementChild;
    if (!topDisk || parseInt(selectedDisk.textContent) < parseInt(topDisk.textContent)) {
      tower.appendChild(selectedDisk);
      selectedDisk = null;
      moveCount++;
      updateMoveCounter();

      // Check for win condition
      if (checkWin()) {
        alert(`Congratulations! You solved the puzzle in ${moveCount} moves.`);
      }
    } else {
      // Invalid move, return the disk to its original tower
      alert("Invalid move! Try again.");
    }
  }
}

// Check if the game is won
function checkWin() {
  const tower2 = document.getElementById("tower2");
  const tower3 = document.getElementById("tower3");
  return (
    tower2.childElementCount === diskCount || tower3.childElementCount === diskCount
  );
}

// Start game on user input
startGameButton.addEventListener("click", () => {
  const input = parseInt(diskCountInput.value);

  // Validate input
  if (input >= 3 && input <= 10) {
    diskCount = input;
    resetGame();
  } else {
    alert("Please enter a valid number of disks (between 3 and 10).");
  }
});

// Add event listeners to towers
towers.forEach((tower) => tower.addEventListener("click", handleTowerClick));

// Disable Reset button until the game starts
resetButton.disabled = true;
