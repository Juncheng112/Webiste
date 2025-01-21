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