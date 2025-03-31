// Dot1Xer Supreme - Main JavaScript

// Current step in the configurator
let currentStep = 1;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize UI components
  initUI();
  
  // Set up event listeners
  setupEventListeners();
});

// Initialize UI components
function initUI() {
  // Show first step of configurator
  showStep(1);
  
  // Set up vendor/platform options
  updatePlatformOptions();
  
  // Initialize accordion sections - force open the first accordion in each group
  initAccordions();
  
  // Initialize tooltip library if present
  if (typeof tippy !== 'undefined') {
    tippy('[data-tippy-content]');
  }
}

// Set up event listeners
function setupEventListeners() {
  // Vendor select change
  const vendorSelect = document.getElementById('vendor-select');
  if (vendorSelect) {
    vendorSelect.addEventListener('change', updatePlatformOptions);
  }
  
  // Platform select change
  const platformSelect = document.getElementById('platform-select');
  if (platformSelect) {
    platformSelect.addEventListener('change', updateVendorSpecificOptions);
  }
  
  // Auth method change
  const authMethodSelect = document.getElementById('auth-method');
  if (authMethodSelect) {
    authMethodSelect.addEventListener('change', updateAuthOptions);
  }
  
  // RADIUS load balancing checkbox
  const loadBalanceCheckbox = document.getElementById('radius-load-balance');
  if (loadBalanceCheckbox) {
    loadBalanceCheckbox.addEventListener('change', function() {
      const loadBalanceOptions = document.getElementById('load-balance-options');
      if (loadBalanceOptions) {
        loadBalanceOptions.style.display = this.checked ? 'block' : 'none';
      }
    });
  }
  
  // Pre-auth ACL checkbox
  const preAuthAclCheckbox = document.getElementById('enable-preauth-acl');
  if (preAuthAclCheckbox) {
    preAuthAclCheckbox.addEventListener('change', function() {
      const preAuthAclOptions = document.getElementById('preauth-acl-options');
      if (preAuthAclOptions) {
        preAuthAclOptions.style.display = this.checked ? 'block' : 'none';
      }
    });
  }
  
  // RADIUS testing checkbox
  const radiusTestingCheckbox = document.getElementById('radius-testing');
  if (radiusTestingCheckbox) {
    radiusTestingCheckbox.addEventListener('change', function() {
      const testingOptions = document.getElementById('testing-options');
      if (testingOptions) {
        testingOptions.style.display = this.checked ? 'block' : 'none';
      }
    });
  }
  
  // RADIUS idle-time testing checkbox
  const idleTimeCheckbox = document.getElementById('testing-idle-time');
  if (idleTimeCheckbox) {
    idleTimeCheckbox.addEventListener('change', function() {
      const idleTimeOptions = document.getElementById('idle-time-options');
      if (idleTimeOptions) {
        idleTimeOptions.style.display = this.checked ? 'block' : 'none';
      }
    });
  }
  
  // TACACS command auth checkbox
  const authCommandsCheckbox = document.getElementById('auth-commands');
  if (authCommandsCheckbox) {
    authCommandsCheckbox.addEventListener('change', function() {
      const commandAuthOptions = document.getElementById('command-auth-options');
      if (commandAuthOptions) {
        commandAuthOptions.style.display = this.checked ? 'block' : 'none';
      }
    });
  }
  
  // TACACS command acct checkbox
  const acctCommandsCheckbox = document.getElementById('acct-commands');
  if (acctCommandsCheckbox) {
    acctCommandsCheckbox.addEventListener('change', function() {
      const commandAcctOptions = document.getElementById('command-acct-options');
      if (commandAcctOptions) {
        commandAcctOptions.style.display = this.checked ? 'block' : 'none';
      }
    });
  }
  
  // Import source radio
  const importSourceRadios = document.querySelectorAll('input[name="import_source"]');
  importSourceRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      const fileImport = document.getElementById('file-import');
      const textImport = document.getElementById('text-import');
      if (fileImport && textImport) {
        fileImport.style.display = this.value === 'file' ? 'block' : 'none';
        textImport.style.display = this.value === 'text' ? 'block' : 'none';
      }
    });
  });
  
  // Credential type change
  const credTypeSelect = document.getElementById('cred-type');
  if (credTypeSelect) {
    credTypeSelect.addEventListener('change', function() {
      const sshCreds = document.getElementById('ssh-creds');
      const snmpCreds = document.getElementById('snmp-creds');
      const apiCreds = document.getElementById('api-creds');
      
      if (sshCreds && snmpCreds && apiCreds) {
        sshCreds.style.display = this.value === 'ssh' ? 'block' : 'none';
        snmpCreds.style.display = this.value === 'snmp' ? 'block' : 'none';
        apiCreds.style.display = this.value === 'api' ? 'block' : 'none';
      }
    });
  }
  
  // SNMP version change
  const snmpVersionSelect = document.getElementById('snmp-version');
  if (snmpVersionSelect) {
    snmpVersionSelect.addEventListener('change', function() {
      const snmpV2Options = document.getElementById('snmp-v2-options');
      const snmpV3Options = document.getElementById('snmp-v3-options');
      
      if (snmpV2Options && snmpV3Options) {
        snmpV2Options.style.display = this.value === 'v2c' ? 'block' : 'none';
        snmpV3Options.style.display = this.value === 'v3' ? 'block' : 'none';
      }
    });
  }
  
  // SSH enable checkbox
  const sshEnableCheckbox = document.getElementById('ssh-enable');
  if (sshEnableCheckbox) {
    sshEnableCheckbox.addEventListener('change', function() {
      const enableCreds = document.getElementById('enable-creds');
      if (enableCreds) {
        enableCreds.style.display = this.checked ? 'block' : 'none';
      }
    });
  }
  
  // Scan credentials dropdown
  const scanCredentialsSelect = document.getElementById('scan-credentials');
  if (scanCredentialsSelect) {
    scanCredentialsSelect.addEventListener('change', function() {
      if (this.value === 'new') {
        const credentialsModal = document.getElementById('credentials-modal');
        if (credentialsModal) {
          credentialsModal.style.display = 'flex';
          this.value = ''; // Reset selection
        }
      }
    });
  }
  
  // Network scoping radio buttons
  const scopingTypeRadios = document.querySelectorAll('input[name="scoping_type"]');
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
  
  // Listen for changes to the wireless vendor selection
  const wirelessVendorSelect = document.getElementById('wireless-vendor');
  if (wirelessVendorSelect) {
    wirelessVendorSelect.addEventListener('change', updateWirelessModels);
  }
  
  // Listen for changes to the switch vendor selection
  const switchVendorSelect = document.getElementById('switch-vendor');
  if (switchVendorSelect) {
    switchVendorSelect.addEventListener('change', updateSwitchModels);
  }
  
  // Setup EAP method checkboxes
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

