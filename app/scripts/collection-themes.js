import { register, load } from "@shopify/theme-sections";

import AT from "./common/_arn";
import { Header, Footer } from "./common/section";
import Search from "./common/search";

window.lazySizesConfig = window.lazySizesConfig || {};
lazySizesConfig.loadMode = 1;

let CollectionThemes = {
  onLoad: function () {
    let container = this.container;
    this.elms = {
      toggleSbButtons: container.getElementsByClassName("js-sb-toggle"),
      sidebarContainer: document.getElementById("sb_container"),
      filterMasterInput: document.getElementById("sb_filter"),
      filterItemInputs: container.querySelectorAll(".js-filter-item input"),
      productGridContainer: document.getElementById("product_grid"),
      pagination: document.getElementById("collection_pagination"),
      productCardTemplate: document.getElementById("product_cart_template").innerHTML,
      paginationTemplate: document.getElementById("pagination_template").innerHTML,
    };
    this.handleSidebar();
    this.initFilter();
  },
  handleSidebar: function () {
    let { toggleSbButtons, sidebarContainer } = this.elms;

    [...toggleSbButtons].forEach((btn) => {
      btn.addEventListener("click", function () {
        sidebarContainer.classList.toggle("show");
      });
    });
  },
  initFilter: function () {
    let { filterMasterInput, filterItemInputs } = this.elms;

    [...filterItemInputs].forEach((input) => {
      input.addEventListener("change", (e) => {
        let input = e.target;
        let tag = input.value;
        let filterData = JSON.parse(filterMasterInput.getAttribute("data-filter"));

        if (input.checked) {
          filterData.push(tag);
          filterMasterInput.setAttribute("data-filter", JSON.stringify(filterData));
        } else {
          filterData = filterData.filter((item) => item !== tag);
          filterMasterInput.setAttribute("data-filter", JSON.stringify(filterData));
        }
      });
    });
    let observe = new MutationObserver((records) => {
      let target = records[0].target;
      let filterData = JSON.parse(target.getAttribute("data-filter"));
      let template = target.getAttribute("data-template");

      fetch(`${window.location.href}/${filterData.join("+")}?view=${template}.json`)
        .then((res) => res.json())
        .then((results) => {
          this.handleFilterResults(results);
          this.handlePagination(results);
        });
    });

    observe.observe(filterMasterInput, { attributes: true, attributeOldValue: true });
  },
  handleFilterResults: function (res) {
    let { productCardTemplate, productGridContainer } = this.elms;
    productGridContainer.innerHTML = Mustache.render(productCardTemplate, res);
  },
  handlePagination: function (res) {
    console.log(res.paginate);
    let { pagination, paginationTemplate } = this.elms;
    pagination.innerHTML = Mustache.render(paginationTemplate, res);
  },
};

(function () {
  Mustache.tags = ["{-", "-}"];

  register("header", Header);
  register("footer", Footer);
  register("collection-themes", CollectionThemes);

  load("*");
  // fetch("/collections/themes?view=themes.json")
  //   .then((res) => res.json())
  //   .then((res) => console.log(res.products[0]));
  Search.init();
  AT.initTNS();
  AT.initHandleCollapse();
  AT.initBackToTop();
})();
