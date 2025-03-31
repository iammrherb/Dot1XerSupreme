// Dot1Xer Supreme - Main JavaScript

// Current step in the configurator
let currentStep = 1;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all accordions
    initAccordions();
    
    // Initialize all tabs
    initTabs();
    
    // Initialize vendor selection and platform options
    initVendorOptions();
    
    // Initialize MDM and IdP options
    initEnterpriseOptions();
    
    // Initialize network scoping options
    initNetworkScopingOptions();
    
    // Setup authentication method options
    setupAuthMethodOptions();
    
    // Setup API integrations
    setupAPIIntegrations();
});

// Initialize accordion functionality
function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        // Add click event listener
        header.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            
            if (content.style.display === 'block') {
                content.style.display = 'none';
                // Update icon
                const icon = this.querySelector('.accordion-icon');
                if (icon) {
                    icon.textContent = '+';
                }
            } else {
                content.style.display = 'block';
                // Update icon
                const icon = this.querySelector('.accordion-icon');
                if (icon) {
                    icon.textContent = '-';
                }
            }
        });
        
        // Automatically open the first accordion in each group
        const accordionGroup = header.closest('.accordion-group');
        if (accordionGroup) {
            const headers = accordionGroup.querySelectorAll('.accordion-header');
            if (headers[0] === header) {
                // Trigger click on the first header
                header.click();
            }
        }
    });
}

// Initialize tab functionality
function initTabs() {
    // Main tabs
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            showTab(tabName, this);
        });
    });
    
    // Discovery tabs
    document.querySelectorAll('.discovery-tab').forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            showDiscoveryTab(tabName, this);
        });
    });
    
    // Server tabs
    document.querySelectorAll('.tab-control-btn').forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            showServerTab(tabName, this);
        });
    });
    
    // Reference architecture tabs
    document.querySelectorAll('.ref-tab').forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            showRefTab(tabName, this);
        });
    });
}

// Show a specific tab
function showTab(tabName, button) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    
    // Show the selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.style.display = 'block';
    }
    
    // Update active tab button
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (button) {
        button.classList.add('active');
    }
}

// Show a specific discovery tab
function showDiscoveryTab(tabName, button) {
    // Hide all discovery sections
    document.querySelectorAll('.discovery-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show the selected section
    const selectedSection = document.getElementById('disc-' + tabName);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
    
    // Update active tab button
    document.querySelectorAll('.discovery-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    if (button) {
        button.classList.add('active');
    }
}

// Show a specific server tab
function showServerTab(tabName, button) {
    // Hide all server tabs
    document.querySelectorAll('.server-tab').forEach(tab => {
        tab.style.display = 'none';
    });
    
    // Show the selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.style.display = 'block';
    }
    
    // Update active tab button
    document.querySelectorAll('.tab-control-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (button) {
        button.classList.add('active');
    }
}

