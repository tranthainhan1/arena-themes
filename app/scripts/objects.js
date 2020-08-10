import AT_main from "./_arn";

let IconsBox = {
  onLoad: function () {
    this.tns = AT_main.initTinySlider(this.container);
    console.log(this);
  },
};

export { IconsBox };
