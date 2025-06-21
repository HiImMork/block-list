// Using const for better performance and to prevent reassignment
const dropdown = {
	root: document.querySelector("nav.dropdown"),
	toggle: document.querySelector("button.dropdown-toggle"),
};

// Check if both elements exist before adding the event listener
if (dropdown.root && dropdown.toggle) {
	dropdown.toggle.addEventListener("click", () =>
		dropdown.root.classList.toggle("show")
	);
}
