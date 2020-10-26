export let HeroBanner = {
  onLoad: function () {
    let $container = this.container;
    let dataSetting = $container.getAttribute("data-setting");

    console.log(123)

    if (dataSetting) {
      let collapseWrapper = document.createElement("li");
      let btnTrigger = $container.getElementsByClassName("js-btn-collapse")[0];
      let id = btnTrigger.getAttribute("data-target");
      collapseWrapper.setAttribute("id", id);
      collapseWrapper.classList = "js-collapse collapse";
      collapseWrapper.style.listStyle = "none";
      collapseWrapper.style.padding = "0px";

      let elmParagraph2 = $container.querySelector(".paragraph-2 ul");
      let elmLiList = elmParagraph2.children;

      [...elmLiList].forEach((li, index) => {
        if (index > dataSetting - 1) {
          collapseWrapper.appendChild(li);
        }
      });
      elmParagraph2.appendChild(collapseWrapper);
    }
  },
};
