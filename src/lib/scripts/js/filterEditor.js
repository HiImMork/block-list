const filterListEditor = document.getElementById("filterListEditor");
const elementOutputText = document.getElementById("lineCount");

// Check for any missing elements.
if (!filterListEditor || !elementOutputText) {
	console.error("Required DOM elements not found");
	throw new Error("Required DOM elements not found");
}

// Core text processing functions
function getDomainListLines() {
	return filterListEditor.value.split("\n");
}

function updateDomainList(lines) {
	filterListEditor.value = lines.join("\n");
}

// List manipulation functions
function sortDomainList() {
	const lines = getDomainListLines();
	const sortedLines = lines.filter((line) => line.trim() !== "").sort();
	updateDomainList(sortedLines);
}

function cleanDomainList() {
	const lines = getDomainListLines();
	const cleanedLines = [...new Set(lines.filter((line) => line.trim() !== ""))];
	updateDomainList(cleanedLines);
	countDomainList();
}

function addFilters() {
	const lines = getDomainListLines();
	const filteredLines = lines.map((line) => {
		const trimmedLine = line.trim();

		if (trimmedLine === "") return line;

		if (
			trimmedLine.startsWith("||") ||
			trimmedLine.startsWith("#") ||
			/^[^a-zA-Z0-9]/.test(trimmedLine)
		) {
			return trimmedLine.endsWith("$all") ? trimmedLine : `${trimmedLine}$all`;
		}

		if (trimmedLine.includes(",to=~")) {
			const [before, after] = trimmedLine.split(",to=~");
			return before.includes("$all")
				? `||${trimmedLine}`
				: `||${before}$all,to=~${after}`;
		}

		return `||${trimmedLine}$all`;
	});

	updateDomainList(filteredLines);
}

function removeFilters() {
	const lines = getDomainListLines();
	const cleanedLines = lines.map((line) => {
		let result = line;
		result = result.startsWith("||") ? result.slice(2) : result;
		result = result.endsWith("$all") ? result.slice(0, -4) : result;
		result = result.replace("$all,to=~", ",to=~");
		return result;
	});
	updateDomainList(cleanedLines);
	countDomainList();
}

// Utility functions
function copyDomains() {
	navigator.clipboard.writeText(filterListEditor.value);
}

function clearDomainList() {
	updateDomainList([]);
	countDomainList();
}

function countDomainList() {
	const count = getDomainListLines().filter(
		(line) => line.trim() !== ""
	).length;
	elementOutputText.textContent = `Lines: ${count}`;
}

async function loadRawList() {
	try {
		const response = await fetch("src/lib/rawlist.txt");
		const data = await response.text();
		updateDomainList(data.split("\n"));
		countDomainList();
	} catch (error) {
		console.error("Error loading raw list:", error);
	}
}

// Event listeners
function saveDomains() {
	const text = filterListEditor.value;
	const blob = new Blob([text], { type: "text/plain;charset=utf-8" });

	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "filters.txt";
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}

const eventListeners = {
	sortBtn: sortDomainList,
	cleanBtn: cleanDomainList,
	addStringBtn: addFilters,
	removeStringBtn: removeFilters,
	copyBtn: copyDomains,
	clearBtn: clearDomainList,
	saveBtn: saveDomains,
};

Object.entries(eventListeners).forEach(([id, handler]) => {
	const el = document.getElementById(id);
	if (el) el.addEventListener("click", handler);
});

filterListEditor.addEventListener("input", countDomainList);
document.addEventListener("DOMContentLoaded", loadRawList);

const refreshBtn = document.getElementById("refreshBtn");

refreshBtn.addEventListener("click", loadRawList);
