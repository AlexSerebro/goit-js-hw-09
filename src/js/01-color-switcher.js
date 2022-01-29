const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let timerId = null;
disableStopBtn();

function disableStopBtn() {
  refs.stopBtn.setAttribute('disabled', 'disabled');
  refs.startBtn.removeAttribute('disabled');
  clearInterval(timerId);
}

function disableStartBtn() {
  refs.startBtn.setAttribute('disabled', 'disabled');
  refs.stopBtn.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBodyColour() {
  disableStartBtn();
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

refs.startBtn.addEventListener('click', changeBodyColour);
refs.stopBtn.addEventListener('click', disableStopBtn);
