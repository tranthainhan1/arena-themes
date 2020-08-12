import { tns } from "tiny-slider/src/tiny-slider";

var AT_main = {
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
};

export default AT_main;
