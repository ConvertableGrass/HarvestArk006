const APP_NAME = 'Harvest Ark';
const APP_LOGO_URL = 'logo.png';

const walletLink = new window.WalletLink({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
});

const ethereum = walletLink.makeWeb3Provider(
  'https://mainnet.infura.io/v3/your-infura-id', // Replace with any valid RPC (or dummy)
  1
);

async function connectWallet() {
  try {
    const accounts = await ethereum.enable();
    const walletAddress = accounts[0];

    // Store in localStorage so dashboard can access it
    localStorage.setItem('walletAddress', walletAddress);

    // Redirect to dashboard
    window.location.href = 'dashboard.html';
  } catch (err) {
    console.error('Wallet connection error:', err);
  }
}

document.getElementById('connect-wallet').addEventListener('click', connectWallet);
