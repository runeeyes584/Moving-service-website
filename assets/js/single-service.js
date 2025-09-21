// Single Service Page Specific JavaScript

// Mock data for different services
const serviceData = {
    'local-moving': {
        title: 'Local Moving Services',
        subtitle: 'Our services include packing, loading, unloading, and unpacking—no matter where you\'re headed!',
        description: 'Professional local moving services within your city or metropolitan area. We handle everything from small apartments to large homes with care and efficiency.',
        heroImage: 'https://via.placeholder.com/1920x600/4CAF50/FFFFFF?text=Local+Moving+Services',
        features: [
            { icon: 'fas fa-truck', title: 'Same-Day Service', description: 'Quick and efficient local moves' },
            { icon: 'fas fa-box', title: 'Professional Packing', description: 'Expert packing and unpacking services' },
            { icon: 'fas fa-shield-alt', title: 'Full Insurance', description: 'Complete protection for your belongings' },
            { icon: 'fas fa-clock', title: 'Flexible Scheduling', description: 'Available 7 days a week' },
            { icon: 'fas fa-tools', title: 'Furniture Assembly', description: 'Disassembly and reassembly included' },
            { icon: 'fas fa-phone', title: '24/7 Support', description: 'Round-the-clock customer service' }
        ],
        process: [
            { number: 1, title: 'Free Consultation', description: 'We assess your moving needs and provide a detailed quote' },
            { number: 2, title: 'Packing & Preparation', description: 'Our team carefully packs and protects all your belongings' },
            { number: 3, title: 'Loading & Transport', description: 'Professional loading and safe transportation to your new location' },
            { number: 4, title: 'Unpacking & Setup', description: 'We unpack and arrange everything in your new home' }
        ],
        gallery: [
            'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Local+Moving+1',
            'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Local+Moving+2',
            'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Local+Moving+3',
            'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Local+Moving+4'
        ],
        pricing: [
            { label: 'Studio Apartment', value: '$299 - $499' },
            { label: '1-2 Bedroom', value: '$499 - $799' },
            { label: '3-4 Bedroom', value: '$799 - $1,299' },
            { label: 'Large Home', value: '$1,299+' }
        ],
        faq: [
            { question: 'How far in advance should I book?', answer: 'We recommend booking at least 2 weeks in advance, especially during peak moving seasons.' },
            { question: 'Do you provide packing materials?', answer: 'Yes, we provide all necessary packing materials including boxes, tape, and protective wrapping.' },
            { question: 'What if I need to reschedule?', answer: 'We offer flexible rescheduling with at least 24 hours notice at no additional charge.' },
            { question: 'Are you licensed and insured?', answer: 'Yes, we are fully licensed and insured to protect your belongings during the move.' }
        ],
        relatedServices: ['long-distance', 'storage', 'office']
    },
    'long-distance': {
        title: 'Long-Distance Moving Services',
        subtitle: 'Reliable cross-country moving services with professional handling and secure transportation.',
        description: 'Professional long-distance moving services across state lines. We ensure your belongings arrive safely and on time, no matter the distance.',
        heroImage: 'https://via.placeholder.com/1920x600/4CAF50/FFFFFF?text=Long+Distance+Moving',
        features: [
            { icon: 'fas fa-map-marked-alt', title: 'Nationwide Coverage', description: 'Moving services across all 50 states' },
            { icon: 'fas fa-truck', title: 'Dedicated Trucks', description: 'Your belongings travel in dedicated vehicles' },
            { icon: 'fas fa-warehouse', title: 'Secure Storage', description: 'Temporary storage options available' },
            { icon: 'fas fa-calendar', title: 'Flexible Dates', description: 'Choose your preferred moving dates' },
            { icon: 'fas fa-shield-alt', title: 'Full Coverage', description: 'Comprehensive insurance protection' },
            { icon: 'fas fa-phone', title: 'Tracking Support', description: 'Real-time updates on your move' }
        ],
        process: [
            { number: 1, title: 'Initial Consultation', description: 'Detailed assessment and custom moving plan' },
            { number: 2, title: 'Packing & Inventory', description: 'Professional packing with detailed inventory' },
            { number: 3, title: 'Secure Loading', description: 'Careful loading into climate-controlled trucks' },
            { number: 4, title: 'Transportation', description: 'Safe, monitored transportation to destination' },
            { number: 5, title: 'Delivery & Setup', description: 'Scheduled delivery and unpacking service' }
        ],
        gallery: [
            'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Long+Distance+1',
            'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Long+Distance+2',
            'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Long+Distance+3',
            'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Long+Distance+4'
        ],
        pricing: [
            { label: '1-2 Bedroom', value: '$1,500 - $2,500' },
            { label: '3-4 Bedroom', value: '$2,500 - $4,000' },
            { label: 'Large Home', value: '$4,000 - $6,000' },
            { label: 'Commercial', value: 'Custom Quote' }
        ],
        faq: [
            { question: 'How long does a long-distance move take?', answer: 'Typically 3-7 business days depending on distance and route.' },
            { question: 'Can I track my belongings?', answer: 'Yes, we provide real-time tracking updates throughout your move.' },
            { question: 'What if there are delays?', description: 'We maintain constant communication and provide updates on any delays.' },
            { question: 'Do you offer storage options?', answer: 'Yes, we provide secure storage facilities at both origin and destination.' }
        ],
        relatedServices: ['local-moving', 'storage', 'overseas']
    },
    'storage': {
        title: 'Storage Services',
        subtitle: 'Secure, climate-controlled storage solutions for your belongings.',
        description: 'Professional storage services with state-of-the-art facilities. Keep your belongings safe and secure with our comprehensive storage solutions.',
        heroImage: 'https://via.placeholder.com/1920x600/4CAF50/FFFFFF?text=Storage+Services',
        features: [
            { icon: 'fas fa-warehouse', title: 'Climate Control', description: 'Temperature and humidity controlled units' },
            { icon: 'fas fa-lock', title: '24/7 Security', description: 'Round-the-clock security monitoring' },
            { icon: 'fas fa-key', title: 'Personal Access', description: 'Convenient access to your stored items' },
            { icon: 'fas fa-shield-alt', title: 'Full Insurance', description: 'Complete protection for stored items' },
            { icon: 'fas fa-truck', title: 'Pickup & Delivery', description: 'We can pick up and deliver your items' },
            { icon: 'fas fa-phone', title: 'Customer Support', description: 'Dedicated support for all your needs' }
        ],
        process: [
            { number: 1, title: 'Storage Assessment', description: 'We help you choose the right storage unit size' },
            { number: 2, title: 'Item Preparation', description: 'Professional packing and preparation for storage' },
            { number: 3, title: 'Secure Storage', description: 'Safe placement in climate-controlled facility' },
            { number: 4, title: 'Regular Monitoring', description: 'Ongoing security and condition monitoring' }
        ],
        gallery: [
            'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Storage+1',
            'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Storage+2',
            'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Storage+3',
            'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Storage+4'
        ],
        pricing: [
            { label: 'Small Unit (5x5)', value: '$50/month' },
            { label: 'Medium Unit (10x10)', value: '$100/month' },
            { label: 'Large Unit (10x20)', value: '$150/month' },
            { label: 'Extra Large (10x30)', value: '$200/month' }
        ],
        faq: [
            { question: 'What items can I store?', answer: 'Most household items, furniture, and personal belongings. Some restrictions apply.' },
            { question: 'How secure are the facilities?', answer: 'Our facilities have 24/7 security monitoring and controlled access.' },
            { question: 'Can I access my items anytime?', answer: 'Yes, with proper identification during facility hours.' },
            { question: 'What if I need to change my storage plan?', answer: 'We offer flexible plans that can be adjusted as needed.' }
        ],
        relatedServices: ['local-moving', 'long-distance', 'office']
    },
    'office': {
        title: 'Office Moving Services',
        subtitle: 'Professional commercial moving services for businesses of all sizes.',
        description: 'Specialized office moving services designed to minimize business disruption. We handle everything from small offices to large corporate relocations.',
        heroImage: 'https://via.placeholder.com/1920x600/4CAF50/FFFFFF?text=Office+Moving+Services',
        features: [
            { icon: 'fas fa-building', title: 'Business Focus', description: 'Designed to minimize business disruption' },
            { icon: 'fas fa-desktop', title: 'IT Equipment', description: 'Specialized handling of computers and electronics' },
            { icon: 'fas fa-clock', title: 'After Hours', description: 'Weekend and after-hours moving available' },
            { icon: 'fas fa-users', title: 'Team Coordination', description: 'Coordinated team for efficient moves' },
            { icon: 'fas fa-shield-alt', title: 'Confidentiality', description: 'Complete confidentiality and security' },
            { icon: 'fas fa-phone', title: 'Project Management', description: 'Dedicated project manager for your move' }
        ],
        process: [
            { number: 1, title: 'Business Assessment', description: 'Detailed evaluation of your office needs' },
            { number: 2, title: 'Planning & Coordination', description: 'Comprehensive move planning and scheduling' },
            { number: 3, title: 'Packing & Labeling', description: 'Systematic packing with clear labeling' },
            { number: 4, title: 'Transportation', description: 'Secure transport of all office equipment' },
            { number: 5, title: 'Setup & Installation', description: 'Complete setup in your new location' }
        ],
        gallery: [
            'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Office+Moving+1',
            'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Office+Moving+2',
            'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Office+Moving+3',
            'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Office+Moving+4'
        ],
        pricing: [
            { label: 'Small Office (1-10 people)', value: '$500 - $1,000' },
            { label: 'Medium Office (10-50 people)', value: '$1,000 - $3,000' },
            { label: 'Large Office (50+ people)', value: '$3,000+' },
            { label: 'Enterprise', value: 'Custom Quote' }
        ],
        faq: [
            { question: 'How do you minimize business disruption?', answer: 'We offer after-hours and weekend moves, plus efficient planning.' },
            { question: 'Do you handle IT equipment?', answer: 'Yes, we have specialized teams for computers and sensitive equipment.' },
            { question: 'Can you work around our schedule?', answer: 'Absolutely, we coordinate with your business hours and deadlines.' },
            { question: 'What about confidential documents?', answer: 'We maintain strict confidentiality and secure handling procedures.' }
        ],
        relatedServices: ['local-moving', 'long-distance', 'storage']
    },
    'overseas': {
        title: 'Overseas Moving Services',
        subtitle: 'International moving services with customs expertise and global reach.',
        description: 'Professional international moving services with customs clearance expertise. We handle all aspects of your overseas relocation.',
        heroImage: 'https://via.placeholder.com/1920x600/4CAF50/FFFFFF?text=Overseas+Moving+Services',
        features: [
            { icon: 'fas fa-globe', title: 'Global Network', description: 'Worldwide moving and storage network' },
            { icon: 'fas fa-passport', title: 'Customs Expertise', description: 'Full customs clearance assistance' },
            { icon: 'fas fa-ship', title: 'Ocean Freight', description: 'Secure ocean freight services' },
            { icon: 'fas fa-plane', title: 'Air Freight', description: 'Fast air freight for urgent items' },
            { icon: 'fas fa-file-alt', title: 'Documentation', description: 'Complete documentation handling' },
            { icon: 'fas fa-phone', title: '24/7 Support', description: 'Round-the-clock international support' }
        ],
        process: [
            { number: 1, title: 'International Assessment', description: 'Comprehensive evaluation of international requirements' },
            { number: 2, title: 'Customs Planning', description: 'Customs documentation and clearance planning' },
            { number: 3, title: 'Packing & Crating', description: 'International-grade packing and crating' },
            { number: 4, title: 'Transportation', description: 'Ocean or air freight to destination country' },
            { number: 5, title: 'Customs Clearance', description: 'Complete customs clearance at destination' },
            { number: 6, title: 'Final Delivery', description: 'Delivery and setup in your new country' }
        ],
        gallery: [
            'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Overseas+Moving+1',
            'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Overseas+Moving+2',
            'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Overseas+Moving+3',
            'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Overseas+Moving+4'
        ],
        pricing: [
            { label: 'Small Household', value: '$2,000 - $4,000' },
            { label: 'Medium Household', value: '$4,000 - $8,000' },
            { label: 'Large Household', value: '$8,000+' },
            { label: 'Commercial', value: 'Custom Quote' }
        ],
        faq: [
            { question: 'How long does an international move take?', answer: 'Typically 4-8 weeks depending on destination and shipping method.' },
            { question: 'Do you handle customs paperwork?', answer: 'Yes, we handle all customs documentation and clearance procedures.' },
            { question: 'What items are restricted?', answer: 'Each country has different restrictions. We provide detailed guidance.' },
            { question: 'Can I track my shipment?', answer: 'Yes, we provide tracking throughout the entire international journey.' }
        ],
        relatedServices: ['long-distance', 'storage', 'local-moving']
    },
    'box-delivery': {
        title: 'Box Delivery Services',
        subtitle: 'Convenient box delivery and pickup services for your moving needs.',
        description: 'Professional box delivery and pickup services. Get all the packing supplies you need delivered right to your door.',
        heroImage: 'https://via.placeholder.com/1920x600/4CAF50/FFFFFF?text=Box+Delivery+Services',
        features: [
            { icon: 'fas fa-box', title: 'Quality Boxes', description: 'High-quality moving boxes and supplies' },
            { icon: 'fas fa-truck', title: 'Free Delivery', description: 'Complimentary delivery to your location' },
            { icon: 'fas fa-undo', title: 'Pickup Service', description: 'We pick up unused boxes after your move' },
            { icon: 'fas fa-tags', title: 'Competitive Prices', description: 'Affordable pricing on all supplies' },
            { icon: 'fas fa-clock', title: 'Quick Delivery', description: 'Same-day or next-day delivery available' },
            { icon: 'fas fa-phone', title: 'Easy Ordering', description: 'Simple online ordering process' }
        ],
        process: [
            { number: 1, title: 'Order Online', description: 'Easy online ordering of boxes and supplies' },
            { number: 2, title: 'Free Delivery', description: 'Complimentary delivery to your location' },
            { number: 3, title: 'Pack Your Items', description: 'Use the supplies to pack your belongings' },
            { number: 4, title: 'Schedule Pickup', description: 'We pick up unused boxes after your move' }
        ],
        gallery: [
            'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Box+Delivery+1',
            'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Box+Delivery+2',
            'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Box+Delivery+3',
            'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Box+Delivery+4'
        ],
        pricing: [
            { label: 'Small Kit (10 boxes)', value: '$25' },
            { label: 'Medium Kit (25 boxes)', value: '$50' },
            { label: 'Large Kit (50 boxes)', value: '$90' },
            { label: 'Custom Order', value: 'Contact Us' }
        ],
        faq: [
            { question: 'How quickly can you deliver?', answer: 'We offer same-day or next-day delivery in most areas.' },
            { question: 'What if I order too many boxes?', answer: 'We pick up unused boxes for free after your move.' },
            { question: 'Do you provide packing materials?', answer: 'Yes, we provide tape, bubble wrap, and other supplies.' },
            { question: 'Is delivery really free?', answer: 'Yes, delivery is completely free with any box order.' }
        ],
        relatedServices: ['local-moving', 'storage', 'office']
    }
};

