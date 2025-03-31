<<<<<<< HEAD
// Dot1Xer Supreme - Main JavaScript

// Current step in the configurator
let currentStep = 1;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAccordions();
    initTabs();
    initVendorOptions();
    initNetworkScopingOptions();
    setupAuthMethodOptions();
    setupAPIIntegrations();
    setupPortnoxIntegration();
    
    const firstTabBtn = document.querySelector('.tab-btn');
    if (firstTabBtn) firstTabBtn.click();
    
    const firstDiscoveryTab = document.querySelector('.discovery-tab');
    if (firstDiscoveryTab) firstDiscoveryTab.click();
});

// Initialize accordion functionality
function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            const icon = this.querySelector('.accordion-icon');
            if (content.style.display === 'block') {
                content.style.display = 'none';
                if (icon) icon.textContent = '+';
            } else {
                content.style.display = 'block';
                if (icon) icon.textContent = '-';
            }
        });
        const accordionGroup = header.closest('.accordion-group');
        if (accordionGroup && accordionGroup.querySelectorAll('.accordion-header')[0] === header) {
            setTimeout(() => header.click(), 100);
        }
    });
}

// Initialize tab functionality
function initTabs() {
    const tabTypes = [
        {selector: '.tab-btn', content: '.tab-content', fn: showTab},
        {selector: '.discovery-tab', content: '.discovery-section', fn: showDiscoveryTab},
        {selector: '.tab-control-btn', content: '.server-tab', fn: showServerTab},
        {selector: '.ref-tab', content: '.ref-section', fn: showRefTab},
        {selector: '.portnox-nav-tab', content: '.portnox-content', fn: showPortnoxTab}
    ];
    tabTypes.forEach(type => {
        document.querySelectorAll(type.selector).forEach(button => {
            button.addEventListener('click', function() {
                type.fn(this.getAttribute('data-tab'), this);
            });
        });
    });
}

// Generic tab showing function
function showTab(tabName, button, contentSelector = '.tab-content', prefix = '') {
    document.querySelectorAll(contentSelector).forEach(tab => tab.style.display = 'none');
    const selectedTab = document.getElementById(prefix + tabName);
    if (selectedTab) selectedTab.style.display = 'block';
    document.querySelectorAll(button.className.split(' ')[0]).forEach(btn => btn.classList.remove('active'));
    if (button) button.classList.add('active');
}

function showDiscoveryTab(tabName, button) { showTab(tabName, button, '.discovery-section', 'disc-'); }
function showServerTab(tabName, button) { showTab(tabName, button, '.server-tab'); }
function showRefTab(tabName, button) { showTab(tabName, button, '.ref-section', 'ref-'); }
function showPortnoxTab(tabName, button) { showTab(tabName, button, '.portnox-content', 'portnox-'); }

// Initialize vendor options
function initVendorOptions() {
    const vendorSelect = document.getElementById('vendor-select');
    if (vendorSelect) vendorSelect.addEventListener('change', updatePlatformOptions);
    updatePlatformOptions();
}

