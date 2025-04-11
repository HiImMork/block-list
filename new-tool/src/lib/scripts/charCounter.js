const charCounterInput = document.getElementById("charCounterInput");
const charCounterConsole = document.getElementById("charCounterConsole");
const clearStringInput = document.getElementById("clearStringInput");

// Initialize charCounterConsole
setConsole();

// Evenlisteners for input and buttons
charCounterInput.addEventListener("input", () => {
  setConsole();
});

clearStringInput.addEventListener("click", () => {
  charCounterInput.value = "";
  setConsole();
});

// Function for getting the string length
function getLength() {
  return charCounterInput.value.length;
}

// Function for setting the string legth
function setConsole() {
  charCounterConsole.textContent = "Characters: " + getLength().toString();
}
