import "lazysizes/plugins/parent-fit/ls.parent-fit";
import "lazysizes/plugins/object-fit/ls.object-fit";
import "lazysizes";
import "lazysizes/plugins/rias/ls.rias";
import { register, load } from "@shopify/theme-sections";

import { Header, Footer } from "./_AT_section";
import AT from "./_arn";

window.lazySizesConfig = window.lazySizesConfig || {};
lazySizesConfig.loadMode = 1;

window.addEventListener("DOMContentLoaded", () => {
  register("header", Header);
  register("footer", Footer);

  load("*");

  AT.initTNS();
  AT.getCart();
  AT.initHandleCollapse();
  AT.initBackToTop();
  AT.addToCart();
});
