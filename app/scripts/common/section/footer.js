import AT from "../_arn";

export let Footer = {
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
            let height = Object.values(children).reduce((accu, currentValue) => {
              return accu + currentValue.offsetHeight;
            }, 0);
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

      footerWrapper.style.paddingBottom = `${heightMobileBar + paddingBottomFooterWrapper}px`;
    }
  },
};
