const input = document.querySelector("#stringInput");
const charCounterMessage = document.querySelector("#charCounterMessage");
charCounterMessage.textContent = "";
let typingTimeout;

input.addEventListener("input", () => {
  let clearInputOffset = 1250;
  document.querySelector("#charCount").textContent = input.value.length;
  charCounterMessage.textContent = "User is typing...";

  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    charCounterMessage.textContent = "";
  }, clearInputOffset);
});

const clearStringInputField = document.querySelector(
  "#charCounter button[type='reset']"
);
clearStringInputField.addEventListener("click", function () {
  input.value = "";
  document.querySelector("#charCount").textContent = 0;
  charCounterMessage.textContent = "Input cleared successfully.";
});
