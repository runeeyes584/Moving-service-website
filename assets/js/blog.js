// Blog page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initBlogSearch();
    initPagination();
    initNewsletterForm();
    initCategoryFilters();
    initRecentPosts();
});

// Blog search functionality
function initBlogSearch() {
    const searchForm = document.querySelector('.search-form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input[type="text"]');
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                performSearch(searchTerm);
            }
        });
        
        // Real-time search suggestions
        const searchInput = searchForm.querySelector('input[type="text"]');
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length > 2) {
                searchTimeout = setTimeout(() => {
                    showSearchSuggestions(query);
                }, 300);
            } else {
                hideSearchSuggestions();
            }
        });
    }
}

// Perform search
function performSearch(searchTerm) {
    // Simulate search functionality
    console.log('Searching for:', searchTerm);
    
    // In a real application, this would make an API call
    showNotification(`Searching for articles containing "${searchTerm}"...`, 'info');
    
    // Filter blog cards based on search term
    const blogCards = document.querySelectorAll('.blog-card');
    let visibleCount = 0;
    
    blogCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const content = card.querySelector('p').textContent.toLowerCase();
        const category = card.querySelector('.blog-category').textContent.toLowerCase();
        
        if (title.includes(searchTerm.toLowerCase()) || 
            content.includes(searchTerm.toLowerCase()) || 
            category.includes(searchTerm.toLowerCase())) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show search results message
    if (visibleCount === 0) {
        showNotification('No articles found matching your search.', 'info');
    } else {
        showNotification(`Found ${visibleCount} article(s) matching your search.`, 'success');
    }
}

// Show search suggestions
function showSearchSuggestions(query) {
    // Remove existing suggestions
    hideSearchSuggestions();
    
    // Mock suggestions (in real app, these would come from API)
    const suggestions = [
        'Packing tips',
        'Moving checklist',
        'Moving costs',
        'Moving with kids',
        'Office moving',
        'Moving insurance'
    ].filter(item => item.toLowerCase().includes(query.toLowerCase()));
    
    if (suggestions.length > 0) {
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'search-suggestions';
        suggestionsDiv.innerHTML = suggestions.map(suggestion => 
            `<div class="suggestion-item" data-query="${suggestion}">${suggestion}</div>`
        ).join('');
        
        const searchForm = document.querySelector('.search-form');
        searchForm.appendChild(suggestionsDiv);
        
        // Add click handlers
        suggestionsDiv.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', function() {
                const searchInput = searchForm.querySelector('input[type="text"]');
                searchInput.value = this.dataset.query;
                hideSearchSuggestions();
                performSearch(this.dataset.query);
            });
        });
    }
}

// Hide search suggestions
function hideSearchSuggestions() {
    const existingSuggestions = document.querySelector('.search-suggestions');
    if (existingSuggestions) {
        existingSuggestions.remove();
    }
}

// Pagination functionality
function initPagination() {
    const paginationNumbers = document.querySelectorAll('.pagination-number');
    const prevBtn = document.querySelector('.pagination-btn.prev');
    const nextBtn = document.querySelector('.pagination-btn.next');
    
    let currentPage = 1;
    const totalPages = 10; // Mock total pages
    
    // Number click handlers
    paginationNumbers.forEach((number, index) => {
        number.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                // Remove active class from all numbers
                paginationNumbers.forEach(num => num.classList.remove('active'));
                // Add active class to clicked number
                this.classList.add('active');
                currentPage = parseInt(this.textContent);
                updatePaginationState();
            }
        });
    });
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                updateActivePage();
                updatePaginationState();
            }
        });
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                updateActivePage();
                updatePaginationState();
            }
        });
    }
    
    function updateActivePage() {
        paginationNumbers.forEach(num => {
            num.classList.remove('active');
            if (parseInt(num.textContent) === currentPage) {
                num.classList.add('active');
            }
        });
    }
    
    function updatePaginationState() {
        // Update button states
        if (prevBtn) {
            prevBtn.disabled = currentPage === 1;
        }
        if (nextBtn) {
            nextBtn.disabled = currentPage === totalPages;
        }
        
        // Simulate page load
        showNotification(`Loading page ${currentPage}...`, 'info');
    }
}

// Newsletter form functionality
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Simulate subscription
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
}

// Category filter functionality
function initCategoryFilters() {
    const categoryLinks = document.querySelectorAll('.category-list a');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.textContent.split(' ')[0].toLowerCase();
            
            // Remove active class from all links
            categoryLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            // Filter blog cards
            filterBlogCardsByCategory(category);
        });
    });
}

// Filter blog cards by category
function filterBlogCardsByCategory(category) {
    const blogCards = document.querySelectorAll('.blog-card');
    let visibleCount = 0;
    
    blogCards.forEach(card => {
        const cardCategory = card.querySelector('.blog-category').textContent.toLowerCase();
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    showNotification(`Showing ${visibleCount} article(s) in ${category} category.`, 'info');
}

// Recent posts functionality
function initRecentPosts() {
    const recentPosts = document.querySelectorAll('.recent-post');
    
    recentPosts.forEach(post => {
        post.addEventListener('click', function() {
            const postLink = this.querySelector('a');
            if (postLink) {
                // Simulate navigation to post
                showNotification('Loading article...', 'info');
                // In real app: window.location.href = postLink.href;
            }
        });
    });
}

// Validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

// Add CSS styles
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
    
    .search-suggestions {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #ddd;
        border-top: none;
        border-radius: 0 0 5px 5px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        z-index: 100;
    }
    
    .suggestion-item {
        padding: 10px 15px;
        cursor: pointer;
        border-bottom: 1px solid #f0f0f0;
        transition: background-color 0.2s;
    }
    
    .suggestion-item:hover {
        background-color: #f8f9fa;
    }
    
    .suggestion-item:last-child {
        border-bottom: none;
    }
    
    .category-list a.active {
        color: #4CAF50;
        font-weight: bold;
    }
    
    .recent-post {
        cursor: pointer;
        transition: transform 0.2s;
    }
    
    .recent-post:hover {
        transform: translateX(5px);
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
