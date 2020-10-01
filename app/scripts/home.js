import "lazysizes/plugins/parent-fit/ls.parent-fit";
import "lazysizes/plugins/respimg/ls.respimg";
import "lazysizes/plugins/object-fit/ls.object-fit";
import "lazysizes";
import "lazysizes/plugins/rias/ls.rias";
import { register, load } from "@shopify/theme-sections";

import AT from "./common/_arn";
import { HeroBanner, Header, Footer } from "./common/section";

window.lazySizesConfig = window.lazySizesConfig || {};
lazySizesConfig.loadMode = 1;

window.addEventListener("DOMContentLoaded", () => {
  register("header", Header);
  register("footer", Footer);
  register("hero-banner", HeroBanner);

  load("*");

  AT.initTNS();
  AT.initHandleCollapse();
  AT.initBackToTop();
});