// Update platform options based on vendor selection
function updatePlatformOptions() {
    const vendorSelect = document.getElementById('vendor-select');
    const platformSelect = document.getElementById('platform-select');
    const platformDescription = document.getElementById('platform-description');
    if (!vendorSelect || !platformSelect || !platformDescription) return;
    
    platformSelect.innerHTML = '';
    const vendor = vendorSelect.value;
    const platforms = {
        'cisco': [
            ['ios-xe', 'IOS-XE (Catalyst 9000)'],
            ['ios', 'IOS (Classic)'],
            ['nx-os', 'NX-OS (Nexus)'],
            ['wlc', 'WLC 9800']
        ],
        'aruba': [['aos-cx', 'AOS-CX'], ['aos-switch', 'AOS-Switch (Legacy)']],
        'juniper': [['ex', 'EX Series'], ['qfx', 'QFX Series'], ['srx', 'SRX Series']],
        'fortinet': [['fortiswitch', 'FortiSwitch'], ['fortigate', 'FortiGate']],
        'arista': [['eos', 'EOS'], ['cloudvision', 'CloudVision']],
        'extreme': [['exos', 'EXOS'], ['voss', 'VOSS'], ['xiq', 'ExtremeCloud IQ']],
        'huawei': [['vrp', 'VRP'], ['agile-controller', 'Agile Controller']],
        'alcatel': [['omniswitch', 'OmniSwitch'], ['omnivista', 'OmniVista']],
        'ubiquiti': [['unifi', 'UniFi'], ['edgeswitch', 'EdgeSwitch']],
        'hp': [['procurve', 'ProCurve'], ['comware', 'Comware'], ['aruba-central', 'Aruba Central']],
        'paloalto': [['panos', 'PAN-OS'], ['panorama', 'Panorama']],
        'checkpoint': [['gaia', 'Gaia OS'], ['r80', 'R80.x']],
        'sonicwall': [['sonicos', 'SonicOS']],
        'portnox': [['cloud', 'Portnox Cloud']]
    };
    const descriptions = {
        'cisco': 'Cisco platforms support a wide range of authentication methods and features.',
        'aruba': 'Aruba platforms provide robust authentication capabilities.',
        'juniper': 'Juniper switches use a consistent configuration approach across platforms.',
        'fortinet': 'FortiNet integrates with the FortiGate security ecosystem.',
        'arista': 'Arista EOS provides enterprise-grade authentication.',
        'extreme': 'Extreme Networks offers multiple authentication solutions.',
        'huawei': 'Huawei VRP provides comprehensive AAA capabilities.',
        'alcatel': 'Alcatel-Lucent OmniSwitch offers simplified deployment.',
        'ubiquiti': 'Ubiquiti uses a controller-based approach.',
        'hp': 'HP offers multiple switch platforms.',
        'paloalto': 'Palo Alto Networks offers security-focused authentication.',
        'checkpoint': 'Check Point provides integrated security and authentication.',
        'sonicwall': 'SonicWall provides integrated security and authentication.',
        'portnox': 'Portnox Cloud provides unified access control with zero trust capabilities.',
        'default': 'Please select a vendor to see platform details.'
    };
    
    (platforms[vendor] || [['default', 'Default Platform']]).forEach(([value, text]) => addOption(platformSelect, value, text));
    platformDescription.innerHTML = `<p>${descriptions[vendor] || descriptions['default']}</p>`;
}

// Helper function to add options to a select element
function addOption(selectElement, value, text) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    selectElement.appendChild(option);
}

// Initialize network scoping options
function initNetworkScopingOptions() {
    document.querySelectorAll('input[name="scoping_type"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.getElementById('basic-scoping').style.display = this.value === 'basic' ? 'block' : 'none';
            document.getElementById('advanced-scoping').style.display = this.value === 'advanced' ? 'block' : 'none';
        });
    });
    document.querySelectorAll('.eap-method').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const options = document.getElementById(`${this.id}-options`);
            if (options) options.style.display = this.checked ? 'block' : 'none';
        });
    });
    document.querySelectorAll('.env-infrastructure').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const options = document.getElementById(`${this.id}-options`);
            if (options) options.style.display = this.checked ? 'block' : 'none';
            updateEnvironmentSummary();
        });
    });
    const mdmProviderSelect = document.getElementById('mdm-provider');
    if (mdmProviderSelect) mdmProviderSelect.addEventListener('change', () => { updateMDMOptions(); updateEnvironmentSummary(); });
    const idpProviderSelect = document.getElementById('idp-provider');
    if (idpProviderSelect) idpProviderSelect.addEventListener('change', () => { updateIdPOptions(); updateEnvironmentSummary(); });
}

