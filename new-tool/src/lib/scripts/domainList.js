const domainListInput = document.getElementById("domainListInput");
const sortDomainListBtn = document
  .getElementById("sortDomainList")
  .addEventListener("click", () => {
    const lines = domainListInput.value.split("\n");
    const sortedLines = lines.filter((line) => line.trim() !== "").sort();
    domainListInput.value = sortedLines.join("\n");
  });
const cleanDomainListBtn = document
  .getElementById("cleanDomainList")
  .addEventListener("click", () => {
    const lines = domainListInput.value.split("\n");
    const cleanedLines = [
      ...new Set(lines.filter((line) => line.trim() !== "")),
    ];
    domainListInput.value = cleanedLines.join("\n");
  });
const addFiltersBtn = document
  .getElementById("addFilters")
  .addEventListener("click", () => {
    const lines = domainListInput.value.split("\n");
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
  });
const removeFiltersBtn = document
  .getElementById("removeFilters")
  .addEventListener("click", () => {
    const lines = domainListInput.value.split("\n");
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
  });
const copyDomainsBtn = document
  .getElementById("copyDomains")
  .addEventListener("click", () => {
    navigator.clipboard.writeText(domainListInput.value).then(() => {});
  });
const clearDomainListBtn = document
  .getElementById("clearDomainList")
  .addEventListener("click", () => {
    domainListInput.value = "";
  });
