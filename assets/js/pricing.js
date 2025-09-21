// Pricing Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initPricingPage();
    initFAQAccordion();
    initDropdownMenus();
});

// Initialize pricing page specific functionality
function initPricingPage() {
    // Add pricing page specific styles
    const pricingStyles = document.createElement('link');
    pricingStyles.rel = 'stylesheet';
    pricingStyles.href = 'assets/css/pricing.css';
    document.head.appendChild(pricingStyles);
    
    // Initialize pricing card interactions
    initPricingCards();
    
    // Initialize custom package button
    initCustomPackage();
}

// Initialize pricing cards
function initPricingCards() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('popular') 
                ? 'scale(1.05) translateY(-10px)' 
                : 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = this.classList.contains('popular') 
                ? 'scale(1.05)' 
                : 'translateY(0)';
        });
        
        // Add click animation
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = this.classList.contains('popular') 
                    ? 'scale(1.05)' 
                    : 'translateY(0)';
            }, 150);
        });
    });
    
    // Initialize pricing buttons
    const pricingButtons = document.querySelectorAll('.pricing-btn');
    
    pricingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const plan = this.closest('.pricing-card').querySelector('h3').textContent;
            const price = this.closest('.pricing-card').querySelector('.price').textContent;
            
            // Show confirmation modal
            showPricingConfirmation(plan, price);
        });
    });
}

// Initialize custom package functionality
function initCustomPackage() {
    const customPackageBtn = document.querySelector('.custom-package .btn');
    
    if (customPackageBtn) {
        customPackageBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showCustomPackageModal();
        });
    }
}

// Show pricing confirmation modal
function showPricingConfirmation(plan, price) {
    const modalHTML = `
        <div class="modal" id="pricingModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Confirm Your Plan</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="plan-summary">
                        <h4>Selected Plan: ${plan}</h4>
                        <div class="plan-price">${price}</div>
                        <p>You're about to subscribe to our ${plan.toLowerCase()} plan. This includes all the features listed in the plan details.</p>
                    </div>
                    <form id="pricingForm">
                        <div class="form-group">
                            <label class="form-label">Full Name</label>
                            <input type="text" class="form-input" name="name" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-input" name="email" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Phone</label>
                            <input type="tel" class="form-input" name="phone" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Preferred Start Date</label>
                            <input type="date" class="form-input" name="startDate" required>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary modal-close">Cancel</button>
                    <button type="submit" form="pricingForm" class="btn btn-primary">Subscribe Now</button>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('pricingModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = document.getElementById('pricingModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add event listeners
    const closeButtons = modal.querySelectorAll('.modal-close');
    const form = document.getElementById('pricingForm');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', closePricingModal);
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closePricingModal();
        }
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handlePricingSubmission(plan, price);
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closePricingModal();
        }
    });
}

// Show custom package modal
function showCustomPackageModal() {
    const modalHTML = `
        <div class="modal" id="customModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Custom Package Request</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Tell us about your specific moving needs and we'll create a custom package just for you.</p>
                    <form id="customForm">
                        <div class="form-group">
                            <label class="form-label">Full Name</label>
                            <input type="text" class="form-input" name="name" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-input" name="email" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Phone</label>
                            <input type="tel" class="form-input" name="phone" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Moving From</label>
                            <input type="text" class="form-input" name="from" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Moving To</label>
                            <input type="text" class="form-input" name="to" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Moving Date</label>
                            <input type="date" class="form-input" name="date" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Special Requirements</label>
                            <textarea class="form-input form-textarea" name="requirements" rows="4" placeholder="Please describe your specific moving needs, special items, or any other requirements..."></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary modal-close">Cancel</button>
                    <button type="submit" form="customForm" class="btn btn-primary">Request Custom Quote</button>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('customModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = document.getElementById('customModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add event listeners
    const closeButtons = modal.querySelectorAll('.modal-close');
    const form = document.getElementById('customForm');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', closeCustomModal);
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeCustomModal();
        }
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleCustomSubmission();
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeCustomModal();
        }
    });
}

// Initialize FAQ accordion
function initFAQAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', function() {
            // Close all other items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Initialize dropdown menus
function initDropdownMenus() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('a');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close other dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    });
}

// Handle pricing form submission
function handlePricingSubmission(plan, price) {
    const form = document.getElementById('pricingForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading
    showLoading();
    
    // Simulate API call
    setTimeout(() => {
        hideLoading();
        closePricingModal();
        showNotification(`Thank you! You've successfully subscribed to ${plan} for ${price}. We'll contact you within 24 hours to confirm your subscription.`, 'success');
        form.reset();
    }, 2000);
}

// Handle custom form submission
function handleCustomSubmission() {
    const form = document.getElementById('customForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading
    showLoading();
    
    // Simulate API call
    setTimeout(() => {
        hideLoading();
        closeCustomModal();
        showNotification('Thank you! We\'ve received your custom package request. Our team will review your requirements and contact you within 24 hours with a personalized quote.', 'success');
        form.reset();
    }, 2000);
}

// Close pricing modal
function closePricingModal() {
    const modal = document.getElementById('pricingModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Close custom modal
function closeCustomModal() {
    const modal = document.getElementById('customModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Add CSS for dropdown menus
const dropdownStyles = document.createElement('style');
dropdownStyles.textContent = `
    .dropdown {
        position: relative;
    }
    
    .dropdown-menu {
        position: absolute;
        top: 100%;
        left: 0;
        background: white;
        min-width: 200px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        border-radius: 8px;
        padding: 10px 0;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .dropdown.active .dropdown-menu {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    .dropdown-menu li {
        margin: 0;
    }
    
    .dropdown-menu a {
        display: block;
        padding: 12px 20px;
        color: #333;
        text-decoration: none;
        transition: all 0.3s ease;
    }
    
    .dropdown-menu a:hover {
        background: #f8f9fa;
        color: #4CAF50;
    }
    
    .dropdown a i {
        margin-left: 5px;
        font-size: 12px;
        transition: transform 0.3s ease;
    }
    
    .dropdown.active a i {
        transform: rotate(180deg);
    }
    
    .plan-summary {
        text-align: center;
        margin-bottom: 30px;
        padding: 20px;
        background: #f8f9fa;
        border-radius: 10px;
    }
    
    .plan-summary h4 {
        color: #333;
        margin-bottom: 10px;
        font-size: 1.3rem;
    }
    
    .plan-price {
        font-size: 2rem;
        font-weight: bold;
        color: #4CAF50;
        margin-bottom: 15px;
    }
    
    .plan-summary p {
        color: #666;
        margin: 0;
    }
    
    @media (max-width: 768px) {
        .dropdown-menu {
            position: static;
            box-shadow: none;
            border: 1px solid #e0e0e0;
            margin-top: 10px;
            opacity: 1;
            visibility: visible;
            transform: none;
            display: none;
        }
        
        .dropdown.active .dropdown-menu {
            display: block;
        }
    }
`;
document.head.appendChild(dropdownStyles);
