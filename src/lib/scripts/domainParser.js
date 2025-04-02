const domainTextarea = document.querySelector("#inputDomains");
const domainParserMessage = document.querySelector("#domainParser #domainParserMessage");

const buttons = {
  sort: document.querySelector("#domainParser #sort"),
  clean: document.querySelector("#domainParser #clean"),
  filter: document.querySelector("#domainParser #filter"),
  unfilter: document.querySelector("#domainParser #unfilter"),
  copy: document.querySelector("#domainParser #copy"),
  clear: document.querySelector("#domainParser button[type='reset']"),
};

function showMessage(text, isError = false) {
  domainParserMessage.textContent = text;
  domainParserMessage.classList.toggle("error", isError);
}

function processInput(callback, emptyMessage, successMessage) {
  const input = domainTextarea.value.trim();
  if (!input) {
    showMessage(emptyMessage, true);
    return;
  }
  domainTextarea.value = callback(input.split("\n")).join("\n");
  showMessage(successMessage);
}

const actions = {
  sort: () =>
    processInput(
      (lines) => lines.sort(),
      "Cannot sort an empty list. Please enter some text in the input field.",
      "List has been sorted successfully."
    ),

  clean: () =>
    processInput(
      (lines) => [...new Set(lines.filter((line) => line.trim() !== ""))],
      "Cannot clean an empty list. Please enter some text in the input field.",
      "Removed duplicate and empty lines successfully."
    ),

  filter: () =>
    processInput(
      (lines) =>
        lines.map((line) => {
          if (/^[.\-*\|\/]/.test(line) || line.endsWith("$all")) return line;
          if (/to=~.+$/.test(line)) return line.replace(/(,to=~.+)$/, "$all$1");
          return `||${line}$all`;
        }),
      "Cannot modify empty lines. Please enter some text in the input field.",
      "Added '||' at the beginning and '$all' at the appropriate position for each line."
    ),

  unfilter: () =>
    processInput(
      (lines) =>
        lines.map((line) => {
          if (line.startsWith("||") && line.endsWith("$all"))
            return line.slice(2, -4);
          if (/(\$all)(,to=~.+)$/.test(line))
            return line.replace(/(\$all)(,to=~.+)$/, "$2");
          return line;
        }),
      "Cannot remove missing strings. Please ensure that the output is not empty and the strings are present in all lines.",
      "Removed '||' from the beginning, '$all' from the end, and adjusted '$all' before ',to=~' where applicable."
    ),

  copy: () => {
    const input = domainTextarea.value.trim();
    if (!input) {
      showMessage(
        "Cannot copy an empty list. Please generate some output first.",
        true
      );
      return;
    }
    domainTextarea.select();
    domainTextarea.setSelectionRange(0, input.length);
    navigator.clipboard.writeText(input);
    showMessage("Copied text to clipboard successfully.");
  },

  clear: () => {
    const input = domainTextarea.value.trim();
    if (!input) {
      showMessage(
        "Cannot clear an empty list. Please enter some text in the input field.",
        true
      );
      return;
    }
    domainTextarea.value = "";
    showMessage("Cleared the input field successfully.");
  },
};

// Attach event listeners to buttons
Object.entries(buttons).forEach(([action, button]) => {
  button.addEventListener("click", actions[action]);
});
