// Services Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initServicesPage();
    initServiceCards();
    initSidebarWidgets();
    initScrollAnimations();
});

// Initialize services page
function initServicesPage() {
    // Add services page specific styles
    const servicesStyles = document.createElement('link');
    servicesStyles.rel = 'stylesheet';
    servicesStyles.href = 'assets/css/services.css';
    document.head.appendChild(servicesStyles);
    
    // Initialize service card interactions
    initServiceCardInteractions();
}

// Initialize service cards
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.borderColor = '#4CAF50';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.borderColor = 'transparent';
        });
        
        // Add click animation
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px)';
            }, 150);
        });
    });
}

// Initialize service card interactions
function initServiceCardInteractions() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const serviceType = card.dataset.service;
        const learnMoreLink = card.querySelector('.learn-more');
        
        // Add click handler for the entire card
        card.addEventListener('click', function(e) {
            if (e.target !== learnMoreLink) {
                window.location.href = `single-service.html?service=${serviceType}`;
            }
        });
        
        // Add hover effect for learn more link
        if (learnMoreLink) {
            learnMoreLink.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
            });
            
            learnMoreLink.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        }
    });
}

// Initialize sidebar widgets
function initSidebarWidgets() {
    // Initialize post list interactions
    const postLinks = document.querySelectorAll('.post-list a');
    postLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(3px)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
        });
    });
    
    // Initialize chat widget
    const chatBtn = document.querySelector('.chat-widget .btn');
    if (chatBtn) {
        chatBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showChatModal();
        });
    }
}

// Show chat modal
function showChatModal() {
    const modalHTML = `
        <div class="modal" id="chatModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Chat with Our Expert Movers</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="chat-container">
                        <div class="chat-messages" id="chatMessages">
                            <div class="message bot-message">
                                <div class="message-avatar">
                                    <i class="fas fa-user-tie"></i>
                                </div>
                                <div class="message-content">
                                    <p>Hello! I'm here to help you with your moving needs. How can I assist you today?</p>
                                    <span class="message-time">Just now</span>
                                </div>
                            </div>
                        </div>
                        <div class="chat-input">
                            <input type="text" id="chatInput" placeholder="Type your message...">
                            <button id="sendMessage" class="btn btn-primary">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('chatModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = document.getElementById('chatModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add event listeners
    const closeButtons = modal.querySelectorAll('.modal-close');
    const sendBtn = document.getElementById('sendMessage');
    const chatInput = document.getElementById('chatInput');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', closeChatModal);
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeChatModal();
        }
    });
    
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Focus on input
    chatInput.focus();
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeChatModal();
        }
    });
}

// Send message
function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Simulate bot response
    setTimeout(() => {
        const responses = [
            "That's a great question! Let me help you with that.",
            "I understand your concern. Our team can definitely help with that.",
            "That's exactly what we specialize in! Let me get you connected with our experts.",
            "I'd be happy to provide more information about that service.",
            "That's a common request. We have extensive experience in that area."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addMessage(randomResponse, 'bot');
    }, 1000);
}

// Add message to chat
function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = sender === 'user' ? 'fas fa-user' : 'fas fa-user-tie';
    const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="${avatar}"></i>
        </div>
        <div class="message-content">
            <p>${text}</p>
            <span class="message-time">${time}</span>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Close chat modal
function closeChatModal() {
    const modal = document.getElementById('chatModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Initialize scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .feature-item, .testimonial-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Add CSS for chat modal and animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .chat-container {
        height: 400px;
        display: flex;
        flex-direction: column;
    }
    
    .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        background: #f8f9fa;
        border-radius: 10px;
        margin-bottom: 20px;
    }
    
    .message {
        display: flex;
        align-items: flex-start;
        gap: 15px;
        margin-bottom: 20px;
    }
    
    .message-avatar {
        width: 40px;
        height: 40px;
        background: #4CAF50;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }
    
    .user-message {
        flex-direction: row-reverse;
    }
    
    .user-message .message-avatar {
        background: #007bff;
    }
    
    .message-content {
        background: white;
        padding: 15px;
        border-radius: 15px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        max-width: 70%;
    }
    
    .user-message .message-content {
        background: #007bff;
        color: white;
    }
    
    .message-content p {
        margin: 0 0 5px 0;
        line-height: 1.4;
    }
    
    .message-time {
        font-size: 0.8rem;
        opacity: 0.7;
    }
    
    .chat-input {
        display: flex;
        gap: 10px;
    }
    
    .chat-input input {
        flex: 1;
        padding: 12px 16px;
        border: 2px solid #e0e0e0;
        border-radius: 25px;
        font-size: 16px;
    }
    
    .chat-input input:focus {
        outline: none;
        border-color: #4CAF50;
    }
    
    .chat-input button {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .fade-in-up {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .service-card {
        transition: all 0.3s ease;
    }
    
    .feature-item {
        transition: all 0.3s ease;
    }
    
    .testimonial-card {
        transition: all 0.3s ease;
    }
    
    .post-list a {
        transition: all 0.3s ease;
    }
    
    .learn-more {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(additionalStyles);
