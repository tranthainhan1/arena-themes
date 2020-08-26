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
      btnCloseSearch: document.getElementById("js-close-search"),
      headerDesktop: $container.getElementsByClassName("header-desktop")[0],
      elmSearch: document.getElementById("search"),
      elmSearchMobile: document.getElementById("search-mobile"),
      btnCloseSearchMobile: document.getElementById("close_search_mobile"),
      inputSearchMobile: document.getElementById("input_search_mobile"),
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
    let {
      btnSearch,
      headerDesktop,
      btnCloseSearch,
      elmSearch,
      elmSearchMobile,
      btnCloseSearchMobile,
      inputSearchMobile,
    } = this.elements;

    btnSearch.addEventListener("click", function () {
      if (window.innerWidth > 991) {
        if (headerDesktop.classList.contains("search-show")) {
          headerDesktop.classList.remove("search-show");
        } else {
          headerDesktop.classList.add("search-show");
          elmSearch.getElementsByTagName("input")[0].focus();
        }
      } else {
        if (elmSearchMobile.classList.contains("show")) {
          elmSearchMobile.classList.remove("show");
        } else {
          elmSearchMobile.classList.add("show");
          inputSearchMobile.focus();
        }
      }
    });
    btnCloseSearch.addEventListener("click", function () {
      headerDesktop.classList.remove("search-show");
    });
    btnCloseSearchMobile.addEventListener("click", function () {
      elmSearchMobile.classList.remove("show");
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
    this.elements.blocks.forEach((item) => {
      let first = true,
        isComplete = false;
      let elmMenuList = item.getElementsByClassName("js-collapse")[0];
      let children = elmMenuList.children;
      let elmExpand = item.getElementsByClassName("js-trigger-collapse")[0];

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

      AT.handleCollapse(btnTrigger, collapseWrapper);
    });
  },
};

let HeroBanner = {
  onLoad: function () {
    let $container = this.container;
    let dataSetting = $container.getAttribute("data-setting");

    if (dataSetting) {
      let collapseWrapper = document.createElement("li");
      collapseWrapper.classList.add("collapse");
      collapseWrapper.style.listStyle = "none";
      collapseWrapper.style.padding = "0px";

      let elmParagraph2 = $container.querySelector(".paragraph-2 ul");
      let elmLiList = elmParagraph2.children;

      [...elmLiList].forEach((li, index) => {
        if (index > dataSetting - 1) {
          collapseWrapper.appendChild(li);
        }
      });
      elmParagraph2.appendChild(collapseWrapper);

      let btnTrigger = $container.getElementsByClassName(
        "js-trigger-paragraph"
      )[0];

      AT.handleCollapse(btnTrigger, collapseWrapper);
    }
  },
};

let AboutTemplate = {
  onLoad: function () {
    let $container = this.container,
      blockImageGallery = $container.getElementsByClassName("image-gallery")[0],
      blockHerobanner = $container.getElementsByClassName("hero-banner-v2")[0];

    (function () {
      let btnCollapse = blockImageGallery.getElementsByClassName(
          "js-btn-collapse"
        )[0],
        collapseContainer = blockImageGallery.getElementsByClassName(
          "js-collapse"
        )[0];
      AT.handleCollapse(btnCollapse, collapseContainer);
    })();

    (function () {
      let btnCollapse = blockHerobanner.getElementsByClassName(
          "js-btn-collapse"
        )[0],
        collapseContainer = blockHerobanner.getElementsByClassName(
          "js-collapse"
        )[0];
      AT.handleCollapse(btnCollapse, collapseContainer);
    })();
  },
};

let PartnersTemplate = {
  onLoad: function () {
    let $container = this.container;
    this.elements = {
      btnCollapse: $container.getElementsByClassName("js-btn-collapse"),
      collapseContainer: $container.getElementsByClassName("js-collapse"),
    };

    this.handleFAQCollapse();
  },

  handleFAQCollapse: function () {
    let { btnCollapse, collapseContainer } = this.elements;

    [...btnCollapse].forEach((item, index) => {
      AT.handleCollapse(item, collapseContainer[index]);
    });
  },
};

let CustomerLayout = (function () {
  function customerLayout() {
    document
      .getElementById("switch_form_register")
      .addEventListener("click", function (e) {
        document.getElementById("login").style.display = "none";
        document.getElementById("register").style.display = "block";
      });

    document
      .getElementById("switch_form_login")
      .addEventListener("click", function (e) {
        document.getElementById("login").style.display = "block";
        document.getElementById("register").style.display = "none";
      });

    document
      .getElementById("switch_form_recover")
      .addEventListener("click", function (e) {
        document.getElementById("login").style.display = "none";
        document.getElementById("recover_password").style.display = "block";
      });

    document
      .getElementById("back_form_login")
      .addEventListener("click", function (e) {
        document.getElementById("login").style.display = "block";
        document.getElementById("recover_password").style.display = "none";
      });

    [...document.getElementsByClassName("password-toggle")].forEach((item) => {
      item.addEventListener("click", function () {
        let input = item.previousElementSibling;

        if (this.classList.contains("show")) {
          this.classList.remove("show");
          input.setAttribute("type", "password");
        } else {
          this.classList.add("show");
          input.setAttribute("type", "text");
        }
      });
    });
  }

  return customerLayout;
})();

let CollectionThemes = {
  onLoad: function () {
    this.handleSidebar();
  },
  handleSidebar: function () {
    let btnOpen = document.getElementById("js-open-sidebar");
    let btnClose = document.getElementsByClassName("js-close-sidebar");

    let sidebarContainer = document.getElementById("js-sidebar-container");

    btnOpen.addEventListener("click", function () {
      sidebarContainer.classList.add("show");
      document.body.style.overflow = "hidden";
    });

    [...btnClose].forEach((btn) => {
      btn.addEventListener("click", function () {
        sidebarContainer.classList.remove("show");
        document.body.style.overflow = "";
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
  HeroBanner,
  AboutTemplate,
  PartnersTemplate,
  CollectionThemes,
  CustomerLayout,
};