document.addEventListener('DOMContentLoaded', function() {
    initSingleServicePage();
    initServiceData();
    initQuoteForm();
    initFAQAccordion();
    initGallery();
});

// Initialize single service page
function initSingleServicePage() {
    // Add single service page specific styles
    const singleServiceStyles = document.createElement('link');
    singleServiceStyles.rel = 'stylesheet';
    singleServiceStyles.href = 'assets/css/single-service.css';
    document.head.appendChild(singleServiceStyles);
}

// Initialize service data based on URL parameter
function initServiceData() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceType = urlParams.get('service') || 'local-moving';
    
    const service = serviceData[serviceType];
    if (!service) {
        // Default to local moving if service not found
        const defaultService = serviceData['local-moving'];
        loadServiceData(defaultService);
        return;
    }
    
    loadServiceData(service);
}

// Load service data into the page
function loadServiceData(service) {
    // Update page title
    document.getElementById('page-title').textContent = `${service.title} - EazeMove Professional Moving Services`;
    
    // Update hero section
    document.getElementById('service-title').textContent = service.title;
    document.getElementById('service-subtitle').textContent = service.subtitle;
    document.getElementById('service-breadcrumb').textContent = service.title.toUpperCase();
    
    // Update hero background
    const heroSection = document.getElementById('service-hero');
    heroSection.style.backgroundImage = `linear-gradient(rgba(26, 26, 46, 0.7), rgba(26, 26, 46, 0.7)), url('${service.heroImage}')`;
    
    // Update main content
    document.getElementById('service-main-title').textContent = service.title;
    document.getElementById('service-description').textContent = service.description;
    
    // Update features
    updateFeatures(service.features);
    
    // Update process
    updateProcess(service.process);
    
    // Update gallery
    updateGallery(service.gallery);
    
    // Update pricing
    updatePricing(service.pricing);
    
    // Update FAQ
    updateFAQ(service.faq);
    
    // Update related services
    updateRelatedServices(service.relatedServices);
    
    // Update service type select
    updateServiceTypeSelect();
}

