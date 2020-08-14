import AT_main from "./_arn";

let Header = {
  onLoad: function () {
    let $container = this.container;

    this.elements = {
      btnMenu: $container.querySelector(".js-handle-nav-mobile"),
      menuMobileContainer: $container.querySelector(".js-nav-mobile"),
    };

    this.handleMenuMobile();
  },
  handleMenuMobile: function () {
    let first = true,
      isComplte = false;
    this.elements.btnMenu.addEventListener("click", (e) => {
      let { btnMenu, menuMobileContainer } = this.elements;
      // if (first || isComplete) {
      if (btnMenu.classList.contains("show")) {
        btnMenu.classList.remove("show");
        menuMobileContainer.classList.remove("show");
      } else {
        btnMenu.classList.add("show");
        menuMobileContainer.classList.add("show");
      }
      // }
    });
  },
};

let IconsBox = {
  onLoad: function () {
    this.tns = AT_main.initTinySlider(this.container);
  },
};

let FeaturedCollection = {
  onLoad: function () {
    this.tns = AT_main.initTinySlider(this.container);
  },
};

let LogoList = {
  onLoad: function () {
    this.tns = AT_main.initTinySlider(this.container);
  },
};

let Footer = {
  onLoad: function () {
    let $container = this.container;

    this.elements = {
      blocks: $container.querySelectorAll(".footer-top__item.menu-item"),
    };
    this.handleCollapse();
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

export { Header, IconsBox, FeaturedCollection, LogoList, Footer };
