import { register, load } from "@shopify/theme-sections";

import AT from "./common/_arn";
import { Header, Footer, CollectionSubTask } from "./common/section";
import Search from "./common/search";

window.lazySizesConfig = window.lazySizesConfig || {};
lazySizesConfig.loadMode = 1;

(function () {
  register("header", Header);
  register("footer", Footer);
  register("collection-sub-task", CollectionSubTask);

  load("*");

  Search.init();
  AT.initTNS();
  AT.initHandleCollapse();
  AT.initBackToTop();
})();
