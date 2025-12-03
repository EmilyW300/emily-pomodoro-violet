const INITIAL_SECONDS = 25 * 60;

const timeDisplay = document.getElementById("time-display");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");

let remainingSeconds = INITIAL_SECONDS;
let timerId = null;

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(remainingSeconds);
}

function tick() {
  if (remainingSeconds <= 0) {
    clearInterval(timerId);
    timerId = null;
    return;
  }

  remainingSeconds -= 1;
  updateDisplay();
}

function startTimer() {
  if (timerId || remainingSeconds <= 0) return;
  timerId = setInterval(tick, 1000);
}

function pauseTimer() {
  if (!timerId) return;
  clearInterval(timerId);
  timerId = null;
}

function resetTimer() {
  clearInterval(timerId);
  timerId = null;
  remainingSeconds = INITIAL_SECONDS;
  updateDisplay();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();
