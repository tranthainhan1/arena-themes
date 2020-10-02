import AT from "./_arn";

var AT_Search = {
  settings: {
    resultLayout: "#searchResultLayout",
    searchDialog: "#searchModal",
    container: "[data-search-container]",
    resultTarget: "[data-search-result]",
    type: "[data-result-type]",
    item: ".search-result-item",
    title: "[data-item-title]",
    url: "[data-item-url]",
    image: "[data-item-image]",
    imageWrapper: ".result-item-image",
    price: "[data-item-price]",
    soldout: "[data-item-soldout]",
    submit: "[data-search-submit]",
  },
  refreshSearch: () => {
    let searchActive = document.querySelectorAll(".search-is-active, .search-is-typing");
    searchActive.length &&
      searchActive.forEach((e) => {
        e.classList.remove("search-is-active", "search-is-typing");
      });
  },
  handleEvent: () => {
    let searchInput = document.querySelectorAll('input[name="q"]'),
      settings = AT_Search.settings,
      searchDialog = document.querySelector(settings.searchDialog);

    searchInput.length &&
      searchInput.forEach((searchElement) => {
        let searchContainer = searchElement.closest(settings.container);

        searchElement.addEventListener("focus", (e) => {
          AT_Search.refreshSearch();
          searchContainer.classList.add("search-is-active");
          searchElement.value.length
            ? searchContainer.classList.add("search-is-typing")
            : searchContainer.classList.remove("search-is-typing");

          if (AT_Main.getWidthBrowser() < 992 && !AT_Main.isExist(searchElement.closest(settings.searchDialog))) {
            AT_Main.triggerDialog(settings.searchDialog);
            searchDialog.querySelector('input[name="q"]').focus();
          }
        });

        searchElement.addEventListener(
          "keyup",
          AT_Main.debounceTime(500, (e) => {
            AT_Search.fetchData(searchElement, searchElement.value);
            searchElement.value.length
              ? searchContainer.classList.add("search-is-typing")
              : searchContainer.classList.remove("search-is-typing");
          })
        );
      });

    AT_Main.isExist(searchDialog.querySelector(".btn-search-clear")) &&
      searchDialog.querySelector(".btn-search-clear").addEventListener("click", (e) => {
        e.preventDefault();
        let input = searchDialog.querySelector('input[name="q"]');
        let searchContainer = input.closest(settings.container);

        searchDialog.querySelector(settings.resultTarget).innerHTML = "";
        input.value = "";
        input.focus();
        searchContainer.classList.remove("search-is-typing");
      });

    document.body.addEventListener("click", (e) => {
      let searchActive = document.querySelectorAll(".search-is-active");
      searchActive.length &&
        !AT_Main.isExist(e.target.closest(".search-is-active")) &&
        searchActive.forEach((e) => {
          e.classList.remove("search-is-active");
        });
    });
  },
  fetchData: (selector, value) => {
    let config = theme.search,
      settings = AT_Search.settings,
      container = selector.closest(settings.container),
      resultSelector = container.querySelector(settings.resultTarget);

    if (!container.classList.contains("search-is-active")) {
      AT_Search.refreshSearch();
      container.classList.add("search-is-active");
    }
    /***
     *
     * If keyword length smaller than 2 > notify and return
     *
     ***/
    if (selector.value.length == 0) {
      resultSelector.innerHTML = "";
      return;
    }
    if (selector.value.length > 0 && selector.value.length < 2) {
      resultSelector.innerHTML = `<li class="result-notify">${config.notify_character}</li>`;
      return;
    }

    let type = config.type == "product" ? ["product"] : ["product", "article", "page", "collection"];

    fetch(
      `/search/suggest.json?q=${value}&resources[type]=${type}&resources[limit]=${config.limit}&resources[options][unavailable_products]=${config.unavailable_result}`
    )
      .then((response) => response.json())
      .then((suggestions) => {
        let rs = suggestions.resources.results,
          resultHTML = "";

        if (type.length == 1) {
          resultHTML += AT_Search.renderResult(rs.products, type[0]);
        } else {
          for (let i in rs) {
            rs[i].length > 0 && (resultHTML += AT_Search.renderResult(rs[i], i));
          }
        }

        let lastestIem = document.querySelector(settings.resultLayout + " .search-redirect");

        AT_Main.isExist(lastestIem) && resultHTML != "" && (resultHTML += lastestIem.outerHTML);
        resultSelector.innerHTML = resultHTML != "" ? resultHTML : `<li class="result-notify">${config.no_result}</li>`;

        AT_Main.isExist(document.querySelector(settings.submit)) &&
          document.querySelector(settings.submit).addEventListener("click", (e) => {
            e.preventDefault();
            let _container = e.currentTarget.closest(settings.container);

            if (!AT_Main.isExist(_container)) {
              return;
            }

            let form = _container.querySelector("form");

            AT_Main.isExist(form) && form.submit();
          });
      });
  },

  renderResult: (data, type) => {
    let html = "",
      settings = AT_Search.settings,
      resultSelector = document.querySelector(settings.resultLayout);

    if (!AT_Main.isExist(resultSelector)) {
      return;
    }
    if (!data.length) {
      return html;
    }

    let itemLayout = resultSelector.querySelector(settings.item);

    html += `<li class="result-item-type">${type}</li>`;

    for (let index in data) {
      let item = data[index];

      itemLayout.setAttribute("data-item-type", type);

      itemLayout.querySelector(settings.title).innerHTML = item.title;
      itemLayout.querySelectorAll(settings.url).forEach((e) => e.setAttribute("href", item.url));

      if (item.featured_image) {
        itemLayout
          .querySelector(settings.image)
          .setAttribute("src", shopifyImage.getSizedImageUrl(item.featured_image.url, "280x"));
        itemLayout.querySelector(settings.image).closest(settings.imageWrapper).classList.remove("hide");
      } else {
        itemLayout.querySelector(settings.image).closest(settings.imageWrapper).classList.add("hide");
      }

      if (type == "products") {
        if (item.available) {
          let price = JSON.parse(theme.currency.active) ? item.price + ".00" : item.price;
          itemLayout.querySelector(settings.price).innerHTML = shopifyCurrency.formatMoney(
            price,
            theme.currency.moneyFormat
          );
          itemLayout.querySelector(settings.price).classList.remove("hide");
          itemLayout.querySelector(settings.soldout).classList.add("hide");
        } else {
          itemLayout.querySelector(settings.price).classList.add("hide");
          itemLayout.querySelector(settings.soldout).classList.remove("hide");
        }
      } else {
        itemLayout.querySelector(settings.price).classList.add("hide");
        itemLayout.querySelector(settings.soldout).classList.add("hide");
      }

      html += itemLayout.outerHTML;
    }
    return html;
  },
  init: function () {
    this.handleEvent();
  },
};

let Search = {
  element: {
    searchInputs: document.getElementsByClassName("js-search-input"),
  },
  init: function () {
    let { searchInputs } = this.element;
    [...searchInputs].forEach((input) => {
      input.addEventListener(
        "change",
        AT.debounce(function (e) {
          console.log(e.target);
        }, 200)
      );
    });
  },
};

export default Search;
