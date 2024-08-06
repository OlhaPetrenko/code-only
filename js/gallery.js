'use strict';

let pageSlider = new Swiper('.slider', {
  speed: 1000,
  scrollbar: {
    el: '.slider-scrollbar',
    druggable: true,
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      centeredSlides: false,
      slidesPerGroup: 1,
    },
    // when window width is >= 480px
    992: {
      slidesPerView: 2,
      centeredSlides: true,
      slidesPerGroup: 1,
    },
  },
});
const page = document.querySelector('.gallery-page');
const images = document.querySelectorAll('.slide-pictuer');

if (images.length) {
  let backgroundSlides = ``;
  let textSlides = ``;

  images.forEach(image => {
    backgroundSlides += `
    <div class="bg-slide swiper-slide"> 
        <div class="bg-image">
            <img src="${image.getAttribute('src')}" alt="${image.alt}"/>
        </div>
    </div>`;

    textSlides += `
    <div class="text-slide swiper-slide">
        <span>${image.dataset.title ? image.dataset.title : ''}
        </span>
    </div>
       `;
  });

  const bg = `
    <div class="bg swiper">
    
        <div  class="bg-wrapper swiper-wrapper">
            ${backgroundSlides}
        </div>
    </div>
      `;

  const text = `
      <div class="text swiper">

          <div  class="text-wrapper swiper-wrapper">
              ${textSlides}
          </div>
      </div>
        `;
  page.insertAdjacentHTML('afterbegin', bg);
  page.insertAdjacentHTML('beforeend', text);

  let pageBgSlider = new Swiper('.bg', {
    speed: 500,
  });

  let pageTextSlider = new Swiper('.text', {
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    speed: 1000,
  });

  //  Controll

  pageSlider.controller.control = pageBgSlider;
  pageBgSlider.controller.control = pageTextSlider;
}
const speed = 800;
document.addEventListener('click', function (e) {
  const targetEl = e.target;

  const textBlock = document.querySelector('.text');
  textBlock.style.transitionDuration = `${speed}ms`;
  console.log(textBlock);
  if (targetEl.closest('.slide')) {
    const slide = targetEl.closest('.slide');

    const slideImage = slide.querySelector('img');
    const activeImage = document.querySelector('.slide-pictuer.active');

    if (slide.classList.contains('swiper-slide-active')) {
      slideImage.classList.add('active');
      textBlock.classList.add('active');
      imageOpen(slideImage);
    } else {
      activeImage ? activeImage.classList.remove('active') : null;
      pageSlider.slideTo(getIndex(slide));
    }
    e.preventDefault();
  }

  //    Close img
  if (targetEl.closest('.open-image')) {
    const openImage = targetEl.closest('.open-image');
    const activeImage = document.querySelector('.slide-pictuer.active');
    const imagePos = getImagePos(activeImage);
    console.log(openImage);
    openImage.style.cssText = `
        position: fixed;
        left: ${imagePos.left}px;
        top: ${imagePos.top}px;
        width: ${imagePos.widht}px;
        height: ${imagePos.height}px;
        transition: all ${speed}ms;`;

    setTimeout(() => {
      activeImage.classList.remove('active');
      activeImage.style.opacity = 1;
      openImage.remove();
    }, speed);

    textBlock.classList.remove('active');
  }
});
function getIndex(el) {
  return Array.from(el.parentNode.children).indexOf(el);
}
function imageOpen(image) {
  const imagePos = getImagePos(image);
  const openImage = image.cloneNode();
  const openImageBlock = document.createElement('div');
  openImageBlock.classList.add('open-image');
  openImageBlock.append(openImage);

  openImageBlock.style.cssText = `
    position: fixed;
    left: ${imagePos.left}px;
    top: ${imagePos.top}px;
    width: ${imagePos.widht}px;
    height: ${imagePos.height}px;
    transition: all ${speed}ms;
    `;

  document.body.append(openImageBlock);
  setTimeout(() => {
    image.style.opacity = 0;
    openImageBlock.style.left = 0;
    openImageBlock.style.top = 0;
    openImageBlock.style.width = '100%';
    openImageBlock.style.height = '100%';
  }, 0);
}
function getImagePos(image) {
  return {
    left: image.getBoundingClientRect().left,
    top: image.getBoundingClientRect().top,
    widht: image.offsetWidth,
    height: image.offsetHeight,
  };
}
