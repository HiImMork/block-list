function getDomainListLines() {
  return domainListInput.value.split("\n");
}

const domainListInput = document.getElementById("domainListInput");

function sortDomainList() {
  const lines = getDomainListLines();
  const sortedLines = lines.filter((line) => line.trim() !== "").sort();
  domainListInput.value = sortedLines.join("\n");
}

function cleanDomainList() {
  const lines = getDomainListLines();
  const cleanedLines = [
    ...new Set(lines.filter((line) => line.trim() !== "")),
  ];
  domainListInput.value = cleanedLines.join("\n");
}

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

function copyDomains() {
  navigator.clipboard.writeText(domainListInput.value).then(() => {});
}

function clearDomainList() {
  domainListInput.value = "";
}

document.getElementById("sortDomainList").addEventListener("click", sortDomainList);
document.getElementById("cleanDomainList").addEventListener("click", cleanDomainList);
document.getElementById("addFilters").addEventListener("click", addFilters);
document.getElementById("removeFilters").addEventListener("click", removeFilters);
document.getElementById("copyDomains").addEventListener("click", copyDomains);
document.getElementById("clearDomainList").addEventListener("click", clearDomainList);
