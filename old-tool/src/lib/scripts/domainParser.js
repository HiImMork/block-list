const domainList = document.querySelector("#domainList");
const message = document.querySelector("#domainParser .message");

const cleanListBtn = document
  .querySelector("#domainParser button.clean.primary")
  .addEventListener("click", () => {
    //Function clean button.
    const lines = domainList.value.split("\n");
    const cleanedLines = [...new Set(lines.filter(line => line.trim() !== ""))];
    domainList.value = cleanedLines.join("\n");
  });

const sortListBtn = document
  .querySelector("#domainParser button.sort.primary")
  .addEventListener("click", () => {
    // Function for sort button.
    const lines = domainList.value.split("\n");
    const sortedLines = lines.filter(line => line.trim() !== "").sort();
    domainList.value = sortedLines.join("\n");
  });

const filterListBtn = document
  .querySelector("#domainParser button.filter.primary")
  .addEventListener("click", () => {
    // Function for filter button.
    const lines = domainList.value.split("\n");
    const filteredLines = lines.map(line => {
      if (
        line.startsWith("||") || 
        line.startsWith("#") || 
        line.trim() === "" || 
        /^[^a-zA-Z0-9]/.test(line.trim())
      ) {
        return line.trim().endsWith("$all") ? line : `${line}$all`;
      } else if (line.includes(",to=~")) {
        const [before, after] = line.split(",to=~");
        return before.includes("$all") ? `||${line}` : `||${before}$all,to=~${after}`;
      } else {
        return `||${line}$all`;
      }
    });
    domainList.value = filteredLines.join("\n");
  });

const undoFilterBtn = document
  .querySelector("#domainParser button.undo.secondary")
  .addEventListener("click", () => {
    // Function for undo button.
    const lines = domainList.value.split("\n");
    const undoneLines = lines.map(line => {
      if (line.startsWith("||")) {
        line = line.slice(2);
      }
      if (line.endsWith("$all")) {
        line = line.slice(0, -4);
      }
      if (line.includes("$all,to=~")) {
        line = line.replace("$all,to=~", ",to=~");
      }
      return line;
    });
    domainList.value = undoneLines.join("\n");
  });

const copyListButton = document
  .querySelector("#domainParser button.copy.secondary")
  .addEventListener("click", () => {
    // Function for copy button.
    navigator.clipboard.writeText(domainList.value).then(() => {
      message.textContent = "Copied to clipboard!";
      setTimeout(() => (message.textContent = ""), 2000);
    });
  });

const clearListBtn = document
  .querySelector("#domainParser button.clear.danger")
  .addEventListener("click", () => {
    // Function for clear button.
    domainList.value = "";
  });