// Initialize accordion functionality
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach((header, index) => {
    // Add click event listener
    header.addEventListener('click', function() {
      toggleAccordion(this);
    });
    
    // Open the first accordion in each tab/section by default
    if (isFirstInSection(header)) {
      toggleAccordion(header);
    }
  });
}

// Check if an accordion header is the first one in its section
function isFirstInSection(header) {
  const parent = header.parentElement.parentElement;
  const accordions = parent.querySelectorAll('.accordion');
  return header === accordions[0].querySelector('.accordion-header');
}

// Show a specific tab
function showTab(tabName, button) {
  // Hide all tabs
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(tab => tab.style.display = 'none');
  
  // Show the selected tab
  document.getElementById(tabName).style.display = 'block';
  
  // Update active tab button
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => btn.classList.remove('active'));
  if (button) button.classList.add('active');
}

// Show a server tab within the server configuration
function showServerTab(tabName, button) {
  // Hide all server tabs
  const serverTabs = document.querySelectorAll('.server-tab');
  serverTabs.forEach(tab => tab.style.display = 'none');
  
  // Show the selected tab
  document.getElementById(tabName).style.display = 'block';
  
  // Update active tab button
  const tabButtons = document.querySelectorAll('.tab-control-btn');
  tabButtons.forEach(btn => btn.classList.remove('active'));
  if (button) button.classList.add('active');
}

// Show a specific step in the configurator
function showStep(step) {
  // Hide all steps
  const steps = document.querySelectorAll('.step-content');
  steps.forEach(s => s.style.display = 'none');
  
  // Show the requested step
  document.getElementById('step-' + step).style.display = 'block';
  
  // Update step indicator
  const indicators = document.querySelectorAll('.step');
  indicators.forEach(i => i.classList.remove('active'));
  
  const currentIndicator = document.querySelector(`.step[data-step="${step}"]`);
  if (currentIndicator) currentIndicator.classList.add('active');
  
  // Update current step
  currentStep = step;
}

// Navigate to next step
function goToStep(step) {
  // Validate current step before proceeding
  if (step > currentStep && !validateStep(currentStep)) {
    return false;
  }
  
  // Show the requested step
  showStep(step);
  
  return true;
}

// Validate the current step
function validateStep(step) {
  switch(step) {
    case 1:
      // Validate vendor/platform selection
      return true;
    case 2:
      // Validate authentication method
      return true;
    case 3:
      // Validate server information
      const radiusIp1 = document.getElementById('radius-ip-1').value;
      const radiusKey1 = document.getElementById('radius-key-1').value;
      
      if (!radiusIp1 || !radiusKey1) {
        showError('Primary RADIUS server information is required');
        return false;
      }
      return true;
    case 4:
      // Validate VLAN information
      const dataVlan = document.getElementById('data-vlan').value;
      if (!dataVlan) {
        showError('Data VLAN is required');
        return false;
      }
      return true;
    case 5:
      // Validate advanced options
      return true;
    default:
      return true;
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
  }
}

