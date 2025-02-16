function initSpecials() {
    console.log("✅ Running initSpecials()...");

    // Ensure that #specials-grid exists before running the script
    const specialsGrid = document.getElementById("specials-grid");
    if (!specialsGrid) {
        console.error("❌ ERROR: #specials-grid not found.");
        return;
    }

    loadSpecials();
}

// 🔄 Fetch & Process Specials Data
function loadSpecials() {
    console.log("🔄 Fetching specials.json...");

    fetch("specials/specials.json") // Adjust path if needed
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log("✅ Loaded JSON data:", data);
            if (!data.specials) {
                console.error("❌ ERROR: No 'specials' key found in JSON!");
                return;
            }
            displaySpecials(data.specials);
        })
        .catch(error => console.error("❌ Error loading specials.json:", error));
}

function displaySpecials(specials) {
    const specialsGrid = document.getElementById("specials-grid");

    if (!specialsGrid) {
        console.error("❌ ERROR: #specials-grid element not found!");
        return;
    }

    specialsGrid.innerHTML = ""; // Clear previous content

    specials.forEach(category => {
        // Create a category container
        const categoryBox = document.createElement("div");
        categoryBox.classList.add("content-box", "specials-category");

        // Category Title (appears only once per category)
        categoryBox.innerHTML = `
            <div class="content-title">
                <div class="content-title-text">${category.category}</div>
            </div>
            <div class="specials-content">
                <div class="specials-list"></div> 
                <div class="specials-images"></div>  
            </div>
        `;

        // Get reference to list container
        const specialsList = categoryBox.querySelector(".specials-list");

        // **✅ Append items under this category (without repeating category name)**
        category.items.forEach(item => {
            const itemEntry = document.createElement("div");
            itemEntry.classList.add("special-item");

            itemEntry.innerHTML = `
                <p>${item.name} [<span class="price">${item.price}</span>]</p>
            `;
            specialsList.appendChild(itemEntry);
        });

        // **✅ Load images**
        const imgContainer = categoryBox.querySelector(".specials-images");
        const categoryFolder = category.category.toLowerCase().replace(/\s+&\s+/g, "").replace(/\s+/g, "");

        for (let i = 1; i <= 2; i++) {
            const img = document.createElement("img");
            img.src = `specials/images/${categoryFolder}/${categoryFolder}${i}.png`;
            img.alt = `${category.category} Image ${i}`;
            img.classList.add("special-image");
            imgContainer.appendChild(img);
        }

        // **✅ Append the full category box only once**
        specialsGrid.appendChild(categoryBox);
    });

    console.log("✅ Specials grid updated!");
}



// ✅ Expose initSpecials() globally
window.initSpecials = initSpecials;
