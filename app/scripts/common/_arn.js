// import serialize from "form-serialize";
// import { removeItem } from "@shopify/theme-cart";

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
      config = Object.assign(config, { container: item });
      let tnsSlider = tns(config);

      if (config.mouseDrag) {
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
      }
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
      if (window.pageYOffset > window.innerHeight) {
        btnToTop.classList.add("show");
      } else {
        btnToTop.classList.remove("show");
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
          body: new URLSearchParams(AT.serialize(form)),
        })
          .then((res) => {
            fetch("/cart.js")
              .then((res) => res.json())
              .then((cart) => {
                AT.dispatchEvent("cartChange", cart);
              });
          })
          .catch((err) => console.log(err.message));
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
  removeItemCart: function () {
    let removeButtons = document.getElementsByClassName("btn-remove");

    [...removeButtons].forEach((btn) => {
      btn.addEventListener("click", function () {
        let cartItem = this.closest(".cart-item");
        let key = this.getAttribute("data-key");

        fetch("/cart/change.js", { method: "post", body: new URLSearchParams({ id: key, quantity: 0 }) })
          .then((res) => res.json())
          .then((cart) => (AT.dispatchEvent("cartChange", cart), cartItem.remove()));
      });
    });
  },
  registerEvents: function (eventName, container) {
    if (typeof container !== "undefined") {
      this.eventContainers[eventName] = this.eventContainers[eventName] || [];
      this.eventContainers[eventName] = [...this.eventContainers[eventName], container];
    } else {
      console.error("container is not defined");
    }
  },
  eventContainers: {},
  dispatchEvent: function (eventName, data) {
    let containers = AT.eventContainers[eventName];
    containers.forEach((container) => {
      !!container && container.dispatchEvent(new CustomEvent(eventName, { detail: data }));
    });
  },
  serialize: function (form) {
    // Setup our serialized data
    var serialized = [];

    // Loop through each field in the form
    for (var i = 0; i < form.elements.length; i++) {
      var field = form.elements[i];

      // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
      if (
        !field.name ||
        field.disabled ||
        field.type === "file" ||
        field.type === "reset" ||
        field.type === "submit" ||
        field.type === "button"
      )
        continue;

      // If a multi-select, get all selections
      if (field.type === "select-multiple") {
        for (var n = 0; n < field.options.length; n++) {
          if (!field.options[n].selected) continue;
          serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value));
        }
      }

      // Convert field data to a query string
      else if ((field.type !== "checkbox" && field.type !== "radio") || field.checked) {
        serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
      }
    }

    return serialized.join("&");
  },
  currency: (function () {
    var moneyFormat = "${{amount}}";

    function formatMoney(cents, format) {
      if (typeof cents === "string") {
        cents = cents.replace(".", "");
      }
      var value = "";
      var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
      var formatString = format || moneyFormat;

      function formatWithDelimiters(number, precision, thousands, decimal) {
        thousands = thousands || ",";
        decimal = decimal || ".";

        if (isNaN(number) || number === null) {
          return 0;
        }

        number = (number / 100.0).toFixed(precision);

        var parts = number.split(".");
        var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + thousands);
        var centsAmount = parts[1] ? decimal + parts[1] : "";

        return dollarsAmount + centsAmount;
      }

      switch (formatString.match(placeholderRegex)[1]) {
        case "amount":
          value = formatWithDelimiters(cents, 2);
          break;
        case "amount_no_decimals":
          value = formatWithDelimiters(cents, 0);
          break;
        case "amount_with_comma_separator":
          value = formatWithDelimiters(cents, 2, ".", ",");
          break;
        case "amount_no_decimals_with_comma_separator":
          value = formatWithDelimiters(cents, 0, ".", ",");
          break;
        case "amount_no_decimals_with_space_separator":
          value = formatWithDelimiters(cents, 0, " ");
          break;
        case "amount_with_apostrophe_separator":
          value = formatWithDelimiters(cents, 2, "'");
          break;
      }

      return formatString.replace(placeholderRegex, value);
    }

    return {
      formatMoney: formatMoney,
    };
  })(),
};

export default AT;
