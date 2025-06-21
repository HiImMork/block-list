const domainListInput = document.getElementById("domainListInput");
const elementOutputText = document.getElementById("lineCounter");

if (!domainListInput || !elementOutputText) {
	console.error("Required DOM elements not found");
	throw new Error("Required DOM elements not found");
}

// Core text processing functions
function getDomainListLines() {
	return domainListInput.value.split("\n");
}

function updateDomainList(lines) {
	domainListInput.value = lines.join("\n");
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
	async function copyDomains() {
		try {
			await navigator.clipboard.writeText(domainListInput.value);
		} catch (error) {
			console.error("Failed to copy to clipboard:", error);
		}
	}
}

// Utility functions
function copyDomains() {
	navigator.clipboard.writeText(domainListInput.value);
}

function clearDomainList() {
	updateDomainList([]);
}

function countDomainList() {
	const count = getDomainListLines().filter(
		(line) => line.trim() !== ""
	).length;
	elementOutputText.textContent = `Lines: ${count}`;
}

async function loadRawList() {
	try {
		const response = await fetch("./src/lib/rawlist.txt");
		const data = await response.text();
		updateDomainList(data.split("\n"));
		countDomainList();
	} catch (error) {
		console.error("Error loading raw list:", error);
	}
}

// Event listeners
const eventListeners = {
	sortDomainList: sortDomainList,
	cleanDomainList: cleanDomainList,
	addFilters: addFilters,
	removeFilters: removeFilters,
	copyDomains: copyDomains,
	clearDomainList: clearDomainList,
};

Object.entries(eventListeners).forEach(([id, handler]) => {
	document.getElementById(id).addEventListener("click", handler);
});

domainListInput.addEventListener("input", countDomainList);
document.addEventListener("DOMContentLoaded", loadRawList);
