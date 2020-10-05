let CollectionThemes = {
  onLoad: function () {
    this.elms = {
      sbToggleBtn: document.querySelectorAll(".js-sb-toggle"),
    };
    this.handleSidebar();
  },
  handleSidebar: function () {
    console.log(this);
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

export default CollectionThemes;
