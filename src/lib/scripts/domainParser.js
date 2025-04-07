console.log("Start of domainParser.js");

// DOM elements
const domainList = document.querySelector("#domainList");
const message = document.querySelector("#domainParser .message");

// Action handlers
const actions = {
  clean: () => processDomains(
    domains => [...new Set(domains)],
    "Duplicates removed successfully.",
    "No duplicates found. The list is already clean."
  ),

  sort: () => processDomains(
    domains => [...domains].sort((a, b) => a.localeCompare(b)),
    "Domains sorted alphabetically.",
    "The list is already sorted."
  ),

  filter: () => processDomains(
    domains => domains.map(line => 
      line.includes(",to=~") ? `${line.slice(0, line.indexOf(",to=~"))}$all${line.slice(line.indexOf(",to=~"))}` :
      line.startsWith("/") || /^[^a-zA-Z0-9]/.test(line) ? line : `||${line}$all`
    ),
    "Domains filtered successfully.",
    "The list is already filtered."
  ),

  undo: () => processDomains(
    domains => domains.map(line => 
      line.startsWith("||") && line.endsWith("$all") ? line.slice(2, -4) : line
    ),
    "Removed filters.",
    "No filters found to remove."
  ),

  copy: () => {
    if (!domainList.value.trim()) return setMessage("The list is empty. Nothing to copy.");
    domainList.select();
    navigator.clipboard.writeText(domainList.value)
      .then(() => setMessage("Domains copied to clipboard."))
      .catch(err => {
        console.error("Failed to copy text: ", err);
        setMessage("Failed to copy domains to clipboard.");
      });
  },

  clear: () => {
    if (!domainList.value.trim()) return setMessage("The list is already empty.");
    updateList([], "Domain list cleared.");
  }
};

// Attach event listeners to buttons
document.querySelectorAll("#domainParser button").forEach(btn => {
  btn.addEventListener("click", () => {
    const actionClass = [...btn.classList].find(cls => actions[cls]);
    actionClass ? actions[actionClass]() : console.warn(`No action defined for button with classes: ${btn.className}`);
  });
});

// Helper functions
function getDomains() {
  return domainList.value.split("\n").map(line => line.trim()).filter(Boolean);
}

function updateList(domains, msg) {
  domainList.value = domains.join("\n");
  setMessage(msg);
}

function setMessage(msg) {
  message.textContent = msg;
}

function processDomains(transformFn, successMsg, noChangeMsg) {
  const domains = getDomains();
  if (!domains.length) return setMessage("The list is empty.");
  const updated = transformFn(domains);
  JSON.stringify(updated) === JSON.stringify(domains) ? setMessage(noChangeMsg) : updateList(updated, successMsg);
}

console.log("End of domainParser.js");
