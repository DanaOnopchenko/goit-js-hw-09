
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


// const inputRefs = document.querySelector('#datetime-picker');

const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  dataDay: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinute: document.querySelector('[data-minutes]'),
  dataSecond: document.querySelector('[data-seconds]'),  
}
// console.log(refs)

let deadline = null;
refs.btnStart.disabled = true;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
  onChangeTime(selectedDates);
  
  },
};

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
     }
  init() { 
    const time = this.convertMs(0);
    this.onTick(time);
  }
  start() {
    if (this.isActive) {
      return;
    }
  
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = deadline - currentTime;
      let time = this.convertMs(deltaTime);
      if (deltaTime >= 0) { 
        this.onTick(time);
        return
      } if (deltaTime <= 0) { 
        clearInterval(this.intervalId);
      this.isActive = false;
      time = this.convertMs(0);
        this.onTick(time);
        return;
      }
          }, 1000)
  };
 
  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  };

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  }
};

refs.btnStart.addEventListener('click', () => {
  timer.start();
});

const timer = new Timer({
  onTick: updateTimer,
});

flatpickr(refs.input, options);

function onChangeTime(selectedDates) { 
        deadline = selectedDates[0];
    // console.log(`deadline:`, deadline)
  if (deadline < Date.now()) { 
    Notify.failure('Please choose a date in the future');
   refs.btnStart.disabled = true;
    return;
  } else {
    refs.btnStart.disabled = false;
    return;
  }
   
}

function updateTimer({ days, hours, minutes, seconds }) { 
  refs.dataDay.textContent = `${days}`;
  refs.dataHours.textContent = `${hours}`;
  refs.dataMinute.textContent = `${minutes}`;
  refs.dataSecond.textContent = `${seconds}`;
}








