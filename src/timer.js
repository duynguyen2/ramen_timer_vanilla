let countdown;
let timerRunning = false;
let timeRemaining = 0;
let interval;

const timerDisplay = document.querySelector('.display-time-left');
const endTime = document.querySelector('.display-end-time');
const completedMessage = document.querySelector('.completed-message');
const timeButtons = document.querySelectorAll('[data-time]');
const customTimeInput = document.querySelector('custom-time');

function timer(seconds) {
  //clear any existing timer
  clearInterval(countdown);
  const current = Date.now();
  const endingTime = current + seconds * 1000;

  displayRemainingTime(seconds);
  displayEndTime(endingTime);

  countdown = setInterval(() => {
    const secondsRemaining = Math.round((endingTime - Date.now()) / 1000);

    //chcek if timer runs out
    if(secondsRemaining < 0) {
      clearInterval(countdown);
      timerDisplay.textContent = 'Ramen is ready!';
      playSound();
      return;
    }

    displayRemainingTime(secondsRemaining);
  }, 1000);
}

function displayRemainingTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const display = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Ramen ready at ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

// Update the timer display
function updateTimerDisplay() {
  const formattedSeconds = String(seconds).padStart(2, '0');
  const minutes = Math.floor(timeRemaining / 60);
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

function playSound() {
  const audio = new Audio('assets/ding-80828.mp3');
  audio.play().catch(error => console.log("Audio play error: ", error));
}

timeButtons.forEach(button => button.addEventListener('click', startTimer));
document.customTimeInput.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});