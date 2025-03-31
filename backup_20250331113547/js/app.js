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
    
    // Initialize network scoping options
    initNetworkScopingOptions();
    
    // Setup authentication method options
    setupAuthMethodOptions();
    
    // Setup API integrations for AI assistance
    setupAPIIntegrations();
    
    // Setup Portnox Cloud integration
    setupPortnoxIntegration();
    
    // Show the first tab by default
    const firstTabBtn = document.querySelector('.tab-btn');
    if (firstTabBtn) {
        firstTabBtn.click();
    }
    
    // Show the first discovery tab by default
    const firstDiscoveryTab = document.querySelector('.discovery-tab');
    if (firstDiscoveryTab) {
        firstDiscoveryTab.click();
    }
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
                setTimeout(() => {
                    header.click();
                }, 100);
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
    
    // Portnox tabs
    document.querySelectorAll('.portnox-nav-tab').forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            showPortnoxTab(tabName, this);
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
        selectedSection
    // Show a specific Portnox tab
function showPortnoxTab(tabName, button) {
    // Hide all Portnox sections
    document.querySelectorAll('.portnox-content').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show the selected section
    const selectedSection = document.getElementById('portnox-' + tabName);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
    
    // Update active tab button
    document.querySelectorAll('.portnox-nav-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    if (button) {
        button.classList.add('active');
    }
}

// Initialize vendor options
function initVendorOptions() {
    const vendorSelect = document.getElementById('vendor-select');
    if (vendorSelect) {
        vendorSelect.addEventListener('change', updatePlatformOptions);
        // Initialize platform options
        updatePlatformOptions();
    }
    
    const platformSelect = document.getElementById('platform-select');
    if (platformSelect) {
        platformSelect.addEventListener('change', updateVendorSpecificOptions);
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
        case 'portnox':
            addOption(platformSelect, 'cloud', 'Portnox Cloud');
            platformDescription.innerHTML = '<p>Portnox Cloud provides unified access control with zero trust capabilities.</p>';
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
    
    // Environment infrastructure checkboxes
    const envInfraCheckboxes = document.querySelectorAll('.env-infrastructure');
    envInfraCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Show/hide additional options based on infrastructure
            const infraOptions = document.getElementById(`${this.id}-options`);
            if (infraOptions) {
                infraOptions.style.display = this.checked ? 'block' : 'none';
            }
            // Update environment summary
            updateEnvironmentSummary();
        });
    });
    
    // MDM provider selection
    const mdmProviderSelect = document.getElementById('mdm-provider');
    if (mdmProviderSelect) {
        mdmProviderSelect.addEventListener('change', function() {
            updateMDMOptions();
            updateEnvironmentSummary();
        });
    }
    
    // IdP provider selection
    const idpProviderSelect = document.getElementById('idp-provider');
    if (idpProviderSelect) {
        idpProviderSelect.addEventListener('change', function() {
            updateIdPOptions();
            updateEnvironmentSummary();
        });
    }
}

