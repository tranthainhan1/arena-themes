import AT from "./_arn";

let Header = {
  onLoad: function () {
    let $container = this.container;

    this.elements = {
      btnMenu: $container.querySelector(".js-handle-nav-mobile"),
      menuMobileContainer: $container.querySelector(".js-nav-mobile"),
      elmTriggerCollapse: $container.querySelectorAll(".js-trigger-collapse"),
      overlayMenuMobile: $container.querySelector(
        ".header .overlay-menu-mobile"
      ),
    };

    this.handleMenuMobile();
    this.handleCollapse();
  },
  handleMenuMobile: function () {
    let first = true,
      isComplete = false,
      { btnMenu, overlayMenuMobile, menuMobileContainer } = this.elements;
    btnMenu.addEventListener("click", (e) => {
      if (first || isComplete) {
        first = false;
        isComplete = false;
        if (btnMenu.classList.contains("show")) {
          document.body.classList.remove("sidebar-mobile-show");
          btnMenu.classList.remove("show");
          menuMobileContainer.classList.remove("show");
          isComplete = true;
        } else {
          document.body.classList.add("sidebar-mobile-show");
          btnMenu.classList.add("show");
          menuMobileContainer.classList.add("show");
          isComplete = true;
        }
      }
    });
    overlayMenuMobile.addEventListener("click", function () {
      document.body.classList.remove("sidebar-mobile-show");
      btnMenu.classList.remove("show");
      menuMobileContainer.classList.remove("show");
      console.log(menuMobileContainer);
    });
  },
  handleCollapse: function () {
    let first = true,
      isComplete = false;
    let { elmTriggerCollapse } = this.elements;
    elmTriggerCollapse.forEach(function (item) {
      let parent = item.closest(".link-list__item");
      let collapseContainer = parent.querySelector(".dropdown-menu-mobile");
      let childCollapseContainer = collapseContainer.children;

      item.addEventListener("click", function () {
        if (first || isComplete) {
          first = false;
          isComplete = false;
          if (this.classList.contains("show")) {
            let height = collapseContainer.offsetHeight;
            collapseContainer.style.height = `${height}px`;
            AT.debounce(function () {
              collapseContainer.style.height = "0px";
            }, 1)();
            AT.debounce(() => {
              collapseContainer.style.height = "";
              this.classList.remove("show");
              collapseContainer.classList.remove("show");
              isComplete = true;
            }, 200)();
          } else {
            this.classList.add("show");
            collapseContainer.classList.add("show");
            collapseContainer.style.height = "0px";
            let height = Object.values(childCollapseContainer).reduce(
              (accu, currentValue) => {
                return accu + currentValue.offsetHeight;
              },
              0
            );
            collapseContainer.style.height = `${height}px`;
            AT.debounce(function () {
              collapseContainer.style.height = "";
              isComplete = true;
            }, 200)();
          }
        }
      });
    });
  },
};

let IconsBox = {
  onLoad: function () {
    this.tns = AT.initTinySlider(this.container);
  },
};

let FeaturedCollection = {
  onLoad: function () {
    this.tns = AT.initTinySlider(this.container);
  },
};

let LogoList = {
  onLoad: function () {
    this.tns = AT.initTinySlider(this.container);
  },
};

let Footer = {
  onLoad: function () {
    let $container = this.container;

    this.elements = {
      blocks: $container.querySelectorAll(".footer-top__item.menu-item"),
      footerWrapper: $container.querySelector(".footer .footer__wrapper"),
    };
    this.handleCollapse();
    this.handlePaddingFooter();
  },
  handleCollapse: function () {
    let first = true,
      isComplete = false;
    this.elements.blocks.forEach((item) => {
      let elmMenuList = item.querySelector(".js-collapse");
      let children = elmMenuList.children;
      let elmExpand = item.querySelector(".js-trigger-collapse");

      elmExpand.addEventListener("click", function (e) {
        if (first || isComplete) {
          first = false;
          isComplete = false;
          let elmParent = e.target.closest(".footer-top__item.menu-item");

          if (elmParent.classList.contains("show")) {
            let height = elmMenuList.offsetHeight;
            elmMenuList.style.height = `${height}px`;
            AT.debounce(function () {
              elmMenuList.style.height = "0px";
            }, 1)();
            AT.debounce(function () {
              elmParent.classList.remove("show");
              elmMenuList.style.height = "";
              isComplete = true;
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
            AT.debounce(function () {
              elmMenuList.style.height = "";
              isComplete = true;
            }, 200)();
          }
        }
      });
    });
  },
  handlePaddingFooter: function () {
    let { footerWrapper } = this.elements,
      style = getComputedStyle(footerWrapper),
      mobileBar = document.querySelector(".mobile-bar"),
      paddingBottomFooterWrapper = parseInt(style.paddingBottom);

    if (window.innerWidth < 992) {
      setPaddingFooter();
    }

    window.onresize = function () {
      setPaddingFooter();
    };

    function setPaddingFooter() {
      let heightMobileBar = mobileBar.offsetHeight;

      footerWrapper.style.paddingBottom = `${
        heightMobileBar + paddingBottomFooterWrapper
      }px`;
    }
  },
};

export { Header, IconsBox, FeaturedCollection, LogoList, Footer };
