import { tns } from "tiny-slider/src/tiny-slider";
import serialize from "form-serialize";
import { Header } from "./AT_section";

var AT = {
  cart: {},
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
  initBackToTop: function () {
    let btnToTop = document.getElementById("back-to-top");
    let footer = document.getElementById("footer");

    btnToTop.addEventListener("click", function (e) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });
    window.addEventListener("scroll", function () {
      if (window.pageYOffset + window.innerHeight < footer.offsetTop) {
        btnToTop.classList.contains("show") && btnToTop.classList.remove("show");
      } else {
        !btnToTop.classList.contains("show") && btnToTop.classList.add("show");
      }
    });
  },
  addToCart: function () {
    let btnAddToCart = document.getElementsByClassName("js-add-to-card");
    let arrFetch = [];
    [...btnAddToCart].forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        let form = e.target.closest("form");
        console.time("test");
        fetch("/cart/add.js", {
          method: "post",
          headers: new Headers(),
          body: new URLSearchParams(serialize(form)),
        }).then((res) => {
          fetch("/cart.js", {
            method: "get",
            headers: new Headers(),
          })
            .then((res) => res.json())
            .then((res) => {
              AT.cart = res;
              AT.updateCart();
            });
        });
      });
    });
  },
  getCart: function () {
    fetch("/cart.js", {
      method: "get",
      headers: new Headers(),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.item_count !== 0) {
          AT.cart = res;
        }
      });
  },
  updateCart: function () {
    let cart = document.getElementById("total_item_of_cart");
    cart.innerHTML = AT.cart.item_count;
  },
  removeItemCart: function () {
    let removeButtons = document.getElementsByClassName("js-remove-item");

    [...removeButtons].forEach((btn) => {
      btn.addEventListener("click", function () {
        let cartItem = this.closest(".cart-item");
        let line = this.getAttribute("data-line");
        fetch("/cart/change.js", {
          method: "post",
          headers: new Headers(),
          body: new URLSearchParams(`line=${line}&quantity=0`),
        }).then((res) => cartItem.remove());
      });
    });
  },
};

export default AT;
