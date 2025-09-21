// Authentication system JavaScript

// Mock data for demo purposes
const mockUsers = [
    {
        id: 1,
        email: 'admin@eazemove.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        phone: '+1 (555) 123-4567',
        dateOfBirth: '1985-01-15',
        street: '789 Oak Street',
        city: 'Smalltown',
        state: 'TX',
        zipCode: '23456',
        preferredService: 'long-distance',
        budgetRange: '2500-5000',
        newsletter: true,
        smsUpdates: true,
        avatar: 'https://via.placeholder.com/120x120/4CAF50/FFFFFF?text=A',
        totalBookings: 0,
        totalSpent: 0,
        avgRating: 0
    },
    {
        id: 2,
        email: 'user@eazemove.com',
        password: 'user123',
        firstName: 'John',
        lastName: 'Doe',
        role: 'user',
        phone: '+1 (555) 123-4567',
        dateOfBirth: '1990-01-15',
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        preferredService: 'local',
        budgetRange: '1000-2500',
        newsletter: true,
        smsUpdates: false,
        avatar: 'https://via.placeholder.com/120x120/4CAF50/FFFFFF?text=U',
        totalBookings: 3,
        totalSpent: 2500,
        avgRating: 4.8
    }
];

// Redirect debounce to prevent multiple redirects
let redirectTimeout = null;
let pageInitialized = false;

// Mock bookings data
const mockBookings = [
    {
        id: 1,
        customerName: 'John Doe',
        customerEmail: 'user@eazemove.com',
        service: 'Local Moving',
        date: '2024-01-15',
        status: 'confirmed',
        amount: 850,
        fromAddress: '123 Main St, New York, NY',
        toAddress: '456 Oak Ave, Brooklyn, NY'
    },
    {
        id: 2,
        customerName: 'Jane Smith',
        customerEmail: 'jane.smith@email.com',
        service: 'Long Distance Moving',
        date: '2024-01-20',
        status: 'pending',
        amount: 2500,
        fromAddress: '789 Pine St, Los Angeles, CA',
        toAddress: '321 Elm St, New York, NY'
    },
    {
        id: 3,
        customerName: 'Mike Johnson',
        customerEmail: 'mike.j@email.com',
        service: 'Office Moving',
        date: '2024-01-25',
        status: 'completed',
        amount: 1800,
        fromAddress: '555 Business Blvd, Chicago, IL',
        toAddress: '777 Corporate Dr, Miami, FL'
    }
];

// Initialize authentication system
document.addEventListener('DOMContentLoaded', function() {
    // Prevent multiple initialization
    if (pageInitialized) {
        return;
    }
    pageInitialized = true;
    
    // Clean up redirecting parameter
    if (window.location.href.includes('redirecting=true')) {
        const url = new URL(window.location);
        url.searchParams.delete('redirecting');
        window.history.replaceState({}, document.title, url.pathname);
    }
    
    initAuth();
    initPasswordStrength();
    initFormValidation();
    
    // Only check auth status if not on auth pages
    if (!isAuthPage()) {
        checkAuthStatus();
    }
});

// Initialize authentication
function initAuth() {
    // Initialize login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Initialize register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Initialize forgot password form
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', handleForgotPassword);
    }
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const remember = formData.get('remember');

    // Validate credentials
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Store user session
        const sessionData = {
            user: user,
            loginTime: new Date().toISOString(),
            remember: remember === 'on'
        };
        
        if (remember) {
            localStorage.setItem('eazemove_session', JSON.stringify(sessionData));
        } else {
            sessionStorage.setItem('eazemove_session', JSON.stringify(sessionData));
        }

        showNotification('Login successful! Redirecting...', 'success');
        
        setTimeout(() => {
            redirectToDashboard(user.role);
        }, 1500);
    } else {
        showNotification('Invalid email or password. Please try again.', 'error');
    }
}

// Handle registration
function handleRegister(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const userData = {
        id: Date.now(),
        email: formData.get('email'),
        password: formData.get('password'),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        phone: formData.get('phone'),
        role: formData.get('userType'),
        dateOfBirth: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        preferredService: 'local',
        budgetRange: '1000-2500',
        newsletter: formData.get('terms') === 'on',
        smsUpdates: false,
        avatar: `https://via.placeholder.com/120x120/4CAF50/FFFFFF?text=${formData.get('firstName').charAt(0).toUpperCase()}`,
        totalBookings: 0,
        totalSpent: 0,
        avgRating: 0
    };

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
        showNotification('An account with this email already exists.', 'error');
        return;
    }

    // Validate password confirmation
    if (formData.get('password') !== formData.get('confirmPassword')) {
        showNotification('Passwords do not match.', 'error');
        return;
    }

    // Add user to mock data
    mockUsers.push(userData);
    
    // Store in localStorage for persistence
    localStorage.setItem('eazemove_users', JSON.stringify(mockUsers));

    showNotification('Account created successfully! Please log in.', 'success');
    
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

