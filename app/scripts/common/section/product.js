import { tns } from "tiny-slider/src/tiny-slider";

export let Product = {
  onLoad: function () {
    let container = this.container;
    this.product = JSON.parse(document.getElementById("product_json").innerHTML);
    console.log(this.product);
    this.elms = {
      swatchImages: container.getElementsByClassName("js-tns-images")[0],
      // addToCart: ,
    };

    this.initVariants();
    // this.initAddToCart();
    this.container.addEventListener("variantChange", this.updateProduct.bind(this));
    !!this.elms.swatchImages && this.initSwatchImages(this.elms.swatchImages);
  },
  initVariants: function () {
    let options = {
      container: this.container,
      product: this.product,
    };
    this.variants = new Variants(options);
  },
  updateProduct: function ({ detail: variant }) {
    console.log(variant);
  },
  initSwatchImages: function (container) {
    let configId = container.getAttribute("data-config");
    let config = JSON.parse(document.getElementById(configId).innerHTML);

    this.tns = tns({ container, ...config });
  },
};

let Variants = (function () {
  function Variants(options) {
    this.container = options.container;
    this.product = options.product;
    this.singleOptionSelector = document.getElementsByClassName("single-option-selector");
    this.currentVariant = this._getVariantFromOptions();

    [...this.singleOptionSelector].forEach((item) => {
      item.addEventListener("change", this._onSelectChange.bind(this));
    });
  }

  Variants.prototype = {
    _getVariantFromOptions: function () {
      let currentOptions = this._getCurrentOptions();
      let { variants } = this.product;
      let found = variants.find((variant) => {
        return currentOptions.every((option) => {
          return option.value === variant[option.index];
        });
      });
      return found;
    },
    _onSelectChange: function () {
      let variant = this._getVariantFromOptions();

      this.container.dispatchEvent(new CustomEvent("variantChange", { detail: variant }));

      if (!variant) {
        return;
      }

      this._updateMasterSelect(variant);
      this._updateImages(variant);
      this._updatePrice(variant);
      this._updateSKU(variant);
      this.currentVariant = variant;

      // if (this.enableHistoryState) {
      //   this._updateHistoryState(variant);
      // }
    },
    _getCurrentOptions: function () {
      return [...this.singleOptionSelector].map((item) => {
        let option = {};
        option.index = item.getAttribute("data-index");
        option.value = item.value;
        return option;
      });
    },
    _updateMasterSelect: function (variant) {
      let masterSelect = document.getElementById("master_select");
      masterSelect.value = variant.id;
    },
    _updateHistoryState: function (variant) {
      if (!history.replaceState || !variant) {
        return;
      }

      var newurl =
        window.location.protocol + "//" + window.location.host + window.location.pathname + "?variant=" + variant.id;
      window.history.replaceState({ path: newurl }, "", newurl);
    },
    _updateImages: function (variant) {
      var variantImage = variant.featured_image || {};
      var currentVariantImage = this.currentVariant.featured_image || {};

      if (!variant.featured_image || variantImage.src === currentVariantImage.src) {
        return;
      }

      this.container.dispatchEvent(new CustomEvent({ detail: variant }));
    },
    _updatePrice: function (variant) {
      if (
        variant.price === this.currentVariant.price &&
        variant.compare_at_price === this.currentVariant.compare_at_price
      ) {
        return;
      }

      this.container.dispatchEvent(new CustomEvent({ detail: variant }));
    },
    _updateSKU: function (variant) {
      if (variant.sku === this.currentVariant.sku) {
        return;
      }

      this.container.dispatchEvent(new CustomEvent({ detail: variant }));
    },
  };
  return Variants;
})();
