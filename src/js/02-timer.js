
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';


const inputRefs = document.querySelector('#datetime-picker');


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr(inputRefs, options);


// const refs = {
//     input: document.querySelector("#datetime-picker"),
// }
// const { startBtn, timerDays, timerHours, timerMinutes, timerSeconds } = {
//   startBtn: document.querySelector('[data-start'),
//   timerDays: document.querySelector('[data-days]'),
//   timerHours: document.querySelector('[data-hours]'),
//   timerMinutes: document.querySelector('[data-minutes]'),
//   timerSeconds: document.querySelector('[data-seconds]'),
// };