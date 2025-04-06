const [msgEl, countEl, inputEl, clearBtn] = ["#charCounter .message", "#charCounter #charCount", "#charCounter #charCounterInput", "#charCounter .clear"].map(s => document.querySelector(s));

inputEl.addEventListener("input", e => {
  countEl.textContent = `Characters: ${e.target.value.length}`;
  msgEl.textContent = "User is typing something...";
  setTimeout(() => msgEl.textContent = "User has stopped typing. Waiting for input...", 1000);
});

clearBtn.addEventListener("click", () => {
  inputEl.value = "";
  countEl.textContent = "Characters: ";
  msgEl.textContent = "Input has been cleared!";
});
