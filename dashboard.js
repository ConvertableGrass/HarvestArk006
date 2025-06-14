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

window.addEventListener('DOMContentLoaded', () => {
  const wallet = localStorage.getItem('walletAddress');
  if (wallet) {
    const walletPill = document.querySelector('.wallet-pill');
    walletPill.textContent = wallet.slice(0, 6) + '…' + wallet.slice(-4);
  }

  // You can also store & use Claim Cores like this:
  const claimCores = localStorage.getItem('claimCores') || '12,584';
  document.getElementById('claimCores').textContent = claimCores;
  
  function updateClaimCores(amount) {
  localStorage.setItem('claimCores', amount);
  document.getElementById('claimCores').textContent = amount;
}
});