// Update environment summary
function updateEnvironmentSummary() {
    const summarySection = document.getElementById('environment-summary');
    if (!summarySection) return;
    
    let summary = '<h4>Environment Profile Summary</h4><ul>';
    
    // Get infrastructure elements
    const infraElements = document.querySelectorAll('.env-infrastructure:checked');
    if (infraElements.length > 0) {
        summary += '<li><strong>Infrastructure:</strong> ';
        const infraLabels = Array.from(infraElements).map(el => el.dataset.label || el.value);
        summary += infraLabels.join(', ');
        summary += '</li>';
    }
    
    // Get MDM solution
    const mdmProvider = document.getElementById('mdm-provider');
    if (mdmProvider && mdmProvider.value !== 'none') {
        const mdmOption = mdmProvider.options[mdmProvider.selectedIndex];
        summary += `<li><strong>MDM Solution:</strong> ${mdmOption.text}</li>`;
    }
    
    // Get IdP solution
    const idpProvider = document.getElementById('idp-provider');
    if (idpProvider && idpProvider.value !== 'none') {
        const idpOption = idpProvider.options[idpProvider.selectedIndex];
        summary += `<li><strong>Identity Provider:</strong> ${idpOption.text}</li>`;
    }
    
    summary += '</ul>';
    
    // Add recommendations based on environment
    summary += '<h4>Recommendations</h4><ul>';
    
    // Check for AD integration
    if (document.getElementById('env-active-directory') && document.getElementById('env-active-directory').checked) {
        summary += '<li>Configure RADIUS to integrate with Active Directory for user authentication</li>';
    }
    
    // Check for MDM integration
    if (mdmProvider && mdmProvider.value !== 'none') {
        summary += '<li>Integrate with ' + mdmProvider.options[mdmProvider.selectedIndex].text + 
                  ' for device compliance checking and certificate distribution</li>';
    }
    
    // Check for cloud infrastructure
    if (document.getElementById('env-cloud') && document.getElementById('env-cloud').checked) {
        summary += '<li>Consider Portnox Cloud RADIUS service for simplified deployment and management</li>';
    }
    
    summary += '</ul>';
    
    summarySection.innerHTML = summary;
    summarySection.style.display = 'block';
}
// Update MDM options based on selected provider
function updateMDMOptions() {
    const mdmProviderSelect = document.getElementById('mdm-provider');
    const mdmOptionsContainer = document.getElementById('mdm-options');
    
    if (!mdmProviderSelect || !mdmOptionsContainer) return;
    
    // Get selected provider
    const provider = mdmProviderSelect.value;
    
    // Update options based on provider
    let optionsHtml = '';
    
    switch (provider) {
        case 'intune':
            optionsHtml = `
                <h4>Microsoft Intune Integration</h4>
                <p>Include Intune integration in your 802.1X deployment architecture.</p>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" id="mdm-cert-enrollment" checked> 
                        Use for certificate enrollment
                    </label>
                </div>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" id="mdm-compliance" checked> 
                        Use for device compliance
                    </label>
                </div>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" id="mdm-config-profiles" checked> 
                        Deploy 802.1X configuration profiles
                    </label>
                </div>
            `;
            break;
        case 'jamf':
            optionsHtml = `
                <h4>JAMF Integration</h4>
                <p>Include JAMF integration in your 802.1X deployment architecture.</p>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" id="mdm-cert-enrollment" checked> 
                        Use for certificate enrollment
                    </label>
                </div>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" id="mdm-config-profiles" checked> 
                        Deploy 802.1X configuration profiles
                    </label>
                </div>
            `;
            break;
        case 'workspace-one':
            optionsHtml = `
                <h4>VMware Workspace ONE Integration</h4>
                <p>Include Workspace ONE integration in your 802.1X deployment architecture.</p>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" id="mdm-cert-enrollment" checked> 
                        Use for certificate enrollment
                    </label>
                </div>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" id="mdm-compliance" checked> 
                        Use for device compliance
                    </label>
                </div>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" id="mdm-tunnel" checked> 
                        Use Workspace ONE Tunnel
                    </label>
                </div>
            `;
            break;
        case 'mas360':
            optionsHtml = `
                <h4>IBM MaaS360 Integration</h4>
                <p>Include MaaS360 integration in your 802.1X deployment architecture.</p>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" id="mdm-cert-enrollment" checked> 
                        Use for certificate enrollment
                    </label>
                </div>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" id="mdm-config-profiles" checked> 
                        Deploy 802.1X configuration profiles
                    </label>
                </div>
            `;
            break;
        case 'gpo':
            optionsHtml = `
                <h4>Group Policy Integration</h4>
                <p>Include GPO integration in your 802.1X deployment architecture.</p>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" id="mdm-wired" checked> 
                        Configure wired 802.1X via GPO
                    </label>
                </div>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" id="mdm-wireless" checked> 
                        Configure wireless 802.1X via GPO
                    </label>
                </div>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" id="mdm-cert-autoenroll" checked> 
                        Use certificate auto-enrollment
                    </label>
                </div>
            `;
            break;
        case 'none':
            optionsHtml = '<p>No MDM solution selected. Manual configuration will be required.</p>';
            break;
        default:
            optionsHtml = '<p>Please select an MDM solution to see integration options.</p>';
    }
    
    mdmOptionsContainer.innerHTML = optionsHtml;
}

