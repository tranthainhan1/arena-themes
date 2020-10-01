let CollectionApps = {
  onLoad: function () {
    this.handleSidebar();
  },
  handleSidebar: function () {
    let btnOpen = document.getElementById("js-open-sidebar");
    let btnClose = document.getElementsByClassName("js-close-sidebar");

    let sidebarContainer = document.getElementById("js-sidebar-container");

    btnOpen.addEventListener("click", function () {
      sidebarContainer.classList.add("show");
      document.body.style.overflow = "hidden";
      document.body.classList.add("popup-is-showing");
    });

    [...btnClose].forEach((btn) => {
      btn.addEventListener("click", function () {
        sidebarContainer.classList.remove("show");
        document.body.classList.remove("popup-is-showing");
        document.body.style.overflow = "";
      });
    });
  },
};
export default CollectionApps;
