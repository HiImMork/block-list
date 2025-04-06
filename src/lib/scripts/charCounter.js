const messageElement = document.querySelector("#charCounter .message");
const charCountElement = document.querySelector("#charCounter #charCount");
const inputField = document.querySelector("#charCounter #charCounterInput");

inputField.addEventListener("input", (event) => {
  charCountElement.textContent = `Characters: ${event.target.value.length}`;
  messageElement.textContent = "User is typing something...";
  setTimeout(() => {
    messageElement.textContent = "User has stopped typing. Waiting for input...";
  }, 1000);
});

const clearButton = document.querySelector("#charCounter .clear");
clearButton.addEventListener("click", () => {
  inputField.value = "";
  charCountElement.textContent = "Characters: ";
  messageElement.textContent = "Input has been cleared!";
});