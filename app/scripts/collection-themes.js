import { register, load } from "@shopify/theme-sections";

import AT from "./common/_arn";
import { Header, Footer, CollectionThemes } from "./common/section";
import Search from "./common/search";

(function () {
  window.lazySizesConfig = window.lazySizesConfig || {};
  lazySizesConfig.loadMode = 1;
  Mustache.tags = ["{-", "-}"];

  register("header", Header);
  register("footer", Footer);
  register("collection-themes", CollectionThemes);

  load("*");

  Search.init();
  AT.initTNS();
  AT.initHandleCollapse();
  AT.initBackToTop();
})();
