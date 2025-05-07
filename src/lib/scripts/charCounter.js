const elementInputTextStringInput = document.getElementById("charCounterInput");
const elementOutputTextStringLength =
  document.getElementById("charCounterConsole");
const elementButtonClearString = document.getElementById("clearString");
let characters;

// Adds Event listeners to input and button.
elementInputTextStringInput.addEventListener("input", scanForUserInput);
elementButtonClearString.addEventListener("click", clearStringInput);

// Function to display the number of characters.
function countChars() {
  elementOutputTextStringLength.textContent = `Characters: ${characters}`;
}

// Function to count the characters.
function scanForUserInput() {
  characters = elementInputTextStringInput.value.length;

  // Calls the function to display the number of characters
  countChars();
}

// Function to count the content of the input and sets the number of characters to 0.
function clearStringInput() {
  characters = 0;
  elementInputTextStringInput.value = "";

  // Calls the function to display the number of characters
  countChars();
}
