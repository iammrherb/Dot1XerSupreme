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
        selectedSection.style.display = 'block';
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
    
    // Create Device Group
    const createGroupButton = document.getElementById('portnox-create-group-button');
    if (createGroupButton) {
        createGroupButton.addEventListener('click', function() {
            const groupName = document.getElementById('portnox-group-name').value;
            const groupType = document.getElementById('portnox-group-type').value;
            
            if (!groupName || !groupType) {
                showError('Please enter both group name and select a group type.');
                return;
            }
            
            // Show loading state
            this.textContent = 'Creating...';
            this.disabled = true;
            
            // Simulate creation
            setTimeout(() => {
                this.textContent = 'Create Group';
                this.disabled = false;
                
                // Show success message
                showSuccess('Device group "' + groupName + '" created successfully.');
                
                // Add to groups table
                addDeviceGroup(groupName, groupType);
                
                // Clear inputs
                document.getElementById('portnox-group-name').value = '';
            }, 1500);
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
    
    // Download POC Report
    const downloadPocButton = document.getElementById('portnox-download-poc-button');
    if (downloadPocButton) {
        downloadPocButton.addEventListener('click', function() {
            const clientName = document.getElementById('portnox-client-name').value;
            
            // Simulate download delay
            this.textContent = 'Downloading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'Download POC Report';
                this.disabled = false;
                
                // Create a simple HTML file for download
                const htmlContent = generateSamplePocReport(clientName);
                
                // Create blob and download
                const blob = new Blob([htmlContent], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = clientName.replace(/\s+/g, '_') + '_POC_Report.html';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 1000);
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
    
    // Toggle POC template details
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('template-toggle')) {
            const templateId = e.target.getAttribute('data-template');
            const templateContent = document.getElementById(templateId);
            
            if (templateContent) {
                if (templateContent.style.display === 'block') {
                    templateContent.style.display = 'none';
                    e.target.textContent = 'Show Details';
                } else {
                    templateContent.style.display = 'block';
                    e.target.textContent = 'Hide Details';
                }
            }
        }
    });
    
    // Download template buttons
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('template-download')) {
            const templateId = e.target.getAttribute('data-template');
            const templateType = e.target.getAttribute('data-type');
            const clientName = document.getElementById('portnox-client-name')?.value || 'Client';
            
            // Generate template content based on type
            let content = '';
            let filename = '';
            let contentType = '';
            
            switch (templateType) {
                case 'prerequisites':
                    content = generatePrerequisitesTemplate(clientName);
                    filename = `${clientName}_Prerequisites.md`;
                    contentType = 'text/markdown';
                    break;
                case 'deployment':
                    content = generateDeploymentTemplate(clientName);
                    filename = `${clientName}_Deployment_Plan.md`;
                    contentType = 'text/markdown';
                    break;
                case 'test-plan':
                    content = generateTestPlanTemplate(clientName);
                    filename = `${clientName}_Test_Plan.md`;
                    contentType = 'text/markdown';
                    break;
                case 'use-cases':
                    content = generateUseCasesTemplate(clientName);
                    filename = `${clientName}_Use_Cases.md`;
                    contentType = 'text/markdown';
                    break;
                default:
                    showError('Unknown template type');
                    return;
            }
            
            // Create blob and download
            const blob = new Blob([content], { type: contentType });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    });
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

function addDeviceGroup(name, type) {
    const tbody = document.getElementById('portnox-groups-body');
    if (!tbody) return;
    
    const row = document.createElement('tr');
    
    const nameCell = document.createElement('td');
    nameCell.textContent = name;
    row.appendChild(nameCell);
    
    const typeCell = document.createElement('td');
    typeCell.textContent = type;
    row.appendChild(typeCell);
    
    const countCell = document.createElement('td');
    countCell.textContent = '0';
    row.appendChild(countCell);
    
    const dateCell = document.createElement('td');
    dateCell.textContent = new Date().toLocaleDateString();
    row.appendChild(dateCell);
    
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

function generateSampleReport(reportType) {
    let header = '';
    let records = [];
    
    switch(reportType) {
        case 'device-inventory':
            header = 'Device ID,Device Name,MAC Address,IP Address,Device Type,Operating System,Last Seen,Status\n';
            for (let i = 1; i <= 10; i++) {
                records.push(`DEV${i.toString().padStart(4, '0')},Device-${i},` +
                          `${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}:` +
                          `${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}:` +
                          `${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}:` +
                          `${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}:` +
                          `${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}:` +
                          `${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')},` +
                          `192.168.1.${i},` +
                          ['Workstation', 'Laptop', 'Mobile', 'IoT Device', 'Printer'][Math.floor(Math.random() * 5)] + ',' +
                          ['Windows 10', 'Windows 11', 'macOS', 'iOS', 'Android', 'Linux'][Math.floor(Math.random() * 6)] + ',' +
                          new Date().toISOString() + ',' +
                          ['Active', 'Inactive', 'Quarantined'][Math.floor(Math.random() * 3)]);
            }
            break;
        case 'authentication-events':
            header = 'Event ID,Timestamp,User,Device ID,Device Name,Authentication Type,Result,Failure Reason\n';
            for (let i = 1; i <= 10; i++) {
                const success = Math.random() > 0.3;
                records.push(`EVT${i.toString().padStart(4, '0')},` +
                          new Date().toISOString() + ',' +
                          `user${i}@example.com,` +
                          `DEV${Math.floor(Math.random() * 1000).toString().padStart(4, '0')},` +
                          `Device-${Math.floor(Math.random() * 100)},` +
                          ['802.1X', 'MAC Authentication', 'RADIUS CoA', 'Web Authentication'][Math.floor(Math.random() * 4)] + ',' +
                          (success ? 'Success' : 'Failure') + ',' +
                          (success ? '' : ['Invalid Credentials', 'Device Not Recognized', 'Certificate Expired', 'User Not Found'][Math.floor(Math.random() * 4)]));
            }
            break;
        default:
            header = 'ID,Name,Type,Value,Timestamp\n';
            for (let i = 1; i <= 10; i++) {
                records.push(`${i},Item ${i},Type ${Math.floor(Math.random() * 5)},Value ${Math.floor(Math.random() * 100)},${new Date().toISOString()}`);
            }
    }
    
    return header + records.join('\n');
}

function generateSamplePocReport(clientName) {
    const today = new Date().toLocaleDateString();
    
    return `<!DOCTYPE html>
<html>
<head>
    <title>Portnox Cloud POC Report - ${clientName}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #6c27be; }
        h2 { color: #4c1d80; margin-top: 30px; }
        table { border-collapse: collapse; width: 100%; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; }
        th { background-color: #f2f2f2; text-align: left; }
        .section { margin: 30px 0; }
        .success { color: green; }
        .failure { color: red; }
        .summary { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0; }
    </style>
</head>
<body>
    <h1>Portnox Cloud Proof of Concept Report</h1>
    <p><strong>Client:</strong> ${clientName}</p>
    <p><strong>Date:</strong> ${today}</p>
    
    <div class="summary">
        <h2>Executive Summary</h2>
        <p>This report summarizes the results of the Portnox Cloud Proof of Concept deployment conducted for ${clientName}. The POC demonstrated the effectiveness of cloud-based RADIUS authentication and zero-trust network access control in the client environment.</p>
    </div>
    
    <div class="section">
        <h2>Implementation Overview</h2>
        <p>The POC was deployed across the following infrastructure:</p>
        <ul>
            <li>Network Devices: 5 switches, 3 wireless access points</li>
            <li>Authentication Methods: 802.1X, MAC Authentication Bypass</li>
            <li>User Directory Integration: Active Directory</li>
            <li>Device Types: Windows, macOS, iOS, Android, and various IoT devices</li>
        </ul>
    </div>
    
    <div class="section">
        <h2>Authentication Results</h2>
        <table>
            <tr>
                <th>Authentication Type</th>
                <th>Success Rate</th>
                <th>Total Attempts</th>
                <th>Notes</th>
            </tr>
            <tr>
                <td>802.1X (User)</td>
                <td class="success">98%</td>
                <td>125</td>
                <td>Successful implementation across all platforms</td>
            </tr>
            <tr>
                <td>MAC Authentication</td>
                <td class="success">100%</td>
                <td>47</td>
                <td>All IoT devices successfully authenticated</td>
            </tr>
            <tr>
                <td>Guest Portal</td>
                <td class="success">95%</td>
                <td>22</td>
                <td>Minor issue with email delivery resolved</td>
            </tr>
        </table>
    </div>
    
    <div class="section">
        <h2>Network Integration</h2>
        <table>
            <tr>
                <th>Network Device</th>
                <th>Integration Status</th>
                <th>Notes</th>
            </tr>
            <tr>
                <td>Cisco Catalyst Switches</td>
                <td class="success">Complete</td>
                <td>Smooth integration with existing infrastructure</td>
            </tr>
            <tr>
                <td>Meraki Access Points</td>
                <td class="success">Complete</td>
                <td>Simple configuration with cloud management</td>
            </tr>
            <tr>
                <td>FortiGate Firewall</td>
                <td class="success">Complete</td>
                <td>VPN authentication working as expected</td>
            </tr>
        </table>
    </div>
    
    <div class="section">
        <h2>Security Incidents Prevented</h2>
        <table>
            <tr>
                <th>Incident Type</th>
                <th>Count</th>
                <th>Action Taken</th>
            </tr>
            <tr>
                <td>Unauthorized Device Connection</td>
                <td>12</td>
                <td>Automatic blocking</td>
            </tr>
            <tr>
                <td>Expired Certificate</td>
                <td>3</td>
                <td>User notification and remediation</td>
            </tr>
            <tr>
                <td>Non-compliant Device</td>
                <td>7</td>
                <td>Quarantine and notification</td>
            </tr>
        </table>
    </div>
    
    <div class="section">
        <h2>Recommendations</h2>
        <ol>
            <li>Proceed with full deployment across all network segments</li>
            <li>Implement certificate-based authentication for enhanced security</li>
            <li>Develop comprehensive device onboarding procedures</li>
            <li>Integrate with existing security tools for better visibility</li>
            <li>Establish regular compliance checking and reporting</li>
        </ol>
    </div>
    
    <div class="section">
        <h2>Conclusion</h2>
        <p>The Portnox Cloud POC has successfully demonstrated the value of cloud-based network access control in ${clientName}'s environment. The solution has proven effective in securing network resources, simplifying management, and providing comprehensive visibility across the network infrastructure.</p>
    </div>
    
    <footer>
        <p><em>Generated by Dot1Xer Supreme with Portnox Integration</em></p>
    </footer>
</body>
</html>`;
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
    
    // Test Plan Template
    templates += `
        <div class="template-card">
            <div class="template-header">Test Plan</div>
            <div class="template-body">
                <p>Comprehensive test plan to validate Portnox Cloud functionality in your environment.</p>
                <button class="template-toggle" data-template="test-template">Show Details</button>
                <div id="test-template" style="display: none; margin-top: 15px;">
                    <ul>
                        <li>Authentication testing with various device types</li>
                        <li>Authorization policy validation</li>
                        <li>MAB functionality testing</li>
                        <li>Guest access validation</li>
                        <li>Failover testing</li>
                        <li>Performance testing</li>
                    </ul>
                    <div class="docs-links">
                        <a href="https://www.portnox.com/docs/testing" target="_blank" class="doc-link">
                            <i>??</i> Testing Documentation
                        </a>
                    </div>
                </div>
            </div>
            <div class="template-footer">
                <button class="template-download portnox-btn" data-template="test-template" data-type="test-plan">Download</button>
            </div>
        </div>`;
    
    // Use Cases Template
    templates += `
        <div class="template-card">
            <div class="template-header">Common Use Cases</div>
            <div class="template-body">
                <p>A collection of common use cases for Portnox Cloud in enterprise environments.</p>
                <button class="template-toggle" data-template="usecase-template">Show Details</button>
                <div id="usecase-template" style="display: none; margin-top: 15px;">
                    <ul>
                        <li>BYOD secure onboarding</li>
                        <li>Guest access management</li>
                        <li>IoT device security</li>
                        <li>Zero-trust network access</li>
                        <li>Compliance enforcement</li>
                        <li>${mdmProvider !== 'none' ? 'Integration with ' + mdmProvider : 'MDM integration'}</li>
                    </ul>
                    <div class="docs-links">
                        <a href="https://www.portnox.com/use-cases" target="_blank" class="doc-link">
                            <i>??</i> Use Cases
                        </a>
                        <a href="https://www.portnox.com/docs/integrations/${mdmProvider !== 'none' ? mdmProvider : 'mdm'}" target="_blank" class="doc-link">
                            <i>??</i> Integration Guides
                        </a>
                    </div>
                </div>
            </div>
            <div class="template-footer">
                <button class="template-download portnox-btn" data-template="usecase-template" data-type="use-cases">Download</button>
            </div>
        </div>`;
    
    templates += '</div>';
    
    return templates;
}

// Generate prerequisites template for download
function generatePrerequisitesTemplate(clientName) {
    return `# Portnox Cloud Prerequisites Checklist
## Client: ${clientName}
## Generated: ${new Date().toLocaleDateString()}

This document outlines the prerequisites for deploying Portnox Cloud in your environment.

## Network Requirements

- [ ] Outbound connectivity to Portnox Cloud service (TCP port 443)
- [ ] Firewall rules to allow RADIUS traffic (UDP ports 1812, 1813)
- [ ] DNS resolution for Portnox Cloud service endpoints
- [ ] NTP synchronization across all network devices

## Authentication Infrastructure

- [ ] Active Directory/LDAP server (if using directory integration)
- [ ] Certificate Authority (if using EAP-TLS)
- [ ] RADIUS server configuration on network devices

## Network Devices

### Switches
- [ ] 802.1X capability
- [ ] RADIUS client configuration
- [ ] Support for RADIUS CoA (recommended)
- [ ] Support for MAC Authentication Bypass (for non-802.1X devices)
- [ ] VLANs defined for authenticated, guest, and unauthorized access

### Wireless
- [ ] WPA2-Enterprise or WPA3-Enterprise capability
- [ ] RADIUS client configuration
- [ ] Support for multiple SSIDs (for guest access)

## End User Devices

- [ ] Supplicant configuration for Windows, macOS, iOS, Android
- [ ] Certificate distribution mechanism (if using EAP-TLS)
- [ ] Device onboarding process defined

## Integration Points

- [ ] MDM solution API credentials (if applicable)
- [ ] Identity Provider configuration (if using SAML/OIDC)
- [ ] SIEM integration requirements (if needed)

## Documentation & Resources

- [Portnox Cloud Documentation](https://www.portnox.com/docs/)
- [Network Device Configuration Guides](https://www.portnox.com/docs/network-devices/)
- [Integration Guides](https://www.portnox.com/docs/integrations/)
- [System Requirements](https://www.portnox.com/docs/system-requirements/)

## Notes
- Portnox Cloud requires minimal on-premises infrastructure, with the primary components hosted in the cloud.
- For high availability deployments, consider deploying redundant RADIUS server proxies.
- Review the network access policy requirements before deployment to ensure alignment with organizational security policies.
`;
}

// Generate deployment template for download
function generateDeploymentTemplate(clientName) {
    return `# Portnox Cloud Deployment Plan
## Client: ${clientName}
## Generated: ${new Date().toLocaleDateString()}

This document provides a step-by-step plan for deploying Portnox Cloud in your environment.

## Phase 1: Preparation & Initial Setup

### 1.1 Initial Portnox Cloud Setup
- [ ] Create Portnox Cloud tenant
- [ ] Configure administrative users
- [ ] Set up network locations
- [ ] Configure authentication sources
- [ ] Define device profiles

### 1.2 RADIUS Server Configuration
- [ ] Deploy Portnox Cloud RADIUS service
- [ ] Configure RADIUS server settings
- [ ] Generate and securely store RADIUS shared secrets
- [ ] Test RADIUS server connectivity

### 1.3 Policy Configuration
- [ ] Define authentication policies
- [ ] Configure authorization policies
- [ ] Set up guest access policies
- [ ] Configure device compliance policies

## Phase 2: Network Device Configuration

### 2.1 Switch Configuration
- [ ] Configure switch as RADIUS client
- [ ] Set up 802.1X port authentication
- [ ] Configure MAC Authentication Bypass
- [ ] Set up VLAN assignments
- [ ] Configure authentication timers and retries
- [ ] Enable RADIUS accounting

### 2.2 Wireless Configuration
- [ ] Configure RADIUS server settings
- [ ] Set up WPA2/WPA3-Enterprise SSIDs
- [ ] Configure guest wireless network
- [ ] Set up RADIUS CoA support

## Phase 3: Client Configuration

### 3.1 Windows Clients
- [ ] Configure 802.1X supplicant settings
- [ ] Deploy certificates (if using EAP-TLS)
- [ ] Test authentication

### 3.2 macOS Clients
- [ ] Configure 802.1X supplicant settings
- [ ] Deploy certificates (if using EAP-TLS)
- [ ] Test authentication

### 3.3 Mobile Devices
- [ ] Configure WiFi profiles
- [ ] Deploy certificates (if using EAP-TLS)
- [ ] Test authentication

### 3.4 IoT Devices
- [ ] Document MAC addresses
- [ ] Configure MAB exceptions
- [ ] Test authentication

## Phase 4: Integration

### 4.1 MDM Integration
- [ ] Configure API connection
- [ ] Set up device information synchronization
- [ ] Configure compliance checking

### 4.2 Identity Provider Integration
- [ ] Configure SAML/OIDC integration
- [ ] Set up user synchronization
- [ ] Test single sign-on

## Phase 5: Testing

### 5.1 Authentication Testing
- [ ] Test user authentication
- [ ] Test device authentication
- [ ] Test guest access
- [ ] Test authentication failure scenarios

### 5.2 Authorization Testing
- [ ] Test VLAN assignment
- [ ] Test access controls
- [ ] Test device compliance policies

## Phase 6: Production Deployment

### 6.1 Pilot Group
- [ ] Deploy to limited user group
- [ ] Monitor for issues
- [ ] Collect feedback
- [ ] Make necessary adjustments

### 6.2 Full Deployment
- [ ] Create deployment schedule
- [ ] Communicate with end users
- [ ] Deploy by department/location
- [ ] Monitor for issues

### 6.3 Documentation
- [ ] Update network documentation
- [ ] Document configuration settings
- [ ] Create troubleshooting guide
- [ ] Develop user training materials

## Resources
- [Portnox Cloud Documentation](https://www.portnox.com/docs/)
- [Deployment Best Practices](https://www.portnox.com/docs/best-practices/)
- [Troubleshooting Guide](https://www.portnox.com/docs/troubleshooting/)
`;
}

// Generate test plan template for download
function generateTestPlanTemplate(clientName) {
    return `# Portnox Cloud Test Plan
## Client: ${clientName}
## Generated: ${new Date().toLocaleDateString()}

This document provides a comprehensive test plan for validating your Portnox Cloud deployment.

## 1. Authentication Testing

### 1.1 802.1X Authentication
- [ ] Test EAP-TLS authentication (certificate-based)
- [ ] Test PEAP-MSCHAPv2 authentication (username/password)
- [ ] Test EAP-TTLS authentication (if configured)
- [ ] Verify authentication with different device types:
  - Windows devices
  - macOS devices
  - Linux devices
  - iOS devices
  - Android devices

### 1.2 MAC Authentication Bypass (MAB)
- [ ] Test authentication of devices that don't support 802.1X
- [ ] Verify MAC address is properly captured and authenticated
- [ ] Confirm proper VLAN assignment based on MAC authentication

### 1.3 Guest Access
- [ ] Test guest portal access
- [ ] Verify guest credentials creation
- [ ] Confirm guest VLAN assignment
- [ ] Test guest access expiration

## 2. Authorization Testing

### 2.1 VLAN Assignment
- [ ] Verify correct VLAN assignment based on authentication method
- [ ] Test VLAN assignment based on user groups
- [ ] Test VLAN assignment based on device type
- [ ] Confirm dynamic VLAN assignment

### 2.2 Access Control Policies
- [ ] Verify access control policies are applied correctly
- [ ] Test access restrictions based on time of day
- [ ] Test access restrictions based on location
- [ ] Confirm policy changes take effect in real-time

## 3. Device Posture Assessment

### 3.1 Compliance Checking
- [ ] Verify antivirus status checking
- [ ] Test operating system compliance checks
- [ ] Verify patch level compliance
- [ ] Test firewall status checking

### 3.2 Remediation
- [ ] Verify auto-remediation for non-compliant devices
- [ ] Test quarantine VLAN assignment for non-compliant devices
- [ ] Verify notification to users about compliance issues
- [ ] Confirm re-assessment after remediation

## 4. Integration Testing

### 4.1 MDM Integration
- [ ] Verify device information synchronization
- [ ] Test compliance status integration
- [ ] Confirm certificate deployment

### 4.2 Directory Services
- [ ] Verify Active Directory integration
- [ ] Test user authentication against directory
- [ ] Confirm group membership synchronization

### 4.3 SIEM Integration
- [ ] Verify logging to SIEM system
- [ ] Test alert generation
- [ ] Confirm event correlation

## 5. Performance Testing

### 5.1 Load Testing
- [ ] Test concurrent authentication capacity
- [ ] Verify response times under load
- [ ] Confirm system stability during peak usage

### 5.2 High Availability
- [ ] Test failover capabilities
- [ ] Verify redundancy
- [ ] Confirm continuous operation during maintenance

## 6. Security Testing

### 6.1 Penetration Testing
- [ ] Attempt unauthorized access
- [ ] Test for common vulnerabilities
- [ ] Verify secure communication

### 6.2 Certificate Management
- [ ] Test certificate renewal
- [ ] Verify certificate revocation
- [ ] Confirm certificate validation

## Resources
- [Portnox Cloud Documentation](https://www.portnox.com/docs/)
- [Testing Best Practices](https://www.portnox.com/docs/testing/)
- [Troubleshooting Guide](https://www.portnox.com/docs/troubleshooting/)

## Notes
- Test cases should be executed in a controlled environment before moving to production
- Document all test results and issues encountered
- Update test plan as new features are implemented
`;
}

// Generate use cases template for download
function generateUseCasesTemplate(clientName) {
    return `...`;
}

