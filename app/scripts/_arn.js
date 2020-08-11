import { tns } from "tiny-slider/src/tiny-slider";

var AT_main = {
  initTinySlider: (container) => {
    let sliderContainer = container.querySelector(".js-tns");
    let controlsContainer = sliderContainer.nextElementSibling;
    return tns({
      container: sliderContainer,
      autoWidth: true,
      loop: false,
      nav: false,
      // items: 5,
      // gutter: 30,
      controlsContainer: controlsContainer,
      mouseDrag: true,
      preventScrollOnTouch: "auto",
      slideBy: "page",
      swipeAngle: false,
      // responsive: {
      //   1: {
      //     items: 1,
      //     gutter: 25,
      //   },
      //   375: {
      //     items: 1.5,
      //   },
      //   479: {
      //     items: 2,
      //   },
      //   576: {
      //     items: 2.5,
      //   },
      //   768: {
      //     items: 3,
      //   },
      //   992: {
      //     items: 3.5,
      //     gutter: 30,
      //   },
      //   1052: {
      //     items: 4,
      //     gutter: 30,
      //   },
      //   1440: {
      //     items: 5,
      //   },
      // },
    });
  },
};

export default AT_main;