// Toggle accordion sections
function toggleAccordion(element) {
  element.classList.toggle('active');
  const content = element.nextElementSibling;
  
  if (content.style.display === 'block') {
    content.style.display = 'none';
    // Update icon
    const icon = element.querySelector('.accordion-icon');
    if (icon) {
      icon.textContent = '+';
    }
  } else {
    content.style.display = 'block';
    // Update icon
    const icon = element.querySelector('.accordion-icon');
    if (icon) {
      icon.textContent = '-';
    }
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
      platformDescription.innerHTML = '<p>Cisco platforms support a wide range of authentication methods and features:</p>' +
        '<ul>' +
        '<li><strong>IOS-XE:</strong> Supports IBNS 2.0 with flexible policy maps and both open and closed authentication modes.</li>' +
        '<li><strong>NX-OS:</strong> Offers 802.1X and MAB with advanced device tracking.</li>' +
        '<li><strong>IOS:</strong> Legacy platform with traditional 802.1X implementation.</li>' +
        '<li><strong>WLC:</strong> Wireless controller with integrated RADIUS support.</li>' +
        '</ul>';
      break;
    case 'aruba':
      addOption(platformSelect, 'aos-cx', 'AOS-CX');
      addOption(platformSelect, 'aos-switch', 'AOS-Switch (Legacy)');
      platformDescription.innerHTML = '<p>Aruba platforms provide robust authentication capabilities:</p>' +
        '<ul>' +
        '<li><strong>AOS-CX:</strong> Modern architecture with simplified 802.1X and MAC authentication configuration.</li>' +
        '<li><strong>AOS-Switch:</strong> Legacy platform with traditional approach to port security.</li>' +
        '</ul>';
      break;
    case 'juniper':
      addOption(platformSelect, 'ex', 'EX Series');
      addOption(platformSelect, 'qfx', 'QFX Series');
      platformDescription.innerHTML = '<p>Juniper switches use a consistent configuration approach across platforms:</p>' +
        '<ul>' +
        '<li><strong>EX Series:</strong> Enterprise switching platforms with 802.1X, MAC-RADIUS, and captive portal.</li>' +
        '<li><strong>QFX Series:</strong> Data center switches with similar authentication capabilities.</li>' +
        '</ul>';
      break;
    case 'fortinet':
      addOption(platformSelect, 'fortiswitch', 'FortiSwitch');
      platformDescription.innerHTML = '<p>FortiSwitch integrates with the FortiGate security ecosystem:</p>' +
        '<ul>' +
        '<li><strong>FortiSwitch:</strong> 802.1X and MAC authentication with secure fabric integration and FortiGate controller-based management.</li>' +
        '</ul>';
      break;
    case 'arista':
      addOption(platformSelect, 'eos', 'EOS');
      platformDescription.innerHTML = '<p>Arista EOS provides enterprise-grade authentication:</p>' +
        '<ul>' +
        '<li><strong>EOS:</strong> Supports 802.1X, MAC authentication, and LLDP bypass for VoIP devices, with a focus on data center environments.</li>' +
        '</ul>';
      break;
    case 'extreme':
      addOption(platformSelect, 'exos', 'EXOS');
      addOption(platformSelect, 'voss', 'VOSS');
      platformDescription.innerHTML = '<p>Extreme Networks offers multiple authentication solutions:</p>' +
        '<ul>' +
        '<li><strong>EXOS:</strong> Uses NetLogin framework for 802.1X and MAC authentication with dynamic VLAN assignment.</li>' +
        '<li><strong>VOSS:</strong> Utilizes flexible VLAN-based access control and integrated RADIUS clients.</li>' +
        '</ul>';
      break;
    case 'huawei':
      addOption(platformSelect, 'vrp', 'VRP');
      platformDescription.innerHTML = '<p>Huawei VRP provides comprehensive AAA capabilities:</p>' +
        '<ul>' +
        '<li><strong>VRP:</strong> Supports 802.1X, MAC authentication bypass, and critical VLAN assignment with both global and interface-specific configurations.</li>' +
        '</ul>';
      break;
    case 'alcatel':
      addOption(platformSelect, 'omniswitch', 'OmniSwitch');
      platformDescription.innerHTML = '<p>Alcatel-Lucent OmniSwitch offers simplified deployment:</p>' +
        '<ul>' +
        '<li><strong>OmniSwitch:</strong> Uses Unified Network Profile (UNP) templates with 802.1X and MAC authentication for simplified deployment.</li>' +
        '</ul>';
      break;
    case 'ubiquiti':
      addOption(platformSelect, 'unifi', 'UniFi');
      platformDescription.innerHTML = '<p>Ubiquiti UniFi uses a controller-based approach:</p>' +
        '<ul>' +
        '<li><strong>UniFi:</strong> Requires configuration through the UniFi Network Controller rather than CLI, with profiles for 802.1X and RADIUS settings.</li>' +
        '</ul>';
      break;
    case 'hp':
      addOption(platformSelect, 'procurve', 'ProCurve');
      addOption(platformSelect, 'comware', 'Comware');
      platformDescription.innerHTML = '<p>HP offers multiple switch platforms:</p>' +
        '<ul>' +
        '<li><strong>ProCurve:</strong> Enterprise-grade authentication with 802.1X and MAC-based options.</li>' +
        '<li><strong>Comware:</strong> Advanced RADIUS integration with comprehensive AAA options.</li>' +
        '</ul>';
      break;
    default:
      addOption(platformSelect, 'default', 'Default Platform');
      platformDescription.innerHTML = '<p>Please select a vendor to see platform details.</p>';
  }
  
  // Trigger platform specific options update
  updateVendorSpecificOptions();
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
  
  // Adjust AAA options based on vendor capabilities
  adjustAAAOptions(vendor, platform);
}

// Adjust AAA options based on vendor capabilities
function adjustAAAOptions(vendor, platform) {
  // RADIUS CoA - not all vendors support it
  const coaCheckbox = document.getElementById('use-coa');
  if (coaCheckbox) {
    coaCheckbox.disabled = false;
    
    if (vendor === 'ubiquiti' || (vendor === 'hp' && platform === 'procurve')) {
      coaCheckbox.disabled = true;
      coaCheckbox.checked = false;
    }
  }
  
  // RADIUS server groups - not all vendors support them
  const radiusServerGroupInput = document.getElementById('radius-server-group');
  if (radiusServerGroupInput) {
    radiusServerGroupInput.disabled = false;
    
    if (vendor === 'ubiquiti' || (vendor === 'alcatel' && platform === 'omniswitch')) {
      radiusServerGroupInput.disabled = true;
      radiusServerGroupInput.value = 'RADIUS-SERVERS';
    }
  }
  
  // Load balancing - limited support
  const loadBalanceCheckbox = document.getElementById('radius-load-balance');
  if (loadBalanceCheckbox) {
    loadBalanceCheckbox.disabled = false;
    
    if (!(vendor === 'cisco' || vendor === 'juniper' || vendor === 'arista')) {
      loadBalanceCheckbox.disabled = true;
      loadBalanceCheckbox.checked = false;
    }
  }
  
  // IBNS 2.0 specific options
  const ibnsSection = document.getElementById('ibns-options');
  if (ibnsSection) {
    if (vendor === 'cisco' && platform === 'ios-xe') {
      ibnsSection.style.display = 'block';
    } else {
      ibnsSection.style.display = 'none';
    }
  }
  
  // TACACS options
  const tacacsOptions = document.getElementById('tacacs-options');
  if (tacacsOptions) {
    if (vendor === 'ubiquiti' || vendor === 'alcatel') {
      document.getElementById('use-tacacs').disabled = true;
      document.getElementById('use-tacacs').checked = false;
      tacacsOptions.style.display = 'none';
    } else {
      document.getElementById('use-tacacs').disabled = false;
    }
  }
}

