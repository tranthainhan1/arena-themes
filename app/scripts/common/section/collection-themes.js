export let CollectionThemes = {
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
      sortBySelects: container.getElementsByClassName("select-sort"),
      showingContainer: container.getElementsByClassName("pagination-showing")[0],
    };

    this.config = Object.assign(JSON.parse(document.getElementById("page_info").innerHTML), {
      URL: new URL(window.location.href),
    });
    this.handleSidebar();
    this.initFilter();
    this.initSortby();
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
    let { filterMasterInput, filterItemInputs, sortBySelects } = this.elms;
    let { sortBy, URL, templateSuffix } = this.config;

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
      let oldAttribute = JSON.parse(records[0].oldValue);
      let filterData = JSON.parse(target.getAttribute("data-filter"));
      let rootUrl = URL.href.replace(URL.search, "");
      let sortValue = sortBySelects[0].value;

      let newUrl = rootUrl.split("/").filter((item, index) => {
        if (index > 1 && !item) {
          return false;
        }
        if (oldAttribute.length >= 2) {
          return item !== oldAttribute.join("+");
        }
        return oldAttribute.indexOf(item) === -1;
      });

      if (filterData.length) {
        newUrl = newUrl.concat(filterData.join("+")).join("/");
      } else {
        newUrl = newUrl.join("/");
      }

      URL.href = newUrl;

      if (sortValue !== sortBy) {
        URL.searchParams.set("sort_by", sortValue);
      }

      window.history.replaceState({ path: URL.href }, "", URL.href);
      URL.searchParams.set("view", templateSuffix + ".json");

      this.fetch(URL);
    });

    observe.observe(filterMasterInput, { attributes: true, attributeOldValue: true });
  },
  handleResults: function (results) {
    let { productCardTemplate, productGridContainer } = this.elms;
    productGridContainer.innerHTML = Mustache.render(productCardTemplate, results);
  },
  handlePagination: function (results) {
    let { pagination, paginationTemplate, showingContainer } = this.elms;
    !!pagination && (pagination.innerHTML = Mustache.render(paginationTemplate, results));

    let showingTemplate = "<span>{{ pagination_showing }}</span>";

    !!showingContainer && (showingContainer.innerHTML = Mustache.render(showingTemplate, results));
  },
  initSortby: function () {
    let { sortBySelects } = this.elms;
    let { URL, templateSuffix } = this.config;

    [...sortBySelects].forEach((select) => {
      select.addEventListener("change", (e) => {
        let value = e.target.value;

        [...sortBySelects].forEach((select) => (select.value = value));

        URL.searchParams.set("sort_by", value);
        URL.searchParams.set("view", templateSuffix + ".json");

        this.fetch(URL);

        URL.searchParams.delete("view");

        window.history.replaceState({ path: URL.href }, "", URL.href);
      });
    });
  },
  fetch: function (URL) {
    fetch(URL)
      .then((res) => res.json())
      .then((results) => {
        this.handleResults(results);
        this.handlePagination(results);
      });
  },
};
