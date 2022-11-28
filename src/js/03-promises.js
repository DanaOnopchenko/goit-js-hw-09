
import { Notify } from 'notiflix/build/notiflix-notify-aio';



const refs = {
  form: document.querySelector('.form'),
  btnSubmitForm: document.querySelector('.form button')
  }

refs.form.addEventListener('submit', onFormSubmit);
 

function onFormSubmit(evt) { 
  evt.preventDefault();
//   let { 
//     elements:  {delay, step, amount}
// } = evt.Target;
   let delay = Number(evt.currentTarget.delay.value);
  const step = Number(evt.currentTarget.step.value);
  const amount = Number(evt.currentTarget.amount.value);
  
    
  // console.log(delay,step,amount);

   for (let i = 1; i <= amount; i += 1) { 
       createPromise(i, delay)
      .then(onCreatePromiseSuccess)
      .catch(onCreatePromiseError);
    delay += step ;
   }
  evt.currentTarget.reset();
}

const createPromise = (position,delay) => { 
    return new Promise((resolve, reject) => { 
      const shouldResolve = Math.random() > 0.3;
  setTimeout(() => { 
    if (shouldResolve) {
      resolve({ position, delay })

    } else { 
      reject ({ position, delay })
    }
  }, delay)
  })
  
}



function onCreatePromiseSuccess({ position, delay}) { 
  // console.log(`onCreatePromiseSuccess`);
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);

}
function onCreatePromiseError({ position, delay }) { 
  // console.log(`onCreatePromiseError`);
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
