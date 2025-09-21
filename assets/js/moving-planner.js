// Moving Planner Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initMovingPlanner();
    initChecklistInteractions();
    initDownloadModal();
    initScrollAnimations();
});

// Initialize moving planner page
function initMovingPlanner() {
    // Add moving planner specific styles
    const plannerStyles = document.createElement('link');
    plannerStyles.rel = 'stylesheet';
    plannerStyles.href = 'assets/css/moving-planner.css';
    document.head.appendChild(plannerStyles);
    
    // Initialize timeline interactions
    initTimelineInteractions();
    
    // Initialize checklist functionality
    initChecklistFunctionality();
}

// Initialize timeline interactions
function initTimelineInteractions() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Add scroll animations
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
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Initialize checklist interactions
function initChecklistInteractions() {
    const checklistItems = document.querySelectorAll('.checklist li');
    
    checklistItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('completed');
            
            // Add visual feedback
            if (this.classList.contains('completed')) {
                this.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            }
            
            // Update progress
            updateProgress();
        });
    });
}

// Initialize download modal
function initDownloadModal() {
    const downloadBtn = document.querySelector('.download-btn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showDownloadModal();
        });
    }
}

// Show download modal
function showDownloadModal() {
    const modalHTML = `
        <div class="checklist-modal" id="checklistModal">
            <div class="checklist-modal-content">
                <div class="checklist-modal-header">
                    <h3>Download Moving Checklist</h3>
                    <p>Choose the format that works best for you</p>
                </div>
                <div class="checklist-options">
                    <div class="checklist-option" data-format="pdf">
                        <i class="fas fa-file-pdf"></i>
                        <h4>PDF Format</h4>
                        <p>Printable checklist</p>
                    </div>
                    <div class="checklist-option" data-format="excel">
                        <i class="fas fa-file-excel"></i>
                        <h4>Excel Format</h4>
                        <p>Editable spreadsheet</p>
                    </div>
                    <div class="checklist-option" data-format="word">
                        <i class="fas fa-file-word"></i>
                        <h4>Word Format</h4>
                        <p>Editable document</p>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn btn-secondary" id="cancelDownload">Cancel</button>
                    <button class="btn btn-primary" id="downloadChecklist" disabled>Download</button>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('checklistModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = document.getElementById('checklistModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add event listeners
    const options = modal.querySelectorAll('.checklist-option');
    const cancelBtn = document.getElementById('cancelDownload');
    const downloadBtn = document.getElementById('downloadChecklist');
    
    options.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            options.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Enable download button
            downloadBtn.disabled = false;
        });
    });
    
    cancelBtn.addEventListener('click', closeDownloadModal);
    downloadBtn.addEventListener('click', handleDownload);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeDownloadModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeDownloadModal();
        }
    });
}

// Handle download
function handleDownload() {
    const selectedOption = document.querySelector('.checklist-option.selected');
    if (!selectedOption) return;
    
    const format = selectedOption.dataset.format;
    
    // Show loading
    showLoading();
    
    // Simulate download
    setTimeout(() => {
        hideLoading();
        closeDownloadModal();
        
        // Create and download file
        downloadChecklistFile(format);
        
        showNotification(`Moving checklist downloaded successfully in ${format.toUpperCase()} format!`, 'success');
    }, 1500);
}

// Download checklist file
function downloadChecklistFile(format) {
    const checklistData = generateChecklistData();
    let content, filename, mimeType;
    
    switch (format) {
        case 'pdf':
            // For PDF, we'll create a simple text file that can be converted
            content = generateTextChecklist(checklistData);
            filename = 'moving-checklist.txt';
            mimeType = 'text/plain';
            break;
        case 'excel':
            content = generateCSVChecklist(checklistData);
            filename = 'moving-checklist.csv';
            mimeType = 'text/csv';
            break;
        case 'word':
            content = generateTextChecklist(checklistData);
            filename = 'moving-checklist.txt';
            mimeType = 'text/plain';
            break;
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Generate checklist data
function generateChecklistData() {
    return {
        '1 Month Before': [
            'Update your address with all institutions',
            'Transfer or cancel utilities',
            'Notify insurance companies',
            'Update driver\'s license and registration',
            'Forward mail to new address',
            'Research moving company costs',
            'Calculate packing supplies budget',
            'Plan for cleaning services',
            'Set aside emergency funds',
            'Consider storage costs if needed'
        ],
        '2 Weeks Before': [
            'Start with seasonal items',
            'Pack room by room systematically',
            'Use proper packing materials',
            'Label all boxes clearly',
            'Create an inventory list',
            'Wrap fragile items carefully',
            'Use bubble wrap for electronics',
            'Pack heavy items in small boxes',
            'Keep important documents separate',
            'Take photos of valuable items'
        ],
        'Move Out Day': [
            'Do a final walkthrough',
            'Check all rooms and closets',
            'Turn off all utilities',
            'Lock all doors and windows',
            'Hand over keys to landlord',
            'Be present during loading',
            'Check inventory list',
            'Note any damages',
            'Get contact information',
            'Confirm delivery time'
        ],
        'Move In Day': [
            'Start with essential items',
            'Set up bedrooms first',
            'Unpack kitchen essentials',
            'Arrange living room furniture',
            'Organize storage areas',
            'Update address everywhere',
            'Register with new utilities',
            'Explore the neighborhood',
            'Meet your neighbors',
            'Find local services'
        ]
    };
}

// Generate text checklist
function generateTextChecklist(data) {
    let content = 'EazeMove - Moving Checklist\n';
    content += '============================\n\n';
    
    Object.keys(data).forEach(phase => {
        content += `${phase}:\n`;
        content += '-'.repeat(phase.length + 1) + '\n';
        data[phase].forEach((item, index) => {
            content += `[ ] ${index + 1}. ${item}\n`;
        });
        content += '\n';
    });
    
    content += '\nGood luck with your move!\n';
    content += 'EazeMove - Making moving easy!\n';
    
    return content;
}

// Generate CSV checklist
function generateCSVChecklist(data) {
    let content = 'Phase,Item,Completed\n';
    
    Object.keys(data).forEach(phase => {
        data[phase].forEach(item => {
            content += `"${phase}","${item}","FALSE"\n`;
        });
    });
    
    return content;
}

// Close download modal
function closeDownloadModal() {
    const modal = document.getElementById('checklistModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Initialize checklist functionality
function initChecklistFunctionality() {
    // Add progress tracking
    updateProgress();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            showDownloadModal();
        }
    });
}

// Update progress
function updateProgress() {
    const sections = document.querySelectorAll('.timeline-section');
    
    sections.forEach(section => {
        const checklist = section.querySelector('.checklist');
        if (!checklist) return;
        
        const items = checklist.querySelectorAll('li');
        const completed = checklist.querySelectorAll('li.completed');
        const progress = (completed.length / items.length) * 100;
        
        // Add progress indicator if not exists
        let progressBar = section.querySelector('.progress-bar');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            progressBar.style.cssText = `
                width: 100%;
                height: 4px;
                background: #e0e0e0;
                border-radius: 2px;
                margin-top: 20px;
                overflow: hidden;
            `;
            
            const progressFill = document.createElement('div');
            progressFill.className = 'progress-fill';
            progressFill.style.cssText = `
                height: 100%;
                background: #4CAF50;
                width: ${progress}%;
                transition: width 0.3s ease;
            `;
            
            progressBar.appendChild(progressFill);
            checklist.appendChild(progressBar);
        } else {
            const progressFill = progressBar.querySelector('.progress-fill');
            progressFill.style.width = `${progress}%`;
        }
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.timeline-item, .preparation-content');
    
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

// Add CSS for additional animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 15px;
        margin-top: 30px;
    }
    
    .checklist-option {
        transition: all 0.3s ease;
    }
    
    .checklist-option:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    .checklist-option.selected {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
    }
    
    .progress-bar {
        position: relative;
    }
    
    .progress-fill {
        position: relative;
        overflow: hidden;
    }
    
    .progress-fill::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        animation: shimmer 2s infinite;
    }
    
    @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
    
    .checklist li {
        position: relative;
        overflow: hidden;
    }
    
    .checklist li::before {
        content: '';
        position: absolute;
        left: -100%;
        top: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(76, 175, 80, 0.1), transparent);
        transition: left 0.5s ease;
    }
    
    .checklist li.completed::before {
        left: 100%;
    }
    
    .timeline-item {
        position: relative;
    }
    
    .timeline-item::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, transparent 49%, rgba(76, 175, 80, 0.05) 50%, transparent 51%);
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .timeline-item:hover::after {
        opacity: 1;
    }
`;
document.head.appendChild(additionalStyles);
