const input = document.querySelector("#stringInput");
input.addEventListener(
  "input",
  () => (document.querySelector("#charCount").textContent = input.value.length)
);

const clearStringInputField = document.querySelector("#charCounter button[type='reset']");
clearStringInputField.addEventListener("click", function () {
  input.value = "";
  document.querySelector("#charCount").textContent = 0;
});