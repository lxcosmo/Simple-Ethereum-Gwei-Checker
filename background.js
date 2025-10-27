// background.js

const API_URL = "https://api.etherscan.io/v2/api?chainid=1&module=gastracker&action=gasoracle&apikey=YOUR_API_KEY";

// Function to fetch Gwei and update badge text
async function updateGweiBadge() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        if (data && data.result && data.result.SafeGasPrice) {
            const gwei = parseFloat(data.result.SafeGasPrice).toFixed(1);

            // Set text on the extension icon badge
            chrome.action.setBadgeText({ text: gwei });
            chrome.action.setBadgeBackgroundColor({ color: "#2E7D32" }); // nice green
        } else {
            chrome.action.setBadgeText({ text: "?" });
            console.error("SafeGasPrice missing or invalid structure", data);
        }
    } catch (err) {
        console.error("Failed to fetch Gwei:", err);
        chrome.action.setBadgeText({ text: "Err" });
        chrome.action.setBadgeBackgroundColor({ color: "#B71C1C" }); // red for error
    }
}

// Update every 10 seconds
setInterval(updateGweiBadge, 10000);

// Run immediately on startup
updateGweiBadge();
