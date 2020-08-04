import "lazysizes/plugins/unveilhooks/ls.unveilhooks";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import "lazysizes/plugins/object-fit/ls.object-fit";
import "lazysizes/plugins/bgset/ls.bgset";
import "lazysizes";
import "lazysizes/plugins/respimg/ls.respimg";
import "lazysizes/plugins/rias/ls.rias";
import "lazysizes/plugins/video-embed/ls.video-embed";
import * as shopifyCart from "@shopify/theme-cart";
import * as section from "@shopify/theme-sections";
import { tns } from "tiny-slider/src/tiny-slider";
import { AT_Main } from "./_arn";

window.lazySizesConfig = window.lazySizesConfig || {};
lazySizesConfig.loadMode = 1;
/*function __A() {return(async () => {let t = await new Promise((resolve, reject) => {setTimeout(() => {resolve(1);} ,3000)});return t;})()}*/

var ARN_Cart = {
  addCart: function (selector) {
    let form = selector.closest("form");

    if (!form.length) {
      return;
    }

    shopifyCart.addItemFromForm(form).then((item) => {
      let cartTarget = document.getElementById("cartShopping");
      let _target = cartTarget.querySelector(`a[data-item-key="${item.key}"]`);

      if (!document.body.contains(_target)) {
        return;
      }
      let html = `${item.quantity}x ${item.quantity > 1 ? "items" : "item"}`;
      _target
        .closest(".cart-item-block")
        .querySelector(".product-qty span").innerHTML = html;
    });
  },

  clearItem: function () {
    AT_Main.onClick(
      ".cart-item-block .cart-remove-item[data-item-key]",
      (e) => {
        let _this = e.currentTarget,
          key = _this.getAttribute("data-item-key");
        shopifyCart.removeItem(key).then((state) => {
          AT_Main.fadeOut(_this.closest(".cart-item-block"));
        });
      }
    );
  },
  clearAll: function () {
    AT_Main.onClick(".clear-cart-items", (e) => {
      e.preventDefault();
      shopifyCart.clearItems().then((state) => {
        console.log(`Your cart is now empty.`);
      });
    });
    AT_Main.onClick("#announcement-bar--close", (e) => {
      e.preventDefault();
      let _parent = e.currentTarget.closest("[data-section-type]");
      if (_parent === null) {
        return;
      }

      _parent.style.display = "none";
    });
  },
  eventHandle: function () {
    AT_Main.onClick(".btn-add-to-cart", (e) => {
      e.preventDefault();
      ARN_Cart.addCart(e.currentTarget);
    });

    ARN_Cart.clearItem();
    ARN_Cart.clearAll();
  },
  init: function () {
    this.eventHandle();
  },
};

var AT_Section = {
  slideshow: function () {
    section.register("slideshow", {
      onLoad: function () {
        let ss = this.container,
          sliderTNS,
          slideItem = ss.querySelectorAll(".slide-item"),
          slideConfig = ss.querySelector(`input[name="slideConfig"]`),
          loop = false,
          autoplay = false,
          autoplayTimeout = 5000,
          animateIn = "tns-fadeIn",
          animateOut = "tns-fadeOut",
          speed = 300;

        if (slideItem.length > 1) {
          if (typeof slideConfig != "undefined") {
            loop = JSON.parse(slideConfig.getAttribute("data-loop"));
            autoplayTimeout = +(
              slideConfig.getAttribute("data-autoplay") || "0"
            );
            autoplay = autoplayTimeout > 0 ? true : false;
          }

          sliderTNS = tns({
            container: ss.querySelector(".slideshow-wrapper"),
            items: 1,
            slideBy: 1,
            startIndex: 0,
            nav: false,
            loop: loop,
            speed: speed,
            autoplayButtonOutput: false,
            autoplay: autoplay,
            autoplayTimeout: autoplayTimeout,
            controlsPosition: "bottom",
            controlsContainer: ss.querySelector(".slideshow-controls"),
            animateIn: animateIn,
            animateOut: animateOut,
            preventActionWhenRunning: true,
            preventScrollOnTouch: "atuo",
          });

          slideItem.forEach((v, i) => {
            v.addEventListener("shopify:block:select", (e) => {
              let index = +v.getAttribute("data-index");
              sliderTNS.goTo(index);
            });
          });
        }
      },
    });
    section.load("slideshow");
  },

  registerSections: function () {
    section.register("featured-product", {
      onLoad: function () {
        AT_Main.initSlider(this.container);
      },
    });

    section.register("featured-product-tab", {
      onLoad: function () {
        AT_Main.tabPanel_init(this.container);
        AT_Main.initSlider(this.container);
      },
      onBlockSelect: function (e) {
        let _this = e.target.querySelector("a");
      },
    });

    section.register("featured-slide", {
      onLoad: function () {
        AT_Main.initSlider(this.container);
      },
    });

    section.register("instagram", {
      onLoad: function () {
        AT_Main.initSlider(this.container);
      },
    });
    section.register("featured-blog", {
      onLoad: function () {
        AT_Main.initSlider(this.container);
      },
    });
    section.register("featured-gallery", {
      onLoad: function () {
        AT_Main.initSlider_forGallery(this.container);
      },
    });
    section.register("featured-testimonials", {
      onLoad: function () {
        AT_Main.initSlider(this.container);
      },
    });

    section.load("featured-product");
    section.load("featured-product-tab");
    section.load("featured-slide");
    section.load("featured-blog");
    section.load("featured-gallery");
    section.load("featured-testimonials");
    section.load("instagram");
  },
  init: function () {
    this.slideshow();
    this.registerSections();
  },
};

window.addEventListener("DOMContentLoaded", (e) => {
  AT_Section.init();
  ARN_Cart.init();
});
