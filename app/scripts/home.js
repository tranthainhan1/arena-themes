import { register, load } from "@shopify/theme-sections";

import AT from "./common/_arn";
import { HeroBanner, Footer, Header } from "./common/section";
import Search from "./common/search";

window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.loadMode = 1;
window.lazySizesConfig.loadHidden = false;

(function () {
  register("header", Header);

  load("header");

  Search.init();
  AT.initTNS();
  AT.initHandleCollapse();
  AT.initBackToTop();
})();
document.addEventListener("lazyincluded", function (e) {
  let sectionType = e.target.getAttribute("data-type");
  if (sectionType != null) {
    switch (sectionType) {
      case "hero-banner":
        register("hero-banner", HeroBanner);
        load("hero-banner");
        AT.initHandleCollapse();
        break;
      case "logo-list":
        register("logo-list", { onLoad: function () {} });
        load("logo-list");
        AT.initTNS();
        break;
      case "footer":
        register("footer", Footer);
        load("footer");
        AT.initHandleCollapse();
      default:
        break;
    }
  }
});
