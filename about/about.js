function initAbout() {
    console.log("✅ Running initAbout()...");

    // Ensure that #about-grid exists before running the script
    const aboutGrid = document.getElementById("about-grid");
    if (!aboutGrid) {
        console.error("❌ ERROR: #about-grid not found.");
        return;
    }

    loadAboutSections();
}

// 🔄 Fetch & Process About Data
function loadAboutSections() {
    console.log("🔄 Fetching about.json...");

    fetch("about/about.json") // Ensure correct path
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log("✅ Loaded JSON data:", data);
            if (!data.about) {
                console.error("❌ ERROR: No 'sections' key found in JSON!");
                return;
            }
            displayAboutSections(data.about);
        })
        .catch(error => console.error("❌ Error loading about.json:", error));
}

// 🎨 Display About Sections
function displayAboutSections(sections) {
    const aboutGrid = document.getElementById("about-grid");

    if (!aboutGrid) {
        console.error("❌ ERROR: #about-grid element not found!");
        return;
    }

    aboutGrid.innerHTML = ""; // Clear previous content

    sections.forEach(section => {
        // Create section container
        const sectionBox = document.createElement("div");
        sectionBox.classList.add("about-section");

        // Section Content
        sectionBox.innerHTML = `
            <div class="about-text">
                <h2>${section.title}</h2>
                <p>${section.content}</p>
            </div>
            <img src="${section.image}" alt="${section.title}" class="about-image">
        `;

        aboutGrid.appendChild(sectionBox);
    });

    console.log("✅ About sections updated!");
}

// ✅ Expose `initAbout()` globally
window.initAbout = initAbout;
