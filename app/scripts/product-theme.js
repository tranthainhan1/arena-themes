import { register, load } from "@shopify/theme-sections";

import AT from "./common/_arn";
import { Footer, Header, Product } from "./common/section";
import Search from "./common/search";

window.lazySizesConfig = window.lazySizesConfig || {};
lazySizesConfig.loadMode = 1;

(function () {
  Mustache.tags = ["{-", "-}"];

  register("header", Header);
  register("footer", Footer);
  register("product-theme", Product);

  load("*");

  Search.init();
  AT.initTNS();
  AT.addToCart();
  AT.initHandleCollapse();
  AT.initBackToTop();
})();
