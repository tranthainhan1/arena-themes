import { tns } from "tiny-slider/src/tiny-slider";

var AT = {
  initTinySlider: function (container) {
    let config = JSON.parse(container.querySelector("[id*='config-tns']").innerHTML);
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
  handleCollapse: function (btnTrigger, collapseContainer) {
    let first = true,
      isComplete = false;

    btnTrigger.addEventListener("click", function () {
      if (first || isComplete) {
        first = false;
        isComplete = false;

        if (collapseContainer.classList.contains("show")) {
          let height = collapseContainer.offsetHeight;
          collapseContainer.style.height = `${height}px`;
          AT.debounce(function () {
            collapseContainer.style.height = "0px";
          }, 1)();
          AT.debounce(() => {
            collapseContainer.style.height = "";
            collapseContainer.classList.remove("show");
            this.classList.remove("show");
            isComplete = true;
          }, 200)();
        } else {
          collapseContainer.classList.add("show");
          collapseContainer.style.height = "0px";
          let height = [...collapseContainer.children].reduce(
            (accu, currentValue) => accu + currentValue.offsetHeight,
            0
          );
          collapseContainer.style.height = `${height}px`;
          AT.debounce(() => {
            collapseContainer.style.height = "";
            this.classList.add("show");
            isComplete = true;
          }, 200)();
        }
      }
    });
  },
  initTNS: function () {
    [...document.getElementsByClassName("js-tns")].forEach(function (item) {
      let config = JSON.parse(item.getAttribute("data-config"));
      let controlsContainer = item.nextElementSibling;
      config = Object.assign(config, {
        container: item,
        controlsContainer,
      });
      let tnsSlider = tns(config);
    });
  },
  initHandleCollapse: function () {
    let btnCollapse = document.getElementsByClassName("js-btn-collapse");
    [...btnCollapse].forEach(function (item) {
      let id = item.getAttribute("data-target");
      let collapseContainer = document.getElementById(id);
      AT.handleCollapse(item, collapseContainer);
    });
  },

  // handleSearch: function () {
  //   let searchContainers = document.getElementsByClassName("js-search");

  //   [...searchContainers].forEach(function (searchContainer) {
  //     let input = searchContainer.getElementsByClassName("js-input-search")[0];
  //     let resultContainer = searchContainer.getElementsByClassName("js-search-result")[0];
  //     let prevKeyword;

  //     const request = AT.debounce((q) => {
  //       const myHeaders = new Headers();
  //       const myRequest = new Request(`/search/suggest.json?q=${q}&resources%5Btype%5D=product,article`, {
  //         method: "get",
  //         headers: myHeaders,
  //       });

  //       fetch(myRequest)
  //         .then((res) => res.json())
  //         .then(({ resources: { results } }) => loadResults(results, q));
  //     }, 500);

  //     input.addEventListener("keyup", function (event) {
  //       let q = event.target.value.trim();
  //       if (q && prevKeyword !== q) {
  //         resultContainer.classList.add("is-load");
  //         request(q);
  //         prevKeyword = q;
  //       }
  //     });

  //     function loadResults({ products, articles }, q) {
  //       let countResults = products.length + articles.length;
  //       if (countResults) {
  //       } else {
  //         resultContainer.classList.remove("is-load");
  //         resultContainer.getElementsByClassName("keyword")[0].innerHTML = q;
  //         resultContainer.classList.add("no-result");
  //       }
  //     }
  //   });
  // },
};

export default AT;
