let webURL = document.querySelector("body > section  > div > p");
let test = false;
webURL.innerHTML = test ? String(location.host) : "imanbudip.me";

const navbar = document.getElementById("Navbar");

window.onscroll = () => {
  if (window.pageYOffset >= 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
};