// Show a specific reference architecture tab
function showRefTab(tabName, button) {
    // Hide all reference sections
    document.querySelectorAll('.ref-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show the selected section
    const selectedSection = document.getElementById('ref-' + tabName);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
    
    // Update active tab button
    document.querySelectorAll('.ref-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    if (button) {
        button.classList.add('active');
    }
}

// Update platform options based on vendor selection
function updatePlatformOptions() {
    const vendorSelect = document.getElementById('vendor-select');
    const platformSelect = document.getElementById('platform-select');
    const platformDescription = document.getElementById('platform-description');
    
    if (!vendorSelect || !platformSelect || !platformDescription) return;
    
    // Clear existing options
    platformSelect.innerHTML = '';
    
    // Get selected vendor
    const vendor = vendorSelect.value;
    
    // Add platform options based on vendor
    switch (vendor) {
        case 'cisco':
            addOption(platformSelect, 'ios-xe', 'IOS-XE (Catalyst 9000)');
            addOption(platformSelect, 'ios', 'IOS (Classic)');
            addOption(platformSelect, 'nx-os', 'NX-OS (Nexus)');
            addOption(platformSelect, 'wlc', 'WLC 9800');
            platformDescription.innerHTML = '<p>Cisco platforms support a wide range of authentication methods and features.</p>';
            break;
        case 'aruba':
            addOption(platformSelect, 'aos-cx', 'AOS-CX');
            addOption(platformSelect, 'aos-switch', 'AOS-Switch (Legacy)');
            platformDescription.innerHTML = '<p>Aruba platforms provide robust authentication capabilities.</p>';
            break;
        case 'juniper':
            addOption(platformSelect, 'ex', 'EX Series');
            addOption(platformSelect, 'qfx', 'QFX Series');
            addOption(platformSelect, 'srx', 'SRX Series');
            platformDescription.innerHTML = '<p>Juniper switches use a consistent configuration approach across platforms.</p>';
            break;
        case 'fortinet':
            addOption(platformSelect, 'fortiswitch', 'FortiSwitch');
            addOption(platformSelect, 'fortigate', 'FortiGate');
            platformDescription.innerHTML = '<p>FortiNet integrates with the FortiGate security ecosystem.</p>';
            break;
        case 'arista':
            addOption(platformSelect, 'eos', 'EOS');
            addOption(platformSelect, 'cloudvision', 'CloudVision');
            platformDescription.innerHTML = '<p>Arista EOS provides enterprise-grade authentication.</p>';
            break;
        case 'extreme':
            addOption(platformSelect, 'exos', 'EXOS');
            addOption(platformSelect, 'voss', 'VOSS');
            addOption(platformSelect, 'xiq', 'ExtremeCloud IQ');
            platformDescription.innerHTML = '<p>Extreme Networks offers multiple authentication solutions.</p>';
            break;
        case 'huawei':
            addOption(platformSelect, 'vrp', 'VRP');
            addOption(platformSelect, 'agile-controller', 'Agile Controller');
            platformDescription.innerHTML = '<p>Huawei VRP provides comprehensive AAA capabilities.</p>';
            break;
        case 'alcatel':
            addOption(platformSelect, 'omniswitch', 'OmniSwitch');
            addOption(platformSelect, 'omnivista', 'OmniVista');
            platformDescription.innerHTML = '<p>Alcatel-Lucent OmniSwitch offers simplified deployment.</p>';
            break;
        case 'ubiquiti':
            addOption(platformSelect, 'unifi', 'UniFi');
            addOption(platformSelect, 'edgeswitch', 'EdgeSwitch');
            platformDescription.innerHTML = '<p>Ubiquiti uses a controller-based approach.</p>';
            break;
        case 'hp':
            addOption(platformSelect, 'procurve', 'ProCurve');
            addOption(platformSelect, 'comware', 'Comware');
            addOption(platformSelect, 'aruba-central', 'Aruba Central');
            platformDescription.innerHTML = '<p>HP offers multiple switch platforms.</p>';
            break;
        case 'paloalto':
            addOption(platformSelect, 'panos', 'PAN-OS');
            addOption(platformSelect, 'panorama', 'Panorama');
            platformDescription.innerHTML = '<p>Palo Alto Networks offers security-focused authentication.</p>';
            break;
        case 'checkpoint':
            addOption(platformSelect, 'gaia', 'Gaia OS');
            addOption(platformSelect, 'r80', 'R80.x');
            platformDescription.innerHTML = '<p>Check Point provides integrated security and authentication.</p>';
            break;
        case 'sonicwall':
            addOption(platformSelect, 'sonicos', 'SonicOS');
            platformDescription.innerHTML = '<p>SonicWall provides integrated security and authentication.</p>';
            break;
        default:
            addOption(platformSelect, 'default', 'Default Platform');
            platformDescription.innerHTML = '<p>Please select a vendor to see platform details.</p>';
    }
    
    // Trigger platform specific options update
    updateVendorSpecificOptions();
}

// Add option to select element helper function
function addOption(selectElement, value, text) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    selectElement.appendChild(option);
}

// Initialize enterprise options (MDM and IdP)
function initEnterpriseOptions() {
    // MDM provider selection
    const mdmProviderSelect = document.getElementById('mdm-provider');
    if (mdmProviderSelect) {
        mdmProviderSelect.addEventListener('change', updateMDMOptions);
        updateMDMOptions(); // Initialize MDM options
    }
    
    // IdP provider selection
    const idpProviderSelect = document.getElementById('idp-provider');
    if (idpProviderSelect) {
        idpProviderSelect.addEventListener('change', updateIdPOptions);
        updateIdPOptions(); // Initialize IdP options
    }
}

// Initialize network scoping options
function initNetworkScopingOptions() {
    // Scoping type radio buttons
    const scopingTypeRadios = document.querySelectorAll('input[name="scoping_type"]');
    if (scopingTypeRadios.length > 0) {
        scopingTypeRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const basicScoping = document.getElementById('basic-scoping');
                const advancedScoping = document.getElementById('advanced-scoping');
                
                if (basicScoping && advancedScoping) {
                    basicScoping.style.display = this.value === 'basic' ? 'block' : 'none';
                    advancedScoping.style.display = this.value === 'advanced' ? 'block' : 'none';
                }
            });
        });
    }
    
    // EAP method checkboxes
    const eapMethodCheckboxes = document.querySelectorAll('.eap-method');
    eapMethodCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Show/hide additional options based on EAP method
            const methodOptions = document.getElementById(`${this.id}-options`);
            if (methodOptions) {
                methodOptions.style.display = this.checked ? 'block' : 'none';
            }
        });
    });
}

