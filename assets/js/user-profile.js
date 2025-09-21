// User Profile JavaScript

// Mock data for user profile
const mockUserData = {
    recentActivity: [
        {
            id: 1,
            type: 'booking',
            title: 'Booking Confirmed',
            description: 'Local Moving - 123 Main St to 456 Oak Ave',
            date: '2024-01-15',
            status: 'confirmed'
        },
        {
            id: 2,
            type: 'quote',
            title: 'Quote Requested',
            description: 'Long Distance Moving - New York to Los Angeles',
            date: '2024-01-10',
            status: 'pending'
        },
        {
            id: 3,
            type: 'payment',
            title: 'Payment Processed',
            description: 'Payment of $850 for Local Moving service',
            date: '2024-01-12',
            status: 'completed'
        },
        {
            id: 4,
            type: 'review',
            title: 'Review Submitted',
            description: '5-star review for Local Moving service',
            date: '2024-01-18',
            status: 'completed'
        }
    ]
};

// Initialize profile page
document.addEventListener('DOMContentLoaded', function() {
    initProfile();
    loadProfileData();
    loadRecentActivity();
    initMobileMenu();
});

// Initialize profile
function initProfile() {
    // Check if user is logged in
    const currentUser = getCurrentUser();
    if (!currentUser) {
        // Only redirect if not already redirecting
        if (!window.location.href.includes('redirecting')) {
            window.location.href = 'login.html';
        }
        return;
    }

    // Update user info
    updateUserInfo(currentUser);
    
    // Initialize form handlers
    initFormHandlers();
}

// Update user information
function updateUserInfo(user) {
    // Update profile name
    const profileName = document.getElementById('profileName');
    if (profileName) {
        profileName.textContent = `${user.firstName} ${user.lastName}`;
    }

    // Update profile email
    const profileEmail = document.getElementById('profileEmail');
    if (profileEmail) {
        profileEmail.textContent = user.email;
    }

    // Update profile phone
    const profilePhone = document.getElementById('profilePhone');
    if (profilePhone) {
        profilePhone.textContent = user.phone;
    }

    // Update profile avatar
    const profileAvatar = document.getElementById('profileAvatar');
    if (profileAvatar) {
        profileAvatar.src = user.avatar;
    }

    // Update stats
    const totalBookings = document.getElementById('totalBookings');
    if (totalBookings) {
        totalBookings.textContent = user.totalBookings || 0;
    }

    const totalSpent = document.getElementById('totalSpent');
    if (totalSpent) {
        totalSpent.textContent = `$${user.totalSpent || 0}`;
    }

    // Update form fields
    updateFormFields(user);
}

// Update form fields with user data
function updateFormFields(user) {
    const fields = {
        'firstName': user.firstName,
        'lastName': user.lastName,
        'email': user.email,
        'phone': user.phone,
        'dateOfBirth': user.dateOfBirth,
        'street': user.street,
        'city': user.city,
        'state': user.state,
        'zipCode': user.zipCode,
        'preferredService': user.preferredService,
        'budgetRange': user.budgetRange,
        'newsletter': user.newsletter,
        'smsUpdates': user.smsUpdates
    };

    Object.entries(fields).forEach(([fieldId, value]) => {
        const field = document.getElementById(fieldId);
        if (field) {
            if (field.type === 'checkbox') {
                field.checked = value;
            } else {
                field.value = value || '';
            }
        }
    });
}

// Load profile data
function loadProfileData() {
    // This would typically load data from an API
    // For now, we'll use the current user data
    const currentUser = getCurrentUser();
    if (currentUser) {
        updateUserInfo(currentUser);
        
        // Update avatar
        const avatarImg = document.getElementById('profileAvatar');
        if (avatarImg && currentUser.avatar) {
            avatarImg.src = currentUser.avatar;
        } else if (avatarImg) {
            // Set default avatar with user initial
            const userName = currentUser.name || 'User';
            const initial = userName.charAt(0).toUpperCase();
            avatarImg.src = `https://via.placeholder.com/120x120/4CAF50/FFFFFF?text=${initial}`;
        }
    }
}

