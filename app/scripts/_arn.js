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
  handleCollapse: function () {
    let first = true,
      isComplte = false;
    this.elements.blocks.forEach((item) => {
      let elmMenuList = item.querySelector(".menu-list");
      let children = elmMenuList.children;
      let elmExpand = item.querySelector(".js-handle-collapse");

      elmExpand.addEventListener("click", function (e) {
        if (first || isComplte) {
          first = false;
          isComplte = false;
          let elmParent = e.target.closest(".footer-top__item.menu-item");

          if (elmParent.classList.contains("show")) {
            let height = elmMenuList.offsetHeight;
            elmMenuList.style.height = `${height}px`;
            AT_main.debounce(function () {
              elmMenuList.style.height = "0px";
            }, 1)();
            AT_main.debounce(function () {
              elmParent.classList.remove("show");
              elmMenuList.style.height = "";
              isComplte = true;
            }, 200)();
          } else {
            elmParent.classList.add("show");
            elmMenuList.style.height = "0px";
            let height = Object.values(children).reduce(
              (accu, currentValue) => {
                return accu + currentValue.offsetHeight;
              },
              0
            );
            elmMenuList.style.height = `${height}px`;
            AT_main.debounce(function () {
              elmMenuList.style.height = "";
              isComplte = true;
            }, 200)();
          }
        }
      });
    });
  },
};

export default AT_main;
