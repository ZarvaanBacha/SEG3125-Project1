function checkStoreStatus() {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert to minutes

    const storeHours = {
        0: { open: 10 * 60, close: 19 * 60 }, // Sunday 10AM-7PM
        1: { open: 9 * 60, close: 20 * 60 }, // Monday 9AM-8PM
        2: { open: 9 * 60, close: 20 * 60 }, // Tuesday 9AM-8PM
        3: { open: 9 * 60, close: 20 * 60 }, // Wednesday 9AM-8PM
        4: { open: 9 * 60, close: 20 * 60 }, // Thursday 9AM-8PM
        5: { open: 9 * 60, close: 20 * 60 }, // Friday 9AM-8PM
        6: { open: 9 * 60, close: 20 * 60 }  // Saturday 9AM-8PM
    };

    const statusText = document.createElement("p");
    statusText.classList.add("store-status");
    statusText.style.fontWeight = "bold";
    statusText.style.marginTop = "10px";
    statusText.style.textAlign = "center";

    if (currentTime >= storeHours[dayOfWeek].open && currentTime < storeHours[dayOfWeek].close) {
        statusText.innerHTML = "🟢 <span style='color:green;'>Open Now</span>";
    } else {
        statusText.innerHTML = "🔴 <span style='color:red;'>Closed</span>";
    }

    const hoursContainer = document.querySelector(".hours-container");
    if (hoursContainer) {
        hoursContainer.appendChild(statusText);
        console.log("✅ Store status updated.");
    } else {
        console.error("❌ ERROR: .hours-container not found after content load!");
    }
}

// ✅ Wait until `home.html` is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ home.js running - Checking store hours...");

    const checkInterval = setInterval(() => {
        const hoursContainer = document.querySelector(".hours-container");
        if (hoursContainer) {
            clearInterval(checkInterval); // Stop checking
            checkStoreStatus();
        }
    }, 100); // Check every 100ms
});
