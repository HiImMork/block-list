const dropdownRoot = document.querySelector("nav.dropdown");
const dropdownToggle = document.querySelector("button.dropdown-toggle");

dropdownToggle.addEventListener("click", toggleDropdownVisibility);

function toggleDropdownVisibility() {
    dropdownRoot.classList.toggle("show");
}
