import "lazysizes/plugins/parent-fit/ls.parent-fit";
import "lazysizes/plugins/respimg/ls.respimg";
import "lazysizes/plugins/object-fit/ls.object-fit";
import "lazysizes";
import "lazysizes/plugins/rias/ls.rias";
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
