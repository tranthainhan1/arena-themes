let SupportTemplate = {
  onLoad: function () {
    let $container = this.container;
    let elmHeroBannerList = $container.getElementsByClassName("hero-banner");

    [...elmHeroBannerList].forEach((elmHeroBanner) => {
      let dataSetting = elmHeroBanner.getAttribute("data-setting");

      let collapseWrapper = document.createElement("li");
      let btnTrigger = elmHeroBanner.getElementsByClassName("js-btn-collapse");

      [...btnTrigger].forEach((item) => {
        let id = item.getAttribute("data-target");
        collapseWrapper.setAttribute("id", id);
        collapseWrapper.classList = "js-collapse collapse";
        collapseWrapper.style.listStyle = "none";
        collapseWrapper.style.padding = "0px";

        let elmParagraph2 = elmHeroBanner.querySelector(".paragraph-2 ul");
        let elmLiList = elmParagraph2.children;

        [...elmLiList].forEach((li, index) => {
          if (index > dataSetting - 1) {
            collapseWrapper.appendChild(li);
          }
        });
        elmParagraph2.appendChild(collapseWrapper);
      });
    });
  },
};
export default SupportTemplate;
