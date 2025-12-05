let time = 25 * 60; // 25 minutes
let timerInterval = null;
let isRunning = false;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

// 渲染時間
function updateDisplay() {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    timerDisplay.textContent =
        `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}

// 開始
startBtn.addEventListener("click", () => {
    if (isRunning) return;
    isRunning = true;

    timerInterval = setInterval(() => {
        if (time > 0) {
            time--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            alert("🎉 Time's up! Good job Emily!");
            isRunning = false;
        }
    }, 1000);
});

// 暫停
pauseBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    isRunning = false;
});

// 重置
resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    time = 25 * 60;
    updateDisplay();
    isRunning = false;
});

// 初始化畫面
updateDisplay();
