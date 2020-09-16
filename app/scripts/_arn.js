import { tns } from "tiny-slider/src/tiny-slider";
import serialize from "form-serialize";

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
  initAddToCart: function () {
    let btnAddToCart = document.getElementsByClassName("js-add-to-card");

    [...btnAddToCart].forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        let form = e.target.closest("form");
        let myHeaders = new Headers();
        let myRequest = new Request("/cart/add.js", {
          method: "post",
          headers: myHeaders,
          body: new URLSearchParams(serialize(form)),
        });

        fetch(myRequest)
          .then((res) => res.json())
          .then((res) => console.log(res));
      });
    });
  },
  initLinksOption: function () {
    let product = JSON.parse(document.getElementById("product-json").innerHTML);
    var Shopify = Shopify || {};

    // Required functionality from depricated options_selection.js
    (Shopify.arrayIncludes = function (e, t) {
      for (var n = 0; n < e.length; n++) if (e[n] == t) return !0;
      return !1;
    }),
      (Shopify.uniq = function (e) {
        for (var t = [], n = 0; n < e.length; n++) Shopify.arrayIncludes(t, e[n]) || t.push(e[n]);
        return t;
      });

    Shopify.optionsMap = {};

    Shopify.updateOptionsInSelector = function (selectorIndex) {
      switch (selectorIndex) {
        case 0:
          var key = "root";
          var selector = document.querySelector(".single-option-selector:nth-of-type(1)");
          break;
        case 1:
          var key = document.querySelector(".single-option-selector:nth-of-type(2)").value;
          var selector = document.querySelector(".single-option-selector:nth-of-type(2)");
          break;
        case 2:
          var key = document.querySelector(".single-option-selector:nth-of-type(1)").value;
          key += " / " + document.querySelector(".single-option-selector:nth-of-type(2)").value;
          var selector = document.querySelector(".single-option-selector:nth-of-type(3)");
      }

      var initialValue = selector.val();
      selector.empty();
      var availableOptions = Shopify.optionsMap[key];
      for (var i = 0; i < availableOptions.length; i++) {
        var option = availableOptions[i];
        var newOption = (document.createElement("option").value = option);
        newOption.innerHTML = option;
        selector.append(newOption);
      }
      document
        .querySelectorAll('.swatch[data-option-index="' + selectorIndex + '"] .swatch-element')
        .each(function (item) {
          if (availableOptions.contains(item.getAttribute("data-value"))) {
            $(this)
              .removeClass("soldout")
              .show()
              .find(":radio")
              .removeAttr("disabled", "disabled")
              .removeAttr("checked");
            item.classList.remove("soldout");

            item.removeAttribute("disabled");
            item.removeAttribute("checked");
          } else {
            $(this).addClass("soldout").hide().find(":radio").removeAttr("checked").attr("disabled", "disabled");
          }
        });
      if (jQuery.inArray(initialValue, availableOptions) !== -1) {
        selector.val(initialValue);
      }
      selector.trigger("change");
    };

    Shopify.linkOptionSelectors = function (product) {
      // Building our mapping object.
      for (var i = 0; i < product.variants.length; i++) {
        var variant = product.variants[i];
        if (variant.available) {
          // Gathering values for the 1st drop-down.
          Shopify.optionsMap["root"] = Shopify.optionsMap["root"] || [];
          Shopify.optionsMap["root"].push(variant.option1);
          Shopify.optionsMap["root"] = Shopify.uniq(Shopify.optionsMap["root"]);
          // Gathering values for the 2nd drop-down.
          if (product.options.length > 1) {
            var key = variant.option1;
            Shopify.optionsMap[key] = Shopify.optionsMap[key] || [];
            Shopify.optionsMap[key].push(variant.option2);
            Shopify.optionsMap[key] = Shopify.uniq(Shopify.optionsMap[key]);
          }
          // Gathering values for the 3rd drop-down.
          if (product.options.length === 3) {
            var key = variant.option1 + " / " + variant.option2;
            Shopify.optionsMap[key] = Shopify.optionsMap[key] || [];
            Shopify.optionsMap[key].push(variant.option3);
            Shopify.optionsMap[key] = Shopify.uniq(Shopify.optionsMap[key]);
          }
        }
      }
      // Update options right away.
      Shopify.updateOptionsInSelector(0);
      if (product.options.length > 1) Shopify.updateOptionsInSelector(1);
      if (product.options.length === 3) Shopify.updateOptionsInSelector(2);
      // When there is an update in the first dropdown.
      jQuery(".single-option-selector:eq(0)").change(function () {
        Shopify.updateOptionsInSelector(1);
        if (product.options.length === 3) Shopify.updateOptionsInSelector(2);
        return true;
      });
      // When there is an update in the second dropdown.
      jQuery(".single-option-selector:eq(1)").change(function () {
        if (product.options.length === 3) Shopify.updateOptionsInSelector(2);
        return true;
      });
    };

    if (product.available && product.options.size > 1) {
      var $addToCartForm = $('form[action="/cart/add"]');
      if (window.MutationObserver && $addToCartForm.length) {
        if (typeof observer === "object" && typeof observer.disconnect === "function") {
          observer.disconnect();
        }
        var config = { childList: true, subtree: true };
        var observer = new MutationObserver(function () {
          Shopify.linkOptionSelectors(product);
          observer.disconnect();
        });
        observer.observe($addToCartForm[0], config);
      }
    }

    var selector = jQuery(".single-option-selector:eq(0)");
    selector.trigger("change");

    // {% if product.options.size == 1 %}
    //   {% for variant in product.variants %}
    //     {% unless variant.available %}
    //       jQuery('.single-option-selector option').filter(function() { return jQuery(this).text().trim() === {{ variant.title | json }}; }).remove();
    //     {% endunless %}
    //   {% endfor %}
    //   jQuery('.single-option-selector').trigger('change');
    // {% endif %}
  },
};

export default AT;
