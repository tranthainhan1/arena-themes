import AT_main from "./_arn";

let Header = {
  onLoad: function () {
    let $container = this.container;
    this.selector = {
      btnMenu: ".js-handle-nav-mobile",
      sidebarMenu: ".js-sidebar-menu",
    };
    this.elements = {
      btnMenu: $container.querySelector(this.selector.btnMenu),
      sidebarMenu: $container.querySelector(this.selector.sidebarMenu),
    };
    this.handleMenuMobile();
  },
  handleMenuMobile: function () {
    let { btnMenu, sidebarMenu } = this.elements;

    btnMenu.addEventListener("click", function () {
      sidebarMenu.classList.toggle("open");
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

export { Header, IconsBox, FeaturedCollection, LogoList };
