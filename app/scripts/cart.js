import { register, load } from "@shopify/theme-sections";

import AT from "./common/_arn";
import { Footer, Header, Cart } from "./common/section";
import Search from "./common/search";

window.lazySizesConfig = window.lazySizesConfig || {};
lazySizesConfig.loadMode = 1;

(function () {
  register("header", Header);
  register("footer", Footer);
  register("cart-template", Cart);

  load("*");

  Search.init();
  AT.initBackToTop();
  AT.removeItemCart();
})();
