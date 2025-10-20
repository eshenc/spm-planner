// ========== 倒计时 ==========
const countdown = document.getElementById("countdown");
const spmDate = new Date("2025-11-25");

function updateCountdown() {
  const now = new Date();
  const diff = spmDate - now;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  countdown.textContent = `距离 SPM 还有 ${days} 天`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// ========== 每周学习计划 ==========
const schedule = {
  Monday: ["4:30–6:00 SEJ Bab 6", "7:00–8:30 BM Karangan", "9:00–10:30 Moral Nilai 1–10"],
  Tuesday: ["补习（AM）"],
  Wednesday: ["补习（BM）"],
  Thursday: ["ENG Essay", "BC 阅读练习"],
  Friday: ["AM Past Year", "SC Chapter 3–4"],
  Saturday: ["补习（ACC）"],
  Sunday: ["自由复习 + 文学"]
};

// ========== 今日任务 ==========
const todayTasks = document.getElementById("today-tasks");
const weekSchedule = document.getElementById("week-schedule");
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const todayName = weekDays[new Date().getDay()];

function loadTodayTasks() {
  todayTasks.innerHTML = "";
  const tasks = schedule[todayName] || [];
  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.textContent = task;
    const btn = document.createElement("button");
    btn.textContent = "✅ Done";
    btn.onclick = () => {
      li.classList.toggle("completed");
      saveProgress();
    };
    li.appendChild(btn);
    todayTasks.appendChild(li);
  });
  loadProgress();
}

// ========== 一周计划显示 ==========
for (const day in schedule) {
  const div = document.createElement("div");
  div.classList.add("day-card");
  div.innerHTML = `<div class="day-title">${day}</div>${schedule[day]
    .map((x) => `<div>${x}</div>`)
    .join("")}`;
  weekSchedule.appendChild(div);
}

// ========== 进度保存 ==========
function saveProgress() {
  const completed = [...document.querySelectorAll("#today-tasks li.completed")].map(
    (x) => x.textContent
  );
  localStorage.setItem("spm-progress", JSON.stringify(completed));
}

function loadProgress() {
  const saved = JSON.parse(localStorage.getItem("spm-progress") || "[]");
  document.querySelectorAll("#today-tasks li").forEach((li) => {
    if (saved.some((s) => li.textContent.includes(s.replace("✅ Done", "").trim()))) {
      li.classList.add("completed");
    }
  });
}

loadTodayTasks();
