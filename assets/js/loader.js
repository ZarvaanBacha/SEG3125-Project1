// Function to dynamically load content into <main>
function loadContent(pagePath, menuItem = null) {
    console.log("✅ Fetching content from:", pagePath);

    fetch(pagePath)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.text();
        })
        .then(html => {
            const main = document.querySelector("main");
            if (!main) {
                console.error("❌ ERROR: <main> tag not found in index.html!");
                return;
            }
            
            main.innerHTML = html;
            console.log("✅ Content injected into <main>");

            // Update browser URL & local storage
            history.pushState({ page: pagePath }, "", `?page=${pagePath}`);
            localStorage.setItem("lastPage", pagePath);
            updateActiveNav(menuItem);

            // ✅ Load scripts based on the page
            if (pagePath.includes("products.html")) {
                console.log("✅ products.html detected. Injecting products.js...");
                injectProductsScript();
            } else if (pagePath.includes("specials.html")) {
                console.log("✅ specials.html detected. Injecting specials.js...");
                injectSpecialsScript();
            } else if (pagePath.includes("about.html")) {
                console.log("✅ about.html detected. Injecting about.js...");
                injectAboutScript();
            }
        })
        .catch(error => console.error("❌ Failed to load content:", error));
}

// ✅ Inject `products.js`
function injectProductsScript() {
    console.log("🔄 Ensuring #categories-grid is in DOM before executing products.js...");

    const checkInterval = setInterval(() => {
        if (document.getElementById("categories-grid")) {
            console.log("✅ #categories-grid detected. Executing products.js...");

            clearInterval(checkInterval); // Stop checking

            // Remove existing script to prevent duplicates
            const oldScript = document.querySelector('script[data-dynamic="products"]');
            if (oldScript) oldScript.remove();

            // Inject `products.js`
            const script = document.createElement("script");
            script.src = "products/products.js"; // Ensure correct path
            script.defer = true;
            script.setAttribute("data-dynamic", "products");
            script.onload = () => console.log("✅ products.js has been loaded and executed.");
            document.body.appendChild(script);
        }
    }, 100);
}

// ✅ Inject `specials.js`
function injectSpecialsScript() {
    console.log("🔄 Checking for #specials-grid before injecting specials.js...");

    const checkInterval = setInterval(() => {
        if (document.getElementById("specials-grid")) {
            console.log("✅ #specials-grid detected. Injecting specials.js...");

            clearInterval(checkInterval); // Stop checking

            // Remove existing script to prevent duplicates
            const oldScript = document.querySelector('script[data-dynamic="specials"]');
            if (oldScript) oldScript.remove();

            // Inject `specials.js`
            const script = document.createElement("script");
            script.src = "specials/specials.js";
            script.defer = true;
            script.setAttribute("data-dynamic", "specials");

            script.onload = () => {
                console.log("✅ specials.js has been loaded and executed.");
                if (typeof initSpecials === "function") {
                    initSpecials(); // Ensure it runs after loading
                } else {
                    console.error("❌ ERROR: initSpecials() is not defined!");
                }
            };

            document.body.appendChild(script);
        }
    }, 100);
}

// ✅ Inject `about.js` (Fixed version)
function injectAboutScript() {
    console.log("🔄 Checking for #about-grid before injecting about.js...");

    const checkInterval = setInterval(() => {
        if (document.getElementById("about-grid")) {
            console.log("✅ #about-grid detected. Injecting about.js...");

            clearInterval(checkInterval); // Stop checking

            // Remove existing script to prevent duplicates
            const oldScript = document.querySelector('script[data-dynamic="about"]');
            if (oldScript) oldScript.remove();

            // Inject `about.js`
            const script = document.createElement("script");
            script.src = "about/about.js";
            script.defer = true;
            script.setAttribute("data-dynamic", "about");

            script.onload = () => {
                console.log("✅ about.js has been loaded and executed.");
                if (typeof initAbout === "function") {
                    initAbout(); // Ensure it runs after loading
                } else {
                    console.error("❌ ERROR: initAbout() is not defined!");
                }
            };

            document.body.appendChild(script);
        }
    }, 100);
}

// ✅ Update Active Navigation
function updateActiveNav(menuItem) {
    document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
    if (menuItem) {
        menuItem.classList.add("active");
    }
}

// ✅ Load Correct Page on Refresh
document.addEventListener("DOMContentLoaded", function () {
    const lastPage = localStorage.getItem("lastPage") || "home/home.html";
    const navLink = document.querySelector(`.nav-link[data-page="${lastPage}"]`);
    let defaultNavItem = navLink ? navLink.parentElement : document.querySelector(".nav-item:first-child");

    loadContent(lastPage, defaultNavItem);
});

// Function to dynamically load content into <main>
function loadContent(pagePath, menuItem = null) {
    console.log("✅ Fetching content from:", pagePath);

    fetch(pagePath)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.text();
        })
        .then(html => {
            const main = document.querySelector("main");
            if (!main) {
                console.error("❌ ERROR: <main> tag not found in index.html!");
                return;
            }
            
            main.innerHTML = html;
            console.log("✅ Content injected into <main>");

            // Update browser URL & local storage
            history.pushState({ page: pagePath }, "", `?page=${pagePath}`);
            localStorage.setItem("lastPage", pagePath);
            updateActiveNav(menuItem);

            // ✅ Load scripts based on the page
            if (pagePath.includes("products.html")) {
                console.log("✅ products.html detected. Injecting products.js...");
                injectProductsScript();
            } else if (pagePath.includes("specials.html")) {
                console.log("✅ specials.html detected. Injecting specials.js...");
                injectSpecialsScript();
            } else if (pagePath.includes("about.html")) {
                console.log("✅ about.html detected. Injecting about.js...");
                injectAboutScript();
            } else if (pagePath.includes("home.html")) {
                console.log("✅ home.html detected. Injecting home.js...");
                injectHomeScript();
            }
        })
        .catch(error => console.error("❌ Failed to load content:", error));
}

