document.addEventListener('DOMContentLoaded', () => {
    const loginCard = document.getElementById('login-card');
    const contentCard = document.getElementById('content-card');
    const passwordInput = document.getElementById('password-input');
    const submitBtn = document.getElementById('submit-btn');
    const errorMessage = document.getElementById('error-message');
    const secretAudio = document.getElementById('secret-audio');

    // The password from requirements
    const CORRECT_PASSWORD = "FORGIVE ME AS AN ACT WONT BE NECESSARY";

    function checkPassword() {
        const userInput = passwordInput.value;

        // Exact match check (can be modified to trimming whitespace if desired)
        // Using trim() to be slightly forgiving of accidental spaces
        if (userInput === CORRECT_PASSWORD || userInput.trim() === CORRECT_PASSWORD) {
            handleSuccess();
        } else {
            handleError();
        }
    }

    function handleSuccess() {
        // Hide error if present
        errorMessage.classList.add('hidden');

        // Hide login card with fade out
        loginCard.style.opacity = '0';
        loginCard.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            loginCard.classList.add('hidden');

            // Show content card
            contentCard.classList.remove('hidden');
            // Trigger reflow to restart animation
            void contentCard.offsetWidth;
            contentCard.style.opacity = '1';
            contentCard.style.transform = 'translateY(0)';

            // Try to play audio automatically (might be blocked by browser policy without interaction, but worth a shot since user clicked submit)
            secretAudio.play().catch(e => console.log("Auto-play blocked, user must click play"));
        }, 300);
    }

    function handleError() {
        // Show error message
        errorMessage.classList.remove('hidden');

        // Shake animation
        loginCard.classList.remove('shake');
        void loginCard.offsetWidth; // Trigger reflow
        loginCard.classList.add('shake');

        // Clear input
        passwordInput.value = '';
        passwordInput.focus();
    }

    // Event listeners
    submitBtn.addEventListener('click', checkPassword);

    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });

    // Clear error when user starts typing
    passwordInput.addEventListener('input', () => {
        if (!errorMessage.classList.contains('hidden')) {
            errorMessage.classList.add('hidden');
        }
    });
});
