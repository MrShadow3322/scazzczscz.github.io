// script.js
document.addEventListener('DOMContentLoaded', () => {
    const balanceElement = document.getElementById('balance');
    const pages = document.querySelectorAll('.page');
    const navButtons = document.querySelectorAll('.nav-button');
    const taskMessage = document.getElementById('task-message');
    const walletMessage = document.getElementById('wallet-message');
    let hasClaimedReward = false;

    // Example balance loading
    let balance = localStorage.getItem('ratcoinBalance');
    if (!balance) {
        balance = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
        localStorage.setItem('ratcoinBalance', balance);
    }
    balanceElement.textContent = `Balance: ${balance} RatCoin`;

    // Page navigation
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const pageId = button.getAttribute('data-page');
            pages.forEach(page => {
                page.classList.toggle('active', page.id === pageId);
            });
        });
    });

    // Task completion
    document.getElementById('subscribe').addEventListener('click', () => {
        if (hasClaimedReward) {
            taskMessage.textContent = 'You have already claimed your reward.';
            return;
        }

        // Integrate with Telegram API to check subscription
        fetch('https://api.telegram.org/bot7534613410:AAHj1AFkC_L9oOA_05OpqQ_ejiZEUKjnSL4/getUpdates')
            .then(response => response.json())
            .then(data => {
                // Dummy check; replace with real subscription verification
                hasClaimedReward = true;
                taskMessage.textContent = 'You have completed the task and earned 1000 RatCoin!';
                balance = parseInt(balance) + 1000;
                localStorage.setItem('ratcoinBalance', balance);
                balanceElement.textContent = `Balance: ${balance} RatCoin`;
            });
    });

    // Wallet addition
    document.getElementById('add-wallet').addEventListener('click', () => {
        document.getElementById('wallet-options').classList.toggle('hidden');
    });

    document.getElementById('submit-wallet').addEventListener('click', () => {
        const walletAddress = document.getElementById('wallet-address').value;
        if (walletAddress) {
            // Send wallet address and balance to admin
            fetch(`https://api.telegram.org/bot7534613410:AAHj1AFkC_L9oOA_05OpqQ_ejiZEUKjnSL4/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: '@Somik3o',
                    text: `New wallet address: ${walletAddress}, Balance: ${balance} RatCoin`
                })
            });
            walletMessage.textContent = 'Wallet address submitted.';
            document.getElementById('wallet-address').value = ''; // Clear input
        }
    });
});
