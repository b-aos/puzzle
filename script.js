document.addEventListener('DOMContentLoaded', () => {
    const loginCard = document.getElementById('login-card');
    const contentCard = document.getElementById('content-card');
    const passwordInput = document.getElementById('password-input');
    const submitBtn = document.getElementById('submit-btn');
    const errorMessage = document.getElementById('error-message');
    const secretAudio = document.getElementById('secret-audio');

    // The hashed password (SHA-256) for "FORGIVE ME AS AN ACT WONT BE NECESSARY"
    const CORRECT_HASH = "bf08e17138533f5c0a516560d13d236a32988e0d13f4c42e4a5f96c5010356ac";

    async function checkPassword() {
        const userInput = passwordInput.value;

        // Convert input to a buffer
        const msgUint8 = new TextEncoder().encode(userInput);
        // Hash the input using SHA-256
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        // Convert buffer to hex string
        const userHash = Array.from(new Uint8Array(hashBuffer))
            .map(b => b.toString(16).padStart(2, '0')).join('');

        if (userHash === CORRECT_HASH) {
            handleSuccess();
        } else {
            handleError();
        }
    }

    function handleSuccess() {
        errorMessage.classList.add('hidden');

        loginCard.style.opacity = '0';
        loginCard.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            loginCard.classList.add('hidden');

            contentCard.classList.remove('hidden');
            void contentCard.offsetWidth;
            contentCard.style.opacity = '1';
            contentCard.style.transform = 'translateY(0)';

            secretAudio.play().catch(e => console.log("Auto-play blocked, user must click play"));
        }, 300);
    }

    function handleError() {
        errorMessage.classList.remove('hidden');

        loginCard.classList.remove('shake');
        void loginCard.offsetWidth;
        loginCard.classList.add('shake');

        passwordInput.value = '';
        passwordInput.focus();
    }


    submitBtn.addEventListener('click', checkPassword);

    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });


    passwordInput.addEventListener('input', () => {
        if (!errorMessage.classList.contains('hidden')) {
            errorMessage.classList.add('hidden');
        }
    });
});
