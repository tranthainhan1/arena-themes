import { tns } from "tiny-slider/src/tiny-slider";
var AT_Main = {
  onClick: function (className, callBack) {
    document.querySelectorAll(className).forEach(function (el, index) {
      el.addEventListener("click", callBack);
    });
  },
  isExist: (element) => {
    return element == null || typeof element == "undefined" ? false : true;
  },

  getWidthBrowser: function () {
    /*Get width browser*/
    var myWidth;

    if (typeof window.innerWidth == "number") {
      /*Non-IE*/
      myWidth = window.innerWidth;
    } else if (
      document.documentElement &&
      (document.documentElement.clientWidth ||
        document.documentElement.clientHeight)
    ) {
      /*IE 6+ in 'standards compliant mode'*/
      myWidth = document.documentElement.clientWidth;
    } else if (
      document.body &&
      (document.body.clientWidth || document.body.clientHeight)
    ) {
      /*IE 4 compatible*/
      myWidth = document.body.clientWidth;
    }

    return myWidth;
  },

  getHeightBrowser: function () {
    /*Get width browser*/
    let result;

    if (typeof window.innerHeight == "number") {
      /*Non-IE*/
      result = window.innerHeight;
    } else if (
      document.documentElement &&
      (document.documentElement.clientWidth ||
        document.documentElement.clientHeight)
    ) {
      /*IE 6+ in 'standards compliant mode'*/
      result = document.documentElement.clientHeight;
    } else if (
      document.body &&
      (document.body.clientWidth || document.body.clientHeight)
    ) {
      /*IE 4 compatible*/
      result = document.body.clientHeight;
    }

    return result;
  },
  debounceTime: function (time, func) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var excuteFn = function () {
        func.apply(context, args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(excuteFn, time);
    };
  },
  fadeIn: function (elem, ms = 400) {
    if (!elem) return;

    elem.style.opacity = 0;
    elem.style.filter = "alpha(opacity=0)";
    elem.style.display = "inline-block";
    elem.style.visibility = "visible";

    if (ms) {
      var opacity = 0;
      var timer = setInterval(function () {
        opacity += 50 / ms;
        if (opacity >= 1) {
          clearInterval(timer);
          opacity = 1;
        }
        elem.style.opacity = opacity;
        elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
      }, 50);
    } else {
      elem.style.opacity = 1;
      elem.style.filter = "alpha(opacity=1)";
    }
  },
  fadeOut: function (elem, ms = 400) {
    if (!elem) return;

    if (ms) {
      var opacity = 1;
      var timer = setInterval(function () {
        opacity -= 50 / ms;
        if (opacity <= 0) {
          clearInterval(timer);
          opacity = 0;
          elem.style.display = "none";
          elem.style.visibility = "hidden";
        }
        elem.style.opacity = opacity;
        elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
      }, 50);
    } else {
      elem.style.opacity = 0;
      elem.style.filter = "alpha(opacity=0)";
      elem.style.display = "none";
      elem.style.visibility = "hidden";
    }
  },

  tabPanel_init: (container = null) => {
    let $container = container || document;
    $container
      .querySelectorAll(".featured_group_tab-ui .featured_group_tab-pane")
      .forEach((e, i) => {
        // e.classList.contains('active') ? AT_Main.fadeIn(e) : AT_Main.fadeOut(e);
      });

    AT_Main.onClick(
      ".featured_group_tab-ui .featured_group_tab-link a",
      (e) => {
        e.preventDefault();
        let _this = e.currentTarget,
          _target = $container.querySelector(_this.getAttribute("href"));

        if (
          _this
            .closest(".featured_group_tab-link")
            .classList.contains("active") ||
          !AT_Main.isExist(_target)
        ) {
          return;
        }

        let paneParent = _target.closest(".featured_group_tab-ui");

        paneParent
          .querySelectorAll(
            ".featured_group_tab-pane.active, .featured_group_tab-link.active"
          )
          .forEach((e, i) => {
            e.classList.remove("active");
            // e.classList.contains('featured_group_tab-pane') && !e.classList.contains('active') && AT_Main.fadeOut(e);
          });

        _this.closest(".featured_group_tab-link").classList.add("active");
        _target.classList.add("active");
        // AT_Main.fadeIn(_target);
      }
    );
  },
  initSlider: (container) => {
    let ss = container,
      conf = ss.querySelector(`input[name="sectionSlideConfig"]`),
      target = ss.querySelectorAll(".slide_ui-element");
    if (!AT_Main.isExist(target) || !AT_Main.isExist(conf)) {
      return;
    }

    let autoplay = false,
      autoplayTimeout = 5000,
      center = false,
      animateIn = "tns-fadeIn",
      animateOut = "tns-fadeOut",
      speed = 700,
      controls = conf.getAttribute("data-nav")
        ? JSON.parse(conf.getAttribute("data-nav"))
        : false,
      nav = conf.getAttribute("data-dot")
        ? JSON.parse(conf.getAttribute("data-dot"))
        : false,
      loop = conf.getAttribute("data-loop")
        ? JSON.parse(conf.getAttribute("data-loop"))
        : false,
      autoWidth = conf.getAttribute("data-auto-width")
        ? JSON.parse(conf.getAttribute("data-auto-width"))
        : false,
      items = conf.getAttribute("data-items").split(","),
      gutters = conf.getAttribute("data-gutters") || "",
      itemClass = conf.getAttribute("data-item-class");

    gutters = gutters.replace(/[^\d.,]/g, "").split(",");

    target.forEach((v, i) => {
      v.classList.contains("slide_mobile-center") && (center = true);
      v.classList.remove("row", "d-grid");

      let responsive = {
        0: {
          items: +items[5] || +items[0],
          gutter: +gutters[5] || +gutters[0],
          center: center,
        },
        375: {
          items: +items[4] || +items[0],
          gutter: +gutters[4] || +gutters[0],
          center: center,
        },
        576: {
          items: +items[3] || +items[0],
          gutter: +gutters[3] || +gutters[0],
          center: center,
        },
        768: {
          items: +items[2] || +items[0],
          gutter: +gutters[2] || +gutters[0],
          center: false,
        },
        992: {
          items: +items[1] || +items[0],
          gutter: +gutters[1] || +gutters[0],
          center: false,
        },
        1200: {
          items: +items[0] || +items[0],
          gutter: +gutters[0] || +gutters[0],
          center: false,
        },
      };

      if (itemClass != "") {
        for (var i = 0; i < v.children.length; i++) {
          v.children[i].className = itemClass;
        }
      }

      let wrapper = v.closest("div[data-slide-wrapper]") || ss;
      let sliderTNS = tns({
        container: v,
        items: items[5],
        //,mode: 'gallery'
        slideBy: 1,
        startIndex: 0,
        loop: loop,
        speed: speed,
        autoWidth: autoWidth,
        mouseDrag: true,
        swipeAngle: 30,
        autoplayButtonOutput: false,
        autoplay: autoplay,
        autoplayTimeout: autoplayTimeout,
        animateIn: animateIn,
        animateOut: animateOut,
        controls: controls,
        controlsPosition: "bottom",
        controlsContainer: wrapper.querySelector(".slide_ui-controls--nav"),
        nav: nav,
        navPosition: "bottom",
        responsive: responsive,
        preventActionWhenRunning: true,
        preventScrollOnTouch: "atuo",
        onInit: () => {
          if (AT_Main.isExist(container.querySelector(".tns-nav"))) {
            container
              .querySelector(".tns-nav")
              .classList.add("slide_ui-controls", "slide_ui-controls--dot");
          }
        },
      });
      sliderTNS.events.on("dragStart", (info, eventName) => {
        v.classList.add("is-sliding");
      });
      sliderTNS.events.on("dragEnd", (info, eventName) => {
        v.classList.remove("is-sliding");
      });
    });
  },
  initSlider_forGallery: (container) => {
    let ss = container,
      conf = ss.querySelector(`input[name="sectionSlideConfig"]`),
      target = ss.querySelectorAll(".slide_ui-element");
    if (!AT_Main.isExist(target) || !AT_Main.isExist(conf)) {
      return;
    }

    let autoplay = false,
      autoplayTimeout = 5000,
      animateIn = "tns-fadeIn",
      animateOut = "tns-fadeOut",
      speed = 700,
      controls = conf.getAttribute("data-nav")
        ? JSON.parse(conf.getAttribute("data-nav"))
        : false,
      nav = conf.getAttribute("data-dot")
        ? JSON.parse(conf.getAttribute("data-dot"))
        : false,
      loop = conf.getAttribute("data-loop")
        ? JSON.parse(conf.getAttribute("data-loop"))
        : false,
      autoWidth = conf.getAttribute("data-auto-width")
        ? JSON.parse(conf.getAttribute("data-auto-width"))
        : false,
      _autoWidth = autoWidth,
      items = conf.getAttribute("data-items").split(","),
      gutters = conf.getAttribute("data-gutters") || "",
      itemClass = conf.getAttribute("data-item-class");

    gutters = gutters.replace(/[^\d.,]/g, "").split(",");

    let responsive = {
      0: { items: +items[5] || +items[0], gutter: +gutters[5] || +gutters[0] },
      375: {
        items: +items[4] || +items[0],
        gutter: +gutters[4] || +gutters[0],
      },
      576: {
        items: +items[3] || +items[0],
        gutter: +gutters[3] || +gutters[0],
      },
      768: {
        items: +items[2] || +items[0],
        gutter: +gutters[2] || +gutters[0],
      },
      992: {
        items: +items[1] || +items[0],
        gutter: +gutters[1] || +gutters[0],
      },
      1200: {
        items: +items[0] || +items[0],
        gutter: +gutters[0] || +gutters[0],
      },
    };
    // console.log(responsive);
    // if(autoWidth && AT_Main.getWidthBrowser() < 992){_autoWidth = false;}

    target.forEach((v, i) => {
      if (itemClass != "") {
        for (var i = 0; i < v.children.length; i++) {
          v.children[i].className = itemClass;
        }
      }

      // v.classList.remove('row','d-grid');
      let wrapper = v.closest("div[data-slide-wrapper]") || ss;
      let sliderTNS = tns({
        container: v,
        items: items[5],
        slideBy: 1,
        startIndex: 0,
        loop: loop,
        speed: speed,
        autoWidth: _autoWidth,
        mouseDrag: true,
        swipeAngle: 30,
        autoplayButtonOutput: false,
        autoplay: autoplay,
        autoplayTimeout: autoplayTimeout,
        animateIn: animateIn,
        animateOut: animateOut,
        controls: controls,
        controlsPosition: "bottom",
        controlsContainer: wrapper.querySelector(".slide_ui-controls--nav"),
        nav: nav,
        navPosition: "bottom",
        responsive: responsive,
        preventActionWhenRunning: true,
        preventScrollOnTouch: "atuo",
        onInit: () => {
          if (AT_Main.isExist(container.querySelector(".tns-nav"))) {
            container
              .querySelector(".tns-nav")
              .classList.add("slide_ui-controls", "slide_ui-controls--dot");
          }
        },
      });
      sliderTNS.events.on("dragStart", (info, eventName) => {
        v.classList.add("is-sliding");
      });
      sliderTNS.events.on("dragEnd", (info, eventName) => {
        v.classList.remove("is-sliding");
      });
    });
  },
};
export { AT_Main };
