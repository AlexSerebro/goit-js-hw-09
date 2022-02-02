// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

// Получаем ссылки на требуемые элементы
const refs = {
  input: document.querySelector('.input-timer'),
  btn: document.querySelector('.btn-timer'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

//деактивируем кнопку старта
disableStartBtn();

//вешаем слушателей событий на интерактивные элементы
refs.input.addEventListener('click', flatpickr);
refs.btn.addEventListener('click', startTimer);

let selectDate = null;

//конфигурация таймера
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      // alert('Please choose a date in the future');
      Notiflix.Report.failure('Please choose a date in the future');
      return disableStartBtn();
    }
    refs.btn.removeAttribute('disabled');
    selectDate = selectedDates[0].getTime();
    console.log('~ selectDate', selectDate);
  },
};

function startTimer() {
  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectDate - currentTime;

    disableStartBtn();
    if (deltaTime > 0) {
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      updateTimer({ days, hours, minutes, seconds });
      // clearInterval(intervalId);
    } else {
      Notiflix.Report.success('TIME to BUY');
      clearInterval(intervalId);
    }
  }, 1000);
}

flatpickr(refs.input, options);

function disableStartBtn() {
  refs.btn.setAttribute('disabled', 'disabled');
}

//подсчет времени
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}
