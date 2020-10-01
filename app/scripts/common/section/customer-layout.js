export let CustomerLayout = (function () {
  function customerLayout() {
    document.getElementById("switch_form_register").addEventListener("click", function (e) {
      document.getElementById("login").style.display = "none";
      document.getElementById("register").style.display = "block";
    });

    document.getElementById("switch_form_login").addEventListener("click", function (e) {
      document.getElementById("login").style.display = "block";
      document.getElementById("register").style.display = "none";
    });

    document.getElementById("switch_form_recover").addEventListener("click", function (e) {
      document.getElementById("login").style.display = "none";
      document.getElementById("recover_password").style.display = "block";
    });

    document.getElementById("back_form_login").addEventListener("click", function (e) {
      document.getElementById("login").style.display = "block";
      document.getElementById("recover_password").style.display = "none";
    });

    [...document.getElementsByClassName("password-toggle")].forEach((item) => {
      item.addEventListener("click", function () {
        let input = item.previousElementSibling;

        if (this.classList.contains("show")) {
          this.classList.remove("show");
          input.setAttribute("type", "password");
        } else {
          this.classList.add("show");
          input.setAttribute("type", "text");
        }
      });
    });
  }

  return customerLayout;
})();
