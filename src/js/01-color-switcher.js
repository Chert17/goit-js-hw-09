const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', onStartchangeColor);
refs.stopBtn.addEventListener('click', onStopChangeColor);

let idInterval = null;

function onStartchangeColor(e) {
  idInterval = setInterval(() => {
    refs.body.style.backgroundColor = randomColor();
  }, 1000);

  refs.startBtn.setAttribute('disabled', true);
  refs.stopBtn.removeAttribute('disabled');
}

function onStopChangeColor(e) {
  clearInterval(idInterval);
  refs.stopBtn.setAttribute('disabled', true);
  refs.startBtn.removeAttribute('disabled');
}

const randomColor = function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
