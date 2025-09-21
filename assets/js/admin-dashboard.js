// Admin Dashboard JavaScript

// Mock data for admin dashboard
const mockAdminData = {
    stats: {
        totalBookings: 156,
        totalRevenue: 125400,
        totalCustomers: 89,
        avgRating: 4.7
    },
    recentBookings: [
        {
            id: 1,
            customer: 'John Doe',
            service: 'Local Moving',
            date: '2024-01-15',
            status: 'confirmed',
            amount: 850
        },
        {
            id: 2,
            customer: 'Jane Smith',
            service: 'Long Distance',
            date: '2024-01-20',
            status: 'pending',
            amount: 2500
        },
        {
            id: 3,
            customer: 'Mike Johnson',
            service: 'Office Moving',
            date: '2024-01-25',
            status: 'completed',
            amount: 1800
        },
        {
            id: 4,
            customer: 'Sarah Wilson',
            service: 'Storage',
            date: '2024-01-28',
            status: 'confirmed',
            amount: 450
        }
    ],
    recentCustomers: [
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@email.com',
            joinDate: '2024-01-10',
            bookings: 3
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@email.com',
            joinDate: '2024-01-15',
            bookings: 1
        },
        {
            id: 3,
            name: 'Mike Johnson',
            email: 'mike.j@email.com',
            joinDate: '2024-01-20',
            bookings: 2
        }
    ],
    revenueData: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [8500, 12000, 9800, 15600]
    },
    bookingStatusData: {
        labels: ['Completed', 'Confirmed', 'Pending', 'Cancelled'],
        data: [45, 30, 15, 10]
    }
};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initDashboard();
    loadDashboardData();
    initCharts();
});

// Initialize dashboard
function initDashboard() {
    // Check if user is admin
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin') {
        // Only redirect if not already redirecting
        if (!window.location.href.includes('redirecting')) {
            window.location.href = 'login.html';
        }
        return;
    }

    // Update admin name
    const adminName = document.getElementById('adminName');
    if (adminName) {
        adminName.textContent = currentUser.firstName;
    }
    
    // Initialize mobile menu
    initMobileMenu();
}

// Load dashboard data
function loadDashboardData() {
    // Update stats
    updateStats();
    
    // Load recent bookings
    loadRecentBookings();
    
    // Load recent customers
    loadRecentCustomers();
}

// Update statistics
function updateStats() {
    const stats = mockAdminData.stats;
    
    // Animate numbers
    animateNumber('totalBookings', stats.totalBookings);
    animateNumber('totalRevenue', stats.totalRevenue, '$');
    animateNumber('totalCustomers', stats.totalCustomers);
    animateNumber('avgRating', stats.avgRating);
}

// Animate number counting
function animateNumber(elementId, targetValue, prefix = '') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const duration = 2000;
    const startTime = performance.now();
    const startValue = 0;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
        element.textContent = prefix + currentValue.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Load recent bookings
function loadRecentBookings() {
    const container = document.getElementById('recentBookings');
    if (!container) return;
    
    const bookings = mockAdminData.recentBookings;
    
    container.innerHTML = bookings.map(booking => `
        <div class="activity-item">
            <div class="activity-icon booking">
                <i class="fas fa-calendar-check"></i>
            </div>
            <div class="activity-content">
                <div class="activity-title">${booking.customer}</div>
                <div class="activity-description">${booking.service} - $${booking.amount.toLocaleString()}</div>
                <div class="activity-time">${formatDate(booking.date)}</div>
            </div>
            <div class="activity-status ${booking.status}">${booking.status}</div>
        </div>
    `).join('');
}

// Load recent customers
function loadRecentCustomers() {
    const container = document.getElementById('recentCustomers');
    if (!container) return;
    
    const customers = mockAdminData.recentCustomers;
    
    container.innerHTML = customers.map(customer => `
        <div class="activity-item">
            <div class="activity-icon customer">
                <i class="fas fa-user"></i>
            </div>
            <div class="activity-content">
                <div class="activity-title">${customer.name}</div>
                <div class="activity-description">${customer.email}</div>
                <div class="activity-time">Joined ${formatDate(customer.joinDate)} • ${customer.bookings} bookings</div>
            </div>
        </div>
    `).join('');
}

// Initialize charts
function initCharts() {
    initRevenueChart();
    initBookingStatusChart();
}

// Initialize revenue chart
function initRevenueChart() {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;
    
    const data = mockAdminData.revenueData;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Revenue ($)',
                data: data.data,
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#4CAF50',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                }
            },
            elements: {
                point: {
                    hoverRadius: 8
                }
            }
        }
    });
}

// Initialize booking status chart
function initBookingStatusChart() {
    const ctx = document.getElementById('bookingStatusChart');
    if (!ctx) return;
    
    const data = mockAdminData.bookingStatusData;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.data,
                backgroundColor: [
                    '#4CAF50',
                    '#2196F3',
                    '#FF9800',
                    '#f44336'
                ],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                }
            },
            cutout: '60%'
        }
    });
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
    const navMenu = document.querySelector('.admin-nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-active');
        });
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    const navMenu = document.querySelector('.admin-nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('mobile-active');
    }
}

// Refresh dashboard
function refreshDashboard() {
    showNotification('Refreshing dashboard...', 'info');
    
    // Simulate refresh
    setTimeout(() => {
        loadDashboardData();
        initCharts();
        showNotification('Dashboard refreshed successfully!', 'success');
    }, 1000);
}

// Export data
function exportData() {
    showNotification('Preparing data export...', 'info');
    
    // Simulate export
    setTimeout(() => {
        const data = {
            stats: mockAdminData.stats,
            bookings: mockAdminData.recentBookings,
            customers: mockAdminData.recentCustomers,
            exportDate: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `eazemove-dashboard-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        showNotification('Data exported successfully!', 'success');
    }, 1500);
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
        .admin-nav-menu {
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
        
        .admin-nav-menu.mobile-active {
            top: 100%;
            transform: translateY(0);
        }
        
        .admin-nav-menu li a {
            padding: 15px 20px;
            border-radius: 8px;
            width: 100%;
            justify-content: flex-start;
        }
    }
`;
document.head.appendChild(style);
