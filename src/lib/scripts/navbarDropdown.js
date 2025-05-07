const elementDropdownRoot = document.querySelector("nav.dropdown");
const elementDropdownToggle = document.querySelector("button.dropdown-toggle");

// Adds an click event listener to the dropdown's toggle button.
elementDropdownToggle.addEventListener("click", toggleDropdownVisibility);

// Function to switch the class `.show` to the dropdown root.
function toggleDropdownVisibility() {
  elementDropdownRoot.classList.toggle("show");
}
