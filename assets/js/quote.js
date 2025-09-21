// Get Quote Page JavaScript

let currentStep = 1;
const totalSteps = 3;

// Initialize quote page
document.addEventListener('DOMContentLoaded', function() {
    initQuoteForm();
    initDatePicker();
    initFormValidation();
});

// Initialize quote form
function initQuoteForm() {
    const form = document.getElementById('quoteForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // Set minimum date to today
    const moveDateInput = document.getElementById('moveDate');
    if (moveDateInput) {
        const today = new Date().toISOString().split('T')[0];
        moveDateInput.min = today;
    }
}

// Initialize date picker
function initDatePicker() {
    const moveDateInput = document.getElementById('moveDate');
    if (moveDateInput) {
        // Set default date to 2 weeks from now
        const defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate() + 14);
        moveDateInput.value = defaultDate.toISOString().split('T')[0];
    }
}

// Initialize form validation
function initFormValidation() {
    const inputs = document.querySelectorAll('input[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
}

// Change form step
function changeStep(direction) {
    const steps = document.querySelectorAll('.form-step');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    // Validate current step before proceeding
    if (direction > 0 && !validateCurrentStep()) {
        return;
    }
    
    // Hide current step
    steps[currentStep - 1].classList.remove('active');
    
    // Update step number
    currentStep += direction;
    
    // Show new step
    steps[currentStep - 1].classList.add('active');
    
    // Update navigation buttons
    prevBtn.style.display = currentStep > 1 ? 'inline-flex' : 'none';
    nextBtn.style.display = currentStep < totalSteps ? 'inline-flex' : 'none';
    submitBtn.style.display = currentStep === totalSteps ? 'inline-flex' : 'none';
    
    // Update step numbers
    updateStepNumbers();
}

// Update step numbers
function updateStepNumbers() {
    const stepNumbers = document.querySelectorAll('.step-number');
    stepNumbers.forEach((stepNumber, index) => {
        stepNumber.textContent = index + 1;
        if (index < currentStep - 1) {
            stepNumber.innerHTML = '<i class="fas fa-check"></i>';
            stepNumber.style.background = '#28a745';
        } else if (index === currentStep - 1) {
            stepNumber.style.background = '#4CAF50';
        } else {
            stepNumber.style.background = '#e0e0e0';
            stepNumber.style.color = '#666';
        }
    });
}

// Validate current step
function validateCurrentStep() {
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const requiredFields = currentStepElement.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });
    
    // Additional validation for specific fields
    if (currentStep === 1) {
        const moveDate = document.getElementById('moveDate');
        if (moveDate && moveDate.value) {
            const selectedDate = new Date(moveDate.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                showFieldError(moveDate, 'Move date cannot be in the past');
                isValid = false;
            }
        }
    }
    
    if (currentStep === 2) {
        // Validate ZIP codes
        const fromZip = document.getElementById('fromZip');
        const toZip = document.getElementById('toZip');
        
        if (fromZip && !isValidZipCode(fromZip.value)) {
            showFieldError(fromZip, 'Please enter a valid ZIP code');
            isValid = false;
        }
        
        if (toZip && !isValidZipCode(toZip.value)) {
            showFieldError(toZip, 'Please enter a valid ZIP code');
            isValid = false;
        }
    }
    
    if (currentStep === 3) {
        // Validate email
        const email = document.getElementById('email');
        if (email && !isValidEmail(email.value)) {
            showFieldError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate phone
        const phone = document.getElementById('phone');
        if (phone && !isValidPhone(phone.value)) {
            showFieldError(phone, 'Please enter a valid phone number');
            isValid = false;
        }
    }
    
    return isValid;
}

// Validate individual field
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    clearFieldError(field);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return;
    }
    
    // Specific validations
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return;
    }
    
    if (field.type === 'tel' && value && !isValidPhone(value)) {
        showFieldError(field, 'Please enter a valid phone number');
        return;
    }
    
    if (field.id === 'fromZip' && value && !isValidZipCode(value)) {
        showFieldError(field, 'Please enter a valid ZIP code');
        return;
    }
    
    if (field.id === 'toZip' && value && !isValidZipCode(value)) {
        showFieldError(field, 'Please enter a valid ZIP code');
        return;
    }
    
    // Mark as valid
    showFieldSuccess(field);
}

