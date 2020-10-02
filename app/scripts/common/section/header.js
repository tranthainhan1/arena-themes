export let Header = {
  onLoad: function () {
    let $container = this.container;
    this.elements = {
      btnMenu: $container.querySelector(".js-handle-nav-mobile"),
      menuMobileContainer: $container.querySelector(".js-nav-mobile"),
      elmTriggerCollapse: $container.querySelectorAll(".js-trigger-collapse"),
      overlayMenuMobile: $container.querySelector(".header .overlay-menu-mobile"),
      headerDesktop: $container.getElementsByClassName("header-desktop")[0],
    };

    this.handleMenuMobile();
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
};