// ✅ Function to inject `home.js` when home.html is loaded
function injectHomeScript() {
    console.log("🔄 Checking for home page before injecting home.js...");

    const checkInterval = setInterval(() => {
        if (document.querySelector(".home-container")) {
            console.log("✅ .home-container detected. Injecting home.js...");

            clearInterval(checkInterval); // Stop checking

            // Remove existing script to prevent duplicates
            const oldScript = document.querySelector('script[data-dynamic="home"]');
            if (oldScript) oldScript.remove();

            // Inject home.js
            const script = document.createElement("script");
            script.src = "home/home.js";  // Ensure correct path
            script.defer = true;
            script.setAttribute("data-dynamic", "home");
            script.onload = () => console.log("✅ home.js has been loaded and executed.");
            document.body.appendChild(script);
        }
    }, 100);
}


// ✅ Inject `products.js`
function injectProductsScript() {
    console.log("🔄 Ensuring #categories-grid is in DOM before executing products.js...");

    const checkInterval = setInterval(() => {
        if (document.getElementById("categories-grid")) {
            console.log("✅ #categories-grid detected. Executing products.js...");

            clearInterval(checkInterval); // Stop checking

            // Remove existing script to prevent duplicates
            const oldScript = document.querySelector('script[data-dynamic="products"]');
            if (oldScript) oldScript.remove();

            // Inject `products.js`
            const script = document.createElement("script");
            script.src = "products/products.js"; // Ensure correct path
            script.defer = true;
            script.setAttribute("data-dynamic", "products");
            script.onload = () => console.log("✅ products.js has been loaded and executed.");
            document.body.appendChild(script);
        }
    }, 100);
}

// ✅ Inject `specials.js`
function injectSpecialsScript() {
    console.log("🔄 Checking for #specials-grid before injecting specials.js...");

    const checkInterval = setInterval(() => {
        if (document.getElementById("specials-grid")) {
            console.log("✅ #specials-grid detected. Injecting specials.js...");

            clearInterval(checkInterval); // Stop checking

            // Remove existing script to prevent duplicates
            const oldScript = document.querySelector('script[data-dynamic="specials"]');
            if (oldScript) oldScript.remove();

            // Inject `specials.js`
            const script = document.createElement("script");
            script.src = "specials/specials.js";
            script.defer = true;
            script.setAttribute("data-dynamic", "specials");

            script.onload = () => {
                console.log("✅ specials.js has been loaded and executed.");
                if (typeof initSpecials === "function") {
                    initSpecials(); // Ensure it runs after loading
                } else {
                    console.error("❌ ERROR: initSpecials() is not defined!");
                }
            };

            document.body.appendChild(script);
        }
    }, 100);
}

// ✅ Inject `about.js` (Fixed version)
function injectAboutScript() {
    console.log("🔄 Checking for #about-grid before injecting about.js...");

    const checkInterval = setInterval(() => {
        if (document.getElementById("about-grid")) {
            console.log("✅ #about-grid detected. Injecting about.js...");

            clearInterval(checkInterval); // Stop checking

            // Remove existing script to prevent duplicates
            const oldScript = document.querySelector('script[data-dynamic="about"]');
            if (oldScript) oldScript.remove();

            // Inject `about.js`
            const script = document.createElement("script");
            script.src = "about/about.js";
            script.defer = true;
            script.setAttribute("data-dynamic", "about");

            script.onload = () => {
                console.log("✅ about.js has been loaded and executed.");
                if (typeof initAbout === "function") {
                    initAbout(); // Ensure it runs after loading
                } else {
                    console.error("❌ ERROR: initAbout() is not defined!");
                }
            };

            document.body.appendChild(script);
        }
    }, 100);
}

function updateActiveNav(menuItem) {
    document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));

    if (menuItem) {
        menuItem.classList.add("active");
    } else {
        // ✅ If no menuItem provided (e.g., clicking "Marché Market"), highlight Home
        document.querySelector('.nav-item a[data-page="home/home.html"]')?.parentElement.classList.add("active");
    }
}

// ✅ Load Correct Page on Refresh
document.addEventListener("DOMContentLoaded", function () {
    const lastPage = localStorage.getItem("lastPage") || "home/home.html";
    const navLink = document.querySelector(`.nav-link[data-page="${lastPage}"]`);
    let defaultNavItem = navLink ? navLink.parentElement : document.querySelector(".nav-item:first-child");

    loadContent(lastPage, defaultNavItem);
});

document.addEventListener("click", function (event) {
    const target = event.target.closest("a");

    if (target && target.dataset.page) {
        event.preventDefault();
        const page = target.getAttribute("data-page");

        // ✅ If "Marché Market" is clicked, explicitly set Home as active
        if (page === "home/home.html") {
            loadContent(page, document.querySelector('.nav-item a[data-page="home/home.html"]').parentElement);
        } else {
            loadContent(page, target.parentElement);
        }
    }
});


