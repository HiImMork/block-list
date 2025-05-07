const elementInputTextStringInput = document.getElementById("charCounterInput");
const elementOutputTextStringLength =
  document.getElementById("charCounterConsole");
const elementButtonClearString = document.getElementById("clearString");
let characters;

elementInputTextStringInput.addEventListener("input", scanForUserInput);
elementButtonClearString.addEventListener("click", clearStringInput);

function countChars() {
  elementOutputTextStringLength.textContent = `Characters: ${characters}`;
}

function scanForUserInput() {
  characters = elementInputTextStringInput.value.length;

  countChars();
}

function clearStringInput() {
  characters = 0;
  elementInputTextStringInput.value = "";
  countChars();
}
