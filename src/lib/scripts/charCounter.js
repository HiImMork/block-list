class CharacterCounter {
  constructor() {
    // Get DOM elements
    this.input = document.getElementById("charCounterInput");
    this.output = document.getElementById("charCounterConsole");
    this.clearBtn = document.getElementById("clearString");

    // Validate DOM elements
    if (!this.input || !this.output || !this.clearBtn) {
      throw new Error("Required DOM elements not found");
    }

    // Initialize state
    this.characters = 0;

    // Bind methods to preserve 'this' context
    this.handleInput = this.debounce(this.handleInput.bind(this), 100);
    this.clearInput = this.clearInput.bind(this);

    // Add event listeners
    this.input.addEventListener("input", this.handleInput);
    this.clearBtn.addEventListener("click", this.clearInput);

    // Initial display
    this.updateDisplay();
  }

  // Debounce helper function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Update the display with current character count
  updateDisplay() {
    this.output.textContent = `Characters: ${this.characters}`;
  }

  // Handle input changes
  handleInput() {
    this.characters = this.input.value.length;
    this.updateDisplay();
  }

  // Clear the input
  clearInput() {
    this.characters = 0;
    this.input.value = "";
    this.updateDisplay();
  }
}

// Initialize the character counter when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  try {
    new CharacterCounter();
  } catch (error) {
    console.error("Failed to initialize character counter:", error);
  }
});
