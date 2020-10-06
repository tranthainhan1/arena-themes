export let Product = {
  onLoad: function () {
    let product = (this.product = JSON.parse(document.getElementById("product_json").innerHTML));
    console.log(product);
    this.initVariants();
    this.container.addEventListener("variantChange", this.updateProduct.bind(this));
  },
  initVariants: function () {
    let options = {
      container: this.container,
      product: this.product,
    };
    this.variants = new Variants(options);
  },
  updateProduct: function ({ detail: variant }) {},
};

let Variants = (function () {
  function Variants(options) {
    this.container = options.container;
    this.product = options.product;
    this.singleOptionSelector = document.getElementsByClassName("single-option-selector");
    this.currentVariant = this.getVariantFromOptions();

    [...this.singleOptionSelector].forEach((item) => {
      item.addEventListener("change", this.onSelectChange.bind(this));
    });
  }

  Variants.prototype = {
    getVariantFromOptions: function () {
      let currentOptions = this.getCurrentOptions();
      let { variants } = this.product;
      let found = variants.find((variant) => {
        return currentOptions.every((option) => {
          return option.value === variant[option.index];
        });
      });
      return found;
    },
    onSelectChange: function () {
      let variant = this.getVariantFromOptions();

      this.container.dispatchEvent(new CustomEvent("variantChange", { detail: variant }));

      if (!variant) {
        return;
      }
      this.currentVariant = variant;

      this.updateMasterSelect(variant);
    },
    getCurrentOptions: function () {
      return [...this.singleOptionSelector].map((item) => {
        let option = {};
        option.index = item.getAttribute("data-index");
        option.value = item.value;
        return option;
      });
    },
    updateMasterSelect: function (variant) {
      let masterSelect = document.getElementById("master_select");
      masterSelect.value = variant.id;
    },
  };
  return Variants;
})();
