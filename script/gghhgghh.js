document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const form = document.getElementById('whisperForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const agreeCheckbox = document.getElementById('agree-checkbox');
    const submitBtn = document.getElementById('submitBtn');
    
    // Error elements
    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const termsError = document.getElementById('terms-error');
    
    // Loading and success elements
    const loadingDiv = document.getElementById('loading');
    const successDiv = document.getElementById('successMessage');
    
    // Password toggle
    const togglePassword = document.querySelector('.toggle-password');
    
    // Password requirements
    const lengthReq = document.getElementById('length-req');
    const numberReq = document.getElementById('number-req');
    const letterReq = document.getElementById('letter-req');
    const specialReq = document.getElementById('special-req');
    
    // Strength meter
    const strengthMeter = document.getElementById('strength-meter');
    const strengthText = document.getElementById('password-strength-text');
    
    // Email requirements
    const emailAt = document.getElementById('email-at');
    const emailDot = document.getElementById('email-dot');
    const emailDomain = document.getElementById('email-domain');
    
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        this.setAttribute('aria-pressed', isPassword ? 'true' : 'false');
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });
    
    // Form validation
    function validateForm() {
        let isValid = true;
        
        // Validate username
        if (usernameInput.value.trim() === '') {
            usernameError.classList.add('show');
            isValid = false;
        } else {
            usernameError.classList.remove('show');
        }
        
        // Validate email
        const email = emailInput.value.trim();
        const emailValid = validateEmail(email);
        if (!emailValid) {
            emailError.classList.add('show');
            isValid = false;
        } else {
            emailError.classList.remove('show');
        }
        
        // Validate password
        const password = passwordInput.value;
        const passwordValid = validatePassword(password);
        if (!passwordValid) {
            passwordError.classList.add('show');
            isValid = false;
        } else {
            passwordError.classList.remove('show');
        }
        
        // Validate terms
        if (!agreeCheckbox.checked) {
            termsError.classList.add('show');
            isValid = false;
        } else {
            termsError.classList.remove('show');
        }
        
        // Enable/disable submit button
        submitBtn.disabled = !isValid;
        
        return isValid;
    }
    
    // Email validation
    function validateEmail(email) {
        // Basic email validation
        const atSymbol = email.includes('@');
        const dotSymbol = email.includes('.');
        const domainValid = email.split('.').pop().length >= 2;
        
        // Update requirement indicators
        updateRequirement(emailAt, atSymbol);
        updateRequirement(emailDot, dotSymbol);
        updateRequirement(emailDomain, domainValid);
        
        return atSymbol && dotSymbol && domainValid;
    }
    
    // Password validation (letters and numbers only, no special characters)
    function validatePassword(password) {
        const hasLength = password.length >= 8;
        const hasNumber = /\d/.test(password);
        const hasLetter = /[a-zA-Z]/.test(password);
        
        // Update requirement indicators
        updateRequirement(lengthReq, hasLength);
        updateRequirement(numberReq, hasNumber);
        updateRequirement(letterReq, hasLetter);
        
        // Special character requirement is now optional (set to true)
        updateRequirement(specialReq, true);
        
        // Calculate password strength
        calculateStrength(password);
        
        return hasLength && hasNumber && hasLetter;
    }
    
    // Update requirement indicator
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
    
    // Calculate password strength
    function calculateStrength(password) {
        let strength = 0;
        
        // Length contributes to strength
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        
        // Character variety
        if (/\d/.test(password)) strength += 1; // has number
        if (/[a-zA-Z]/.test(password)) strength += 1; // has letter
        
        // Update strength meter
        const strengthPercent = (strength / 4) * 100;
        strengthMeter.style.width = `${strengthPercent}%`;
        
        // Update strength text and color
        let strengthLevel = 'weak';
        let color = '#ff5252'; // red
        
        if (strengthPercent >= 75) {
            strengthLevel = 'strong';
            color = '#4caf50'; // green
        } else if (strengthPercent >= 50) {
            strengthLevel = 'medium';
            color = '#ff9800'; // orange
        }
        
        strengthMeter.style.backgroundColor = color;
        strengthText.textContent = `Password strength: ${strengthLevel}`;
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show loading state
            form.style.display = 'none';
            loadingDiv.hidden = false;
            loadingDiv.style.display = 'block';
            
            // Simulate processing delay (2 seconds)
            setTimeout(function() {
                loadingDiv.style.display = 'none';
                successDiv.hidden = false;
                successDiv.style.display = 'block';
                
                // Redirect after another delay (3 seconds)
                setTimeout(function() {
                    window.location.href = "load.html"; // Change to your loading page URL
                }, 3000);
            }, 2000);
            
            // In a real app, you would submit the form here
            // For demonstration, we're just redirecting
        }
    });
    
    // Real-time validation
    usernameInput.addEventListener('input', validateForm);
    emailInput.addEventListener('input', validateForm);
    passwordInput.addEventListener('input', validateForm);
    agreeCheckbox.addEventListener('change', validateForm);
    
    // Initial validation
    validateForm();
});
