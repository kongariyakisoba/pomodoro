const focusSeconds = 1 * 60 * 60;
const breakSeconds = 5 * 60;
const alarmAudio=new Audio("alarm.mp3")

const timer = document.querySelector("#timer");
const mode = document.querySelector("#mode");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const resetButton = document.querySelector("#reset");

let isFocus = true;
let remainingSeconds = focusSeconds;
let intervalId = null;

function render() {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  timer.textContent = String(minutes).padStart(2, "0")
    + ":"
    + String(seconds).padStart(2, "0");
  mode.textContent = isFocus ? "暖房" : "換気";
}

function switchMode() {
  pauseTimer();
  isFocus = !isFocus;
  remainingSeconds = isFocus ? focusSeconds : breakSeconds;
  render();
  alarmAudio.play();
}

function startTimer() {
  if (intervalId !== null) return;

  intervalId = window.setInterval(() => {
    remainingSeconds -= 1;

    if (remainingSeconds <= 0) {
      switchMode();
    } else {
      render();
    }
  }, 1000);
}

function pauseTimer() {
  window.clearInterval(intervalId);
  intervalId = null;
}

function resetTimer() {
  pauseTimer();
  alarmAudio.pause();
  alarmAudio.currentTime=0;
  isFocus = true;
  remainingSeconds = focusSeconds;
  render();
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

render();
