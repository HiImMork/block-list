const domainList = document.querySelector("#domainList");
const message = document.querySelector("#domainParser .message");

const actions = {
  clean: () => {
    const domains = getDomains();
    if (!domains.length) return setMessage("The list is empty. Nothing to clean.");
    const unique = [...new Set(domains)];
    if (unique.length === domains.length) return setMessage("No duplicates found. The list is already clean.");
    updateList(unique, "Duplicates removed successfully.");
  },
  sort: () => {
    const domains = getDomains();
    if (!domains.length) return setMessage("The list is empty. Nothing to sort.");
    const sorted = [...domains].sort((a, b) => a.localeCompare(b));
    if (JSON.stringify(sorted) === JSON.stringify(domains)) return setMessage("The list is already sorted.");
    updateList(sorted, "Domains sorted alphabetically.");
  },
  filter: () => {
    const domains = getDomains();
    if (!domains.length) return setMessage("The list is empty. Nothing to filter.");
    const filtered = domains.map(line => line.startsWith("/") || /^[^a-zA-Z0-9]/.test(line) ? line : `||${line}$all`);
    if (JSON.stringify(filtered) === JSON.stringify(domains)) return setMessage("The list is already filtered.");
    updateList(filtered, "Domains filtered successfully.");
  },
  undo: () => {
    const domains = getDomains();
    if (!domains.length) return setMessage("The list is empty. Nothing to remove.");
    const undone = domains.map(line => line.startsWith("||") && line.endsWith("$all") ? line.slice(2, -4) : line);
    if (JSON.stringify(undone) === JSON.stringify(domains)) return setMessage("No filters found to remove.");
    updateList(undone, "Removed filters.");
  },
  copy: () => {
    if (!domainList.value.trim()) return setMessage("The list is empty. Nothing to copy.");
    domainList.select();
    document.execCommand("copy");
    setMessage("Domains copied to clipboard.");
  },
  clear: () => {
    if (!domainList.value.trim()) return setMessage("The list is already empty.");
    updateList([], "Domain list cleared.");
  }
};

document.querySelectorAll("#domainParser button").forEach(btn => {
  btn.addEventListener("click", () => actions[btn.className]?.());
});

function getDomains() {
  return domainList.value.split("\n").map(line => line.trim()).filter(line => line);
}

function updateList(domains, msg) {
  domainList.value = domains.join("\n");
  setMessage(msg);
}

function setMessage(msg) {
  message.textContent = msg;
}
