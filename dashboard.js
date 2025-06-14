// =============== Coinbase Wallet Connect ===============
const APP_NAME = 'Harvest Ark';
const APP_LOGO_URL = 'logo.png';

const walletLink = new window.WalletLink({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
});

const ethereum = walletLink.makeWeb3Provider(
  'https://mainnet.infura.io/v3/your-infura-id', // You can use any dummy or valid URL
  1
);

async function connectWallet() {
  try {
    const accounts = await ethereum.enable();
    const walletAddress = accounts[0];

    // Store wallet
    localStorage.setItem('walletAddress', walletAddress);

    // Redirect
    window.location.href = 'dashboard.html';
  } catch (err) {
    console.error('Wallet connection error:', err);
  }
}

document.getElementById('connect-wallet')?.addEventListener('click', connectWallet);

// =============== Quest Toggle Logic ===============
document.querySelectorAll('.quest-tabs .tab').forEach(button => {
  button.addEventListener('click', () => {
    // Switch tabs
    document.querySelector('.quest-tabs .tab.active').classList.remove('active');
    button.classList.add('active');

    const isLevel = button.textContent.includes('Level');
    document.getElementById('level-quests').classList.toggle('hidden', !isLevel);
    document.getElementById('achievement-quests').classList.toggle('hidden', isLevel);
  });
});

// =============== Load Dashboard Data ===============
window.addEventListener('DOMContentLoaded', () => {
  const wallet = localStorage.getItem('walletAddress');
  if (wallet) {
    const walletPill = document.querySelector('.wallet-pill');
    walletPill.textContent = wallet.slice(0, 6) + '…' + wallet.slice(-4);
  }

  const claimCores = localStorage.getItem('claimCores') || '12,584';
  document.getElementById('claimCores').textContent = claimCores;
});

// =============== Utility to Update Claim Cores ===============
function updateClaimCores(amount) {
  localStorage.setItem('claimCores', amount);
  const el = document.getElementById('claimCores');
  if (el) el.textContent = amount;
}
