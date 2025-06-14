// ========== CONFIG ==========
const APP_NAME = 'Harvest Ark';
const APP_LOGO_URL = 'logo.png';

const walletLink = new window.WalletLink({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
});

const ethereum = walletLink.makeWeb3Provider(
  'https://mainnet.infura.io/v3/your-infura-id', // Replace with your RPC or dummy
  1
);

// ========== CONNECT WALLET ==========
async function connectWallet() {
  try {
    const accounts = await ethereum.enable();
    const walletAddress = accounts[0];

    // Store in localStorage for dashboard access
    localStorage.setItem('walletAddress', walletAddress);

    // Redirect
    window.location.href = 'dashboard.html';
  } catch (err) {
    console.error('Wallet connection error:', err);
  }
}

const connectButton = document.getElementById('connect-wallet');
if (connectButton) {
  connectButton.addEventListener('click', connectWallet);
}

// ========== PLAYER DATA ==========
const playerData = {
  '0x742d35Cc6634C0532925a3b844Bc454e4438f44e': {
    claimCores: '23,110',
    level: 47,
    xp: 156420,
    xpMax: 175000,
    skills: {
      Farming: { level: 32, xp: 45600, xpMax: 52000 },
      Exploring: { level: 28, xp: 38200, xpMax: 45000 },
      Mining: { level: 41, xp: 67300, xpMax: 72000 },
      Combat: { level: 55, xp: 89400, xpMax: 95000 },
      Crafting: { level: 24, xp: 22100, xpMax: 28000 },
    }
  }
};

// ========== ON LOAD ==========
window.addEventListener('DOMContentLoaded', () => {
  const wallet = localStorage.getItem('walletAddress');
  const pill = document.querySelector('.wallet-pill');

  if (wallet) {
    pill.textContent = wallet.slice(0, 6) + '…' + wallet.slice(-4);

    const data = playerData[wallet];
    if (data) {
      updateClaimCores(data.claimCores);

      // Level block
      document.querySelector('.level-info h2').textContent = `Overall Level ${data.level}`;
      document.querySelector('.xp-right strong').textContent = data.xp.toLocaleString();
      document.querySelector('.xp-right span').textContent = `/ ${data.xpMax.toLocaleString()} XP`;
      document.querySelector('.level-overall .progress-fill').style.width = `${(data.xp / data.xpMax) * 100}%`;

      // Skills
      const skillElements = document.querySelectorAll('.skill-card');
      const skillNames = Object.keys(data.skills);

      skillElements.forEach((el, i) => {
        const name = skillNames[i];
        const skill = data.skills[name];
        el.innerHTML = `${getSkillEmoji(name)} <strong>${name}</strong><br/>Level ${skill.level}<br/><span>${skill.xp.toLocaleString()} / ${skill.xpMax.toLocaleString()} XP</span>`;
      });
    }
  }
});

// ========== CLAIM CORE SETTER ==========
function updateClaimCores(amount) {
  localStorage.setItem('claimCores', amount);
  document.getElementById('claimCores').textContent = amount;
}

// ========== EMOJI ICONS ==========
function getSkillEmoji(name) {
  const icons = {
    Farming: '🌱',
    Exploring: '🧭',
    Mining: '⛏️',
    Combat: '⚔️',
    Crafting: '🔧'
  };
  return icons[name] || '✨';
}

// ========== QUEST TOGGLE ==========
document.querySelectorAll('.quest-tabs .tab').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.quest-tabs .tab.active').classList.remove('active');
    button.classList.add('active');

    const isLevel = button.textContent.includes('Level');
    document.getElementById('level-quests').classList.toggle('hidden', !isLevel);
    document.getElementById('achievement-quests').classList.toggle('hidden', isLevel);
  });
});
