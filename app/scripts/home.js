import "lazysizes/plugins/parent-fit/ls.parent-fit";
import "lazysizes/plugins/respimg/ls.respimg";
import "lazysizes/plugins/object-fit/ls.object-fit";
import "lazysizes";
import "lazysizes/plugins/rias/ls.rias";
import { register, load } from "@shopify/theme-sections";
import "./common/search";
import AT from "./common/_arn";
import { HeroBanner, Header, Footer } from "./common/section";
import Mustache from "mustache";
// import Search from "./common/search";

Mustache.tags = ["{-", "-}"];
window.lazySizesConfig = window.lazySizesConfig || {};
lazySizesConfig.loadMode = 1;

let Search = {
  element: {
    searchInputs: document.getElementsByClassName("js-search-input"),
  },
  init: function () {
    let { searchInputs } = this.element;

    [...searchInputs].forEach((input) => {
      let searchContainer = input.closest("[data-search-container]");
      let resultContainer = searchContainer.getElementsByClassName("search-result")[0];
      let keywordCOntainer = searchContainer.getElementsByClassName("keyword")[0];
      let openBtn = searchContainer.getElementsByClassName("js-open-search")[0];
      let closeBtn = searchContainer.getElementsByClassName("js-close-search")[0];
      let searchForm = searchContainer.getElementsByClassName("search-form")[0];
      let viewAllBtn = searchContainer.getElementsByClassName("btn-view-all")[0];

      let config = JSON.parse(searchContainer.getAttribute("data-config"));

      input.addEventListener(
        "keyup",
        AT.debounce(function (e) {
          let value = e.target.value;
          keywordCOntainer.innerHTML = value;
          config = Object.assign(config, { q: value });
          resultContainer.classList.remove("is-loading", "no-result", "is-result");
          resultContainer.classList.add("is-loading");

          fetch("/search/suggest.json?" + new URLSearchParams(config))
            .then((res) => res.json())
            .then((res) => Search.handleResult(resultContainer, res.resources.results));
        }, 500)
      );

      openBtn.addEventListener("click", function (e) {
        searchContainer.classList.add("search-show");
      });

      closeBtn.addEventListener("click", function (e) {
        searchContainer.classList.remove("search-show");
      });

      viewAllBtn.addEventListener("click", () => {
        searchForm.submit();
      });
    });
  },
  handleResult: (resultContainer, results) => {
    let count = Object.keys(results).reduce((accu, currentValue) => {
      accu += results[currentValue].length;
      return accu;
    }, 0);

    if (!!count) {
      resultContainer.classList.remove("is-loading");
      let resultTemplate = Search.handleTemplate(results);
      resultContainer.getElementsByClassName("results")[0].innerHTML = resultTemplate;
    } else {
      resultContainer.classList.remove("is-loading");
      resultContainer.classList.add("no-result");
    }
  },
  handleTemplate: function (results) {
    let template = document.getElementById("search_template").innerHTML;
    let object = {
      themes: results.products.filter((item) => !!item.type.match(/(theme|Theme|THEME|themes|Themes|THEMES)/gi)),
      apps: results.products.filter((item) => !!item.type.match(/(app|App|APP|apps|Apps|APPS)/gi)),
      articles: results.articles,
    };
    return Mustache.render(template, object);
  },
};

window.addEventListener("DOMContentLoaded", () => {
  register("header", Header);
  register("footer", Footer);
  register("hero-banner", HeroBanner);

  load("*");

  Search.init();
  AT.initTNS();
  AT.initHandleCollapse();
  AT.initBackToTop();
});