// Update features section
function updateFeatures(features) {
    const featuresContainer = document.getElementById('service-features');
    featuresContainer.innerHTML = '';
    
    features.forEach(feature => {
        const featureElement = document.createElement('div');
        featureElement.className = 'feature-item';
        featureElement.innerHTML = `
            <i class="${feature.icon}"></i>
            <div>
                <h4>${feature.title}</h4>
                <p>${feature.description}</p>
            </div>
        `;
        featuresContainer.appendChild(featureElement);
    });
}

// Update process section
function updateProcess(process) {
    const processContainer = document.getElementById('process-steps');
    processContainer.innerHTML = '';
    
    process.forEach(step => {
        const stepElement = document.createElement('div');
        stepElement.className = 'process-step';
        stepElement.innerHTML = `
            <div class="step-number">${step.number}</div>
            <div class="step-content">
                <h4>${step.title}</h4>
                <p>${step.description}</p>
            </div>
        `;
        processContainer.appendChild(stepElement);
    });
}

// Update gallery section
function updateGallery(gallery) {
    const galleryContainer = document.getElementById('service-gallery');
    galleryContainer.innerHTML = '';
    
    gallery.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${image}" alt="Service Gallery ${index + 1}">
            <div class="gallery-overlay">
                <i class="fas fa-search-plus"></i>
            </div>
        `;
        galleryContainer.appendChild(galleryItem);
    });
}

// Update pricing section
function updatePricing(pricing) {
    const pricingContainer = document.getElementById('pricing-info');
    pricingContainer.innerHTML = '';
    
    pricing.forEach(item => {
        const pricingElement = document.createElement('div');
        pricingElement.className = 'pricing-item';
        pricingElement.innerHTML = `
            <span class="label">${item.label}</span>
            <span class="value">${item.value}</span>
        `;
        pricingContainer.appendChild(pricingElement);
    });
}

// Update FAQ section
function updateFAQ(faq) {
    const faqContainer = document.getElementById('service-faq');
    faqContainer.innerHTML = '';
    
    faq.forEach((item, index) => {
        const faqElement = document.createElement('div');
        faqElement.className = 'accordion-item';
        if (index === 0) faqElement.classList.add('active');
        
        faqElement.innerHTML = `
            <div class="accordion-header">
                <h3>${item.question}</h3>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="accordion-content">
                <p>${item.answer}</p>
            </div>
        `;
        faqContainer.appendChild(faqElement);
    });
}

// Update related services
function updateRelatedServices(relatedServices) {
    const relatedContainer = document.getElementById('related-services');
    relatedContainer.innerHTML = '';
    
    relatedServices.forEach(serviceType => {
        const service = serviceData[serviceType];
        if (service) {
            const serviceElement = document.createElement('li');
            serviceElement.innerHTML = `
                <a href="single-service.html?service=${serviceType}">
                    <i class="fas fa-chevron-right"></i>
                    ${service.title}
                </a>
            `;
            relatedContainer.appendChild(serviceElement);
        }
    });
}

// Update service type select
function updateServiceTypeSelect() {
    const select = document.getElementById('service-type-select');
    select.innerHTML = '<option value="">Select Service</option>';
    
    Object.keys(serviceData).forEach(serviceType => {
        const service = serviceData[serviceType];
        const option = document.createElement('option');
        option.value = serviceType;
        option.textContent = service.title;
        select.appendChild(option);
    });
}

// Initialize quote form
function initQuoteForm() {
    const form = document.getElementById('quick-quote-form');
    if (form) {
        form.addEventListener('submit', handleQuoteSubmission);
    }
}

// Handle quote form submission
function handleQuoteSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Show loading
    showLoading();
    
    // Simulate form submission
    setTimeout(() => {
        hideLoading();
        showNotification('Thank you! We will contact you within 24 hours with your personalized quote.', 'success');
        e.target.reset();
    }, 2000);
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

// Initialize gallery
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            showImageModal(img.src, img.alt);
        });
    });
}

// Show image modal
function showImageModal(src, alt) {
    const modalHTML = `
        <div class="modal" id="imageModal">
            <div class="modal-content image-modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">${alt}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <img src="${src}" alt="${alt}" style="width: 100%; max-height: 70vh; object-fit: contain;">
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('imageModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = document.getElementById('imageModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add event listeners
    const closeButtons = modal.querySelectorAll('.modal-close');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', closeImageModal);
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeImageModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeImageModal();
        }
    });
}

// Close image modal
function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Add CSS for image modal
const imageModalStyles = document.createElement('style');
imageModalStyles.textContent = `
    .image-modal-content {
        max-width: 90vw;
        max-height: 90vh;
    }
    
    .image-modal-content .modal-body {
        padding: 0;
        text-align: center;
    }
    
    .gallery-item {
        cursor: pointer;
        transition: transform 0.3s ease;
    }
    
    .gallery-item:hover {
        transform: scale(1.05);
    }
    
    .gallery-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .gallery-item:hover .gallery-overlay {
        opacity: 1;
    }
    
    .gallery-overlay i {
        color: white;
        font-size: 2rem;
    }
`;
document.head.appendChild(imageModalStyles);
