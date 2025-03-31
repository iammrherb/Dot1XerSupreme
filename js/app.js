// Dot1Xer Supreme - Main JavaScript

// Current step in the configurator
let currentStep = 1;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("Application initializing...");
    initAccordions();
    initTabs();
    initVendorOptions();
    initNetworkScopingOptions();
    setupAuthMethodOptions();
    setupAPIIntegrations();
    setupPortnoxIntegration();
    
    // Show the first tab by default
    const firstTabBtn = document.querySelector('.tab-btn');
    if (firstTabBtn) firstTabBtn.click();
    
    // Show the first discovery tab by default
    const firstDiscoveryTab = document.querySelector('.discovery-tab');
    if (firstDiscoveryTab) firstDiscoveryTab.click();
});

// Initialize accordion functionality
function initAccordions() {
    console.log("Initializing accordions...");
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
                const icon = this.querySelector('.accordion-icon');
                if (icon) icon.textContent = '+';
            } else {
                content.style.display = 'block';
                const icon = this.querySelector('.accordion-icon');
                if (icon) icon.textContent = '-';
            }
            console.log(`Accordion ${this.textContent.trim()} toggled`);
        });
        // Auto-open first accordion in each group
        const accordionGroup = header.closest('.accordion-group');
        if (accordionGroup && accordionGroup.querySelectorAll('.accordion-header')[0] === header) {
            setTimeout(() => header.click(), 100);
        }
    });
}

// Initialize tab functionality
function initTabs() {
    console.log("Initializing tabs...");
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            showTab(tabName, this);
            console.log(`Tab switched to: ${tabName}`);
        });
    });
    document.querySelectorAll('.discovery-tab').forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            showDiscoveryTab(tabName, this);
            console.log(`Discovery tab switched to: ${tabName}`);
        });
    });
    document.querySelectorAll('.portnox-nav-tab').forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            showPortnoxTab(tabName, this);
            console.log(`Portnox tab switched to: ${tabName}`);
        });
    });
}

// Show a specific tab
function showTab(tabName, button) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) selectedTab.style.display = 'block';
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    if (button) button.classList.add('active');
}

// Show a specific discovery tab
function showDiscoveryTab(tabName, button) {
    document.querySelectorAll('.discovery-section').forEach(section => section.style.display = 'none');
    const selectedSection = document.getElementById('disc-' + tabName);
    if (selectedSection) selectedSection.style.display = 'block';
    document.querySelectorAll('.discovery-tab').forEach(btn => btn.classList.remove('active'));
    if (button) button.classList.add('active');
}

// Show a specific Portnox tab
function showPortnoxTab(tabName, button) {
    document.querySelectorAll('.portnox-content').forEach(section => section.style.display = 'none');
    const selectedSection = document.getElementById('portnox-' + tabName);
    if (selectedSection) selectedSection.style.display = 'block';
    document.querySelectorAll('.portnox-nav-tab').forEach(btn => btn.classList.remove('active'));
    if (button) button.classList.add('active');
}

// Initialize vendor options
function initVendorOptions() {
    console.log("Initializing vendor options...");
    const vendorSelect = document.getElementById('vendor-select');
    if (vendorSelect) {
        vendorSelect.addEventListener('change', updatePlatformOptions);
        updatePlatformOptions();
    }
}

// Update platform options based on vendor selection
function updatePlatformOptions() {
    const vendorSelect = document.getElementById('vendor-select');
    const platformSelect = document.getElementById('platform-select');
    const platformDescription = document.getElementById('platform-description');
    if (!vendorSelect || !platformSelect || !platformDescription) return;

    platformSelect.innerHTML = '';
    const vendor = vendorSelect.value;
    console.log(`Vendor selected: ${vendor}`);

    switch (vendor) {
        case 'cisco':
            addOption(platformSelect, 'ios-xe', 'IOS-XE (Catalyst 9000)');
            addOption(platformSelect, 'ios', 'IOS (Classic)');
            addOption(platformSelect, 'nx-os', 'NX-OS (Nexus)');
            addOption(platformSelect, 'wlc', 'WLC 9800');
            platformDescription.innerHTML = '<p>Cisco platforms support a wide range of authentication methods.</p>';
            break;
        case 'aruba':
            addOption(platformSelect, 'aos-cx', 'AOS-CX');
            addOption(platformSelect, 'aos-switch', 'AOS-Switch (Legacy)');
            platformDescription.innerHTML = '<p>Aruba platforms provide robust authentication capabilities.</p>';
            break;
        case 'portnox':
            addOption(platformSelect, 'cloud', 'Portnox Cloud');
            platformDescription.innerHTML = '<p>Portnox Cloud provides unified access control with zero trust.</p>';
            break;
        default:
            addOption(platformSelect, '', 'Select a platform');
            platformDescription.innerHTML = '<p>Please select a vendor to see platform details.</p>';
    }
}

// Helper function to add options to a select element
function addOption(selectElement, value, text) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    selectElement.appendChild(option);
}

// Initialize network scoping options (placeholder)
function initNetworkScopingOptions() {
    console.log("Initializing network scoping options...");
    // Add logic for network scoping if needed
}

// Setup authentication method options (placeholder)
function setupAuthMethodOptions() {
    console.log("Setting up authentication methods...");
    // Add logic for auth methods if needed
}

// Setup API integrations (placeholder)
function setupAPIIntegrations() {
    console.log("Setting up API integrations...");
    // Add API integration logic if needed
}

// Setup Portnox Cloud integration
function setupPortnoxIntegration() {
    console.log("Setting up Portnox Cloud integration...");
    const portnoxForm = document.getElementById('portnox-config-form');
    if (portnoxForm) {
        portnoxForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert("Portnox Cloud integration submitted successfully!");
            console.log("Portnox configuration submitted");
        });
    }
}
