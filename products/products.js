console.log("✅ products.js running!");

if (!document.getElementById("categories-grid")) {
    console.warn("⚠️ Not on products.html - products.js will not run.");
} else {
    console.log("✅ Found #categories-grid! Running loadProductCategories()");
    loadProductCategories();
    
    // ✅ Add class to body to apply extra spacing for footer
    document.body.classList.add("products-page");
}

// 🔄 Fetch & Load Product Categories
function loadProductCategories() {
    console.log("🔄 Fetching products.json...");

    fetch("products/products.json") // Ensure correct path
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log("✅ JSON Data Loaded:", data);
            if (!data.products) {
                console.error("❌ ERROR: No 'products' key found in JSON!");
                return;
            }
            displayCategories(data.products);
        })
        .catch(error => console.error("❌ Error fetching products.json:", error));
}

// ✅ Display Product Categories with Background Images
function displayCategories(products) {
    console.log("🔄 Processing product categories...");

    const categoriesGrid = document.getElementById("categories-grid");
    if (!categoriesGrid) {
        console.error("❌ ERROR: #categories-grid element not found!");
        return;
    }

    categoriesGrid.innerHTML = ""; // Clear previous content

    products.forEach(category => {
        const categoryTile = document.createElement("div");
        categoryTile.classList.add("category-tile");
        categoryTile.innerHTML = `<h3>${category.category}</h3>`;

        // ✅ Apply Background Image
        if (category.image) {
            categoryTile.style.backgroundImage = `url(${category.image})`;
        }

        categoryTile.addEventListener("click", () => showBrands(category.category, category.items));
        categoriesGrid.appendChild(categoryTile);
    });

    console.log("✅ Categories Loaded:", products.map(cat => cat.category));
}


// ✅ Show Brands & Items in a Category
function showBrands(categoryName, items) {
    console.log(`🟡 Showing products for category: ${categoryName}`);

    document.getElementById("categories-grid").classList.add("hidden");

    const brandsBox = document.getElementById("brands-box");
    brandsBox.classList.remove("hidden");

    // Hide the original category title
    document.querySelector(".products-content-box .content-title").style.display = "none";

    document.getElementById("selected-category").textContent = categoryName;
    const brandsList = document.getElementById("brands-list");
    brandsList.innerHTML = "";

    items.forEach(item => {
        const brandCard = document.createElement("div");
        brandCard.classList.add("brand-card");
        brandCard.innerHTML = `
            <h3>${item.brand}</h3>
            <p><strong>Type:</strong> ${item.sub_category}</p>
            <p>${item.description}</p>
        `;
        brandsList.appendChild(brandCard);
    });

    console.log("✅ Displaying brands:", items);
}

// 🔙 Return to Categories View
document.getElementById("back-to-categories").addEventListener("click", () => {
    console.log("🔄 Returning to categories...");

    document.getElementById("categories-grid").classList.remove("hidden");
    document.getElementById("brands-box").classList.add("hidden");

    // Show the original category title again
    document.querySelector(".products-content-box .content-title").style.display = "block";
});
