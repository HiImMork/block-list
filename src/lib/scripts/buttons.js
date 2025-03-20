const domain = document.getElementById("input");
const message = document.getElementById("message");

function showMessage(text, isError = false) {
  message.textContent = text;
  if (isError) {
    message.classList.add("error");
  } else {
    message.classList.remove("error");
  }
}

function processInput(callback, emptyMessage, successMessage) {
  if (domain.value.trim() === "") {
    showMessage(emptyMessage, true);
  } else {
    domain.value = callback(domain.value.split("\n")).join("\n");
    showMessage(successMessage);
  }
}

document.getElementById("sort").addEventListener("click", function () {
  processInput(
    (lines) => lines.sort(),
    "Cannot sort an empty list. Please enter some text in the input field.",
    "List has been sorted successfully."
  );
});

document.getElementById("filter").addEventListener("click", function () {
  processInput(
    (lines) =>
      lines.map((line) => {
        if (/^[.\-*\|\/]/.test(line)) {
          return line;
        }
        if (line.endsWith("$all")) {
          return line;
        }
        if (/to=~.+$/.test(line)) {
          return line.replace(/(,to=~.+)$/, "$all$1");
        }
        return `||${line}$all`;
      }),
    "Cannot modify empty lines. Please enter some text in the input field.",
    "Added '||' at the beginning and '$all' at the appropriate position for each line."
  );
});

document.getElementById("unfilter").addEventListener("click", function () {
  processInput(
    (lines) =>
      lines.map((line) => {
        if (line.startsWith("||") && line.endsWith("$all")) {
          return line.slice(2, -4);
        }
        if (/(\$all)(,to=~.+)$/.test(line)) {
          return line.replace(/(\$all)(,to=~.+)$/, "$2");
        }
        return line;
      }),
    "Cannot remove missing strings. Please ensure that the output is not empty and the strings are present in all lines.",
    "Removed '||' from the beginning, '$all' from the end, and adjusted '$all' before ',to=~' where applicable."
  );
});

document.getElementById("clean").addEventListener("click", function () {
  processInput(
    (lines) => [...new Set(lines.filter((line) => line.trim() !== ""))],
    "Cannot clean an empty list. Please enter some text in the input field.",
    "Removed duplicate and empty lines successfully."
  );
});

document.getElementById("copy").addEventListener("click", function () {
  if (domain.value.trim() === "") {
    showMessage(
      "Cannot copy an empty list. Please generate some output first.",
      true
    );
  } else {
    domain.select();
    domain.setSelectionRange(0, domain.value.length);
    navigator.clipboard.writeText(domain.value);
    showMessage("Copied text to clipboard successfully.");
  }
});

document.getElementById("clear").addEventListener("click", function () {
  domain.value = "";
  showMessage("Cleared input field successfully.");
});
