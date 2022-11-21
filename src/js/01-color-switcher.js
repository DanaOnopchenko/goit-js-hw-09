
import '../css/common.css';


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
    body: document.querySelector('body'),
    btnStart: document.querySelector("[data-start]"),
    btnStop: document.querySelector("[data-stop]")
}
const CHANGE_DELAY = 1000;
let timerID = null;

refs.btnStart.addEventListener('click', onColorSwitcher);
refs.btnStop.addEventListener('click', onStopColorSwitcher);

// refs.btnStop.disabled = true;

function onColorSwitcher() {
    timerID = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, CHANGE_DELAY);
    refs.btnStart.disabled = true;
    refs.btnStop.disabled = false;
 };

function onStopColorSwitcher() { 
    clearInterval(timerID);
    refs.btnStart.disabled = false;
    refs.btnStop.disabled = true;
}