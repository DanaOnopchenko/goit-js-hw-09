
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


let deadline = null;

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
  start() {
    if (this.isActive) {
      return;
    }
  
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = deadline - currentTime;
      const time = this.convertMs(deltaTime);
      if (deltaTime >= 0) { 
        this.onTick(time);
        return
      }
      clearInterval(this.intervalId);
    this.isActive = false;
    this.onTick(0);
  
    }, 1000)
  };
 
  pad(value) {
    return String(value).padStart(2, '0');
  }
  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.pad(Math.floor(ms / day));
    // Remaining hours
    const hours = this.pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  }
}

refs.btnStart.addEventListener('click', () => {
  timer.start();
});



const timer = new Timer({
  onTick: updateTimer,
});


flatpickr(refs.input, options);


function onChangeTime(selectedDates) { 
  
    deadline = selectedDates[0];
    console.log(`deadline:`, deadline)
    
    
  
  
  // if (deadline <= Date.now()) { 
  //   window.alert(`Please choose a date in the future`)

  // }
}

function updateTimer({ days, hours, minutes, seconds }) { 
  refs.dataDay.textContent = `${days}`;
  refs.dataHours.textContent = `${hours}`;
  refs.dataMinute.textContent = `${minutes}`;
  refs.dataSecond.textContent = `${seconds }`;
}


// refs.btnStart.addEventListener('click', () => {
//   timer.start()
// });

// function pad(value) { 
//   return String(value).padStart(2, '0');
// }
// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days =pad(Math.floor(ms / day)) ;
//   // Remaining hours
//   const hours = pad(Math.floor((ms % day) / hour));
//   // Remaining minutes
//   const minutes =pad(Math.floor(((ms % day) % hour) / minute)) ;
//   // Remaining seconds
//   const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

//   return { days, hours, minutes, seconds };
// }


// const timer = {
//   intervalId: null,
//   isActive: false,
//   start() {
//     if (this.isActive) { 
//       return;
//     }
//     const startTime = Date.now();
//     this.isActive = true;

//   this.intervalId = setInterval(() => { 
//       const currentTime = Date.now();
      
//       const deltaTime = currentTime - startTime;
//       const time = convertMs(deltaTime)
   
//     updateTimer(time);
//     },1000)
//    }
// }

// function updateTimer({ days, hours, minutes, seconds }) { 
//   refs.dataDay.textContent = `${days}`;
//   refs.dataHours.textContent = `${hours}`;
//   refs.dataMinute.textContent = `${minutes}`;
//   refs.dataSecond.textContent = `${seconds }`;
// }






