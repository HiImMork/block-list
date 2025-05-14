// Using const for better performance and to prevent reassignment
const dropdown = {
  root: document.querySelector("nav.dropdown"),
  toggle: document.querySelector("button.dropdown-toggle"),
};

// Direct event listener with arrow function for conciseness
dropdown.toggle?.addEventListener("click", () =>
  dropdown.root?.classList.toggle("show")
);