// Add option to select element
function addOption(selectElement, value, text) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = text;
  selectElement.appendChild(option);
}

// Update authentication options based on method selection
function updateAuthOptions() {
  const authMethod = document.getElementById('auth-method').value;
  const mabCheckbox = document.getElementById('use-mab');
  
  if (mabCheckbox) {
    if (authMethod === 'dot1x-only') {
      mabCheckbox.checked = false;
      mabCheckbox.disabled = true;
    } else if (authMethod === 'mab-only') {
      mabCheckbox.checked = true;
      mabCheckbox.disabled = true;
    } else {
      mabCheckbox.checked = true;
      mabCheckbox.disabled = false;
    }
  }
}

// Show/Hide FAQ items
function toggleFaq(element) {
  const answer = element.nextElementSibling;
  const toggle = element.querySelector('.faq-toggle');
  
  answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
  toggle.textContent = answer.style.display === 'block' ? '-' : '+';
}

// Reference architecture tab selection
function showRefTab(tabName, button) {
  // Hide all ref sections
  const sections = document.querySelectorAll('.ref-section');
  sections.forEach(s => s.style.display = 'none');
  
  // Show the selected section
  document.getElementById('ref-' + tabName).style.display = 'block';
  
  // Update active tab button
  const tabButtons = document.querySelectorAll('.ref-tab');
  tabButtons.forEach(btn => btn.classList.remove('active'));
  if (button) button.classList.add('active');
}

// Discovery tab selection
function showDiscoveryTab(tabName, button) {
  // Hide all discovery sections
  const sections = document.querySelectorAll('.discovery-section');
  sections.forEach(s => s.style.display = 'none');
  
  // Show the selected section
  document.getElementById('disc-' + tabName).style.display = 'block';
  
  // Update active tab button
  const tabButtons = document.querySelectorAll('.discovery-tab');
  tabButtons.forEach(btn => btn.classList.remove('active'));
  if (button) button.classList.add('active');
}

// Help tab selection
function showHelpTab(tabName, button) {
  // Hide all help sections
  const sections = document.querySelectorAll('.help-section');
  sections.forEach(s => s.style.display = 'none');
  
  // Show the selected section
  document.getElementById('help-' + tabName).style.display = 'block';
  
  // Update active tab button
  const tabButtons = document.querySelectorAll('.help-tab');
  tabButtons.forEach(btn => btn.classList.remove('active'));
  if (button) button.classList.add('active');
}

// Modal controls
function closeCredentialsModal() {
  document.getElementById('credentials-modal').style.display = 'none';
}

function saveCredentials() {
  // In a real implementation, this would save the credentials
  // For demo purposes, just close the modal and update the dropdown
  const credName = document.getElementById('cred-name').value;
  if (!credName) {
    alert('Please provide a name for these credentials');
    return;
  }
  
  // Add to dropdown
  const scanCredentialsSelect = document.getElementById('scan-credentials');
  addOption(scanCredentialsSelect, 'saved-' + Date.now(), credName);
  
  // Select the new option
  scanCredentialsSelect.value = scanCredentialsSelect.options[scanCredentialsSelect.options.length - 1].value;
  
  // Close modal
  closeCredentialsModal();
}

// Network scan functions
function startNetworkScan() {
  const scanRange = document.getElementById('scan-range').value;
  
  if (!scanRange) {
    showError('Please enter an IP range to scan');
    return;
  }
  
  // Show scan results section
  document.querySelector('.scan-results').style.display = 'block';
  document.getElementById('scan-status').textContent = 'Scanning...';
  
  // Simulate progress
  const progressBar = document.querySelector('.progress');
  let progress = 0;
  
  const interval = setInterval(() => {
    progress += 5;
    progressBar.style.width = `${progress}%`;
    
    if (progress >= 100) {
      clearInterval(interval);
      document.getElementById('scan-status').textContent = 'Scan complete';
      populateSampleResults();
    }
  }, 200);
}

function populateSampleResults() {
  const tbody = document.querySelector('#scan-results-table tbody');
  tbody.innerHTML = '';
  
  // Sample data
  const devices = [
    { ip: '10.1.1.1', type: 'Switch', platform: 'Cisco Catalyst 9300', version: '17.3.4', aaa: 'Enabled' },
    { ip: '10.1.1.2', type: 'Switch', platform: 'Cisco Catalyst 9300', version: '17.3.4', aaa: 'Enabled' },
    { ip: '10.1.1.3', type: 'Switch', platform: 'Aruba 6300', version: '10.06.0010', aaa: 'Disabled' },
    { ip: '10.1.1.4', type: 'Router', platform: 'Cisco ISR 4451', version: '16.9.3', aaa: 'Partial' },
    { ip: '10.1.1.5', type: 'Switch', platform: 'Juniper EX4300', version: '20.4R1', aaa: 'Disabled' },
    { ip: '10.1.1.6', type: 'Switch', platform: 'Cisco Nexus 9300', version: '9.3.8', aaa: 'Enabled' }
  ];
  
  devices.forEach(device => {
    const row = document.createElement('tr');
    
    // IP Address
    const ipCell = document.createElement('td');
    ipCell.textContent = device.ip;
    row.appendChild(ipCell);
    
    // Device Type
    const typeCell = document.createElement('td');
    typeCell.textContent = device.type;
    row.appendChild(typeCell);
    
    // Platform
    const platformCell = document.createElement('td');
    platformCell.textContent = device.platform;
    row.appendChild(platformCell);
    
    // Version
    const versionCell = document.createElement('td');
    versionCell.textContent = device.version;
    row.appendChild(versionCell);
    
    // AAA Status
    const aaaCell = document.createElement('td');
    aaaCell.textContent = device.aaa;
    if (device.aaa === 'Enabled') {
      aaaCell.classList.add('status-enabled');
    } else if (device.aaa === 'Disabled') {
      aaaCell.classList.add('status-disabled');
    } else {
      aaaCell.classList.add('status-partial');
    }
    row.appendChild(aaaCell);
    
    // Action
    const actionCell = document.createElement('td');
    const analyzeBtn = document.createElement('button');
    analyzeBtn.textContent = 'Analyze';
    analyzeBtn.addEventListener('click', () => analyzeDevice(device.ip));
    actionCell.appendChild(analyzeBtn);
    row.appendChild(actionCell);
    
    tbody.appendChild(row);
  });
}

