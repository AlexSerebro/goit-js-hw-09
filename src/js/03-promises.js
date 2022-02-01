import Notiflix from 'notiflix';

const refs = {
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  btn: document.querySelector('button'),
};

refs.btn.addEventListener('click', clickBtn);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  // console.log(shouldResolve);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function clickBtn(event) {
  event.preventDefault();
  let delay = +refs.delay.value;
  // console.log(typeof delay);
  let step = +refs.step.value;
  let amount = +refs.amount.value;
  for (let i = 1; i <= amount; i += 1) {
    if (i > 1) {
      delay += step;
      // console.log('~ delay', delay);
    }
    createPromise(i, delay)
      .then(({ i, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${i} in ${delay}ms`);
      })
      .catch(({ i, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${i} in ${delay}ms`);
      });
  }
}
