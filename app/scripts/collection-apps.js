import { register, load } from "@shopify/theme-sections";

import AT from "./common/_arn";
import { Header, Footer, CollectionApps } from "./common/section";
import Search from "./common/search";

window.lazySizesConfig = window.lazySizesConfig || {};
lazySizesConfig.loadMode = 1;

(function () {
  register("header", Header);
  register("footer", Footer);
  register("collection-apps", CollectionApps);

  load("*");

  Search.init();
  AT.initHandleCollapse();
  AT.initBackToTop();
})();
