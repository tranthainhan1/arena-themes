import { register, load } from "@shopify/theme-sections";

import AT from "./common/_arn";
import Header from "./common/section/header";
import Footer from "./common/section/footer";

window.lazySizesConfig = window.lazySizesConfig || {};
lazySizesConfig.loadMode = 1;

window.addEventListener("DOMContentLoaded", () => {
  register("header", Header);
  register("footer", Footer);

  load("*");

  AT.initHandleCollapse();
  AT.initBackToTop();
});
