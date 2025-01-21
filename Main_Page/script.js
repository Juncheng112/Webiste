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

// Adding event listener to the button to navigate to another HTML page
// document.getElementById('navigate-button').addEventListener('click', function() {
//     window.location.href = '3d.html'; // Redirects to 3d.html when the button is clicked
// });
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar.style.left === "-250px") {
        sidebar.style.left = "0";
    } else {
        sidebar.style.left = "-250px";
    }
}

function navigateTo(page) {
    window.location.href = page;
}