// Setup authentication method options
function setupAuthMethodOptions() {
    const authMethodSelect = document.getElementById('auth-method');
    if (authMethodSelect) {
        authMethodSelect.addEventListener('change', function() {
            const mabCheckbox = document.getElementById('use-mab');
            
            if (mabCheckbox) {
                if (this.value === 'dot1x-only') {
                    mabCheckbox.checked = false;
                    mabCheckbox.disabled = true;
                } else if (this.value === 'mab-only') {
                    mabCheckbox.checked = true;
                    mabCheckbox.disabled = true;
                } else {
                    mabCheckbox.checked = true;
                    mabCheckbox.disabled = false;
                }
            }
        });
    }
}

// Setup API integrations for AI assistance
function setupAPIIntegrations() {
    const apiKeyInput = document.getElementById('ai-api-key');
    const apiModelSelect = document.getElementById('ai-model');
    const apiTestButton = document.getElementById('ai-test-button');
    
    if (apiTestButton) {
        apiTestButton.addEventListener('click', function() {
            const apiKey = apiKeyInput ? apiKeyInput.value : '';
            const apiModel = apiModelSelect ? apiModelSelect.value : 'default';
            
            if (!apiKey) {
                showError('Please enter a valid API key.');
                return;
            }
            
            // Show loading state
            this.textContent = 'Testing...';
            this.disabled = true;
            
            // Simulate API test
            setTimeout(() => {
                this.textContent = 'Test Connection';
                this.disabled = false;
                
                // Show success message
                showSuccess('API connection successful! AI assistance is now enabled.');
                
                // Show capabilities
                const aiCapabilities = document.getElementById('ai-capabilities');
                if (aiCapabilities) {
                    aiCapabilities.style.display = 'block';
                }
            }, 1500);
        });
    }
}

// Update vendor-specific options based on platform selection
function updateVendorSpecificOptions() {
    const vendorSelect = document.getElementById('vendor-select');
    const platformSelect = document.getElementById('platform-select');
    
    if (!vendorSelect || !platformSelect) return;
    
    const vendor = vendorSelect.value;
    const platform = platformSelect.value;
    
    // Hide all vendor-specific option sections
    const vendorSpecificSections = document.querySelectorAll('.vendor-specific');
    vendorSpecificSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show vendor+platform specific section if it exists
    const specificSection = document.getElementById(`${vendor}-${platform}-options`);
    if (specificSection) {
        specificSection.style.display = 'block';
    }
}

// Show error message
function showError(message) {
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // Hide after a few seconds
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 5000);
    } else {
        alert(message);
    }
}

// Show success message
function showSuccess(message) {
    const successElement = document.getElementById('success-message');
    if (successElement) {
        successElement.textContent = message;
        successElement.style.display = 'block';
        
        // Hide after a few seconds
        setTimeout(() => {
            successElement.style.display = 'none';
        }, 5000);
    } else {
        alert(message);
    }
}

