const APP_NAME = "Harvest Ark";
const APP_LOGO_URL = "./assets/logo.png"; // replace with your hosted logo if needed
const DEFAULT_CHAIN_ID = 1;

const walletLink = new window.CoinbaseWalletSDK({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
  darkMode: true
});

const ethereum = walletLink.makeWeb3Provider(
  "https://mainnet.infura.io/v3/YOUR_INFURA_ID", DEFAULT_CHAIN_ID
);

document.getElementById("connect-wallet").addEventListener("click", async () => {
  try {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const walletAddress = accounts[0];
    localStorage.setItem("walletAddress", walletAddress);
    alert(`Wallet connected: ${walletAddress}`);
    // Redirect to dashboard or load save data
    window.location.href = "dashboard.html"; // will be created in Step 2
  } catch (err) {
    console.error("Wallet connection failed:", err);
    alert("Connection failed. Make sure Coinbase Wallet is installed.");
  }
});
