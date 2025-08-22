/* 
    This JavaScript script module implements a collapsible and expandable sidebar using CSS classes. It listens to click events
    on the sidebarToggleBtn which adds/removes the class "sidebar-collapsed" from the #wrapper element which modifies the variable 
    "--sidebar-width" from the `/src/assets/css/default.css` which is used by different classes to handle said functionality,
    achieving a smooth transition between different sidebar widths. It also dynamically changes the icons of the sidebarToggleBtn
    according to the sidebar's size.
*/

const wrapperElement = document.getElementById("wrapper");
const sidebarToggleBtn = document.getElementById("sidebarToggle");

sidebarToggleBtn.addEventListener("click", toggleSidebar);

function toggleSidebar() {
    if (!wrapperElement || !sidebarToggleBtn) return;

    const collapsed = wrapperElement.classList.toggle("sidebar-collapsed");

    // show right-arrow when collapsed, left-arrow when expanded
    sidebarToggleBtn.classList.toggle("bi-arrow-bar-right", collapsed);
    sidebarToggleBtn.classList.toggle("bi-arrow-bar-left", !collapsed);

    // accessibility hint: aria-expanded = true when sidebar is expanded
    sidebarToggleBtn.setAttribute("aria-expanded", String(!collapsed));
}
