// import "lazysizes/plugins/unveilhooks/ls.unveilhooks";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import "lazysizes/plugins/object-fit/ls.object-fit";
// import "lazysizes/plugins/bgset/ls.bgset";
import "lazysizes";
// import "lazysizes/plugins/respimg/ls.respimg";
import "lazysizes/plugins/rias/ls.rias";
// import "lazysizes/plugins/video-embed/ls.video-embed";
// import * as shopifyCart from "@shopify/theme-cart";
import { register, load } from "@shopify/theme-sections";
import {
  IconsBox,
  FeaturedCollection,
  LogoList,
  Header,
  Footer,
  SupportTemplate,
  HeroBanner,
  AboutTemplate,
  PartnersTemplate,
  CustomerLayout,
} from "./AT_section";

window.lazySizesConfig = window.lazySizesConfig || {};
lazySizesConfig.loadMode = 1;

window.addEventListener("DOMContentLoaded", () => {
  register("icons-cart", IconsBox);
  register("featured-collection", FeaturedCollection);
  register("logo-list", LogoList);
  register("header", Header);
  register("footer", Footer);
  register("support-template", SupportTemplate);
  register("hero-banner", HeroBanner);
  register("about-template", AboutTemplate);
  register("partners-template", PartnersTemplate);

  load("*");

  CustomerLayout();
});