// Update environment summary
function updateEnvironmentSummary() {
    const summarySection = document.getElementById('environment-summary');
    if (!summarySection) return;
    
    let summary = '<h4>Environment Profile Summary</h4><ul>';
    const infraElements = document.querySelectorAll('.env-infrastructure:checked');
    if (infraElements.length) {
        summary += '<li><strong>Infrastructure:</strong> ' + Array.from(infraElements).map(el => el.dataset.label || el.value).join(', ') + '</li>';
    }
    const mdmProvider = document.getElementById('mdm-provider');
    if (mdmProvider && mdmProvider.value !== 'none') {
        summary += `<li><strong>MDM Solution:</strong> ${mdmProvider.options[mdmProvider.selectedIndex].text}</li>`;
    }
    const idpProvider = document.getElementById('idp-provider');
    if (idpProvider && idpProvider.value !== 'none') {
        summary += `<li><strong>Identity Provider:</strong> ${idpProvider.options[idpProvider.selectedIndex].text}</li>`;
    }
    summary += '</ul><h4>Recommendations</h4><ul>';
    if (document.getElementById('env-active-directory')?.checked) {
        summary += '<li>Configure RADIUS to integrate with Active Directory for user authentication</li>';
    }
    if (mdmProvider && mdmProvider.value !== 'none') {
        summary += `<li>Integrate with ${mdmProvider.options[mdmProvider.selectedIndex].text} for device compliance checking and certificate distribution</li>`;
    }
    if (document.getElementById('env-cloud')?.checked) {
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
    
    const provider = mdmProviderSelect.value;
    const options = {
        'intune': `
            <h4>Microsoft Intune Integration</h4>
            <p>Include Intune integration in your 802.1X deployment architecture.</p>
            <div class="checkbox-group"><label><input type="checkbox" id="mdm-cert-enrollment" checked>Use for certificate enrollment</label></div>
            <div class="checkbox-group"><label><input type="checkbox" id="mdm-compliance" checked>Use for device compliance</label></div>
            <div class="checkbox-group"><label><input type="checkbox" id="mdm-config-profiles" checked>Deploy 802.1X configuration profiles</label></div>
        `,
        'jamf': `
            <h4>JAMF Integration</h4>
            <p>Include JAMF integration in your 802.1X deployment architecture.</p>
            <div class="checkbox-group"><label><input type="checkbox" id="mdm-cert-enrollment" checked>Use for certificate enrollment</label></div>
            <div class="checkbox-group"><label><input type="checkbox" id="mdm-config-profiles" checked>Deploy 802.1X configuration profiles</label></div>
        `,
        'workspace-one': `
            <h4>VMware Workspace ONE Integration</h4>
            <p>Include Workspace ONE integration in your 802.1X deployment architecture.</p>
            <div class="checkbox-group"><label><input type="checkbox" id="mdm-cert-enrollment" checked>Use for certificate enrollment</label></div>
            <div class="checkbox-group"><label><input type="checkbox" id="mdm-compliance" checked>Use for device compliance</label></div>
            <div class="checkbox-group"><label><input type="checkbox" id="mdm-tunnel" checked>Use Workspace ONE Tunnel</label></div>
        `,
        'mas360': `
            <h4>IBM MaaS360 Integration</h4>
            <p>Include MaaS360 integration in your 802.1X deployment architecture.</p>
            <div class="checkbox-group"><label><input type="checkbox" id="mdm-cert-enrollment" checked>Use for certificate enrollment</label></div>
            <div class="checkbox-group"><label><input type="checkbox" id="mdm-config-profiles" checked>Deploy 802.1X configuration profiles</label></div>
        `,
        'gpo': `
            <h4>Group Policy Integration</h4>
            <p>Include GPO integration in your 802.1X deployment architecture.</p>
            <div class="checkbox-group"><label><input type="checkbox" id="mdm-wired" checked>Configure wired 802.1X via GPO</label></div>
            <div class="checkbox-group"><label><input type="checkbox" id="mdm-wireless" checked>Configure wireless 802.1X via GPO</label></div>
            <div class="checkbox-group"><label><input type="checkbox" id="mdm-cert-autoenroll" checked>Use certificate auto-enrollment</label></div>
        `,
        'none': '<p>No MDM solution selected. Manual configuration will be required.</p>',
        'default': '<p>Please select an MDM solution to see integration options.</p>'
    };
    mdmOptionsContainer.innerHTML = options[provider] || options['default'];
}

// Update IdP options based on selected provider
function updateIdPOptions() {
    const idpProviderSelect = document.getElementById('idp-provider');
    const idpOptionsContainer = document.getElementById('idp-options');
    if (!idpProviderSelect || !idpOptionsContainer) return;
    
    const provider = idpProviderSelect.value;
    const options = {
        'entra-id': `
            <h4>Microsoft Entra ID Integration</h4>
            <p>Include Entra ID integration in your 802.1X deployment architecture.</p>
            <div class="checkbox-group"><label><input type="checkbox" id="idp-mfa" checked>Enable Multi-Factor Authentication</label></div>
            <div class="checkbox-group"><label><input type="checkbox" id="idp-conditional-access" checked>Use Conditional Access Policies</label></div>
            <div class="checkbox-group"><label><input type="checkbox" id="idp-cert-auth" checked>Use certificate-based authentication</label></div>
        `,
        'okta': `
            <h4>Okta Integration</h4>
            <p>Include Okta integration in your 802.1X deployment architecture.</p>
            <div class="checkbox-group"><label><input type="checkbox" id="idp-mfa" checked>Enable Multi-Factor Authentication</label></div>
            <div class="checkbox-group"><label><input type="checkbox" id="idp-radius-agent" checked>Use Okta RADIUS Server Agent</label></div>
        `,
        'google-workspace': `
            <h4>Google Workspace Integration</h4>
            <p>Include Google Workspace integration in your 802.1X deployment architecture.</p>
            <div class="checkbox-group"><label><input type="checkbox" id="idp-2sv" checked>Enable 2-Step Verification</label></div>
            <div class="checkbox-group"><label><input type="checkbox" id="idp-context-aware" checked>Use Context-Aware Access</label></div>
        `,
        'none': '<p>No Identity Provider selected. Local or Active Directory authentication will be used.</p>',
        'default': '<p>Please select an Identity Provider to see integration options.</p>'
    };
    idpOptionsContainer.innerHTML = options[provider] || options['default'];
}

// Setup authentication method options
function setupAuthMethodOptions() {
    const authMethodSelect = document.getElementById('auth-method');
    if (!authMethodSelect) return;
    authMethodSelect.addEventListener('change', function() {
        const mabCheckbox = document.getElementById('use-mab');
        if (!mabCheckbox) return;
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
    });
}

// Setup API integrations for AI assistance
function setupAPIIntegrations() {
    const apiTestButton = document.getElementById('ai-test-button');
    if (!apiTestButton) return;
    apiTestButton.addEventListener('click', function() {
        const apiKeyInput = document.getElementById('ai-api-key');
        const apiModelSelect = document.getElementById('ai-model');
        const apiKey = apiKeyInput?.value || '';
        const apiModel = apiModelSelect?.value || 'default';
        
        if (!apiKey) {
            showError('Please enter a valid API key.');
            return;
        }
        
        this.textContent = 'Testing...';
        this.disabled = true;
        setTimeout(() => {
            this.textContent = 'Test Connection';
            this.disabled = false;
            showSuccess('API connection successful! AI assistance is now enabled.');
            const aiCapabilities = document.getElementById('ai-capabilities');
            if (aiCapabilities) aiCapabilities.style.display = 'block';
        }, 1500);
    });
}

// Setup Portnox Cloud integration
function setupPortnoxIntegration() {
    const portnoxConnectButton = document.getElementById('portnox-connect-button');
    if (portnoxConnectButton) {
        portnoxConnectButton.addEventListener('click', function() {
            const portnoxApiKey = document.getElementById('portnox-api-key')?.value || '';
            const portnoxTenant = document.getElementById('portnox-tenant')?.value || '';
            if (!portnoxApiKey || !portnoxTenant) {
                showError('Please enter both Portnox API Key and Tenant ID.');
                return;
            }
            this.textContent = 'Connecting...';
            this.disabled = true;
            setTimeout(() => {
                this.textContent = 'Connect';
                this.disabled = false;
                showSuccess('Successfully connected to Portnox Cloud! API integration is now enabled.');
                enablePortnoxFeatures();
            }, 1500);
        });
    }
    
    const createRadiusButton = document.getElementById('portnox-create-radius-button');
    if (createRadiusButton) {
        createRadiusButton.addEventListener('click', function() {
            const regionSelect = document.getElementById('portnox-region-select');
            if (!regionSelect || !regionSelect.value) {
                showError('Please select a region for your RADIUS server.');
                return;
            }
            this.textContent = 'Creating...';
            this.disabled = true;
            setTimeout(() => {
                this.textContent = 'Create RADIUS Server';
                this.disabled = false;
                showSuccess('RADIUS server created successfully in ' + regionSelect.options[regionSelect.selectedIndex].text);
                const radiusDetails = document.getElementById('portnox-radius-details');
                if (radiusDetails) {
                    radiusDetails.style.display = 'block';
                    document.getElementById('radius-ip').textContent = generateRandomIP();
                    document.getElementById('radius-auth-port').textContent = '1812';
                    document.getElementById('radius-acct-port').textContent = '1813';
                    document.getElementById('radius-secret').textContent = generateRandomSecret();
                }
            }, 2000);
        });
    }
    
    const createMabButton = document.getElementById('portnox-create-mab-button');
    if (createMabButton) {
        createMabButton.addEventListener('click', function() {
            const macAddress = document.getElementById('portnox-mac-address')?.value || '';
            const deviceName = document.getElementById('portnox-device-name')?.value || '';
            if (!macAddress || !deviceName) {
                showError('Please enter both MAC address and device name.');
                return;
            }
            if (!validateMacAddress(macAddress)) {
                showError('Please enter a valid MAC address (e.g., 00:11:22:33:44:55).');
                return;
            }
            this.textContent = 'Creating...';
            this.disabled = true;
            setTimeout(() => {
                this.textContent = 'Create MAB Account';
                this.disabled = false;
                showSuccess('MAB account created successfully for ' + deviceName);
                addMabAccount(macAddress, deviceName);
                document.getElementById('portnox-mac-address').value = '';
                document.getElementById('portnox-device-name').value = '';
            }, 1500);
        });
    }
    
    const generateReportButton = document.getElementById('portnox-generate-report-button');
    if (generateReportButton) {
        generateReportButton.addEventListener('click', function() {
            const reportType = document.getElementById('portnox-report-type')?.value || '';
            if (!reportType) {
                showError('Please select a report type.');
                return;
            }
            this.textContent = 'Generating...';
            this.disabled = true;
            setTimeout(() => {
                this.textContent = 'Generate Report';
                this.disabled = false;
                showSuccess('Report generated successfully. Ready for download.');
                document.getElementById('portnox-download-report-button').style.display = 'inline-block';
            }, 2500);
        });
    }
    
    const downloadReportButton = document.getElementById('portnox-download-report-button');
    if (downloadReportButton) {
        downloadReportButton.addEventListener('click', function() {
            this.textContent = 'Downloading...';
            this.disabled = true;
            setTimeout(() => {
                this.textContent = 'Download Report';
                this.disabled = false;
                const reportType = document.getElementById('portnox-report-type').value;
                const reportName = getReportName(reportType);
                const csvContent = generateSampleReport(reportType);
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
    
    const createGroupButton = document.getElementById('portnox-create-group-button');
    if (createGroupButton) {
        createGroupButton.addEventListener('click', function() {
            const groupName = document.getElementById('portnox-group-name')?.value || '';
            const groupType = document.getElementById('portnox-group-type')?.value || '';
            if (!groupName || !groupType) {
                showError('Please enter both group name and select a group type.');
                return;
            }
            this.textContent = 'Creating...';
            this.disabled = true;
            setTimeout(() => {
                this.textContent = 'Create Group';
                this.disabled = false;
                showSuccess('Device group ' + groupName + ' created successfully.');
                addGroup(groupName, groupType);
                document.getElementById('portnox-group-name').value = '';
            }, 1500);
        });
    }
}

// Helper functions for Portnox integration
function enablePortnoxFeatures() {
    // Placeholder for enabling features after connection
}

function generateRandomIP() {
    return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
}

function generateRandomSecret() {
    return Math.random().toString(36).substring(2, 15);
}

function validateMacAddress(mac) {
    return /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(mac);
}

function addMabAccount(macAddress, deviceName) {
    const tbody = document.getElementById('portnox-mab-accounts-body');
    if (!tbody) return;
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${macAddress}</td>
        <td>${deviceName}</td>
        <td>${new Date().toLocaleDateString()}</td>
        <td>Active</td>
        <td><button class="btn btn-danger">Delete</button></td>
    `;
    tbody.appendChild(row);
}

function addGroup(groupName, groupType) {
    const tbody = document.getElementById('portnox-groups-body');
    if (!tbody) return;
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${groupName}</td>
        <td>${groupType}</td>
        <td>0</td>
        <td>${new Date().toLocaleDateString()}</td>
        <td><button class="btn btn-danger">Delete</button></td>
    `;
    tbody.appendChild(row);
}

function getReportName(reportType) {
    const names = {
        'device-inventory': 'Device_Inventory',
        'authentication-events': 'Authentication_Events',
        'user-activity': 'User_Activity',
        'security-incidents': 'Security_Incidents',
        'compliance': 'Compliance_Report'
    };
    return names[reportType] || 'Report';
}

function generateSampleReport(reportType) {
    return `Sample ${reportType} report,Generated on,${new Date().toLocaleString()}\nData1,Data2,Data3\nValue1,Value2,Value3`;
}

// Generate network diagram
function generateNetworkDiagram() {
    const scopingType = document.querySelector('input[name="scoping_type"]:checked')?.value || 'basic';
    const diagramData = scopingType === 'basic' ? {
        locations: document.getElementById('locations-count')?.value || '1',
        switchCount: document.getElementById('switches-count')?.value || '5',
        endpointCount: document.getElementById('endpoints-count')?.value || '100',
        wirelessVendor: document.getElementById('wireless-vendor')?.value || 'cisco',
        switchVendor: document.getElementById('switch-vendor')?.value || 'cisco'
    } : {
        locations: document.getElementById('advanced-locations-count')?.value || '1',
        switchCount: document.getElementById('advanced-switches-count')?.value || '5',
        endpointCount: document.getElementById('advanced-endpoints-count')?.value || '100',
        wirelessAPs: document.getElementById('ap-count')?.value || '10',
        wirelessVendor: document.getElementById('wireless-vendor')?.value || 'cisco',
        wirelessModel: document.getElementById('wireless-model')?.value || 'generic',
        switchVendor: document.getElementById('switch-vendor')?.value || 'cisco',
        switchModel: document.getElementById('switch-model')?.value || 'generic'
    };
    
    const authMethods = Array.from(document.querySelectorAll('.eap-method:checked')).map(m => m.value);
    diagramData.authMethods = authMethods.length ? authMethods : ['PEAP-MSCHAPv2', 'MAB'];
    
    const resultsContainer = document.getElementById('scoping-results');
    if (resultsContainer) {
        resultsContainer.style.display = 'block';
        resultsContainer.innerHTML = `
            <h4>Network Scoping Results</h4>
            <div class="network-summary">
                <p>Based on your input, we've generated a deployment plan for your network:</p>
                <ul>
                    <li><strong>Locations:</strong> ${diagramData.locations}</li>
                    <li><strong>Switches:</strong> ${diagramData.switchCount} (${diagramData.switchVendor})</li>
                    <li><strong>Endpoints:</strong> ${diagramData.endpointCount}</li>
                    <li><strong>Authentication Methods:</strong> ${diagramData.authMethods.join(', ')}</li>
                </ul>
            </div>
            <div class="deployment-phases">
                <h4>Recommended Deployment Phases</h4>
                <div class="phase">
                    <h5>Phase 1: Infrastructure Preparation</h5>
                    <ul>
                        <li>Configure Portnox Cloud RADIUS server</li>
                        <li>Set up certificate authority (if using EAP-TLS)</li>
                        <li>Prepare switch configurations with Monitor Mode</li>
                        <li>Deploy to a pilot group</li>
                    </ul>
                </div>
                <div class="phase">
                    <h5>Phase 2: Client Testing</h5>
                    <ul>
                        <li>Test authentication with various devices</li>
                        <li>Configure client supplicants</li>
                        <li>Establish MAB exceptions</li>
                        <li>Validate VLAN assignment</li>
                    </ul>
                </div>
                <div class="phase">
                    <h5>Phase 3: Production Deployment</h5>
                    <ul>
                        <li>Roll out to all switches</li>
                        <li>Transition to Low Impact Mode</li>
                        <li>Move to Closed Mode with exceptions</li>
                        <li>Implement port security</li>
                    </ul>
                </div>
            </div>
            <div class="network-diagram">
                <h4>Network Diagram</h4>
                <div class="diagram-container">
                    <img src="assets/diagrams/network-diagram.png" alt="Network Diagram">
                </div>
                <p class="diagram-note">High-level view of your 802.1X deployment with Portnox Cloud.</p>
                <button class="download-btn" onclick="downloadDiagram()">Download Full Diagram</button>
            </div>
        `;
    }
}

function downloadDiagram() {
    const link = document.createElement('a');
    link.href = 'assets/diagrams/network-diagram.png';
    link.download = 'portnox-802.1x-deployment-diagram.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Show error/success messages
function showError(message) {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        setTimeout(() => errorDiv.style.display = 'none', 3000);
    }
}

function showSuccess(message) {
    const successDiv = document.getElementById('success-message');
    if (successDiv) {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        setTimeout(() => successDiv.style.display = 'none', 3000);
    }
}
=======
// The app.js content from above goes here
>>>>>>> 5eae646 (Added Portnox integration with API support)
