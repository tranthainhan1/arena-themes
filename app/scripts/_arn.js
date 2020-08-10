import { tns } from "tiny-slider/src/tiny-slider";

var AT_main = {
  initTinySlider: (container) => {
    console.log(container);
    let container_list = document.querySelectorAll(".js-tns");
    container_list.forEach((item) => {
      let controlsContainer = item.nextElementSibling;
      return tns({
        container: item,
        autoWidth: true,
        gutter: 30,
        nav: false,
        edgePadding: 30,
        loop: true,
        controlsContainer: controlsContainer,
        mouseDrag: true,
      });
    });
  },
};

export default AT_main;
