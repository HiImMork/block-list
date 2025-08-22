/* 
	This JavaScript script implements a live character counter for a text input field. It listens for user input in an element 
	with the ID "characterCounter" and updates another element with the ID "charCount" to display the current number of 
	characters typed. This provides immediate feedback to users as they type.
*/
const characterCounterInput = document.getElementById("characterCounter");
const characterCounterOutput = document.getElementById("charCount");

/* Adds input event listener to the characterCounterInput field. */
characterCounterInput.addEventListener("input", countChars);

/* Function to count number of characters from the input string */
function countChars() {
	characterCounterOutput.textContent = characterCounterInput.value.length;
}