// Load recent activity
function loadRecentActivity() {
    const container = document.getElementById('recentActivity');
    if (!container) return;
    
    const activities = mockUserData.recentActivity;
    
    container.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon ${activity.type}">
                <i class="fas fa-${getActivityIcon(activity.type)}"></i>
            </div>
            <div class="activity-content">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-description">${activity.description}</div>
                <div class="activity-time">${formatDate(activity.date)}</div>
            </div>
            <div class="activity-status ${activity.status}">${activity.status}</div>
        </div>
    `).join('');
}

// Get activity icon based on type
function getActivityIcon(type) {
    const icons = {
        'booking': 'calendar-check',
        'quote': 'calculator',
        'payment': 'credit-card',
        'review': 'star'
    };
    return icons[type] || 'info-circle';
}

// Initialize form handlers
function initFormHandlers() {
    // Personal info form
    const personalInfoForm = document.getElementById('personalInfoForm');
    if (personalInfoForm) {
        personalInfoForm.addEventListener('submit', handlePersonalInfoUpdate);
    }

    // Address form
    const addressForm = document.getElementById('addressForm');
    if (addressForm) {
        addressForm.addEventListener('submit', handleAddressUpdate);
    }

    // Preferences form
    const preferencesForm = document.getElementById('preferencesForm');
    if (preferencesForm) {
        preferencesForm.addEventListener('submit', handlePreferencesUpdate);
    }
}

// Handle personal info update
function handlePersonalInfoUpdate(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const updatedData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        dateOfBirth: formData.get('dateOfBirth')
    };

    // Update user data
    updateUserData(updatedData);
    
    showNotification('Personal information updated successfully!', 'success');
    cancelEdit();
}

// Handle address update
function handleAddressUpdate(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const updatedData = {
        street: formData.get('street'),
        city: formData.get('city'),
        state: formData.get('state'),
        zipCode: formData.get('zipCode')
    };

    // Update user data
    updateUserData(updatedData);
    
    showNotification('Address information updated successfully!', 'success');
    cancelEdit();
}

// Handle preferences update
function handlePreferencesUpdate(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const updatedData = {
        preferredService: formData.get('preferredService'),
        budgetRange: formData.get('budgetRange'),
        newsletter: formData.get('newsletter') === 'on',
        smsUpdates: formData.get('smsUpdates') === 'on'
    };

    // Update user data
    updateUserData(updatedData);
    
    showNotification('Preferences updated successfully!', 'success');
    cancelEdit();
}

// Update user data
function updateUserData(updatedData) {
    const currentUser = getCurrentUser();
    if (currentUser) {
        // Update user data
        Object.assign(currentUser, updatedData);
        
        // Update session storage
        const sessionData = localStorage.getItem('eazemove_session') || sessionStorage.getItem('eazemove_session');
        if (sessionData) {
            const session = JSON.parse(sessionData);
            session.user = currentUser;
            
            if (localStorage.getItem('eazemove_session')) {
                localStorage.setItem('eazemove_session', JSON.stringify(session));
            } else {
                sessionStorage.setItem('eazemove_session', JSON.stringify(session));
            }
        }
        
        // Update UI
        updateUserInfo(currentUser);
    }
}

// Edit functions
function editPersonalInfo() {
    toggleEditMode('personalInfoForm');
}

function editAddress() {
    toggleEditMode('addressForm');
}

function editPreferences() {
    toggleEditMode('preferencesForm');
}

function toggleEditMode(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, select');
    const actions = form.querySelector('.form-actions');
    
    // Toggle readonly/disabled state
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            input.disabled = !input.disabled;
        } else {
            input.readOnly = !input.readOnly;
        }
    });
    
    // Show/hide form actions
    if (actions) {
        actions.style.display = actions.style.display === 'none' ? 'flex' : 'none';
    }
}

function cancelEdit() {
    // Reset all forms to readonly mode
    const forms = ['personalInfoForm', 'addressForm', 'preferencesForm'];
    forms.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            const inputs = form.querySelectorAll('input, select');
            const actions = form.querySelector('.form-actions');
            
            inputs.forEach(input => {
                if (input.type === 'checkbox') {
                    input.disabled = true;
                } else {
                    input.readOnly = true;
                }
            });
            
            if (actions) {
                actions.style.display = 'none';
            }
        }
    });
}

function editAvatar() {
    // This would typically open a file picker
    showNotification('Avatar editing feature coming soon!', 'info');
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

// Get current user (from auth.js)
function getCurrentUser() {
    const sessionData = localStorage.getItem('eazemove_session') || sessionStorage.getItem('eazemove_session');
    if (sessionData) {
        const session = JSON.parse(sessionData);
        return session.user;
    }
    return null;
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
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 4000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.user-nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-active');
        });
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    const navMenu = document.querySelector('.user-nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('mobile-active');
    }
}

// Refresh profile
function refreshProfile() {
    showNotification('Refreshing profile...', 'info');
    
    setTimeout(() => {
        loadProfileData();
        loadRecentActivity();
        showNotification('Profile refreshed successfully!', 'success');
    }, 1000);
}

// Save all changes
function saveAllChanges() {
    showNotification('Saving all changes...', 'info');
    
    // Get all form data
    const personalData = getFormData('personalInfoForm');
    const addressData = getFormData('addressForm');
    const preferencesData = getFormData('preferencesForm');
    
    // Update user data
    const updatedData = {
        ...personalData,
        ...addressData,
        ...preferencesData
    };
    
    updateUserData(updatedData);
    
    setTimeout(() => {
        showNotification('All changes saved successfully!', 'success');
    }, 1500);
}

// Get form data
function getFormData(formId) {
    const form = document.getElementById(formId);
    if (!form) return {};
    
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    return data;
}

// Toggle edit mode for specific form
function toggleEditMode(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, select');
    const actions = form.querySelector('.form-actions');
    const editBtn = form.closest('.user-section-card').querySelector('.edit-btn');
    
    // Check if currently in edit mode
    const isEditing = !inputs[0].readOnly && !inputs[0].disabled;
    
    if (isEditing) {
        // Exit edit mode
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                input.disabled = true;
            } else {
                input.readOnly = true;
            }
        });
        
        if (actions) actions.style.display = 'none';
        if (editBtn) {
            editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit';
            editBtn.onclick = () => toggleEditMode(formId);
        }
    } else {
        // Enter edit mode
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                input.disabled = false;
            } else {
                input.readOnly = false;
            }
        });
        
        if (actions) actions.style.display = 'flex';
        if (editBtn) {
            editBtn.innerHTML = '<i class="fas fa-times"></i> Cancel';
            editBtn.onclick = () => cancelEdit(formId);
        }
    }
}

// Cancel edit for specific form
function cancelEdit(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    // Reset form to original values
    const currentUser = getCurrentUser();
    if (currentUser) {
        updateFormFields(currentUser);
    }
    
    // Exit edit mode
    const inputs = form.querySelectorAll('input, select');
    const actions = form.querySelector('.form-actions');
    const editBtn = form.closest('.user-section-card').querySelector('.edit-btn');
    
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            input.disabled = true;
        } else {
            input.readOnly = true;
        }
    });
    
    if (actions) actions.style.display = 'none';
    if (editBtn) {
        editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit';
        editBtn.onclick = () => toggleEditMode(formId);
    }
}

// Handle form submission
function handleFormSubmit(event, formType) {
    event.preventDefault();
    
    const form = event.target;
    const formData = getFormData(form.id);
    
    // Update user data
    updateUserData(formData);
    
    // Exit edit mode
    cancelEdit(form.id);
    
    showNotification(`${formType} information updated successfully!`, 'success');
}

// Edit avatar
function editAvatar() {
    // Create file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                showNotification('File size must be less than 5MB', 'error');
                return;
            }
            
            // Validate file type
            if (!file.type.startsWith('image/')) {
                showNotification('Please select a valid image file', 'error');
                return;
            }
            
            // Show loading state
            const avatarContainer = document.querySelector('.profile-avatar');
            const img = document.getElementById('profileAvatar');
            
            if (avatarContainer && img) {
                avatarContainer.classList.add('loading');
                
                // Create preview
                const reader = new FileReader();
                reader.onload = function(e) {
                    // Simulate upload delay
                    setTimeout(() => {
                        img.src = e.target.result;
                        avatarContainer.classList.remove('loading');
                        showNotification('Avatar updated successfully!', 'success');
                        
                        // Update user data
                        const currentUser = getCurrentUser();
                        if (currentUser) {
                            currentUser.avatar = e.target.result;
                            localStorage.setItem('currentUser', JSON.stringify(currentUser));
                        }
                    }, 1000);
                };
                reader.readAsDataURL(file);
            }
        }
    });
    
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
}

// Add CSS animations and mobile menu styles
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
    
    /* Mobile Menu Styles */
    @media (max-width: 768px) {
        .user-nav-menu {
            position: fixed;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            flex-direction: column;
            padding: 20px;
            gap: 10px;
            z-index: 1000;
            transition: all 0.3s ease;
        }
        
        .user-nav-menu.mobile-active {
            top: 100%;
            transform: translateY(0);
        }
        
        .user-nav-menu li a {
            padding: 15px 20px;
            border-radius: 8px;
            width: 100%;
            justify-content: flex-start;
        }
        
        .user-mobile-menu {
            display: block;
        }
        
        .user-header {
            flex-direction: column;
            gap: 20px;
        }
        
        .user-actions-header {
            width: 100%;
            justify-content: flex-start;
        }
        
        .form-row {
            grid-template-columns: 1fr;
        }
        
        .form-actions {
            flex-direction: column;
        }
    }
    
    @media (max-width: 480px) {
        .user-container {
            padding: 0 15px;
        }
        
        .user-main {
            padding: 20px 0;
        }
        
        .user-welcome h1 {
            font-size: 2rem;
        }
        
        .section-content {
            padding: 20px;
        }
        
        .user-profile-card {
            padding: 20px;
        }
        
        .profile-avatar img {
            width: 100px;
            height: 100px;
        }
    }
`;
document.head.appendChild(style);