// Network Scoping Discovery Functions
function updateWirelessModels() {
  const wirelessVendor = document.getElementById('wireless-vendor').value;
  const wirelessModelSelect = document.getElementById('wireless-model');
  
  if (!wirelessModelSelect) return;
  
  // Clear existing options
  wirelessModelSelect.innerHTML = '';
  
  // Add models based on vendor
  switch (wirelessVendor) {
    case 'cisco':
      addOption(wirelessModelSelect, 'aironet-1800', 'Aironet 1800 Series');
      addOption(wirelessModelSelect, 'aironet-2800', 'Aironet 2800 Series');
      addOption(wirelessModelSelect, 'aironet-3800', 'Aironet 3800 Series');
      addOption(wirelessModelSelect, 'catalyst-9100', 'Catalyst 9100 Series');
      addOption(wirelessModelSelect, 'catalyst-9800', 'Catalyst 9800 Controller');
      break;
    case 'aruba':
      addOption(wirelessModelSelect, 'ap-303', 'AP-303/303P');
      addOption(wirelessModelSelect, 'ap-500', 'AP-500 Series');
      addOption(wirelessModelSelect, 'ap-510', 'AP-510 Series');
      addOption(wirelessModelSelect, 'ap-530', 'AP-530 Series');
      addOption(wirelessModelSelect, 'ap-550', 'AP-550 Series');
      addOption(wirelessModelSelect, 'mobility-controller', 'Mobility Controller');
      break;
    case 'meraki':
      addOption(wirelessModelSelect, 'mr30', 'MR30H');
      addOption(wirelessModelSelect, 'mr33', 'MR33');
      addOption(wirelessModelSelect, 'mr36', 'MR36');
      addOption(wirelessModelSelect, 'mr44', 'MR44');
      addOption(wirelessModelSelect, 'mr46', 'MR46');
      addOption(wirelessModelSelect, 'mr56', 'MR56');
      break;
    case 'ruckus':
      addOption(wirelessModelSelect, 'r510', 'R510');
      addOption(wirelessModelSelect, 'r550', 'R550');
      addOption(wirelessModelSelect, 'r610', 'R610');
      addOption(wirelessModelSelect, 'r650', 'R650');
      addOption(wirelessModelSelect, 'r720', 'R720');
      addOption(wirelessModelSelect, 'r750', 'R750');
      addOption(wirelessModelSelect, 'smartzone', 'SmartZone Controller');
      break;
    case 'ubiquiti':
      addOption(wirelessModelSelect, 'uap-ac-lite', 'UAP-AC-Lite');
      addOption(wirelessModelSelect, 'uap-ac-pro', 'UAP-AC-Pro');
      addOption(wirelessModelSelect, 'uap-nanohd', 'UAP-nanoHD');
      addOption(wirelessModelSelect, 'uap-flexhd', 'UAP-FlexHD');
      addOption(wirelessModelSelect, 'uap-ac-hd', 'UAP-AC-HD');
      addOption(wirelessModelSelect, 'unifi-controller', 'UniFi Controller');
      break;
    case 'extreme':
      addOption(wirelessModelSelect, 'ap302w', 'AP302W');
      addOption(wirelessModelSelect, 'ap410c', 'AP410C');
      addOption(wirelessModelSelect, 'ap460c', 'AP460C');
      addOption(wirelessModelSelect, 'ap505i', 'AP505i');
      addOption(wirelessModelSelect, 'ap510i', 'AP510i');
      addOption(wirelessModelSelect, 'ap550', 'AP550');
      addOption(wirelessModelSelect, 'exos-controller', 'EXOS Controller');
      break;
    default:
      addOption(wirelessModelSelect, 'generic', 'Generic Access Point');
  }
}

