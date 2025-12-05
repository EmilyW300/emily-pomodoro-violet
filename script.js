let time = 25 * 60; // 25 minutes
let timerInterval = null;
let isRunning = false;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const insightsForm = document.getElementById("insightsForm");
const insightsInput = document.getElementById("insightsInput");
const insightsStatus = document.getElementById("insightsStatus");
const insightsSubmit = document.getElementById("insightsSubmit");

// Replace with your deployed Google Apps Script Web App URL
const GOOGLE_SHEET_WEBHOOK = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

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

// insights 表單提交
insightsForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const content = insightsInput.value.trim();

    if (!content) {
        insightsStatus.textContent = "請輸入內容後再送出";
        return;
    }

    insightsSubmit.disabled = true;
    insightsStatus.textContent = "儲存中...";

    const payload = {
        insights: content,
        date: new Date().toISOString(),
    };

    try {
        const response = await fetch(GOOGLE_SHEET_WEBHOOK, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        insightsStatus.textContent = "已送出！請在 Google Sheet 查看。";
        insightsInput.value = "";
    } catch (error) {
        console.error(error);
        insightsStatus.textContent = "送出失敗，請確認 Google Apps Script Web App URL 後再試一次。";
    } finally {
        insightsSubmit.disabled = false;
    }
});

// 初始化畫面
updateDisplay();
