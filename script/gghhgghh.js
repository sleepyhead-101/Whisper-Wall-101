document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('whisperForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const agreeCheckbox = document.getElementById('agree-checkbox');
    const submitBtn = document.getElementById('submitBtn');
    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const termsError = document.getElementById('terms-error');
    const loadingDiv = document.getElementById('loading');
    const successDiv = document.getElementById('successMessage');
    const togglePassword = document.querySelector('.toggle-password');
    const lengthReq = document.getElementById('length-req');
    const numberReq = document.getElementById('number-req');
    const letterReq = document.getElementById('letter-req');
    const specialReq = document.getElementById('special-req');
    const strengthMeter = document.getElementById('strength-meter');
    const strengthText = document.getElementById('password-strength-text');
    const emailAt = document.getElementById('email-at');
    const emailDot = document.getElementById('email-dot');
    const emailDomain = document.getElementById('email-domain');
    togglePassword.addEventListener('click', function() {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        this.setAttribute('aria-pressed', isPassword ? 'true' : 'false');
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });
    function validateForm() {
        let isValid = true;
            if (usernameInput.value.trim() === '') {
            usernameError.classList.add('show');
            isValid = false;
        } else {
            usernameError.classList.remove('show');
        }
        const email = emailInput.value.trim();
        const emailValid = validateEmail(email);
        if (!emailValid) {
            emailError.classList.add('show');
            isValid = false;
        } else {
            emailError.classList.remove('show');
        }
        const password = passwordInput.value;
        const passwordValid = validatePassword(password);
        if (!passwordValid) {
            passwordError.classList.add('show');
            isValid = false;
        } else {
            passwordError.classList.remove('show');
        }
        if (!agreeCheckbox.checked) {
            termsError.classList.add('show');
            isValid = false;
        } else {
            termsError.classList.remove('show');
        }
        submitBtn.disabled = !isValid;
        
        return isValid;
    }
    function validateEmail(email) {
        const atSymbol = email.includes('@');
        const dotSymbol = email.includes('.');
        const domainValid = email.split('.').pop().length >= 2;
        updateRequirement(emailAt, atSymbol);
        updateRequirement(emailDot, dotSymbol);
        updateRequirement(emailDomain, domainValid);
         return atSymbol && dotSymbol && domainValid;
    }
    function validatePassword(password) {
        const hasLength = password.length >= 8;
        const hasNumber = /\d/.test(password);
        const hasLetter = /[a-zA-Z]/.test(password);
        updateRequirement(lengthReq, hasLength);
        updateRequirement(numberReq, hasNumber);
        updateRequirement(letterReq, hasLetter);
        updateRequirement(specialReq, true);
        calculateStrength(password);
        return hasLength && hasNumber && hasLetter;
    }
        function updateRequirement(element, isValid) {
        if (isValid) {
            element.classList.remove('invalid');
            element.classList.add('valid');
            element.classList.remove('fa-circle');
            element.classList.add('fa-check');
        } else {
            element.classList.remove('valid');
            element.classList.add('invalid');
            element.classList.remove('fa-check');
            element.classList.add('fa-circle');
        }
    }
    function calculateStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        if (/\d/.test(password)) strength += 1; 
        if (/[a-zA-Z]/.test(password)) strength += 1; 
        const strengthPercent = (strength / 4) * 100;
        strengthMeter.style.width = `${strengthPercent}%`;
        let strengthLevel = 'weak';
        let color = '#ff5252'; 
        if (strengthPercent >= 75) {
            strengthLevel = 'strong';
            color = '#4caf50'; 
        } else if (strengthPercent >= 50) {
            strengthLevel = 'medium';
            color = '#ff9800'; 
        }
        strengthMeter.style.backgroundColor = color;
        strengthText.textContent = `Password strength: ${strengthLevel}`;
    }
        form.addEventListener('submit', function(e) {
        e.preventDefault(); 
        if (validateForm()) 
            form.style.display = 'none';
            loadingDiv.hidden = false;
            loadingDiv.style.display = 'block';            
            setTimeout(function() {
                loadingDiv.style.display = 'none';
                successDiv.hidden = false;
                successDiv.style.display = 'block';
                    setTimeout(function() {
                    window.location.href = "load.html"; 
                }, 3000);
            }, 2000);
        }
    });
    usernameInput.addEventListener('input', validateForm);
    emailInput.addEventListener('input', validateForm);
    passwordInput.addEventListener('input', validateForm);
    agreeCheckbox.addEventListener('change', validateForm);
        validateForm();
});
