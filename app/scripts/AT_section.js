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
      btnSearch: document.getElementById("js-handle-search"),
      headerDesktop: $container.getElementsByClassName("header-desktop")[0],
    };

    this.handleMenuMobile();
    this.handleCollapse();
    this.handleSearch();
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
  handleSearch: function () {
    let { btnSearch, headerDesktop } = this.elements;

    btnSearch.addEventListener("click", function () {
      if (window.innerWidth > 992) {
        if (headerDesktop.classList.contains("search-show")) {
          headerDesktop.classList.remove("search-show");
        } else {
          headerDesktop.classList.add("search-show");
        }
      }
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

    window.addEventListener("resize", function () {
      setPaddingFooter();
    });

    function setPaddingFooter() {
      let heightMobileBar = mobileBar.offsetHeight;

      footerWrapper.style.paddingBottom = `${
        heightMobileBar + paddingBottomFooterWrapper
      }px`;
    }
  },
};

let SupportTemplate = {
  onLoad: function () {
    let $container = this.container;
    let elmHeroBannerList = $container.getElementsByClassName("hero-banner");

    [...elmHeroBannerList].forEach((elmHeroBanner) => {
      let dataSetting = elmHeroBanner.getAttribute("data-setting");

      let collapseWrapper = document.createElement("li");
      collapseWrapper.classList.add("collapse");
      collapseWrapper.style.listStyle = "none";
      collapseWrapper.style.padding = "0px";

      let elmParagraph2 = elmHeroBanner.querySelector(".paragraph-2 ul");
      let elmLiList = elmParagraph2.children;

      [...elmLiList].forEach((li, index) => {
        if (index > dataSetting - 1) {
          collapseWrapper.appendChild(li);
        }
      });
      elmParagraph2.appendChild(collapseWrapper);

      let btnTrigger = elmHeroBanner.getElementsByClassName(
        "js-trigger-paragraph"
      )[0];
      let first = true,
        isComplete = false;
      btnTrigger.addEventListener("click", function () {
        if (first || isComplete) {
          first = false;
          isComplete = false;

          if (collapseWrapper.classList.contains("show")) {
            let height = collapseWrapper.offsetHeight;
            collapseWrapper.style.height = `${height}px`;
            AT.debounce(function () {
              collapseWrapper.style.height = "0px";
            }, 1)();
            AT.debounce(function () {
              collapseWrapper.style.height = "";
              collapseWrapper.classList.remove("show");
              isComplete = true;
            }, 200)();
          } else {
            collapseWrapper.classList.add("show");
            collapseWrapper.style.height = "0px";
            let height = [...collapseWrapper.children].reduce(
              (accu, currentValue) => accu + currentValue.offsetHeight,
              0
            );
            collapseWrapper.style.height = `${height}px`;
            AT.debounce(function () {
              collapseWrapper.style.height = "";
              isComplete = true;
            }, 200)();
          }
        }
      });
    });
  },
};

export {
  Header,
  IconsBox,
  FeaturedCollection,
  LogoList,
  Footer,
  SupportTemplate,
};
