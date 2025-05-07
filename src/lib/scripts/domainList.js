const domainListInput = document.getElementById("domainListInput");

// Function to parse the entire textarea and split each lines
function getDomainListLines() {
  return domainListInput.value.split("\n");
}

// Function to sort the textarea
function sortDomainList() {
  const lines = getDomainListLines();
  const sortedLines = lines.filter((line) => line.trim() !== "").sort();
  domainListInput.value = sortedLines.join("\n");
}

// Function to remove duplicates and empty lines.
function cleanDomainList() {
  const lines = getDomainListLines();
  const cleanedLines = [...new Set(lines.filter((line) => line.trim() !== ""))];
  domainListInput.value = cleanedLines.join("\n");
}

/* Function to add "||" at the beginning of the line assuming that the line begins in an alpha-numeric character 
  and does not contain the specific substring ",to=~". This function also adds "$all" at the end of the line and 
  if the line contains the substring ",to=~" it puts "$all" before the specified substring */
function addFilters() {
  const lines = getDomainListLines();
  const filteredLines = lines.map((line) => {
    if (
      line.startsWith("||") ||
      line.startsWith("#") ||
      line.trim() === "" ||
      /^[^a-zA-Z0-9]/.test(line.trim())
    ) {
      return line.trim().endsWith("$all") ? line : `${line}$all`;
    } else if (line.includes(",to=~")) {
      const [before, after] = line.split(",to=~");
      return before.includes("$all")
        ? `||${line}`
        : `||${before}$all,to=~${after}`;
    } else {
      return `||${line}$all`;
    }
  });
  domainListInput.value = filteredLines.join("\n");
}

// Removes the strings added from addFilters() if any.
function removeFilters() {
  const lines = getDomainListLines();
  const undoneLines = lines.map((line) => {
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
  domainListInput.value = undoneLines.join("\n");
}

// Function that copies the entire list of domain into the user's clipboard.
function copyDomains() {
  navigator.clipboard.writeText(domainListInput.value).then(() => {});
}

// Clears the domain list
function clearDomainList() {
  domainListInput.value = "";
}

/* The lines below gets the elements based on their ID and adds a click event listener to each element along 
  with their respective functions */
document
  .getElementById("sortDomainList")
  .addEventListener("click", sortDomainList);
document
  .getElementById("cleanDomainList")
  .addEventListener("click", cleanDomainList);
document.getElementById("addFilters").addEventListener("click", addFilters);
document
  .getElementById("removeFilters")
  .addEventListener("click", removeFilters);
document.getElementById("copyDomains").addEventListener("click", copyDomains);
document
  .getElementById("clearDomainList")
  .addEventListener("click", clearDomainList);
