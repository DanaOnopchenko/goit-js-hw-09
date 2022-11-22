
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';



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



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onChangeTime(selectedDates[0]);
  
  },
};

flatpickr(refs.input, options);

refs.btnStart.addEventListener('click', () => {
  timer.start()
});

function pad(value) { 
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days =pad(Math.floor(ms / day)) ;
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes =pad(Math.floor(((ms % day) % hour) / minute)) ;
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}


const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) { 
      return;
    }
    const startTime = Date.now();
    this.isActive = true;

  this.intervalId = setInterval(() => { 
      const currentTime = Date.now();
      
      const deltaTime = currentTime - startTime;
      const time = convertMs(deltaTime)
   
    updateTimer(time);
    },1000)
   }
}

function updateTimer({ days, hours, minutes, seconds }) { 
  refs.dataDay.textContent = `${days}`;
  refs.dataHours.textContent = `${hours}`;
  refs.dataMinute.textContent = `${minutes}`;
  refs.dataSecond.textContent = `${seconds }`;
}






