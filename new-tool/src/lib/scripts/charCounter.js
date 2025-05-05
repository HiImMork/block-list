const elementInputTextStringInput = document.getElementById("charCounterInput");
const elementOutputTextStringLength =
  document.getElementById("charCounterConsole");
const elementButtonClearString = document.getElementById("clearStringInput");
let characters;

elementInputTextStringInput.addEventListener("input", scanForUserInput);

elementButtonClearString.addEventListener("click", clearAll);

function countChars() {
  elementOutputTextStringLength.textContent = `Characters: ${characters}`;
}

function scanForUserInput() {
  characters = elementInputTextStringInput.value.length;

  countChars();
}

function clearAll() {
  characters = 0;
  elementInputTextStringInput.value = "";
  countChars();
}
