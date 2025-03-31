// Dot1Xer Supreme - Core Functionality

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
// Dot1Xer Supreme - Tab Navigation

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
// Dot1Xer Supreme - Vendor Options

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
// Dot1Xer Supreme - Environment Discovery

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
// Dot1Xer Supreme - Portnox Cloud Integration

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
    
    // Create RADIUS Server
    const createRadiusButton = document.getElementById('portnox-create-radius-button');
    if (createRadiusButton) {
        createRadiusButton.addEventListener('click', function() {
            const regionSelect = document.getElementById('portnox-region-select');
            if (!regionSelect || !regionSelect.value) {
                showError('Please select a region for your RADIUS server.');
                return;
            }
            
            // Show loading state
            this.textContent = 'Creating...';
            this.disabled = true;
            
            // Simulate creation
            setTimeout(() => {
                this.textContent = 'Create RADIUS Server';
                this.disabled = false;
                
                // Show success message
                showSuccess('RADIUS server created successfully in ' + regionSelect.options[regionSelect.selectedIndex].text);
                
                // Show RADIUS details
                const radiusDetails = document.getElementById('portnox-radius-details');
                if (radiusDetails) {
                    radiusDetails.style.display = 'block';
                    
                    // Generate random RADIUS details
                    document.getElementById('radius-ip').textContent = generateRandomIP();
                    document.getElementById('radius-auth-port').textContent = '1812';
                    document.getElementById('radius-acct-port').textContent = '1813';
                    document.getElementById('radius-secret').textContent = generateRandomSecret();
                }
            }, 2000);
        });
    }
    
    // Create MAB Account
    const createMabButton = document.getElementById('portnox-create-mab-button');
    if (createMabButton) {
        createMabButton.addEventListener('click', function() {
            const macAddress = document.getElementById('portnox-mac-address').value;
            const deviceName = document.getElementById('portnox-device-name').value;
            
            if (!macAddress || !deviceName) {
                showError('Please enter both MAC address and device name.');
                return;
            }
            
            // Validate MAC address format
            if (!validateMacAddress(macAddress)) {
                showError('Please enter a valid MAC address (e.g., 00:11:22:33:44:55).');
                return;
            }
            
            // Show loading state
            this.textContent = 'Creating...';
            this.disabled = true;
            
            // Simulate creation
            setTimeout(() => {
                this.textContent = 'Create MAB Account';
                this.disabled = false;
                
                // Show success message
                showSuccess('MAB account created successfully for ' + deviceName);
                
                // Add to MAB accounts table
                addMabAccount(macAddress, deviceName);
                
                // Clear inputs
                document.getElementById('portnox-mac-address').value = '';
                document.getElementById('portnox-device-name').value = '';
            }, 1500);
        });
    }
    
    // Generate Report
    const generateReportButton = document.getElementById('portnox-generate-report-button');
    if (generateReportButton) {
        generateReportButton.addEventListener('click', function() {
            const reportType = document.getElementById('portnox-report-type').value;
            
            if (!reportType) {
                showError('Please select a report type.');
                return;
            }
            
            // Show loading state
            this.textContent = 'Generating...';
            this.disabled = true;
            
            // Simulate report generation
            setTimeout(() => {
                this.textContent = 'Generate Report';
                this.disabled = false;
                
                // Show success message
                showSuccess('Report generated successfully. Ready for download.');
                
                // Show download button
                const downloadReportButton = document.getElementById('portnox-download-report-button');
                if (downloadReportButton) {
                    downloadReportButton.style.display = 'inline-block';
                }
            }, 2500);
        });
    }
    
    // Download Report
    const downloadReportButton = document.getElementById('portnox-download-report-button');
    if (downloadReportButton) {
        downloadReportButton.addEventListener('click', function() {
            // Simulate download delay
            this.textContent = 'Downloading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'Download Report';
                this.disabled = false;
                
                // Create a simple CSV file for download
                const reportType = document.getElementById('portnox-report-type').value;
                const reportName = getReportName(reportType);
                const csvContent = generateSampleReport(reportType);
                
                // Create blob and download
                const blob = new Blob([csvContent], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = reportName + '.csv';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 1000);
        });
    }
    
    // Generate POC Report
    const generatePocButton = document.getElementById('portnox-generate-poc-button');
    if (generatePocButton) {
        generatePocButton.addEventListener('click', function() {
            const clientName = document.getElementById('portnox-client-name').value;
            const environment = document.getElementById('portnox-environment').value;
            
            if (!clientName || !environment) {
                showError('Please enter both client name and environment details.');
                return;
            }
            
            // Show loading state
            this.textContent = 'Generating...';
            this.disabled = true;
            
            // Simulate generation
            setTimeout(() => {
                this.textContent = 'Generate POC Report';
                this.disabled = false;
                
                // Show success message
                showSuccess('POC report for "' + clientName + '" generated successfully.');
                
                // Show download button
                const downloadPocButton = document.getElementById('portnox-download-poc-button');
                if (downloadPocButton) {
                    downloadPocButton.style.display = 'inline-block';
                }
            }, 3000);
        });
    }

    // Generate Deployment Templates
    const generateTemplatesButton = document.getElementById('portnox-generate-templates-button');
    if (generateTemplatesButton) {
        generateTemplatesButton.addEventListener('click', function() {
            // Read environment details from the Discovery tab if available
            let environment = {};
            
            try {
                // Get selected vendors
                const switchVendor = document.getElementById('switch-vendor')?.value || 'cisco';
                const wirelessVendor = document.getElementById('wireless-vendor')?.value || 'cisco';
                
                // Get MDM and IdP solutions
                const mdmProvider = document.getElementById('mdm-provider')?.value || 'none';
                const idpProvider = document.getElementById('idp-provider')?.value || 'none';
                
                environment = {
                    switchVendor,
                    wirelessVendor,
                    mdmProvider,
                    idpProvider
                };
            } catch (e) {
                console.error('Error reading environment details:', e);
            }
            
            // Show loading state
            this.textContent = 'Generating...';
            this.disabled = true;
            
            // Simulate template generation
            setTimeout(() => {
                this.textContent = 'Generate Templates';
                this.disabled = false;
                
                // Show success message
                showSuccess('Deployment templates generated successfully based on your environment.');
                
                // Show templates container
                const templatesContainer = document.getElementById('portnox-templates-container');
                if (templatesContainer) {
                    templatesContainer.style.display = 'block';
                    
                    // Generate templates based on environment
                    templatesContainer.innerHTML = generateDeploymentTemplates(environment);
                }
            }, 2500);
        });
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

// Add MAB account to table
function addMabAccount(mac, name) {
    const tbody = document.getElementById('portnox-mab-accounts-body');
    if (!tbody) return;
    
    const row = document.createElement('tr');
    
    const macCell = document.createElement('td');
    macCell.textContent = mac;
    row.appendChild(macCell);
    
    const nameCell = document.createElement('td');
    nameCell.textContent = name;
    row.appendChild(nameCell);
    
    const dateCell = document.createElement('td');
    dateCell.textContent = new Date().toLocaleDateString();
    row.appendChild(dateCell);
    
    const statusCell = document.createElement('td');
    statusCell.textContent = 'Active';
    row.appendChild(statusCell);
    
    const actionCell = document.createElement('td');
    const actionButton = document.createElement('button');
    actionButton.textContent = 'Manage';
    actionButton.className = 'btn btn-sm portnox-btn';
    actionButton.addEventListener('click', function() {
        alert('Management interface for ' + name + ' would open here.');
    });
    actionCell.appendChild(actionButton);
    row.appendChild(actionCell);
    
    tbody.appendChild(row);
}

// Get report name based on type
function getReportName(reportType) {
    switch(reportType) {
        case 'device-inventory':
            return 'Device_Inventory_Report';
        case 'authentication-events':
            return 'Authentication_Events_Report';
        case 'user-activity':
            return 'User_Activity_Report';
        case 'security-incidents':
            return 'Security_Incidents_Report';
        case 'compliance':
            return 'Compliance_Report';
        default:
            return 'Portnox_Report';
    }
}

// Generate deployment templates based on environment
function generateDeploymentTemplates(environment) {
    const switchVendor = environment.switchVendor || 'cisco';
    const wirelessVendor = environment.wirelessVendor || 'cisco';
    const mdmProvider = environment.mdmProvider || 'none';
    const idpProvider = environment.idpProvider || 'none';
    
    let templates = '<div class="poc-templates">';
    
    // Prerequisites Template
    templates += `
        <div class="template-card">
            <div class="template-header">Prerequisites Checklist</div>
            <div class="template-body">
                <p>A comprehensive checklist of prerequisites for Portnox Cloud deployment, customized for ${switchVendor} switches and ${wirelessVendor} wireless infrastructure.</p>
                <button class="template-toggle" data-template="prereq-template">Show Details</button>
                <div id="prereq-template" style="display: none; margin-top: 15px;">
                    <ul>
                        <li>Network infrastructure requirements</li>
                        <li>RADIUS server configuration for ${switchVendor}</li>
                        <li>Firewall requirements</li>
                        <li>${mdmProvider !== 'none' ? mdmProvider + ' integration requirements' : 'MDM integration options'}</li>
                        <li>${idpProvider !== 'none' ? idpProvider + ' integration steps' : 'Identity provider options'}</li>
                    </ul>
                    <div class="docs-links">
                        <a href="https://www.portnox.com/docs/prerequisites" target="_blank" class="doc-link">
                            <i>??</i> Official Prerequisites Documentation
                        </a>
                    </div>
                </div>
            </div>
            <div class="template-footer">
                <button class="template-download portnox-btn" data-template="prereq-template" data-type="prerequisites">Download</button>
            </div>
        </div>`;
    
    // Deployment Plan Template
    templates += `
        <div class="template-card">
            <div class="template-header">Deployment Plan</div>
            <div class="template-body">
                <p>Step-by-step deployment plan for Portnox Cloud in your environment, with specific instructions for ${switchVendor} and ${wirelessVendor} devices.</p>
                <button class="template-toggle" data-template="deploy-template">Show Details</button>
                <div id="deploy-template" style="display: none; margin-top: 15px;">
                    <ol>
                        <li>Initial setup of Portnox Cloud tenant</li>
                        <li>RADIUS server configuration</li>
                        <li>${switchVendor} switch configuration for 802.1X</li>
                        <li>${wirelessVendor} wireless configuration</li>
                        <li>Client configuration and testing</li>
                        <li>Production deployment phases</li>
                    </ol>
                    <div class="docs-links">
                        <a href="https://www.portnox.com/docs/deployment" target="_blank" class="doc-link">
                            <i>??</i> Deployment Documentation
                        </a>
                        <a href="https://www.portnox.com/docs/switch-configuration/${switchVendor}" target="_blank" class="doc-link">
                            <i>??</i> ${switchVendor} Configuration Guide
                        </a>
                    </div>
                </div>
            </div>
            <div class="template-footer">
                <button class="template-download portnox-btn" data-template="deploy-template" data-type="deployment">Download</button>
            </div>
        </div>`;
    
    templates += '</div>';
    
    return templates;
}
// Utility functions
cat > js/utils.js << 'EOF'
// Dot1Xer Supreme - Utility Functions

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
                    <li>Configure Portnox Cloud RADIUS server</li>
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
            <p class="diagram-note">This diagram represents a high-level view of your 802.1X deployment with Portnox Cloud. Download the full diagram for more details.</p>
            <button class="download-btn" onclick="downloadDiagram()">Download Full Diagram</button>
        </div>`;
        
        resultsContainer.innerHTML = html;
    }
}

// Function to download a diagram
function downloadDiagram() {
    // In a real implementation, this would generate a custom diagram
    // For demo purposes, we'll just download the sample image
    const link = document.createElement('a');
    link.href = 'assets/diagrams/network-diagram.png';
    link.download = 'portnox-802.1x-deployment-diagram.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
