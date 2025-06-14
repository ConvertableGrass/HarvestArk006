// Toggle between Level Quests and Achievement Quests
document.querySelectorAll('.quest-tabs .tab').forEach(button => {
  button.addEventListener('click', () => {
    // Toggle active state
    document.querySelector('.quest-tabs .tab.active').classList.remove('active');
    button.classList.add('active');

    const isLevel = button.textContent.includes('Level');
    
    // Show/hide quest sections
    document.getElementById('level-quests').classList.toggle('hidden', !isLevel);
    document.getElementById('achievement-quests').classList.toggle('hidden', isLevel);
  });
});

// Future implementation placeholder: Load wallet address and Claim Core balance
window.addEventListener('load', () => {
  const wallet = localStorage.getItem("walletAddress");
  const balance = localStorage.getItem("claimCores");

  if (wallet) {
    document.querySelector(".wallet-pill").textContent = wallet.slice(0, 6) + "…" + wallet.slice(-4);
  }

  if (balance) {
    document.getElementById("claimCores").textContent = Number(balance).toLocaleString();
  }
});