function updateSwitchModels() {
  const switchVendor = document.getElementById('switch-vendor').value;
  const switchModelSelect = document.getElementById('switch-model');
  
  if (!switchModelSelect) return;
  
  // Clear existing options
  switchModelSelect.innerHTML = '';
  
  // Add models based on vendor
  switch (switchVendor) {
    case 'cisco':
      addOption(switchModelSelect, 'catalyst-2960', 'Catalyst 2960 Series');
      addOption(switchModelSelect, 'catalyst-3650', 'Catalyst 3650 Series');
      addOption(switchModelSelect, 'catalyst-3850', 'Catalyst 3850 Series');
      addOption(switchModelSelect, 'catalyst-9200', 'Catalyst 9200 Series');
      addOption(switchModelSelect, 'catalyst-9300', 'Catalyst 9300 Series');
      addOption(switchModelSelect, 'catalyst-9400', 'Catalyst 9400 Series');
      addOption(switchModelSelect, 'catalyst-9500', 'Catalyst 9500 Series');
      addOption(switchModelSelect, 'nexus-3000', 'Nexus 3000 Series');
      addOption(switchModelSelect, 'nexus-5000', 'Nexus 5000 Series');
      addOption(switchModelSelect, 'nexus-7000', 'Nexus 7000 Series');
      addOption(switchModelSelect, 'nexus-9000', 'Nexus 9000 Series');
      break;
    case 'aruba':
      addOption(switchModelSelect, 'cx-6000', 'CX 6000 Series');
      addOption(switchModelSelect, 'cx-6100', 'CX 6100 Series');
      addOption(switchModelSelect, 'cx-6200', 'CX 6200 Series');
      addOption(switchModelSelect, 'cx-6300', 'CX 6300 Series');
      addOption(switchModelSelect, 'cx-6400', 'CX 6400 Series');
      addOption(switchModelSelect, 'cx-8320', 'CX 8320 Series');
      addOption(switchModelSelect, 'cx-8325', 'CX 8325 Series');
      addOption(switchModelSelect, 'cx-8360', 'CX 8360 Series');
      addOption(switchModelSelect, 'cx-8400', 'CX 8400 Series');
      break;
    case 'juniper':
      addOption(switchModelSelect, 'ex2300', 'EX2300 Series');
      addOption(switchModelSelect, 'ex3400', 'EX3400 Series');
      addOption(switchModelSelect, 'ex4100', 'EX4100 Series');
      addOption(switchModelSelect, 'ex4300', 'EX4300 Series');
      addOption(switchModelSelect, 'ex4400', 'EX4400 Series');
      addOption(switchModelSelect, 'ex4600', 'EX4600 Series');
      addOption(switchModelSelect, 'ex4650', 'EX4650 Series');
      addOption(switchModelSelect, 'qfx5110', 'QFX5110 Series');
      addOption(switchModelSelect, 'qfx5120', 'QFX5120 Series');
      addOption(switchModelSelect, 'qfx5130', 'QFX5130 Series');
      break;
    case 'extreme':
      addOption(switchModelSelect, 'x435', 'X435 Series');
      addOption(switchModelSelect, 'x440-g2', 'X440-G2 Series');
      addOption(switchModelSelect, 'x450-g2', 'X450-G2 Series');
      addOption(switchModelSelect, 'x460-g2', 'X460-G2 Series');
      addOption(switchModelSelect, 'x465', 'X465 Series');
      addOption(switchModelSelect, 'x590', 'X590 Series');
      addOption(switchModelSelect, 'x690', 'X690 Series');
      addOption(switchModelSelect, 'x870', 'X870 Series');
      break;
    case 'hp':
      addOption(switchModelSelect, 'aruba-2530', 'Aruba 2530 Series');
      addOption(switchModelSelect, 'aruba-2540', 'Aruba 2540 Series');
      addOption(switchModelSelect, 'aruba-2930f', 'Aruba 2930F Series');
      addOption(switchModelSelect, 'aruba-2930m', 'Aruba 2930M Series');
      addOption(switchModelSelect, 'aruba-3810', 'Aruba 3810 Series');
      addOption(switchModelSelect, 'aruba-5400r', 'Aruba 5400R Series');
      break;
    case 'dell':
      addOption(switchModelSelect, 'n1100', 'PowerSwitch N1100 Series');
      addOption(switchModelSelect, 'n2000', 'PowerSwitch N2000 Series');
      addOption(switchModelSelect, 'n3000', 'PowerSwitch N3000 Series');
      addOption(switchModelSelect, 's4100', 'PowerSwitch S4100 Series');
      addOption(switchModelSelect, 's5200', 'PowerSwitch S5200 Series');
      break;
    default:
      addOption(switchModelSelect, 'generic', 'Generic Switch');
  }
}

// Generate network diagram based on scoping input
function generateNetworkDiagram() {
  // Get scoping information
  const scopingType = document.querySelector('input[name="scoping_type"]:checked').value;
  
  // Get basic or advanced values based on selected type
  let diagramData = {};
  
  if (scopingType === 'basic') {
    diagramData = {
      locations: document.getElementById('locations-count').value || '1',
      switchCount: document.getElementById('switches-count').value || '5',
      endpointCount: document.getElementById('endpoints-count').value || '100',
      wirelessVendor: document.getElementById('wireless-vendor').value,
      switchVendor: document.getElementById('switch-vendor').value
    };
  } else {
    // Advanced scoping
    diagramData = {
      locations: document.getElementById('advanced-locations-count').value || '1',
      switchCount: document.getElementById('advanced-switches-count').value || '5',
      endpointCount: document.getElementById('advanced-endpoints-count').value || '100',
      wirelessAPs: document.getElementById('ap-count').value || '10',
      wirelessVendor: document.getElementById('wireless-vendor').value,
      wirelessModel: document.getElementById('wireless-model').value,
      switchVendor: document.getElementById('switch-vendor').value,
      switchModel: document.getElementById('switch-model').value,
      laptops: document.getElementById('laptop-count').value || '50',
      desktops: document.getElementById('desktop-count').value || '30',
      phones: document.getElementById('voip-count').value || '20',
      iot: document.getElementById('iot-count').value || '10',
      printers: document.getElementById('printer-count').value || '5',
      securityDevices: document.getElementById('security-count').value || '2',
      byod: document.getElementById('byod-enabled').checked
    };
  }
  
  // Get selected authentication methods
  const authMethods = [];
  document.querySelectorAll('.eap-method:checked').forEach(method => {
    authMethods.push(method.value);
  });
  diagramData.authMethods = authMethods;
  
  // In a real implementation, we would use the data to generate an actual diagram
  // For demo purposes, we'll just display some text
  const resultsContainer = document.getElementById('scoping-results');
  resultsContainer.style.display = 'block';
  
  let html = `<h4>Network Scoping Results</h4>
<div class="network-summary">
  <p>Based on your input, we've generated a deployment plan for your network:</p>
  <ul>
    <li><strong>Locations:</strong> ${diagramData.locations}</li>
    <li><strong>Switches:</strong> ${diagramData.switchCount} (${diagramData.switchVendor})</li>
    <li><strong>Endpoints:</strong> ${diagramData.endpointCount}</li>
    <li><strong>Authentication Methods:</strong> ${authMethods.join(', ') || 'EAP-TLS'}</li>
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
    <img src="assets/diagrams/network-diagram-placeholder.png" alt="Network Diagram">
  </div>
  <p class="diagram-note">This diagram represents a high-level view of your network with 802.1X/MAB deployment. In a production implementation, this would be an interactive diagram with detailed information.</p>
</div>`;
  
  resultsContainer.innerHTML = html;
}

