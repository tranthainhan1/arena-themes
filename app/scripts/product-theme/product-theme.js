import "lazysizes/plugins/parent-fit/ls.parent-fit";
import "lazysizes/plugins/object-fit/ls.object-fit";
import "lazysizes";
import "lazysizes/plugins/rias/ls.rias";
import { register, load } from "@shopify/theme-sections";

import {
  Header,
  Footer,
  SupportTemplate,
  HeroBanner,
  CollectionThemes,
  CustomerLayout,
  CollectionApps,
  CollectionSubTask,
  Product,
} from "./_AT_section";
import AT from "./_arn";

window.lazySizesConfig = window.lazySizesConfig || {};
lazySizesConfig.loadMode = 1;

window.addEventListener("DOMContentLoaded", () => {
  register("header", Header);
  register("footer", Footer);
  register("support-template", SupportTemplate);
  register("hero-banner", HeroBanner);
  register("collection-themes", CollectionThemes);
  register("collection-apps", CollectionApps);
  register("collection-sub-task", CollectionSubTask);
  register("product-theme", Product);

  load("*");

  document.body.classList.contains("template-customers-login") && CustomerLayout();
  AT.initTNS();
  AT.getCart();
  AT.initHandleCollapse();
  AT.initBackToTop();
  AT.addToCart();
  AT.removeItemCart();
});
