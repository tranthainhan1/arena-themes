import { tns } from "tiny-slider/src/tiny-slider";
import serialize from "form-serialize";
import { removeItem } from "@shopify/theme-cart";
import * as Currency from "@shopify/theme-currency";

var AT = {
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
      let id = item.getAttribute("data-config");
      let config = JSON.parse(document.getElementById(id).innerHTML);
      let controlsContainer = item.nextElementSibling;
      config = Object.assign(config, {
        container: item,
        controlsContainer,
      });
      let tnsSlider = tns(config);

      tnsSlider.events.on("dragMove", (info) => {
        [...info.slideItems].forEach((item) => {
          let aTags = item.getElementsByTagName("a");
          [...aTags].forEach((a) => {
            a.addEventListener("click", preventDefault);
          });
        });
      });

      tnsSlider.events.on("dragEnd", (info) => {
        [...info.slideItems].forEach((item) => {
          let aTags = item.getElementsByTagName("a");
          [...aTags].forEach((a) => {
            a.removeEventListener("click", preventDefault);
          });
        });
      });
    });
    function preventDefault(e) {
      e.preventDefault();
    }
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

    !!btnToTop &&
      btnToTop.addEventListener("click", function (e) {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      });
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > window.innerHeight * 2) {
        btnToTop.classList.contains("show") && btnToTop.classList.remove("show");
      } else {
        !btnToTop.classList.contains("show") && btnToTop.classList.add("show");
      }
    });
  },
  addToCart: function () {
    let btnAddToCart = document.getElementsByClassName("js-add-to-card");

    [...btnAddToCart].forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        let form = e.target.closest("form");

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
              AT.onCartChange(res);
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
  onCartChange: function (cart, action) {
    //cart icon
    let cartIcon = document.getElementById("total_item_of_cart");
    let cartTotal = document.getElementById("cart_total");
    let cartContainer = document.getElementById("cart_container");

    switch (action) {
      case "remove":
        !!cartContainer && cart.item_count === 0 && cartContainer.classList.add("empty");
        cartTotal.innerHTML = Currency.formatMoney(cart.total_price, theme.currency.money);
        break;
    }
    !!cartIcon && (cartIcon.innerHTML = cart.item_count);
  },
  removeItemCart: function () {
    let removeButtons = document.getElementsByClassName("btn-remove");

    [...removeButtons].forEach((btn) => {
      btn.addEventListener("click", function () {
        let cartItem = this.closest(".cart-item");
        let key = this.getAttribute("data-key");
        removeItem(key).then((res) => {
          AT.onCartChange(res, "remove");
          cartItem.remove();
        });
      });
    });
  },
  initSearch: function () {
    let searchContainer = document.getElementsByClassName("js-search");
  },
};

export default AT;
