document.addEventListener("DOMContentLoaded", function() {
    const balanceAmount = document.getElementById("balance-amount");
    const energyLimitCard = document.querySelector(".boost-card:first-child");
    const multitapCard = document.querySelector(".boost-card:nth-child(2)");
    const boostCryptoCard = document.querySelector(".boost-card:last-child");
    const tapButton = document.getElementById("tap-button"); // Assuming there's a tap button in your HTML

    // Dummy user data
    const user = {
        coinBalance: 0,
        tapValue: 1,
        dailyTapLimit: 1000, // Daily tap limit
        remainingTaps: 1000, // Remaining taps for the day
        resetInterval: 3 * 60 * 60 * 1000, // 3 hours in milliseconds
        nextReset: Date.now() + 3 * 60 * 60 * 1000 // Initial reset time
    };

    // Update user balance display
    balanceAmount.textContent = user.coinBalance;

    // Function to handle tap action
    function handleTap() {
        if (user.remainingTaps > 0) {
            user.remainingTaps--;
            user.coinBalance += user.tapValue;
            balanceAmount.textContent = user.coinBalance;
        } else {
            alert("You have reached your tap limit for the day. Please wait for the reset.");
        }
    }

    // Event listener for tap button
    if (tapButton) {
        tapButton.addEventListener("click", handleTap);
    }

    // Function to reset tap limit
    function resetTapLimit() {
        user.remainingTaps = user.dailyTapLimit;
        user.nextReset = Date.now() + user.resetInterval;
    }

    // Check and reset tap limit periodically
    setInterval(() => {
        if (Date.now() >= user.nextReset) {
            resetTapLimit();
        }
    }, 1000); // Check every second

    // Multitap booster logic
    multitapCard.addEventListener("click", function() {
        const multitapCost = 1000000; // Example cost for multitap upgrade
        if (user.coinBalance >= multitapCost) {
            user.coinBalance -= multitapCost;
            user.tapValue += 1;
            balanceAmount.textContent = user.coinBalance;
            alert(`Multitap upgraded! Each tap is now worth ${user.tapValue} coins.`);
        } else {
            alert("Not enough coins to upgrade Multitap.");
        }
    });

    // Display initial tap limit and reset timer
    function displayTapLimit() {
        const timerElement = document.getElementById("timer"); // Assuming there's a timer element in your HTML
        const remainingTime = user.nextReset - Date.now();
        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        timerElement.textContent = `Taps remaining: ${user.remainingTaps}, Next reset in: ${hours}h ${minutes}m ${seconds}s`;
    }

    // Update the display every second
    setInterval(displayTapLimit, 1000);

    // Initial display update
    displayTapLimit();
});
