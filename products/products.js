console.log("✅ products.js running!");

if (!document.getElementById("categories-grid")) {
    console.warn("⚠️ Not on products.html - products.js will not run.");
} else {
    console.log("✅ Found #categories-grid! Running loadProductCategories()");
    loadProductCategories();
    
    // ✅ Add class to body to apply extra spacing for footer
    document.body.classList.add("products-page");
}

// 🔄 Fetch and load product categories
function loadProductCategories() {
    console.log("🔄 Attempting to fetch products.json...");

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
            processProducts(data.products);
        })
        .catch(error => console.error("❌ Error fetching products.json:", error));
}

// 🏷️ Process JSON into categories
function processProducts(products) {
    console.log("🔄 Processing JSON into categories...");

    const categories = {};

    products.forEach(product => {
        if (!categories[product.category]) {
            categories[product.category] = [];
        }
        if (!categories[product.category].some(b => b.brand === product.brand)) {
            categories[product.category].push({
                brand: product.brand,
                sub_category: product.sub_category,
                description: product.description
            });
        }
    });

    console.log("✅ Categories Processed:", Object.keys(categories));
    loadCategories(categories);
}

// ✅ Populate Categories Grid
function loadCategories(categories) {
    const categoriesGrid = document.getElementById("categories-grid");

    if (!categoriesGrid) {
        console.error("❌ ERROR: #categories-grid element not found!");
        return;
    }

    categoriesGrid.innerHTML = ""; // Clear previous data

    Object.keys(categories).forEach(category => {
        const categoryTile = document.createElement("div");
        categoryTile.classList.add("category-tile");
        categoryTile.innerHTML = `<h3>${category}</h3>`;
        categoryTile.addEventListener("click", () => showBrands(category, categories[category]));
        categoriesGrid.appendChild(categoryTile);
    });

    console.log("✅ Categories Loaded:", Object.keys(categories));
}

function showBrands(category, brands) {
    console.log(`🟡 Showing brands for category: ${category}`);

    document.getElementById("categories-grid").classList.add("hidden");

    const brandsBox = document.getElementById("brands-box");
    brandsBox.classList.remove("hidden");

    // Hide the original category title
    document.querySelector(".products-content-box .content-title").style.display = "none";

    document.getElementById("selected-category").textContent = category;
    const brandsList = document.getElementById("brands-list");
    brandsList.innerHTML = "";

    brands.forEach(brand => {
        const brandCard = document.createElement("div");
        brandCard.classList.add("brand-card");
        brandCard.innerHTML = `
            <h3>${brand.brand}</h3>
            <p><strong>Type:</strong> ${brand.sub_category}</p>
            <p>${brand.description}</p>
        `;
        brandsList.appendChild(brandCard);
    });

    console.log("✅ Displaying brands:", brands);
}

// Restore the title when going back
document.getElementById("back-to-categories").addEventListener("click", () => {
    console.log("🔄 Returning to categories...");

    document.getElementById("categories-grid").classList.remove("hidden");
    document.getElementById("brands-box").classList.add("hidden");

    // Show the original category title again
    document.querySelector(".products-content-box .content-title").style.display = "block";
});



// 🔙 Back to Categories
document.getElementById("back-to-categories").addEventListener("click", () => {
    console.log("🔄 Returning to categories...");

    document.getElementById("categories-grid").classList.remove("hidden");
    document.getElementById("brands-box").classList.add("hidden");
});
