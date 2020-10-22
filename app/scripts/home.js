import { register, load } from "@shopify/theme-sections";

import AT from "./common/_arn";
import { HeroBanner, Footer, Header } from "./common/section";
import Search from "./common/search";

window.lazySizesConfig = window.lazySizesConfig || {};
lazySizesConfig.loadMode = 1;

(function () {
  register("header", Header);
  register("footer", Footer);
  register("hero-banner", HeroBanner);

  load("*");

  Search.init();
  AT.initTNS();
  AT.initHandleCollapse();
  AT.initBackToTop();
})();