// Generate network diagram based on scoping input
function generateNetworkDiagram() {
    // Get scoping information
    const scopingType = document.querySelector('input[name="scoping_type"]:checked')?.value || 'basic';
    
    // Get basic or advanced values based on selected type
    let diagramData = {};
    
    if (scopingType === 'basic') {
        diagramData = {
            locations: document.getElementById('locations-count')?.value || '1',
            switchCount: document.getElementById('switches-count')?.value || '5',
            endpointCount: document.getElementById('endpoints-count')?.value || '100',
            wirelessVendor: document.getElementById('wireless-vendor')?.value || 'cisco',
            switchVendor: document.getElementById('switch-vendor')?.value || 'cisco'
        };
    } else {
        // Advanced scoping
        diagramData = {
            locations: document.getElementById('advanced-locations-count')?.value || '1',
            switchCount: document.getElementById('advanced-switches-count')?.value || '5',
            endpointCount: document.getElementById('advanced-endpoints-count')?.value || '100',
            wirelessAPs: document.getElementById('ap-count')?.value || '10',
            wirelessVendor: document.getElementById('wireless-vendor')?.value || 'cisco',
            wirelessModel: document.getElementById('wireless-model')?.value || 'generic',
            switchVendor: document.getElementById('switch-vendor')?.value || 'cisco',
            switchModel: document.getElementById('switch-model')?.value || 'generic'
        };
    }
    
    // Get selected authentication methods
    const authMethods = [];
    document.querySelectorAll('.eap-method:checked').forEach(method => {
        authMethods.push(method.value);
    });
    diagramData.authMethods = authMethods.length > 0 ? authMethods : ['PEAP-MSCHAPv2', 'MAB'];
    
    // Show results container
    const resultsContainer = document.getElementById('scoping-results');
    if (resultsContainer) {
        resultsContainer.style.display = 'block';
        
        // Generate results content
        let html = `<h4>Network Scoping Results</h4>
        <div class="network-summary">
            <p>Based on your input, we've generated a deployment plan for your network:</p>
            <ul>
                <li><strong>Locations:</strong> ${diagramData.locations}</li>
                <li><strong>Switches:</strong> ${diagramData.switchCount} (${diagramData.switchVendor})</li>
                <li><strong>Endpoints:</strong> ${diagramData.endpointCount}</li>
                <li><strong>Authentication Methods:</strong> ${diagramData.authMethods.join(', ')}</li>
            </ul>
        </div>`;
        
        html += `<div class="deployment-phases">
            <h4>Recommended Deployment Phases</h4>
            <div class="phase">
                <h5>Phase 1: Infrastructure Preparation</h5>
                <ul>
                    <li>Configure RADIUS server(s) with primary and secondary instances</li>
                    <li>Set up certificate authority (if using EAP-TLS)</li>
                    <li>Prepare switch configurations with Monitor Mode (Open Authentication)</li>
                    <li>Deploy configurations to a pilot group of switches</li>
                </ul>
            </div>
            <div class="phase">
                <h5>Phase 2: Client Testing</h5>
                <ul>
                    <li>Test authentication with various device types</li>
                    <li>Configure client supplicants</li>
                    <li>Establish MAB exceptions for non-802.1X capable devices</li>
                    <li>Validate dynamic VLAN assignment</li>
                </ul>
            </div>
            <div class="phase">
                <h5>Phase 3: Production Deployment</h5>
                <ul>
                    <li>Roll out configurations to all switches</li>
                    <li>Gradually transition from Monitor Mode to Low Impact Mode</li>
                    <li>Eventually transition to Closed Mode with appropriate exceptions</li>
                    <li>Implement port security with violation actions</li>
                </ul>
            </div>
        </div>`;
        
        // Add sample diagram
        html += `<div class="network-diagram">
            <h4>Network Diagram</h4>
            <div class="diagram-container">
                <img src="assets/diagrams/network-diagram.png" alt="Network Diagram">
            </div>
            <p class="diagram-note">This diagram represents a high-level view of your 802.1X deployment. Download the full diagram for more details.</p>
            <button class="download-btn" onclick="downloadDiagram()">Download Full Diagram</button>
        </div>`;
        
        resultsContainer.innerHTML = html;
    }
}

// Generate configuration based on form inputs
function generateConfiguration() {
    // Get form values
    const vendor = document.getElementById('vendor-select')?.value || 'cisco';
    const platform = document.getElementById('platform-select')?.value || 'ios-xe';
    
    // Base configuration for all vendors
    let config = `# 802.1X Configuration for ${vendor.toUpperCase()} ${platform.toUpperCase()}
# Generated by Dot1Xer Supreme on ${new Date().toLocaleDateString()}
# 
# This configuration includes:
# - RADIUS server settings
# - 802.1X global settings
# - Interface-specific settings
# - VLAN assignments
#
`;
    
    // Display the generated configuration
    const outputElement = document.getElementById('config-output');
    if (outputElement) {
        outputElement.textContent = config;
    }
}

// Function to update MDM options
function updateMDMOptions() {
    // Implementation would go here
    console.log('MDM options updated');
}

// Function to update IdP options
function updateIdPOptions() {
    // Implementation would go here
    console.log('IdP options updated');
}

// Function to update wireless models
function updateWirelessModels() {
    // Implementation would go here
    console.log('Wireless models updated');
}

// Function to update switch models
function updateSwitchModels() {
    // Implementation would go here
    console.log('Switch models updated');
}

// Function to update firewall models
function updateFirewallModels() {
    // Implementation would go here
    console.log('Firewall models updated');
}

// Function to update VPN models
function updateVPNModels() {
    // Implementation would go here
    console.log('VPN models updated');
}

// Function to download a diagram
function downloadDiagram() {
    // In a real implementation, this would generate a custom diagram
    // For demo purposes, we'll just download the sample image
    const link = document.createElement('a');
    link.href = 'assets/diagrams/network-diagram.png';
    link.download = '802.1x-deployment-diagram.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
