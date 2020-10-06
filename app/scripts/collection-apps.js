import { register, load } from "@shopify/theme-sections";

import AT from "./common/_arn";
import { Header, Footer } from "./common/section";
import Search from "./common/search";

window.lazySizesConfig = window.lazySizesConfig || {};
lazySizesConfig.loadMode = 1;
Mustache.tags = ["{-", "-}"];

(function () {
  register("header", Header);
  register("footer", Footer);

  load("*");

  Search.init();
  AT.initHandleCollapse();
  AT.initBackToTop();
})();
