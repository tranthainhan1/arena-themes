import { tns } from "tiny-slider/src/tiny-slider";

var AT_main = {
  initTinySlider: () => {
    let container_list = document.querySelectorAll(".js-tns");
    container_list.forEach((item) => {
      let controlsContainer = item.nextElementSibling;
      let slider = tns({
        container: item,
        autoWidth: true,
        gutter: 30,
        nav: false,
        edgePadding: 16,
        loop: false,
        controlsContainer: controlsContainer,
      });
    });
  },
};

export default AT_main;
