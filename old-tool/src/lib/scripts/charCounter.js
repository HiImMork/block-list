const charCountmessage = document.querySelector("#charCounter .message");
const charCount = document.querySelector("#charCounter #charCount");
const inputString = document.querySelector("#charCounter #charCounterInput");
inputString.addEventListener("input", () => {
  charCount.textContent = "Characters: " + inputString.value.length.toString();
  
  charCountmessage.textContent = "User is typing...";
  setTimeout(() => {
    charCountmessage.textContent = "Waiting for user input..."
  }, 1000);
});

const clearInputBtn = document.querySelector("#charCounter button.clear.danger").addEventListener("click", () => {
  inputString.value = "";
  charCountmessage.textContent = "Input has been cleared. Waiting for user input...";
});