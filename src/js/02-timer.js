import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const timerDiv = document.querySelector('.timer');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

startBtn.disabled = true;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    };
  },
};

flatpickr(inputDate, options);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

startBtn.addEventListener('click', () => {
  let timer = setInterval(() => {
    let countdown = new Date(inputDate.value) - new Date();
    startBtn.disabled = true;

    if (countdown >= 0) {
      let timeDate = convertMs(countdown);
      days.textContent = addLeadingZero(timeDate.days);
      hours.textContent = addLeadingZero(timeDate.hours);
      minutes.textContent = addLeadingZero(timeDate.minutes);
      seconds.textContent = addLeadingZero(timeDate.seconds);
      if (countdown <= 60000) {
        timerDiv.style.color = 'tomato';
      }
    } else {
      Notiflix.Notify.success('Countdown finished');
      timerDiv.style.color = 'black';
      clearInterval(timer);
    }
  }, 1000);
});