export let Header = {
  onLoad: function () {
    let $container = this.container;
    this.elements = {
      btnMenu: $container.querySelector(".js-handle-nav-mobile"),
      menuMobileContainer: $container.querySelector(".js-nav-mobile"),
      elmTriggerCollapse: $container.querySelectorAll(".js-trigger-collapse"),
      overlayMenuMobile: $container.querySelector(".header .overlay-menu-mobile"),
      btnOpenSearch: document.getElementById("js-open-search"),
      btnCloseSearch: document.getElementById("js-close-search"),
      headerDesktop: $container.getElementsByClassName("header-desktop")[0],
      elmSearch: document.getElementById("search"),
      elmSearchMobile: document.getElementById("search-mobile"),
      btnCloseSearchMobile: document.getElementById("close_search_mobile"),
      inputSearchMobile: document.getElementById("input_search_mobile"),
    };

    this.handleMenuMobile();
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
          document.body.classList.remove("popup-is-showing");
          isComplete = true;
        } else {
          document.body.classList.add("sidebar-mobile-show");
          btnMenu.classList.add("show");
          menuMobileContainer.classList.add("show");
          document.body.classList.add("popup-is-showing");
          isComplete = true;
        }
      }
    });
    overlayMenuMobile.addEventListener("click", function () {
      document.body.classList.remove("sidebar-mobile-show");
      btnMenu.classList.remove("show");
      menuMobileContainer.classList.remove("show");
      document.body.classList.remove("popup-is-showing");
    });
  },
  handleSearch: function () {
    let {
      btnOpenSearch,
      headerDesktop,
      btnCloseSearch,
      elmSearch,
      elmSearchMobile,
      btnCloseSearchMobile,
      inputSearchMobile,
    } = this.elements;

    btnOpenSearch.addEventListener("click", function () {
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
          document.body.classList.remove("popup-is-showing");
        } else {
          elmSearchMobile.classList.add("show");
          document.body.classList.add("popup-is-showing");
        }
      }
    });
    btnCloseSearch.addEventListener("click", function () {
      headerDesktop.classList.remove("search-show");
      headerDesktop.getElementsByClassName("js-search");
      document.body.classList.remove("popup-is-showing");
    });
    btnCloseSearchMobile.addEventListener("click", function () {
      elmSearchMobile.classList.remove("show");
      document.body.classList.remove("popup-is-showing");
    });
  },
};
