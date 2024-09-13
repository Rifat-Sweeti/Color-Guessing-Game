const colorDisplay = document.getElementById("color-display");
const colorButtonsContainer = document.getElementById("color-buttons");
const scoreDisplay = document.getElementById("score");
const feedbackDisplay = document.getElementById("feedback");
const timeDisplay = document.getElementById("time");
const playAgainBtn = document.getElementById("play-again");

let colors = [];
let pickedColor;
let score = 0;
let timeLeft = 30;
let timer;
let level = "easy"; // Start at easy

// Generate random colors and set up the game
function setupGame() {
  colors = generateColors(getColorCount());
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  setupButtons();
  startTimer();
}

function getColorCount() {
  if (level === "easy") return 3;
  if (level === "medium") return 6;
  if (level === "hard") return 9;
}

function generateColors(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function pickColor() {
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function setupButtons() {
  colorButtonsContainer.innerHTML = "";
  colors.forEach(color => {
    const button = document.createElement("button");
    button.classList.add("color-btn");
    button.style.backgroundColor = color;
    button.addEventListener("click", () => checkAnswer(color));
    colorButtonsContainer.appendChild(button);
  });
}

function checkAnswer(color) {
  if (color === pickedColor) {
    score++;
    feedbackDisplay.textContent = "Correct!";
    feedbackDisplay.classList.remove("wrong");
    feedbackDisplay.classList.add("correct");
    scoreDisplay.textContent = score;
    checkLevelProgression();
    setupGame();  // Move to the next color set
  } else {
    feedbackDisplay.textContent = "Wrong!";
    feedbackDisplay.classList.remove("correct");
    feedbackDisplay.classList.add("wrong");
  }
}

function checkLevelProgression() {
  if (score === 5 && level === "easy") {
    level = "medium";
  } else if (score === 10 && level === "medium") {
    level = "hard";
  } else if (score === 15 && level === "hard") {
    feedbackDisplay.textContent = "You Won!";
    clearInterval(timer);
    disableButtons();
  }
}

function startTimer() {
  timeLeft = 30;
  timeDisplay.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      feedbackDisplay.textContent = "Time's up! You Lost!";
      disableButtons();
    }
  }, 1000);
}

function disableButtons() {
  const buttons = document.querySelectorAll(".color-btn");
  buttons.forEach(btn => {
    btn.disabled = true;
  });
}

playAgainBtn.addEventListener("click", () => {
  score = 0;
  level = "easy";
  scoreDisplay.textContent = score;
  feedbackDisplay.textContent = "";
  setupGame();
});

setupGame();