// Generate configuration based on form inputs
function generateConfiguration() {
  // Get form values
  const vendor = document.getElementById('vendor-select').value;
  const platform = document.getElementById('platform-select').value;
  const authMethod = document.getElementById('auth-method').value;
  const authMode = document.querySelector('input[name="auth_mode"]:checked').value;
  const hostMode = document.getElementById('host-mode').value;
  
  // VLAN settings
  const dataVlan = document.getElementById('data-vlan').value;
  const voiceVlan = document.getElementById('voice-vlan').value;
  const guestVlan = document.getElementById('guest-vlan').value;
  const criticalVlan = document.getElementById('critical-vlan').value;
  const authFailVlan = document.getElementById('auth-fail-vlan').value;
  
  // Server settings
  const radiusServerGroup = document.getElementById('radius-server-group').value;
  const radiusIp1 = document.getElementById('radius-ip-1').value;
  const radiusKey1 = document.getElementById('radius-key-1').value;
  const radiusIp2 = document.getElementById('radius-ip-2').value;
  const radiusKey2 = document.getElementById('radius-key-2').value;
  
  // RADIUS options
  const radiusAuthPort = document.getElementById('radius-auth-port').value;
  const radiusAcctPort = document.getElementById('radius-acct-port').value;
  const radiusCoaPort = document.getElementById('radius-coa-port').value;
  const radiusTimeout = document.getElementById('radius-timeout').value;
  const radiusRetransmit = document.getElementById('radius-retransmit').value;
  const radiusDeadtime = document.getElementById('radius-deadtime').value;
  
  // RADIUS attributes
  const macFormat = document.getElementById('mac-format').value;
  const macUppercase = document.getElementById('mac-case').checked;
  
  // Options
  const enableLoadBalance = document.getElementById('radius-load-balance').checked;
  const loadBalanceMethod = document.getElementById('load-balance-method').value;
  const enableTesting = document.getElementById('radius-testing').checked;
  const testingUsername = document.getElementById('testing-username').value;
  const enableDynamicVlan = document.getElementById('enable-dynamic-vlan').checked;
  const enablePreAuthAcl = document.getElementById('enable-preauth-acl').checked;
  const preAuthAclName = document.getElementById('preauth-acl-name')?.value;
  
  // Authentication timers
  const reauthPeriod = document.getElementById('reauth-period').value;
  const timeoutPeriod = document.getElementById('timeout-period').value;
  const txPeriod = document.getElementById('tx-period').value;
  const quietPeriod = document.getElementById('quiet-period').value;
  const maxReauthReq = document.getElementById('max-reauth-req').value;
  const maxAuthReq = document.getElementById('max-auth-req').value;
  
  // Interfaces
  const interfaces = document.getElementById('interfaces').value || 'GigabitEthernet1/0/1';
  
  // Validate required fields
  if (!dataVlan || !radiusIp1 || !radiusKey1) {
    showError('Please complete all required fields (Data VLAN and Primary RADIUS Server)');
    return;
  }
  
  // Generate configuration based on vendor and options
  let config = '';

  switch(vendor) {
    case 'cisco':
      if (platform === 'nx-os') {
        config = generateCiscoNxOsConfig(
          dataVlan, voiceVlan, guestVlan, criticalVlan, authFailVlan,
          radiusServerGroup, radiusIp1, radiusKey1, radiusIp2, radiusKey2, 
          radiusAuthPort, radiusAcctPort, radiusTimeout, radiusRetransmit,
          interfaces, authMethod, authMode, hostMode,
          reauthPeriod, timeoutPeriod, txPeriod, quietPeriod, 
          enableDynamicVlan, enablePreAuthAcl, preAuthAclName
        );
      } else if (platform === 'ios-xe') {
        config = generateCiscoIosXeConfig(
          dataVlan, voiceVlan, guestVlan, criticalVlan, authFailVlan,
          radiusServerGroup, radiusIp1, radiusKey1, radiusIp2, radiusKey2, 
          radiusAuthPort, radiusAcctPort, radiusCoaPort, radiusTimeout, radiusRetransmit, radiusDeadtime,
          enableLoadBalance, loadBalanceMethod, enableTesting, testingUsername,
          interfaces, authMethod, authMode, hostMode,
          reauthPeriod, timeoutPeriod, txPeriod, quietPeriod, maxReauthReq, maxAuthReq,
          enableDynamicVlan, enablePreAuthAcl, preAuthAclName, macFormat, macUppercase
        );
      } else if (platform === 'ios') {
        config = generateCiscoIosConfig(
          dataVlan, voiceVlan, guestVlan, criticalVlan, authFailVlan,
          radiusServerGroup, radiusIp1, radiusKey1, radiusIp2, radiusKey2, 
          radiusAuthPort, radiusAcctPort, radiusTimeout, radiusRetransmit,
          interfaces, authMethod, authMode, hostMode,
          reauthPeriod, timeoutPeriod, txPeriod, quietPeriod,
          enableDynamicVlan, enablePreAuthAcl, preAuthAclName
        );
      } else {
        // WLC
        config = generateCiscoWlcConfig(
          radiusIp1, radiusKey1, radiusIp2, radiusKey2,
          radiusAuthPort, radiusAcctPort, radiusTimeout
        );
      }
      break;
    case 'aruba':
      if (platform === 'aos-cx') {
        config = generateArubaAosCxConfig(
          dataVlan, voiceVlan, guestVlan, criticalVlan,
          radiusIp1, radiusKey1, radiusIp2, radiusKey2, 
          radiusAuthPort, radiusAcctPort,
          interfaces, authMethod, authMode, hostMode,
          reauthPeriod, timeoutPeriod, txPeriod, quietPeriod
        );
      } else {
        config = generateArubaAosSwitchConfig(
          dataVlan, voiceVlan, guestVlan, criticalVlan,
          radiusIp1, radiusKey1, radiusIp2, radiusKey2, 
          radiusAuthPort, radiusAcctPort,
          interfaces, authMethod, authMode, hostMode,
          reauthPeriod, timeoutPeriod, txPeriod, quietPeriod
        );
      }
      break;
    case 'juniper':
      config = generateJuniperConfig(
        dataVlan, voiceVlan, guestVlan, criticalVlan,
        radiusIp1, radiusKey1, radiusIp2, radiusKey2, 
        radiusAuthPort, radiusAcctPort,
        interfaces, authMethod, authMode, hostMode,
        reauthPeriod, timeoutPeriod, txPeriod, quietPeriod
      );
      break;
    case 'fortinet':
      config = generateFortinetConfig(
        dataVlan, voiceVlan, guestVlan,
        radiusIp1, radiusKey1, radiusIp2, radiusKey2,
        interfaces, authMethod
      );
      break;
    case 'arista':
      config = generateAristaConfig(
        dataVlan, voiceVlan, guestVlan, criticalVlan,
        radiusIp1, radiusKey1, radiusIp2, radiusKey2,
        radiusAuthPort, radiusAcctPort,
        interfaces, authMethod, authMode, hostMode,
        reauthPeriod, timeoutPeriod
      );
      break;
    case 'extreme':
      config = generateExtremeConfig(
        dataVlan, voiceVlan, guestVlan, criticalVlan,
        radiusIp1, radiusKey1, radiusIp2, radiusKey2,
        radiusAuthPort, radiusAcctPort,
        interfaces, authMethod, authMode
      );
      break;
    case 'ubiquiti':
      config = generateUbiquitiInstructions(
        dataVlan, guestVlan,
        radiusIp1, radiusKey1, radiusIp2, radiusKey2,
        radiusAuthPort, radiusAcctPort
      );
      break;
    default:
      config = "Configuration for " + vendor + " " + platform + " is not implemented yet.";
  }
  
  // Display the generated configuration
  const outputElement = document.getElementById('config-output');
  if (outputElement) {
    outputElement.textContent = config;
  }
}

