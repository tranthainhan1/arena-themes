import AT from "../_arn";

export let Cart = {
  onLoad: function () {
    let container = this.container;

    this.elms = {
      totalCart: document.getElementById("cart_total"),
    };
    AT.registerEvents("cartChange", this.elms.totalCart);

    this.elms.totalCart.addEventListener("cartChange", this.cartChange.bind(this));
  },
  cartChange: function ({ detail: cart }) {
    let { totalCart } = this.elms;

    if (cart.total_price === 0) {
      this.container.classList.add("empty");
    } else {
      totalCart.innerHTML = AT.currency.formatMoney(cart.total_price);
    }
  },
};