// Show field error
function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('error');
    formGroup.classList.remove('success');
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('error');
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Show field success
function showFieldSuccess(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('success');
    formGroup.classList.remove('error');
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Clear error on input
function clearError(event) {
    const field = event.target;
    clearFieldError(field);
}

// Validation helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function isValidZipCode(zip) {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zip);
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    if (!validateCurrentStep()) {
        return;
    }
    
    // Show loading state
    const form = event.target;
    form.classList.add('loading');
    
    // Collect form data
    const formData = new FormData(form);
    const quoteData = {};
    
    for (let [key, value] of formData.entries()) {
        if (quoteData[key]) {
            if (Array.isArray(quoteData[key])) {
                quoteData[key].push(value);
            } else {
                quoteData[key] = [quoteData[key], value];
            }
        } else {
            quoteData[key] = value;
        }
    }
    
    // Simulate API call
    setTimeout(() => {
        form.classList.remove('loading');
        generateQuote(quoteData);
    }, 2000);
}

// Generate quote based on form data
function generateQuote(data) {
    let basePrice = 0;
    let distanceFee = 0;
    let specialItemsFee = 0;
    let insuranceFee = 0;
    
    // Calculate base price based on home size
    const homeSizePrices = {
        'studio': 400,
        '1-bedroom': 600,
        '2-bedroom': 800,
        '3-bedroom': 1200,
        '4-bedroom': 1600,
        'house': 2000
    };
    
    basePrice = homeSizePrices[data.homeSize] || 800;
    
    // Calculate distance fee
    if (data.moveType === 'local') {
        distanceFee = 200;
    } else if (data.moveType === 'long-distance') {
        distanceFee = 500;
    } else if (data.moveType === 'office') {
        distanceFee = 300;
    } else if (data.moveType === 'overseas') {
        distanceFee = 1000;
    }
    
    // Calculate special items fee
    if (data.specialItems) {
        const specialItems = Array.isArray(data.specialItems) ? data.specialItems : [data.specialItems];
        specialItemsFee = specialItems.length * 100;
    }
    
    // Calculate insurance fee
    insuranceFee = Math.round(basePrice * 0.1);
    
    const totalPrice = basePrice + distanceFee + specialItemsFee + insuranceFee;
    
    // Update quote display
    updateQuoteDisplay({
        totalPrice,
        basePrice,
        distanceFee,
        specialItemsFee,
        insuranceFee,
        moveType: data.moveType,
        homeSize: data.homeSize
    });
    
    // Show results section
    showQuoteResults();
}

// Update quote display
function updateQuoteDisplay(quote) {
    document.getElementById('quoteAmount').textContent = quote.totalPrice.toLocaleString();
    document.getElementById('baseCost').textContent = `$${quote.basePrice.toLocaleString()}`;
    document.getElementById('distanceFee').textContent = `$${quote.distanceFee.toLocaleString()}`;
    document.getElementById('specialItemsFee').textContent = `$${quote.specialItemsFee.toLocaleString()}`;
    document.getElementById('insuranceFee').textContent = `$${quote.insuranceFee.toLocaleString()}`;
    
    // Update title and description
    const moveTypeNames = {
        'local': 'Local Moving Service',
        'long-distance': 'Long Distance Moving',
        'office': 'Office Moving Service',
        'storage': 'Storage Service',
        'overseas': 'Overseas Moving Service'
    };
    
    const homeSizeNames = {
        'studio': 'studio apartment',
        '1-bedroom': '1-bedroom apartment',
        '2-bedroom': '2-bedroom apartment',
        '3-bedroom': '3-bedroom apartment',
        '4-bedroom': '4+ bedroom home',
        'house': 'house'
    };
    
    document.getElementById('quoteTitle').textContent = moveTypeNames[quote.moveType] || 'Moving Service';
    document.getElementById('quoteDescription').textContent = 
        `Professional moving service for your ${homeSizeNames[quote.homeSize] || 'home'}`;
}

// Show quote results
function showQuoteResults() {
    const resultsSection = document.getElementById('quoteResults');
    const formSection = document.querySelector('.quote-form-section');
    
    resultsSection.style.display = 'block';
    formSection.style.display = 'none';
    
    // Smooth scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Book move function
function bookMove() {
    // Show loading state
    const bookBtn = event.target;
    const originalText = bookBtn.innerHTML;
    bookBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    bookBtn.disabled = true;
    
    // Simulate booking process
    setTimeout(() => {
        bookBtn.innerHTML = '<i class="fas fa-check"></i> Booked!';
        bookBtn.style.background = '#28a745';
        
        // Show success message
        showNotification('Your move has been booked successfully! We will contact you soon.', 'success');
        
        // Redirect to confirmation page or dashboard
        setTimeout(() => {
            window.location.href = 'user-profile.html';
        }, 2000);
    }, 2000);
}

// Edit quote function
function editQuote() {
    const resultsSection = document.getElementById('quoteResults');
    const formSection = document.querySelector('.quote-form-section');
    
    resultsSection.style.display = 'none';
    formSection.style.display = 'block';
    
    // Scroll to form
    formSection.scrollIntoView({ behavior: 'smooth' });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        margin-left: auto;
    }
`;
document.head.appendChild(style);
