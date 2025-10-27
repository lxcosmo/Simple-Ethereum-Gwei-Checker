document.addEventListener("DOMContentLoaded", async () => {
    // Etherscan API v2 endpoint (Ethereum mainnet)
    const API_URL = "https://api.etherscan.io/v2/api?chainid=1&module=gastracker&action=gasoracle&apikey=YOUR_API_KEY";
    const gweiElement = document.getElementById("gweiValue");

    try {
        // Fetch gas price data from Etherscan API
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse JSON response
        const data = await response.json();
        console.log("Etherscan API (v2) response:", data);

        // Check if the API response contains valid gas data
        if (data && data.result && data.result.SafeGasPrice) {
            // Convert gas price to a float with 1 decimal place (e.g., 0.6 Gwei)
            const gwei = parseFloat(data.result.SafeGasPrice).toFixed(1);
            gweiElement.textContent = `${gwei} Gwei`;
        } else {
            // Handle unexpected API structure
            gweiElement.textContent = "Gwei data unavailable";
            console.error("Error: 'SafeGasPrice' field missing or structure changed", data);
        }

    } catch (error) {
        // Handle network or API errors
        console.error("Error fetching Gwei data:", error);
        gweiElement.textContent = "Error loading data";
    }
});
