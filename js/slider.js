'use strict';

// const { default: Swiper } = require('swiper');

window.addEventListener('load', windowLoaded);

function windowLoaded() {
  if (document.querySelector('.product-slider')) {
    new Swiper('.product-slider', {
      loop: true,
      speed: 1000,
      parallax: true,
      mousewheel: true,
      keyboard: true,
      on: {
        init: function () {
          document.documentElement.classList.add('loaded');
        },
      },
    });
  }
  // Add to cart animation

  const cart = document.querySelector('.header-cart');
  const cartValue = document.querySelector('.header-cart span');
  const speedAnimation = 1000;
  document.addEventListener('click', function (e) {
    const targetElement = e.target;
    if (targetElement.closest('.product-buy')) {
      const productSlider = targetElement.closest('.product-slide');
      const productImage = productSlider.querySelector('.product-picture');
      const productImageFly = productImage.cloneNode(true);

      const cartPos = {
        left: cart.getBoundingClientRect().left,
        top: cart.getBoundingClientRect().top,
      };

      productImageFly.style.cssText = `
      position: fixed;
      left: ${productImage.getBoundingClientRect().left}px;
      top: ${productImage.getBoundingClientRect().top}px;
      width: ${productImage.offsetWidth}px;
      height: ${productImage.offsetHeight}px;
       transition: all ${speedAnimation}ms ease;
      `;
      document.body.append(productImageFly);
      setTimeout(() => {
        productImageFly.style.left = `${cartPos.left}px`;
        productImageFly.style.top = `${cartPos.top}px`;
        productImageFly.style.width = `0px`;
        productImageFly.style.height = `0px`;
        productImageFly.style.opacity = `0.5`;
      }, 0);
      setTimeout(() => {
        cartValue.innerHTML = ++cartValue.innerHTML;
        productImageFly.remmove();
      }, speedAnimation);
    }
  });
}
