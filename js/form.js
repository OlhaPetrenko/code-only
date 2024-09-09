'use strict';

const nextBtns = document.querySelectorAll('.next-btn');
const prevBtns = document.querySelectorAll('.prev-btn');
let currentStep = 0;
const progressSteps = document.querySelectorAll('.progress-step');
const progress = document.querySelector('.progress');
const formSteps = document.querySelectorAll('.form-step');
console.log(progress);

nextBtns.forEach(nextBtn => {
  nextBtn.addEventListener('click', () => {
    currentStep += 1;
    updateProgress();
    updateForm();
  });
});
prevBtns.forEach(prevBtn => {
  prevBtn.addEventListener('click', () => {
    currentStep -= 1;
    updateProgress();
    updateForm();
  });
});
function updateProgress() {
  progressSteps.forEach((progressStep, index) => {
    if (index < currentStep + 1) {
      progressStep.classList.add('progress-active');
    } else {
      progressStep.classList.remove('progress-active');
    }

    let activeSteps = document.querySelectorAll('.progress-active');
    progress.style.width = ((activeSteps.length - 1) / (progressSteps.length - 1)) * 100 + '%';
  });
}

function updateForm() {
  formSteps.forEach(formStep => {
    formStep.classList.remove('form-active');
  });

  formSteps[currentStep].classList.add('form-active');
}
