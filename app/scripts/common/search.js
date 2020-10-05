import AT from "./_arn";

let Search = {
  init: function () {
    let searchInputs = document.getElementsByClassName("js-search-input");
    let template = document.getElementById("search_template").innerHTML;

    [...searchInputs].forEach((input) => {
      let searchContainer = input.closest("[data-search-container]");
      let resultContainer = searchContainer.getElementsByClassName("js-search-results")[0];
      let keywordCOntainer = searchContainer.getElementsByClassName("keyword")[0];
      let closeBtn = searchContainer.getElementsByClassName("js-close-search")[0];
      let searchForm = searchContainer.getElementsByClassName("search-form")[0];
      let viewAllBtn = searchContainer.getElementsByClassName("btn-view-all")[0];
      let configId = searchContainer.getAttribute("data-config");

      let config = JSON.parse(document.getElementById(configId).innerHTML);
      let { parameters, productType, resourcesType } = config;

      input.addEventListener(
        "keyup",
        AT.debounce(function (e) {
          let value = e.target.value.trim();
          if (!value) {
            resultContainer.classList.remove("is-loading", "no-result", "has-results");
            return;
          }

          keywordCOntainer.innerHTML = value;
          config = Object.assign(parameters, { q: value });
          resultContainer.classList.remove("is-loading", "no-result", "has-results");
          resultContainer.classList.add("is-loading");

          fetch("/search/suggest.json?" + new URLSearchParams(parameters))
            .then((res) => res.json())
            .then((res) => {
              let newResults = Search.handleResult(resourcesType, productType, res.resources.results);
              console.log(newResults);
              if (newResults.hasResults) {
                let renderResults = Mustache.render(template, newResults);
                resultContainer.querySelector(".results .wrapper").innerHTML = renderResults;
                resultContainer.classList.remove("is-loading");
                resultContainer.classList.add("has-results");
              } else {
                resultContainer.classList.remove("is-loading");
                resultContainer.classList.add("no-result");
              }
            });
        }, 500)
      );

      closeBtn.addEventListener("click", function (e) {
        let toggleClass = this.getAttribute("data-toggle");
        searchContainer.classList.remove(toggleClass);
        resultContainer.classList.remove("is-loading", "no-result", "has-results");
      });

      viewAllBtn.addEventListener("click", () => {
        searchForm.submit();
      });
    });
  },
  handleResult: (resourcesType, productType, results) => {
    let count = resourcesType.reduce((accu, currentValue) => {
      accu += results[currentValue].length;
      return accu;
    }, 0);

    return resourcesType.reduce(
      (accu, currentValue) => {
        if (currentValue === "products") {
          switch (productType) {
            case "all":
              accu = Object.assign(accu, {
                themes: results.products.filter((item) =>
                  item.type.match(/(themes|theme|Theme|Themes|THEME|THEMES)/gi)
                ),
                apps: results.products.filter((item) => item.type.match(/(app|apps|Apps|App|APP|APPS)/gi)),
              });
              break;
            case "themes":
              accu = Object.assign(accu, {
                themes: results.products.filter((item) =>
                  item.type.match(/(themes|theme|Theme|Themes|THEME|THEMES)/gi)
                ),
              });
              break;
            case "apps":
              accu = Object.assign(accu, {
                apps: results.products.filter((item) => item.type.match(/(app|apps|Apps|App|APP|APPS)/gi)),
              });
              break;
          }
        } else {
          accu[currentValue] = results[currentValue];
        }
        return accu;
      },
      { hasResults: !!count }
    );
  },
};

export default Search;
