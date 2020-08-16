import { tns } from "tiny-slider/src/tiny-slider";

var AT = {
  initTinySlider: (container) => {
    let config = JSON.parse(
      container.querySelector("[id*='config-tns']").innerHTML
    );
    let sliderContainer = container.querySelector(".js-tns");
    let controlsContainer = sliderContainer.nextElementSibling;
    config = Object.assign(config, {
      container: sliderContainer,
      controlsContainer,
    });

    return tns(config);
  },
  debounce: (func, wait) => {
    let timeout;

    return function (...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
};

export default AT;
