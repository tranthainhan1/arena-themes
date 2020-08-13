import AT_main from "./_arn";

let Header = {
  onLoad: function () {
    let $container = this.container;

    this.elements = {
      btnMenu: $container.querySelector(".js-handle-nav-mobile"),
    };
    this.handleMenuMobile();
  },
  handleMenuMobile: function () {
    let { btnMenu } = this.elements;

    btnMenu.addEventListener("click", function () {});
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

    this.init();
  },
  init: function () {
    this.elements.blocks.forEach((item) => {
      let elmMenuList = item.querySelector(".menu-list");
      let children = elmMenuList.children;
      let height = Object.values(children).reduce((accu, currentValue) => {
        return accu + currentValue.offsetHeight;
      }, 0);
      // elmMenuList.style.height = `${height}px`;

      let elmExpand = item.querySelector(".expand");

      elmExpand.addEventListener("click", function (e) {
        let elmParent = e.target.closest(".footer-top__item.menu-item");
        elmParent.classList.toggle("show");
        elmMenuList.style.height = "0px";
        elmMenuList.style.height = `${height}px`;
        elmMenuList.style.height = "";
      });
    });
  },
};

export { Header, IconsBox, FeaturedCollection, LogoList, Footer };
