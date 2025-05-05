const elementDropdownRoot = document.querySelector("nav.dropdown");
const elementDropdownToggle = document.querySelector("button.dropdown-toggle");

elementDropdownToggle.addEventListener("click", toggleDropdownVisibility);

function toggleDropdownVisibility() {
  elementDropdownRoot.classList.toggle("show");
}
