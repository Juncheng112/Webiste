// Search bar functionality
const searchInput = document.getElementById("search-input");
const sections = document.querySelectorAll(".section-container");

// Listen for input events in the search bar
searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase();

    sections.forEach(section => {
        const sectionText = section.innerText.toLowerCase();
        if (sectionText.includes(searchText)) {
            // Show the section if it matches the search text
            section.style.display = "";
        } else {
            // Hide the section if it doesn't match
            section.style.display = "none";
        }
    });

    if (!searchText) {
        // Show all sections if the search bar is cleared
        sections.forEach(section => section.style.display = "");
    }
});

// Clear search bar functionality
document.addEventListener("DOMContentLoaded", () => {
    const clearButton = document.createElement("button");
    clearButton.textContent = "Clear Search";
    clearButton.style.marginLeft = "10px";
    clearButton.style.padding = "5px 10px";
    clearButton.style.cursor = "pointer";

    clearButton.addEventListener("click", () => {
        searchInput.value = "";
        // Show all sections when search is cleared
        sections.forEach(section => section.style.display = "");
    });

    const searchBar = document.querySelector(".search-bar");
    searchBar.appendChild(clearButton);
});