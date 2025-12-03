let time = 25 * 60;
let timerInterval = null;
let isRunning = false;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const modal = document.getElementById("modal");
const saveLogBtn = document.getElementById("saveLog");
const closeModal = document.getElementById("closeModal");
const notesInput = document.getElementById("notesInput");
const topicInput = document.getElementById("topicInput");

// 顯示時間
function updateDisplay() {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    timerDisplay.textContent =
        `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}

updateDisplay();

// =======================
//      Start
// =======================
startBtn.addEventListener("click", () => {
    if (isRunning) return;
    isRunning = true;

    timerInterval = setInterval(() => {
        if (time > 0) {
            time--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            isRunning = false;
            openModal();   // **時間到 → 開啟心得視窗**
        }
    }, 1000);
});

// Pause
pauseBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    isRunning = false;
});

// Reset
resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    time = 25 * 60;
    updateDisplay();
    isRunning = false;
});

// =======================
//   Modal Functions
// =======================
function openModal() {
    modal.style.display = "flex";
}

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// =======================
//   Save to logs.json
// =======================
saveLogBtn.addEventListener("click", async () => {
    const entry = {
        date: new Date().toLocaleDateString("zh-Hant"),
        topic: topicInput.value || "未填主題",
        duration: 25,
        notes: notesInput.value
    };

    // 將紀錄送到 GitHub（使用 GitHub API）
    await fetch("logs.json")
        .then(r => r.json())
        .then(async (data) => {
            data.push(entry);

            await fetch("logs.json", {
                method: "PUT",
                body: JSON.stringify(data, null, 2),
                headers: { "Content-Type": "application/json" }
            });
        });

    alert("✔ 已儲存你的心得！");
    modal.style.display = "none";

    // 重置計時器
    time = 25 * 60;
    updateDisplay();
});
