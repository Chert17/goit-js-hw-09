// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
require('flatpickr/dist/themes/dark.css');

const refs = {
  timer: document.querySelector('.timer'),
  myInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

refs.startBtn.addEventListener('click', onTimer);

refs.timer.style = `display:flex; gap: 10px; margin-top: 10px`;
refs.startBtn.setAttribute('disabled', true);
const startTime = Date.now();
let idInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < startTime) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startBtn.setAttribute('disabled', true);
    } else if (selectedDates[0] > startTime) {
      refs.startBtn.removeAttribute('disabled');
    }
  },
};

const fp = flatpickr(refs.myInput, options);
// const userDate = fp.selectedDates[0]; // ???

function onTimer(e) {
  const userDate = fp.selectedDates[0];

  idInterval = setInterval(() => {
    const startTimeInterval = Date.now();
    const counter = userDate - startTimeInterval;

    if (counter <= 0) {
      clearInterval(idInterval);
      return;
    }

    const time = convertMs(counter);
    updataTime(time);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function updataTime({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = addLeadingZero(days);
  refs.hoursEl.textContent = addLeadingZero(hours);
  refs.minutesEl.textContent = addLeadingZero(minutes);
  refs.secondsEl.textContent = addLeadingZero(seconds);
}

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
