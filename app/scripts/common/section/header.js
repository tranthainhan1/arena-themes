import AT from "../_arn";

export let Header = {
  onLoad: function () {
    let $container = this.container;
    this.elms = {
      btnMenu: $container.querySelector(".js-handle-nav-mobile"),
      menuMobileContainer: $container.querySelector(".js-nav-mobile"),
      elmTriggerCollapse: $container.querySelectorAll(".js-trigger-collapse"),
      overlayMenuMobile: $container.querySelector(".header .overlay-menu-mobile"),
      headerDesktop: $container.getElementsByClassName("header-desktop")[0],
      openSearch: $container.getElementsByClassName("js-open-search")[0],
      totalItemCart: document.getElementById("total_item_of_cart"),
    };

    this.handleMenuMobile();
    this.toggleSearch();
    this.initSticky();
    AT.registerEvents("cartChange", this.elms.totalItemCart);

    this.elms.totalItemCart.addEventListener("cartChange", function ({ detail: cart }) {
      this.innerHTML = cart.item_count;
    });
  },
  handleMenuMobile: function () {
    let first = true,
      isComplete = false,
      { btnMenu, overlayMenuMobile, menuMobileContainer } = this.elms;
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
  toggleSearch: function () {
    let { openSearch } = this.elms;

    openSearch.addEventListener("click", (e) => {
      let desktopSearch = this.container.getElementsByClassName("search")[0];
      let mobileSearch = document.getElementById("search_mobile");

      if (window.innerWidth > 991.9) {
        desktopSearch.classList.add("search-show");
      } else {
        mobileSearch.classList.add("show");
      }
    });
  },
  initSticky: function () {
    let container = this.container;

    window.pageYOffset > 0 && container.classList.add("is-sticking");

    window.addEventListener("scroll", function () {
      window.pageYOffset > 0 ? container.classList.add("is-sticking") : container.classList.remove("is-sticking");
    });
  },
};