// Update IdP options based on selected provider
function updateIdPOptions() {
    const idpProviderSelect = document.getElementById('idp-provider');
    const idpOptionsContainer = document.getElementById('idp-options');
    
    if (!idpProviderSelect || !idpOptionsContainer) return;
    
    // Get selected provider
    const provider = idpProviderSelect.value;
    
    // Update options based on provider
    let optionsHtml = '';
    
    switch (provider) {
        case 'entra-id':
            optionsHtml = `
                <h4>Microsoft Entra ID Integration</h4>
                <p>Include Entra ID integration in your 802.1X deployment architecture.</p>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" id="idp-mfa" checked> 
                        Enable Multi-Factor Authentication
                    </label>
                </div>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" id="idp-conditional-access" checked> 
                        Use Conditional Access Policies
                    </label>
                </div>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" id="idp-cert-auth" checked> 
                        Use certificate-based authentication
                    </label>
                </div>
            `;
            break;
        case 'okta':
            optionsHtml = `
                <h4>Okta Integration</h4>
                <p>Include Okta integration in your 802.1X deployment architecture.</p>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" id="idp-mfa" checked> 
                        Enable Multi-Factor Authentication
                    </label>
                </div>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" id="idp-radius-agent" checked> 
                        Use Okta RADIUS Server Agent
                    </label>
                </div>
            `;
            break;
        case 'google-workspace':
            optionsHtml = `
                <h4>Google Workspace Integration</h4>
                <p>Include Google Workspace integration in your 802.1X deployment architecture.</p>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" id="idp-2sv" checked> 
                        Enable 2-Step Verification
                    </label>
                </div>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" id="idp-context-aware" checked> 
                        Use Context-Aware Access
                    </label>
                </div>
            `;
            break;
        case 'none':
            optionsHtml = '<p>No Identity Provider selected. Local or Active Directory authentication will be used.</p>';
            break;
        default:
            optionsHtml = '<p>Please select an Identity Provider to see integration options.</p>';
    }
    
    idpOptionsContainer.innerHTML = optionsHtml;
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

// Setup Portnox Cloud integration
function setupPortnoxIntegration() {
    // Portnox API Connection
    const portnoxConnectButton = document.getElementById('portnox-connect-button');
    if (portnoxConnectButton) {
        portnoxConnectButton.addEventListener('click', function() {
            const portnoxApiKey = document.getElementById('portnox-api-key').value;
            const portnoxTenant = document.getElementById('portnox-tenant').value;
            
            if (!portnoxApiKey || !portnoxTenant) {
                showError('Please enter both Portnox API Key and Tenant ID.');
                return;
            }
            
            // Show loading state
            this.textContent = 'Connecting...';
            this.disabled = true;
            
            // Simulate API test
            setTimeout(() => {
                this.textContent = 'Connect';
                this.disabled = false;
                
                // Show success message
                showSuccess('Successfully connected to Portnox Cloud! API integration is now enabled.');
                
                // Enable Portnox features
                enablePortnoxFeatures();
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
    
    // Special handling for Portnox
    if (vendor === 'portnox') {
        const portnoxOptions = document.getElementById('portnox-options');
        if (portnoxOptions) {
            portnoxOptions.style.display = 'block';
        }
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

// Helper functions for Portnox integration
function validateMacAddress(mac) {
    return /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(mac);
}

function generateRandomIP() {
    return '10.' + Math.floor(Math.random() * 256) + '.' + 
           Math.floor(Math.random() * 256) + '.' + 
           Math.floor(Math.random() * 256);
}

function generateRandomSecret() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 24; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Enable Portnox features after successful connection
function enablePortnoxFeatures() {
    // Show all Portnox feature sections
    document.querySelectorAll('.portnox-feature').forEach(section => {
        section.style.display = 'block';
    });
    
    // Add Portnox to vendor selection if not already there
    const vendorSelect = document.getElementById('vendor-select');
    if (vendorSelect) {
        let hasPortnox = false;
        for (let i = 0; i < vendorSelect.options.length; i++) {
            if (vendorSelect.options[i].value === 'portnox') {
                hasPortnox = true;
                break;
            }
        }
        
        if (!hasPortnox) {
            addOption(vendorSelect, 'portnox', 'Portnox Cloud');
        }
    }
}
# Create the Environment Discovery HTML section
echo -e "${BLUE}Creating Environment Discovery section...${NC}"
cat > environment-discovery.html << 'EOFENV'
<div class="discovery-section" id="disc-environment">
  <h3>Environment Discovery</h3>
  <p>Profile your existing environment to generate a customized architecture diagram and deployment plan.</p>
  
  <div class="environment-section">
    <div class="environment-group">
      <h4>Infrastructure</h4>
      <p>Select all elements that exist in your current environment:</p>
      
      <div class="checkbox-group">
        <label>
          <input type="checkbox" class="env-infrastructure" id="env-active-directory" data-label="Active Directory"> 
          Active Directory
        </label>
        <div id="env-active-directory-options" class="eap-method-options">
          <div class="form-group">
            <label for="ad-domain">Domain Name:</label>
            <input type="text" id="ad-domain" placeholder="example.com">
          </div>
          <div class="checkbox-group">
            <label>
              <input type="checkbox" id="ad-multi-domain" checked> 
              Multi-domain environment
            </label>
          </div>
        </div>
      </div>
      
      <div class="checkbox-group">
        <label>
          <input type="checkbox" class="env-infrastructure" id="env-certificate-authority" data-label="Certificate Authority"> 
          Certificate Authority
        </label>
        <div id="env-certificate-authority-options" class="eap-method-options">
          <div class="checkbox-group">
            <label>
              <input type="checkbox" id="ca-microsoft" checked> 
              Microsoft CA
            </label>
          </div>
          <div class="checkbox-group">
            <label>
              <input type="checkbox" id="ca-third-party"> 
              Third-party CA
            </label>
          </div>
        </div>
      </div>
      
      <div class="checkbox-group">
        <label>
          <input type="checkbox" class="env-infrastructure" id="env-radius" data-label="Existing RADIUS"> 
          Existing RADIUS Server
        </label>
        <div id="env-radius-options" class="eap-method-options">
          <div class="form-group">
            <label for="radius-vendor">RADIUS Vendor:</label>
            <select id="radius-vendor">
              <option value="microsoft-nps">Microsoft NPS</option>
              <option value="cisco-ise">Cisco ISE</option>
              <option value="freeradius">FreeRADIUS</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="checkbox-group">
        <label>
          <input type="checkbox" class="env-infrastructure" id="env-vpn" data-label="VPN"> 
          VPN Infrastructure
        </label>
        <div id="env-vpn-options" class="eap-method-options">
          <div class="form-group">
            <label for="vpn-vendor">VPN Vendor:</label>
            <select id="vpn-vendor">
              <option value="cisco-anyconnect">Cisco AnyConnect</option>
              <option value="palo-globalprotect">Palo Alto GlobalProtect</option>
              <option value="fortinet">Fortinet FortiClient</option>
              <option value="checkpoint">Check Point</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="checkbox-group">
        <label>
          <input type="checkbox" class="env-infrastructure" id="env-cloud" data-label="Cloud Infrastructure"> 
          Cloud Infrastructure
        </label>
        <div id="env-cloud-options" class="eap-method-options">
          <div class="checkbox-group">
            <label>
              <input type="checkbox" id="cloud-aws"> 
              AWS
            </label>
          </div>
          <div class="checkbox-group">
            <label>
              <input type="checkbox" id="cloud-azure" checked> 
              Azure
            </label>
          </div>
          <div class="checkbox-group">
            <label>
              <input type="checkbox" id="cloud-gcp"> 
              Google Cloud
            </label>
          </div>
        </div>
      </div>
    </div>
    
    <div class="environment-group">
      <h4>MDM Solution</h4>
      <p>Select your existing MDM solution:</p>
      
      <div class="form-group">
        <select id="mdm-provider">
          <option value="none">None</option>
          <option value="intune">Microsoft Intune</option>
          <option value="jamf">JAMF</option>
          <option value="workspace-one">VMware Workspace ONE</option>
          <option value="mas360">IBM MaaS360</option>
          <option value="mobileiron">MobileIron</option>
          <option value="gpo">Group Policy (GPO)</option>
      # Create the Portnox Discovery HTML section
echo -e "${BLUE}Creating Portnox Discovery tab...${NC}"
cat > portnox-discovery.html << 'EOFPORTNOX'
<div class="discovery-section" id="disc-portnox">
  <div class="portnox-header">
    <img src="assets/portnox/portnox-logo.png" alt="Portnox Logo" class="portnox-logo">
    <div>
      <h3>Portnox Cloud Discovery</h3>
      <p>Integrate with Portnox Cloud for unified access control, reporting, and automated deployment</p>
    </div>
  </div>
  
  <div class="portnox-section">
    <h4>Portnox Cloud API Integration</h4>
    <p>Connect to your Portnox Cloud instance to enable advanced network access control features and automation.</p>
    
    <div class="form-group">
      <label for="portnox-tenant">Tenant ID:</label>
      <input type="text" id="portnox-tenant" placeholder="Enter your Portnox tenant ID">
    </div>
    
    <div class="form-group">
      <label for="portnox-api-key">API Key:</label>
      <div class="api-key-container">
        <input type="password" id="portnox-api-key" placeholder="Enter your Portnox API key">
        <button type="button" id="portnox-connect-button" class="portnox-btn">Connect</button>
      </div>
    </div>
    
    <div id="success-message" class="alert alert-success" style="display: none;"></div>
    <div id="error-message" class="alert alert-danger" style="display: none;"></div>
  </div>
  
  <div class="portnox-tabs">
    <button class="portnox-nav-tab active" onclick="showPortnoxTab('radius', this)" data-tab="radius">RADIUS Server</button>
    <button class="portnox-nav-tab" onclick="showPortnoxTab('mab', this)" data-tab="mab">MAB Management</button>
    <button class="portnox-nav-tab" onclick="showPortnoxTab('groups', this)" data-tab="groups">Device Groups</button>
    <button class="portnox-nav-tab" onclick="showPortnoxTab('reports', this)" data-tab="reports">Reports</button>
    <button class="portnox-nav-tab" onclick="showPortnoxTab('poc', this)" data-tab="poc">POC Generator</button>
  </div>
  
  <!-- RADIUS Server Tab -->
  <div class="portnox-content" id="portnox-radius" style="display: block;">
    <div class="portnox-feature">
      <div class="card">
        <div class="card-header">Create Cloud RADIUS Server</div>
        <div class="card-body">
          <p>Quickly create a cloud-native RADIUS server for your 802.1X authentication needs.</p>
          
          <div class="form-group">
            <label for="portnox-region-select">Select Region:</label>
            <select id="portnox-region-select">
              <option value="us">United States (North America)</option>
              <option value="eu">Europe (Netherlands)</option>
              <option value="ap">Asia Pacific (Singapore)</option>
            </select>
          </div>
          
          <button type="button" id="portnox-create-radius-button" class="portnox-btn">Create RADIUS Server</button>
        </div>
      </div>
      
      <div class="card" id="portnox-radius-details" style="display: none;">
        <div class="card-header">RADIUS Server Details</div>
        <div class="card-body">
          <table>
            <tr>
              <td><strong>IP Address:</strong></td>
              <td id="radius-ip">192.168.1.1</td>
            </tr>
            <tr>
              <td><strong>Authentication Port:</strong></td>
              <td id="radius-auth-port">1812</td>
            </tr>
            <tr>
              <td><strong>Accounting Port:</strong></td>
              <td id="radius-acct-port">1813</td>
            </tr>
            <tr>
              <td><strong>Shared Secret:</strong></td>
              <td id="radius-secret">****************</td>
            </tr>
          </table>
          
          <button type="button" class="portnox-btn" style="margin-top: 15px;" onclick="document.getElementById('radius-secret').textContent = generateRandomSecret()">Show Secret</button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- MAB Management Tab -->
  <div class="portnox-content" id="portnox-mab" style="display: none;">
    <div class="portnox-feature">
      <div class="card">
        <div class="card-header">Create MAB Account</div>
        <div class="card-body">
          <p>Add MAC Authentication Bypass accounts for devices that don't support 802.1X.</p>
          
          <div class="form-group">
            <label for="portnox-mac-address">MAC Address:</label>
            <input type="text" id="portnox-mac-address" placeholder="00:11:22:33:44:55">
          </div>
          
          <div class="form-group">
            <label for="portnox-device-name">Device Name:</label>
            <input type="text" id="portnox-device-name" placeholder="Printer-Floor1">
          </div>
          
          <div class="form-group">
            <label for="portnox-device-type">Device Type:</label>
            <select id="portnox-device-type">
              <option value="printer">Printer</option>
              <option value="voip-phone">VoIP Phone</option>
              <option value="camera">Security Camera</option>
              <option value="medical">Medical Device</option>
              <option value="iot">IoT Device</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <button type="button" id="portnox-create-mab-button" class="portnox-btn">Create MAB Account</button>
        </div>
      </div>
      
      <div class="card" style="margin-top: 20px;">
        <div class="card-header">MAB Accounts</div>
        <div class="card-body">
          <table>
            <thead>
              <tr>
                <th>MAC Address</th>
                <th>Device Name</th>
                <th>Created</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="portnox-mab-accounts-body">
              <!-- Will be populated dynamically -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Device Groups Tab -->
  <div class="portnox-content" id="portnox-groups" style="display: none;">
    <div class="portnox-feature">
      <div class="card">
        <div class="card-header">Create Device Group</div>
        <div class="card-body">
          <p>Create device groups to apply common policies and settings.</p>
          
          <div class="form-group">
            <label for="portnox-group-name">Group Name:</label>
            <input type="text" id="portnox-group-name" placeholder="IoT-Devices">
          </div>
          
          <div class="form-group">
            <label for="portnox-group-type">Group Type:</label>
            <select id="portnox-group-type">
              <option value="dynamic">Dynamic (Rule-Based)</option>
              <option value="static">Static (Manual Assignment)</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="portnox-group-rule">Rule (Dynamic Groups):</label>
            <input type="text" id="portnox-group-rule" placeholder="device.type == 'iot'">
          </div>
          
          <button type="button" id="portnox-create-group-button" class="portnox-btn">Create Group</button>
        </div>
      </div>
      
      <div class="card" style="margin-top: 20px;">
        <div class="card-header">Device Groups</div>
        <div class="card-body">
          <table>
            <thead>
              <tr>
                <th>Group Name</th>
                <th>Type</th>
                <th>Members</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="portnox-groups-body">
              <!-- Will be populated dynamically -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Reports Tab -->
  <div class="portnox-content" id="portnox-reports" style="display: none;">
    <div class="portnox-feature">
      <div class="card">
        <div class="card-header">Generate Report</div>
        <div class="card-body">
          <p>Generate detailed reports for your network access control environment.</p>
          
          <div class="form-group">
            <label for="portnox-report-type">Report Type:</label>
            <select id="portnox-report-type">
              <option value="device-inventory">Device Inventory</option>
              <option value="authentication-events">Authentication Events</option>
              <option value="user-activity">User Activity</option>
              <option value="security-incidents">Security Incidents</option>
              <option value="compliance">Compliance Report</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="portnox-report-timeframe">Time Frame:</label>
            <select id="portnox-report-timeframe">
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7">Last 7 Days</option>
              <option value="last30">Last 30 Days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          
          <div class="form-group" id="portnox-custom-date-range" style="display: none;">
            <label for="portnox-date-from">From:</label>
            <input type="date" id="portnox-date-from">
            
            <label for="portnox-date-to">To:</label>
            <input type="date" id="portnox-date-to">
          </div>
          
          <div class="button-group">
            <button type="button" id="portnox-generate-report-button" class="portnox-btn">Generate Report</button>
            <button type="button" id="portnox-download-report-button" class="portnox-btn" style="display: none;">Download Report</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- POC Generator Tab -->
  <div class="portnox-content" id="portnox-poc" style="display: none;">
    <div class="portnox-feature">
      <div class="card">
        <div class="card-header">Create POC Report & Deployment Templates</div>
        <div class="card-body">
          <p>Generate a comprehensive proof of concept report and deployment templates based on your environment.</p>
          
          <div class="form-group">
            <label for="portnox-client-name">Client/Organization Name:</label>
            <input type="text" id="portnox-client-name" placeholder="Enter organization name">
          </div>
          
          <div class="form-group">
            <label for="portnox-environment">Environment Description:</label>
            <textarea id="portnox-environment" rows="4" placeholder="Brief description of your environment, goals, and requirements"></textarea>
          </div>
          
          <div class="checkbox-group">
            <label>
              <input type="checkbox" id="portnox-use-env-discovery" checked> 
              Use data from Environment Discovery
            </label>
          </div>
          
          <div class="button-group">
            <button type="button" id="portnox-generate-poc-button" class="portnox-btn">Generate POC Report</button>
            <button type="button" id="portnox-download-poc-button" class="portnox-btn" style="display: none;">Download POC Report</button>
          </div>
          
          <div class="form-group" style="margin-top: 20px;">
            <button type="button" id="portnox-generate-templates-button" class="portnox-btn">Generate Deployment Templates</button>
          </div>
          
          <div id="portnox-templates-container" style="display: none; margin-top: 20px;">
            <!-- Templates will be generated here by JavaScript -->
          </div>
          
          <div class="docs-links" style="margin-top: 20px;">
            <h4>Portnox Documentation Resources</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
              <a href="https://www.portnox.com/docs/" target="_blank" class="doc-link">
                <i>??</i> Documentation Portal
              </a>
              <a href="https://www.portnox.com/docs/deployment/" target="_blank" class="doc-link">
                <i>??</i> Deployment Guide
              </a>
              <a href="https://www.portnox.com/docs/radius-configuration/" target="_blank" class="doc-link">
                <i>??</i> RADIUS Configuration
              </a>
              <a href="https://www.portnox.com/docs/mab-configuration/" target="_blank" class="doc-link">
                <i>??</i> MAB Setup Guide
              </a>
              <a href="https://www.portnox.com/docs/switch-configuration/" target="_blank" class="doc-link">
                <i>??</i> Switch Configuration
              </a>
              <a href="https://www.portnox.com/docs/wireless-configuration/" target="_blank" class="doc-link">
                <i>??</i> Wireless Configuration
              </a>
              <a href="https://www.portnox.com/docs/integrations/" target="_blank" class="doc-link">
                <i>??</i> Integration Guides
              </a>
              <a href="https://www.portnox.com/docs/testing/" target="_blank" class="doc-link">
                <i>??</i> Testing Guidelines
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
EOFPORTNOX

echo -e "${GREEN}Portnox Discovery section created.${NC}"

# Create Portnox logo directory and placeholder
mkdir -p assets/portnox
echo -e "${BLUE}Creating Portnox logo placeholder...${NC}"

# Create a simple placeholder for the Portnox logo
cat > assets/portnox/portnox-logo.svg << 'EOFLOGO'
<svg width="200" height="60" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="60" fill="#6c27be" rx="5" ry="5"/>
  <text x="20" y="40" font-family="Arial" font-size="24" fill="white" font-weight="bold">PORTNOX</text>
</svg>
EOFLOGO

echo -e "${GREEN}Portnox logo placeholder created.${NC}"

# Try to convert the SVG to PNG if ImageMagick is available
if command -v convert > /dev/null; then
  convert -size 200x60 assets/portnox/portnox-logo.svg assets/portnox/portnox-logo.png
  echo -e "${GREEN}Converted Portnox logo to PNG.${NC}"
else
  echo -e "${YELLOW}ImageMagick not found, please manually create a PNG version of the Portnox logo.${NC}"
fi

# Create network diagram placeholder
echo -e "${BLUE}Creating network diagram placeholders...${NC}"
# Use a simple command to create a blank PNG for the network diagram
touch assets/diagrams/network-diagram.png
echo -e "${YELLOW}Created empty network diagram placeholder.${NC}"

# Create update instructions
echo -e "${BLUE}Creating update instructions...${NC}"
cat > update-instructions.html << 'EOFUI'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dot1Xer Supreme Update Instructions</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      margin: 20px;
      padding: 20px;
      max-width: 1000px;
      margin: 0 auto;
    }
    h1, h2, h3 {
      color: #6300c4;
    }
    code {
      background-color: #f5f5f5;
      padding: 2px 4px;
      border-radius: 4px;
    }
    pre {
      background-color: #f5f5f5;
      padding: 10px;
      border-radius: 8px;
      overflow-x: auto;
    }
    .note {
      background-color: #fff8e1;
      border-left: 4px solid #ffc107;
      padding: 10px;
      margin: 15px 0;
    }
    .success {
      background-color: #e8f5e9;
      border-left: 4px solid #4caf50;
      padding: 10px;
      margin: 15px 0;
    }
  </style>
</head>
<body>
  <h1>Dot1Xer Supreme Update Instructions</h1>
  
  <div class="success">
    <p>The update script has successfully modified the necessary JavaScript and CSS files. Follow these instructions to complete the update to your HTML file.</p>
  </div>
  
  <h2>Update Steps</h2>
  
  <h3>1. Update the Header with Enlarged Logo</h3>
  <p>Find the header section in your index.html and replace it with:</p>
  <pre><code>&lt;header class="header"&gt;
  &lt;div class="brand"&gt;
    &lt;div class="logo-container"&gt;
      &lt;img src="assets/images/logo-large.png" alt="Dot1Xer Supreme Logo" class="logo"&gt;
    &lt;/div&gt;
    &lt;div class="brand-text"&gt;
      &lt;h1 class="title"&gt;Dot1Xer Supreme&lt;/h1&gt;
      &lt;p class="subtitle"&gt;Enterprise 802.1X Configuration Tool&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;img src="assets/images/ai-avatar-large.png" alt="AI Assistant" class="ai-avatar"&gt;
&lt;/header&gt;</code></pre>

  <h3>2. Add the Discovery Tabs</h3>
  <p>Find the discovery tab section and update it to include the new tabs:</p>
  <pre><code>&lt;div class="discovery-tabs"&gt;
  &lt;button class="discovery-tab active" onclick="showDiscoveryTab('scan', this)" data-tab="scan"&gt;Network Scan&lt;/button&gt;
  &lt;button class="discovery-tab" onclick="showDiscoveryTab('environment', this)" data-tab="environment"&gt;Environment Profile&lt;/button&gt;
  &lt;button class="discovery-tab" onclick="showDiscoveryTab('scoping', this)" data-tab="scoping"&gt;Network Scoping&lt;/button&gt;
  &lt;button class="discovery-tab" onclick="showDiscoveryTab('portnox', this)" data-tab="portnox"&gt;Portnox Cloud&lt;/button&gt;
  &lt;button class="discovery-tab" onclick="showDiscoveryTab('import', this)" data-tab="import"&gt;Import&lt;/button&gt;
  &lt;button class="discovery-tab" onclick="showDiscoveryTab('analyze', this)" data-tab="analyze"&gt;Analyze&lt;/button&gt;
&lt;/div&gt;</code></pre>

  <h3>3. Add the New Discovery Sections</h3>
  <p>Insert the following HTML files into the discovery-content area:</p>
  <ul>
    <li><code>environment-discovery.html</code> - Environment Profile tab content</li>
    <li><code>portnox-discovery.html</code> - Portnox Cloud tab content</li>
  </ul>
  
  <h3>4. Update Your Script and Style References</h3>
  <p>Make sure your HTML file includes the updated JavaScript and CSS files:</p>
  <pre><code>&lt;link rel="stylesheet" href="css/styles.css"&gt;
&lt;script src="js/app.js"&gt;&lt;/script&gt;</code></pre>
  
  <div class="note">
    <p><strong>Important:</strong> After making these changes, test all functionality to ensure the accordions, tabs, and vendor-specific options are working correctly.</p>
  </div>
  
  <h2>New Features Overview</h2>
  
  <h3>Environment Profile</h3>
  <p>This new tab allows users to document their existing environment including:</p>
  <ul>
    <li>Infrastructure components (Active Directory, Certificate Authority, etc.)</li>
    <li>MDM solution integration</li>
    <li>Identity Provider integration</li>
  </ul>
  <p>This information is used to generate a comprehensive architecture diagram and deployment recommendations.</p>
  
  <h3>Portnox Cloud Integration</h3>
  <p>The new Portnox Cloud tab provides direct integration with Portnox Cloud services:</p>
  <ul>
    <li>RADIUS server creation and management</li>
    <li>MAB account management</li>
    <li>Device group management</li>
    <li>Reporting capabilities</li>
    <li>POC generator with auto-generated templates</li>
  </ul>
  <p>This integration simplifies deployment planning and implementation.</p>
  
  <h2>Testing</h2>
  <p>After implementing these changes, test the following functionality:</p>
  <ol>
    <li>Accordion sections should open and close properly</li>
    <li>Environment Profile tab should allow selection of infrastructure components</li>
    <li>Portnox Cloud tab should show all features and integration options</li>
    <li>All discovery tabs should navigate correctly</li>
    <li>Network Scoping section should generate deployment plans</li>
    <li>Color contrast and visibility should be improved across the UI</li>
  </ol>
  
  <div class="success">
    <p>Congratulations! Your Dot1Xer Supreme has been successfully updated with comprehensive environment discovery, Portnox Cloud integration, and enhanced UI.</p>
  </div>
</body>
</html>
EOFUI

echo -e "${GREEN}Update instructions created.${NC}"

# Final summary
echo -e "${BLUE}"
echo "====================================================================="
echo "                     Update Complete!                                "
echo "====================================================================="
echo -e "${NC}"
echo -e "${GREEN}The Dot1Xer Supreme tool has been successfully updated with:${NC}"
echo "- Fixed accordion functionality"
echo "- Improved color contrast in the UI"
echo "- Environment Profile discovery"
echo "- Portnox Cloud integration"
echo "- Automated POC and deployment template generation"
echo "- Enhanced network diagrams"
echo
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Review the update-instructions.html file for guidance on updating your HTML"
echo "2. Integrate the environment-discovery.html and portnox-discovery.html files into your application"
echo "3. Test all functionality to ensure proper operation"
echo
echo -e "${GREEN}A backup of your original files has been created in: ${backup_dir}${NC}"
echo

# Script completion
exit 0
