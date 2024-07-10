document.addEventListener("DOMContentLoaded", function() {
    const dailyQuote = document.getElementById("daily-quote-text");
    const balanceAmount = document.getElementById("balance-amount");
    const levelIndicator = document.getElementById("levelIndicator");
    const username = document.getElementById("username");
    const levelName = document.getElementById("level-name");
    const dolphinButton = document.getElementById("dolphin-button");
    const coinAnimation = document.getElementById("coin-animation");
    const settingsModal = document.getElementById("settings-modal");
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const tapsLeftDisplay = document.getElementById("taps-left");
    const resetTimerDisplay = document.getElementById("reset-timer");

    const quotes = [
        "Quote 1",
        "Quote 2",
        "Quote 3",
        "Quote 4",
        "Quote 5"
    ];

    const TAP_LIMIT = 50; // Set the limit for taps per period
    const RESET_INTERVAL = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
    let tapsLeft = TAP_LIMIT;
    let lastResetTime = Date.now();
    let resetTimer;

    // Update the daily quote
    dailyQuote.textContent = quotes[new Date().getDay() % quotes.length];

    // Dummy user data
    const user = {
        firstName: "John",
        coinBalance: 50,
        level: "Bronze",
        levelProgress: 50, // percentage
        tapsLeft: TAP_LIMIT
    };

    // Update user information
    username.textContent = user.firstName;
    balanceAmount.textContent = user.coinBalance;
    levelName.textContent = `Level: ${user.level}`;
    levelIndicator.style.width = `${user.levelProgress}%`;
    tapsLeftDisplay.textContent = user.tapsLeft;

    // Dolphin button click event
    dolphinButton.addEventListener("click", function() {
        if (user.tapsLeft > 0) {
            user.coinBalance += 1;
            user.tapsLeft -= 1;
            balanceAmount.textContent = user.coinBalance;
            tapsLeftDisplay.textContent = user.tapsLeft;
            coinAnimation.style.opacity = 1;
            coinAnimation.style.top = "-10px";
            setTimeout(() => {
                coinAnimation.style.opacity = 0;
                coinAnimation.style.top = "-50px";
            }, 500);
        } else {
            alert("You've reached the tap limit. Please wait for the reset.");
        }
    });

    // Reset taps periodically
    function resetTaps() {
        user.tapsLeft = TAP_LIMIT;
        tapsLeftDisplay.textContent = user.tapsLeft;
        lastResetTime = Date.now();
        startResetTimer();
    }

    // Start the reset timer
    function startResetTimer() {
        clearInterval(resetTimer);
        resetTimer = setInterval(() => {
            const timeLeft = RESET_INTERVAL - (Date.now() - lastResetTime);
            if (timeLeft <= 0) {
                resetTaps();
            } else {
                const hours = Math.floor(timeLeft / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                resetTimerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }

    // Initial call to start the reset timer
    startResetTimer();

    // Toggle settings modal
    function toggleSettings() {
        settingsModal.style.display = settingsModal.style.display === "block" ? "none" : "block";
    }

    // Close settings modal
    function closeSettings() {
        settingsModal.style.display = "none";
    }

    // Event listeners for settings
    document.getElementById("settings-modal").addEventListener("click", toggleSettings);
    document.getElementById("dark-mode-toggle").addEventListener("change", function() {
        document.body.classList.toggle("dark-mode", this.checked);
    });
});
