const charCounterInput = document.getElementById("charCounterInput");
const charCounterConsole = document.getElementById("charCounterConsole");
const clearStringInput = document.getElementById("clearStringInput");

// Initialize charCounterConsole
setConsole();

// Event listeners for input and buttons
charCounterInput.addEventListener("input", setConsole());

clearStringInput.addEventListener("click", clearConsole());

// Function for getting the string length
function getLength() {
  return charCounterInput.value.length;
}

// Function for setting the string legth
function setConsole() {
  charCounterConsole.textContent = "Characters: " + getLength().toString();
}

// Function for clear button
function clearConsole() {
  charCounterInput.value = "";
  setConsole();
}