// Generator functions for each vendor/platform
// These would be expanded in a real implementation
function generateCiscoIosXeConfig(/* params */) {
  // Implementation would be here
  return "Cisco IOS-XE configuration would be generated here";
}

function generateCiscoNxOsConfig(/* params */) {
  // Implementation would be here
  return "Cisco NX-OS configuration would be generated here";
}

function generateCiscoIosConfig(/* params */) {
  // Implementation would be here
  return "Cisco IOS configuration would be generated here";
}

function generateCiscoWlcConfig(/* params */) {
  // Implementation would be here
  return "Cisco WLC configuration would be generated here";
}

function generateArubaAosCxConfig(/* params */) {
  // Implementation would be here
  return "Aruba AOS-CX configuration would be generated here";
}

function generateArubaAosSwitchConfig(/* params */) {
  // Implementation would be here
  return "Aruba AOS-Switch configuration would be generated here";
}

function generateJuniperConfig(/* params */) {
  // Implementation would be here
  return "Juniper configuration would be generated here";
}

function generateFortinetConfig(/* params */) {
  // Implementation would be here
  return "Fortinet configuration would be generated here";
}

function generateAristaConfig(/* params */) {
  // Implementation would be here
  return "Arista configuration would be generated here";
}

function generateExtremeConfig(/* params */) {
  // Implementation would be here
  return "Extreme configuration would be generated here";
}

function generateUbiquitiInstructions(/* params */) {
  // Implementation would be here
  return "Ubiquiti configuration instructions would be provided here";
}

// Other utility functions
function analyzeConfiguration() {
  // In a real implementation, this would analyze a configuration file
  // For demo purposes, we'll just show the analysis UI
  showDiscoveryTab('analyze', document.querySelector('.discovery-tab[onclick*="analyze"]'));
  
  document.getElementById('analysis-waiting').style.display = 'none';
  document.getElementById('analysis-results').style.display = 'block';
  
  // Populate sample data
  document.getElementById('device-count').textContent = '1';
  document.getElementById('aaa-enabled-count').textContent = '1';
  document.getElementById('dot1x-enabled-count').textContent = '1';
  document.getElementById('issues-count').textContent = '3';
  
  // Open accordions for better visibility
  const accordionHeaders = document.querySelectorAll('#analysis-results .accordion-header');
  accordionHeaders.forEach(header => {
    if (header.classList.contains('active')) return;
    toggleAccordion(header);
  });
}

function analyzeDevice(ip) {
  // For demo purposes, similar to analyzeConfiguration
  analyzeConfiguration();
}

function copyConfiguration() {
  const config = document.getElementById('config-output').textContent;
  if (!config) {
    showError('Please generate a configuration first');
    return;
  }
  
  navigator.clipboard.writeText(config)
    .then(() => {
      const copyBtn = document.getElementById('copy-btn');
      const originalText = copyBtn.textContent;
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = originalText;
      }, 2000);
    })
    .catch(err => {
      showError('Failed to copy: ' + err);
    });
}

function downloadConfiguration() {
  const config = document.getElementById('config-output').textContent;
  if (!config) {
    showError('Please generate a configuration first');
    return;
  }
  
  const vendor = document.getElementById('vendor-select').value;
  const platform = document.getElementById('platform-select').value;
  
  const blob = new Blob([config], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${vendor}_${platform}_802.1x_config.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
