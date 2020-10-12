export let CollectionApps = {
  onLoad: function () {
    this.elms = {
      sortByDesktop: document.getElementById("sort_by_desktop"),
      productGridContainer: document.getElementById("product_grid"),
      productCardTemplate: document.getElementById("product_cart_template").innerHTML,
    };

    this.config = JSON.parse(document.getElementById("page_info").innerHTML);

    this.initSortBy();
  },
  initSortBy: function () {
    let { sortByDesktop } = this.elms;
    let { templateSuffix } = this.config;

    sortByDesktop.addEventListener("change", (e) => {
      let value = e.target.value;
      let Url = new URL(window.location.href);
      Url.searchParams.set("sort_by", value);
      Url.searchParams.set("view", templateSuffix + ".json");

      fetch(Url)
        .then((res) => res.json(), Url.searchParams.delete("view"))
        .then((res) => this.handleResults(res));
      window.history.replaceState({ path: Url.href }, "", Url.href);
    });
  },
  handleResults: function (results) {
    let { productCardTemplate, productGridContainer } = this.elms;
    productGridContainer.innerHTML = Mustache.render(productCardTemplate, results);
  },
};