// Handle forgot password
function handleForgotPassword(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');

    // Check if user exists
    const user = mockUsers.find(u => u.email === email);
    
    if (user) {
        showNotification('Password reset instructions sent to your email.', 'success');
    } else {
        showNotification('No account found with this email address.', 'error');
    }
}

// Check if current page is an auth page
function isAuthPage() {
    const currentPath = window.location.pathname;
    return currentPath.includes('login.html') || 
           currentPath.includes('register.html') || 
           currentPath.includes('forgot-password.html');
}

// Check authentication status
function checkAuthStatus() {
    const currentUser = getCurrentUser();
    if (currentUser) {
        // Update UI with user info
        updateUserInfo(currentUser);
        
        // Only redirect if on auth pages and not already redirecting
        if (isAuthPage() && !window.location.href.includes('redirecting')) {
            setTimeout(() => {
                redirectToDashboard(currentUser.role);
            }, 100);
        }
    } else {
        // Redirect to login if on protected pages
        const currentPath = window.location.pathname;
        if ((currentPath.includes('admin-dashboard.html') ||
            currentPath.includes('user-profile.html')) && 
            !window.location.href.includes('redirecting')) {
            window.location.href = 'login.html';
        }
    }
}

// Get current user from session
function getCurrentUser() {
    const sessionData = localStorage.getItem('eazemove_session') || sessionStorage.getItem('eazemove_session');
    if (sessionData) {
        const session = JSON.parse(sessionData);
        return session.user;
    }
    return null;
}

// Redirect to appropriate dashboard
function redirectToDashboard(role) {
    // Prevent redirect loops
    if (window.location.href.includes('redirecting')) {
        return;
    }
    
    // Clear any existing timeout
    if (redirectTimeout) {
        clearTimeout(redirectTimeout);
    }
    
    // Debounce redirect to prevent multiple calls
    redirectTimeout = setTimeout(() => {
        if (role === 'admin') {
            window.location.href = 'admin-dashboard.html?redirecting=true';
        } else {
            window.location.href = 'user-profile.html?redirecting=true';
        }
    }, 100);
}

// Update user info in UI
function updateUserInfo(user) {
    // Update admin name
    const adminName = document.getElementById('adminName');
    if (adminName) {
        adminName.textContent = user.firstName;
    }

    // Update user name
    const userName = document.getElementById('userName');
    if (userName) {
        userName.textContent = user.firstName;
    }

    // Update profile info
    const profileName = document.getElementById('profileName');
    if (profileName) {
        profileName.textContent = `${user.firstName} ${user.lastName}`;
    }

    const profileEmail = document.getElementById('profileEmail');
    if (profileEmail) {
        profileEmail.textContent = user.email;
    }

    const profilePhone = document.getElementById('profilePhone');
    if (profilePhone) {
        profilePhone.textContent = user.phone;
    }
}

// Logout function
function logout() {
    localStorage.removeItem('eazemove_session');
    sessionStorage.removeItem('eazemove_session');
    showNotification('Logged out successfully.', 'success');
    
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

// Password strength checker
function initPasswordStrength() {
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', checkPasswordStrength);
    }
}

function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    if (!strengthFill || !strengthText) return;

    let strength = 0;
    let strengthLabel = '';

    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength < 2) {
        strengthLabel = 'Weak';
        strengthFill.className = 'strength-fill weak';
    } else if (strength < 4) {
        strengthLabel = 'Fair';
        strengthFill.className = 'strength-fill fair';
    } else if (strength < 5) {
        strengthLabel = 'Good';
        strengthFill.className = 'strength-fill good';
    } else {
        strengthLabel = 'Strong';
        strengthFill.className = 'strength-fill strong';
    }

    strengthText.textContent = strengthLabel;
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.parentNode.querySelector('.password-toggle i');
    
    if (input.type === 'password') {
        input.type = 'text';
        button.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        button.className = 'fas fa-eye';
    }
}

// Fill demo account
function fillDemoAccount(email, password) {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    if (emailInput) emailInput.value = email;
    if (passwordInput) passwordInput.value = password;
}

// Form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearFieldError(e);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required.');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address.');
            return false;
        }
    }
    
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            showFieldError(field, 'Please enter a valid phone number.');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    
    field.classList.add('error');
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    });
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
    
    .field-error {
        color: #f44336;
        font-size: 12px;
        margin-top: 5px;
        display: block;
    }
    
    .form-group input.error,
    .form-group select.error {
        border-color: #f44336;
        box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.2);
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
