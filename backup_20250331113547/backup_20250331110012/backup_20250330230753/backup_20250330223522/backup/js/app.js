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
  
  // Auth method change
  const authMethodSelect = document.getElementById('auth-method');
  if (authMethodSelect) {
    authMethodSelect.addEventListener('change', updateAuthOptions);
  }
  
  // TACACS checkbox
  const tacacsCheckbox = document.getElementById('use-tacacs');
  if (tacacsCheckbox) {
    tacacsCheckbox.addEventListener('change', function() {
      document.getElementById('tacacs-options').style.display = 
        this.checked ? 'block' : 'none';
    });
  }
  
  // RadSec checkbox
  const radsecCheckbox = document.getElementById('use-radsec');
  if (radsecCheckbox) {
    radsecCheckbox.addEventListener('change', function() {
      document.getElementById('radsec-options').style.display = 
        this.checked ? 'block' : 'none';
    });
  }
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
      addOption(platformSelect, 'wlc', 'WLC 9800');
      platformDescription.innerHTML = '<p>Cisco IOS-XE supports IBNS 2.0 with advanced policy maps and both open and closed authentication modes.</p>';
      break;
    case 'aruba':
      addOption(platformSelect, 'aos-cx', 'AOS-CX');
      addOption(platformSelect, 'aos-switch', 'AOS-Switch (Legacy)');
      platformDescription.innerHTML = '<p>Aruba AOS-CX supports 802.1X, MAC authentication, and dynamic VLAN assignment.</p>';
      break;
    case 'juniper':
      addOption(platformSelect, 'ex', 'EX Series');
      addOption(platformSelect, 'qfx', 'QFX Series');
      platformDescription.innerHTML = '<p>Juniper EX/QFX Series support 802.1X, MAC authentication, and server-fail fallback options.</p>';
      break;
    case 'fortinet':
      addOption(platformSelect, 'fortiswitch', 'FortiSwitch');
      platformDescription.innerHTML = '<p>FortiSwitch supports 802.1X and MAC authentication with RADIUS server groups.</p>';
      break;
    case 'arista':
      addOption(platformSelect, 'eos', 'EOS');
      platformDescription.innerHTML = '<p>Arista EOS supports 802.1X, MAC authentication, and LLDP bypass for VoIP devices.</p>';
      break;
    case 'extreme':
      addOption(platformSelect, 'exos', 'EXOS');
      platformDescription.innerHTML = '<p>Extreme EXOS uses NetLogin for 802.1X and MAC authentication with dynamic VLAN assignment.</p>';
      break;
    case 'huawei':
      addOption(platformSelect, 'vrp', 'VRP');
      platformDescription.innerHTML = '<p>Huawei switches support 802.1X, MAC authentication bypass, and critical VLAN assignment.</p>';
      break;
    case 'alcatel':
      addOption(platformSelect, 'omniswitch', 'OmniSwitch');
      platformDescription.innerHTML = '<p>Alcatel-Lucent OmniSwitch uses UNP edge templates for 802.1X and MAC authentication.</p>';
      break;
    case 'ubiquiti':
      addOption(platformSelect, 'unifi', 'UniFi');
      platformDescription.innerHTML = '<p>Ubiquiti UniFi requires configuration through the UniFi Network Controller rather than CLI.</p>';
      break;
    default:
      addOption(platformSelect, 'default', 'Default Platform');
      platformDescription.innerHTML = '<p>Please select a vendor to see platform details.</p>';
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

// Generate configuration based on form inputs
function generateConfiguration() {
  // Get form values
  const vendor = document.getElementById('vendor-select').value;
  const platform = document.getElementById('platform-select').value;
  const authMethod = document.getElementById('auth-method').value;
  const authMode = document.querySelector('input[name="auth_mode"]:checked').value;
  const dataVlan = document.getElementById('data-vlan').value;
  const voiceVlan = document.getElementById('voice-vlan').value;
  const guestVlan = document.getElementById('guest-vlan').value;
  const criticalVlan = document.getElementById('critical-vlan').value;
  const radiusIp1 = document.getElementById('radius-ip-1').value;
  const radiusKey1 = document.getElementById('radius-key-1').value;
  const radiusIp2 = document.getElementById('radius-ip-2').value;
  const radiusKey2 = document.getElementById('radius-key-2').value;
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
      if (platform === 'ios-xe') {
        if (authMethod === 'dot1x-only') {
          config = generateCiscoIosXeDot1xOnly(dataVlan, voiceVlan, guestVlan, criticalVlan, radiusIp1, radiusKey1, radiusIp2, radiusKey2, interfaces, authMode);
        } else if (authMethod === 'mab-only') {
          config = generateCiscoIosXeMabOnly(dataVlan, voiceVlan, guestVlan, criticalVlan, radiusIp1, radiusKey1, radiusIp2, radiusKey2, interfaces, authMode);
        } else if (authMethod === 'concurrent') {
          config = generateCiscoIosXeConcurrent(dataVlan, voiceVlan, guestVlan, criticalVlan, radiusIp1, radiusKey1, radiusIp2, radiusKey2, interfaces, authMode);
        } else {
          // Default: dot1x-mab
          config = generateCiscoIosXeDot1xMab(dataVlan, voiceVlan, guestVlan, criticalVlan, radiusIp1, radiusKey1, radiusIp2, radiusKey2, interfaces, authMode);
        }
      } else if (platform === 'ios') {
        // Use similar functions for IOS
        config = generateCiscoIosDot1xMab(dataVlan, voiceVlan, guestVlan, criticalVlan, radiusIp1, radiusKey1, radiusIp2, radiusKey2, interfaces, authMode);
      } else {
        // WLC
        config = generateCiscoWlcConfig(radiusIp1, radiusKey1, radiusIp2, radiusKey2);
      }
      break;
    case 'aruba':
      if (platform === 'aos-cx') {
        config = generateArubaAosCxConfig(dataVlan, voiceVlan, guestVlan, criticalVlan, radiusIp1, radiusKey1, radiusIp2, radiusKey2, interfaces, authMethod);
      } else {
        config = generateArubaAosSwitchConfig(dataVlan, voiceVlan, guestVlan, criticalVlan, radiusIp1, radiusKey1, radiusIp2, radiusKey2, interfaces, authMethod);
      }
      break;
    case 'juniper':
      config = generateJuniperConfig(dataVlan, voiceVlan, guestVlan, criticalVlan, radiusIp1, radiusKey1, radiusIp2, radiusKey2, interfaces, authMethod);
      break;
    // Handle other vendors...
    default:
      config = "Configuration for " + vendor + " " + platform + " is not implemented yet.";
  }
  
  // Display the generated configuration
  const outputElement = document.getElementById('config-output');
  if (outputElement) {
    outputElement.textContent = config;
  }
}

// Sample configuration generator functions
function generateCiscoIosXeDot1xMab(dataVlan, voiceVlan, guestVlan, criticalVlan, radiusIp1, radiusKey1, radiusIp2, radiusKey2, interfaces, authMode) {
  let template = '';
  
  if (authMode === 'closed') {
    template = `! =====================================================================
! Cisco IOS-XE 802.1X with MAB Fallback - Closed Mode
! IBNS 2.0 Configuration with Policy Maps
! =====================================================================

! --- AAA and RADIUS Configuration ---
aaa new-model
aaa group server radius RADIUS-SERVERS
 server name RADIUS_PRIMARY
 server name RADIUS_SECONDARY
 deadtime 15

! Authentication methods
aaa authentication dot1x default group RADIUS-SERVERS
aaa authorization network default group RADIUS-SERVERS
aaa accounting dot1x default start-stop group RADIUS-SERVERS

! RADIUS Server Definitions
radius server RADIUS_PRIMARY
 address ipv4 ${radiusIp1} auth-port 1812 acct-port 1813
 key ${radiusKey1}
 timeout 5
 retransmit 3
 automate-tester username SW-RAD-TEST probe-on

radius server RADIUS_SECONDARY
 address ipv4 ${radiusIp2 || radiusIp1} auth-port 1812 acct-port 1813
 key ${radiusKey2 || radiusKey1}
 timeout 5
 retransmit 3
 automate-tester username SW-RAD-TEST probe-on

! --- RADIUS Attribute Configuration ---
radius-server attribute 6 on-for-login-auth
radius-server attribute 8 include-in-access-req
radius-server attribute 25 access-request include
radius-server attribute 31 mac format ietf upper-case
radius-server attribute 31 send nas-port-detail mac-only
radius-server dead-criteria time 5 tries 3
radius-server load-balance method least-outstanding

! --- Global 802.1X settings ---
dot1x system-auth-control
! Set 802.1X timeouts and retry values
dot1x timeout tx-period 5
dot1x max-reauth-req 2
dot1x auth-fail max-attempts 1

! --- Enable CoA for dynamic policy changes ---
aaa server radius dynamic-author
 client ${radiusIp1} server-key ${radiusKey1}
 auth-type any
 port 3799

! --- Class Maps for authentication scenarios ---
! Dot1X failure due to bad credentials
class-map type control subscriber match-all DOT1X_FAILED
 match method dot1x
 match result-type method dot1x authoritative

! Dot1X failure due to no supplicant (no response)
class-map type control subscriber match-all DOT1X_NO_RESP
 match method dot1x
 match result-type method dot1x agent-not-found

! MAB failure
class-map type control subscriber match-all MAB_FAILED
 match method mab
 match result-type method mab authoritative

! Check if port is in critical auth state
class-map type control subscriber match-any IN_CRITICAL_AUTH
 match activated-service-template CRITICAL_AUTH_ACCESS
 match activated-service-template CRITICAL_VOICE_ACCESS

! --- Service Templates for VLAN and access control ---
service-template CRITICAL_AUTH_ACCESS
 vlan ${criticalVlan || '999'}

service-template CRITICAL_VOICE_ACCESS
 vlan ${voiceVlan || '100'}

service-template GUEST_VLAN_ACCESS
 vlan ${guestVlan || '900'}

! --- Policy Map for CLOSED Authentication Mode ---
policy-map type control subscriber WIRED_DOT1X_CLOSED
 event session-started match-all
  10 authenticate using dot1x priority 10
  20 authenticate using mab priority 20
 
 ! If authentication fails
 event authentication-failure match-first
  ! If no 802.1X supplicant, try MAB
  10 class DOT1X_NO_RESP do-until-failure
    10 terminate dot1x
    20 authenticate using mab priority 20
  
  ! If MAB fails, assign to guest VLAN
  20 class MAB_FAILED do-until-failure
    10 activate service-template GUEST_VLAN_ACCESS
  
  ! For all other failures
  30 class always do-until-failure
    10 terminate dot1x
    20 terminate mab
    30 activate service-template GUEST_VLAN_ACCESS

 ! If 802.1X starts after MAB, terminate MAB
 event agent-found match-all
  10 terminate mab
  20 authenticate using dot1x priority 10
 
 ! If RADIUS server is down
 event server-dead match-all
  10 activate service-template CRITICAL_AUTH_ACCESS
  20 authorize
 
 ! When RADIUS server comes back online
 event server-alive match-all
  10 clear-session
  20 authenticate using dot1x priority 10
  30 authenticate using mab priority 20

! --- Interface Configuration ---
interface ${interfaces}
 switchport mode access
 switchport access vlan ${dataVlan}
 switchport voice vlan ${voiceVlan || 'none'}
 access-session closed
 access-session port-control auto
 access-session host-mode multi-domain
 dot1x pae authenticator
 spanning-tree portfast
 service-policy type control subscriber WIRED_DOT1X_CLOSED`;
  } else {
    // Open mode
    template = `! =====================================================================
! Cisco IOS-XE 802.1X with MAB Fallback - Open Mode
! IBNS 2.0 Configuration with Policy Maps
! =====================================================================

! --- AAA and RADIUS Configuration ---
aaa new-model
aaa group server radius RADIUS-SERVERS
 server name RADIUS_PRIMARY
 server name RADIUS_SECONDARY
 deadtime 15

! Authentication methods
aaa authentication dot1x default group RADIUS-SERVERS
aaa authorization network default group RADIUS-SERVERS
aaa accounting dot1x default start-stop group RADIUS-SERVERS

! RADIUS Server Definitions
radius server RADIUS_PRIMARY
 address ipv4 ${radiusIp1} auth-port 1812 acct-port 1813
 key ${radiusKey1}
 timeout 5
 retransmit 3
 automate-tester username SW-RAD-TEST probe-on

radius server RADIUS_SECONDARY
 address ipv4 ${radiusIp2 || radiusIp1} auth-port 1812 acct-port 1813
 key ${radiusKey2 || radiusKey1}
 timeout 5
 retransmit 3
 automate-tester username SW-RAD-TEST probe-on

! --- RADIUS Attribute Configuration ---
radius-server attribute 6 on-for-login-auth
radius-server attribute 8 include-in-access-req
radius-server attribute 25 access-request include
radius-server attribute 31 mac format ietf upper-case
radius-server attribute 31 send nas-port-detail mac-only
radius-server dead-criteria time 5 tries 3
radius-server load-balance method least-outstanding

! --- Global 802.1X settings ---
dot1x system-auth-control
! Set 802.1X timeouts and retry values
dot1x timeout tx-period 5
dot1x max-reauth-req 2
dot1x auth-fail max-attempts 1

! --- Enable CoA for dynamic policy changes ---
aaa server radius dynamic-author
 client ${radiusIp1} server-key ${radiusKey1}
 auth-type any
 port 3799

! --- Class Maps for authentication scenarios ---
! Dot1X failure due to no supplicant (no response)
class-map type control subscriber match-all DOT1X_NO_RESP
 match method dot1x
 match result-type method dot1x agent-not-found

! --- Policy Map for OPEN Authentication Mode ---
policy-map type control subscriber WIRED_DOT1X_OPEN
 event session-started match-all
  10 authenticate using dot1x priority 10
  20 authenticate using mab priority 20
 
 ! If authentication fails
 event authentication-failure match-first
  ! If no 802.1X supplicant, try MAB
  10 class DOT1X_NO_RESP do-until-failure
    10 terminate dot1x
    20 authenticate using mab priority 20
  
  ! In open mode, authorize even on failure
  20 class always do-until-failure
    10 terminate dot1x
    20 terminate mab
    30 authorize

 ! If 802.1X starts after MAB, terminate MAB
 event agent-found match-all
  10 terminate mab
  20 authenticate using dot1x priority 10

! --- Interface Configuration ---
interface ${interfaces}
 switchport mode access
 switchport access vlan ${dataVlan}
 switchport voice vlan ${voiceVlan || 'none'}
 access-session port-control auto
 access-session host-mode multi-domain
 dot1x pae authenticator
 spanning-tree portfast
 service-policy type control subscriber WIRED_DOT1X_OPEN`;
  }
  
  return template;
}

// Other generator functions would be similar
function generateCiscoIosXeDot1xOnly(dataVlan, voiceVlan, guestVlan, criticalVlan, radiusIp1, radiusKey1, radiusIp2, radiusKey2, interfaces, authMode) {
  // Similar to above but with dot1x-only configuration
  return `! =====================================================================
! Cisco IOS-XE 802.1X Only (No MAB) - ${authMode === 'closed' ? 'Closed' : 'Open'} Mode
! IBNS 2.0 Configuration with Policy Maps
! =====================================================================

! --- AAA and RADIUS Configuration ---
aaa new-model
aaa group server radius RADIUS-SERVERS
 server name RADIUS_PRIMARY
 server name RADIUS_SECONDARY
 deadtime 15

! Authentication methods
aaa authentication dot1x default group RADIUS-SERVERS
aaa authorization network default group RADIUS-SERVERS
aaa accounting dot1x default start-stop group RADIUS-SERVERS

! RADIUS Server Definitions
radius server RADIUS_PRIMARY
 address ipv4 ${radiusIp1} auth-port 1812 acct-port 1813
 key ${radiusKey1}
 timeout 5
 retransmit 3
 automate-tester username SW-RAD-TEST probe-on

radius server RADIUS_SECONDARY
 address ipv4 ${radiusIp2 || radiusIp1} auth-port 1812 acct-port 1813
 key ${radiusKey2 || radiusKey1}
 timeout 5
 retransmit 3
 automate-tester username SW-RAD-TEST probe-on

! --- Global 802.1X settings ---
dot1x system-auth-control
dot1x timeout tx-period 5
dot1x max-reauth-req 2
dot1x auth-fail max-attempts 1

! --- Policy Map for DOT1X-ONLY mode ---
policy-map type control subscriber WIRED_DOT1X_ONLY
 event session-started match-all
  10 authenticate using dot1x priority 10
 
 event authentication-failure match-first
  10 class always do-until-failure
    10 terminate dot1x
    ${authMode === 'closed' ? '20 activate service-template GUEST_VLAN_ACCESS' : '20 authorize'}

! --- Interface Configuration ---
interface ${interfaces}
 switchport mode access
 switchport access vlan ${dataVlan}
 switchport voice vlan ${voiceVlan || 'none'}
 ${authMode === 'closed' ? 'access-session closed' : ''}
 access-session port-control auto
 access-session host-mode multi-domain
 dot1x pae authenticator
 spanning-tree portfast
 service-policy type control subscriber WIRED_DOT1X_ONLY`;
}

// Simple function for Aruba AOS-CX configuration
function generateArubaAosCxConfig(dataVlan, voiceVlan, guestVlan, criticalVlan, radiusIp1, radiusKey1, radiusIp2, radiusKey2, interfaces, authMethod) {
  return `! =====================================================================
! Aruba AOS-CX 802.1X and MAC Authentication Configuration
! =====================================================================

! --- RADIUS Server Configuration ---
radius-server host ${radiusIp1} key ${radiusKey1}
radius-server host ${radiusIp2 || radiusIp1} key ${radiusKey2 || radiusKey1}

! Enable RADIUS accounting
radius-server accounting

! --- AAA Configuration ---
aaa authentication port-access default radius
aaa authorization port-access default radius
aaa accounting port-access default start-stop radius

! --- RADIUS Dynamic Authorization (CoA) ---
radius-server dyn-authorization enable
radius-server dyn-auth client ${radiusIp1} key ${radiusKey1}

! --- 802.1X Authentication Settings ---
aaa authentication port-access dot1x authenticator max-requests 3
aaa authentication port-access dot1x authenticator max-retries 3
aaa authentication port-access dot1x authenticator quiet-period 60
aaa authentication port-access dot1x authenticator reauth-period 3600
aaa authentication port-access dot1x authenticator timeout supp-response 30

! --- MAC Authentication Settings ---
aaa authentication port-access mac-auth max-retries 3
aaa authentication port-access mac-auth quiet-period 60
aaa authentication port-access mac-auth reauth-period 3600

! --- Default VLANs Configuration ---
vlan ${dataVlan}
${guestVlan ? `vlan ${guestVlan} name "Guest_VLAN"` : ''}
${criticalVlan ? `vlan ${criticalVlan} name "Critical_Auth_VLAN"` : ''}
${voiceVlan ? `vlan ${voiceVlan} name "Voice_VLAN"` : ''}

! --- Interface Configuration ---
interface ${interfaces}
  no shutdown
  no routing
  vlan access ${dataVlan}
  
  ! Enable port-access authenticator mode
  port-access authenticator
  
  ! Set authentication precedence based on method
  authentication precedence ${authMethod === 'dot1x-only' ? 'dot1x' : authMethod === 'mab-only' ? 'mac-auth' : 'dot1x mac-auth'}
  
  ! Set authentication behavior
  authentication auth-behavior ${authMethod === 'dot1x-mab' ? 'fail-through' : 'strict'}
  
  ! Configure VLAN assignments
  authentication data-vlan ${dataVlan}
  ${guestVlan ? `authentication guest-vlan ${guestVlan}` : ''}
  ${criticalVlan ? `authentication critical-vlan ${criticalVlan}` : ''}
  ${voiceVlan ? `authentication voice-vlan ${voiceVlan}` : ''}
  
  ! Enable caching of credentials for critical auth
  authentication cached-reauth enable
  
  ! Set the interface to enforce authentication
  authentication port-control auto
  
  ! Set the host mode
  authentication host-mode multi`;
}

// Simple function for Juniper configuration
function generateJuniperConfig(dataVlan, voiceVlan, guestVlan, criticalVlan, radiusIp1, radiusKey1, radiusIp2, radiusKey2, interfaces, authMethod) {
  return `# =====================================================================
# Juniper EX Series 802.1X and MAC Authentication Configuration
# =====================================================================

# --- System Authentication Order ---
set system authentication-order radius tacplus

# --- RADIUS Server Configuration ---
set access profile dot1x-profile authentication-order radius
set access profile dot1x-profile radius authentication-server ${radiusIp1} secret ${radiusKey1}
set access profile dot1x-profile radius authentication-server ${radiusIp2 || radiusIp1} secret ${radiusKey2 || radiusKey1}
set access profile dot1x-profile radius accounting-server ${radiusIp1} secret ${radiusKey1}
set access profile dot1x-profile radius accounting-server ${radiusIp2 || radiusIp1} secret ${radiusKey2 || radiusKey1}
set access profile dot1x-profile radius accounting-port 1813
set access profile dot1x-profile radius accounting-timeout 3
set access profile dot1x-profile radius accounting-retry 3

# --- RADIUS Options ---
set access profile dot1x-profile radius options nas-port-type ethernet
set access profile dot1x-profile radius options calling-station-id-format mac-address
set access profile dot1x-profile radius options coa

# --- Authentication Methods ---
set access profile dot1x-profile authentication-order radius local
set access profile dot1x-profile accounting order radius

# --- VLAN Configuration ---
set vlans ${dataVlan} vlan-id ${dataVlan}
${guestVlan ? `set vlans ${guestVlan} vlan-id ${guestVlan}` : ''}
${criticalVlan ? `set vlans ${criticalVlan} vlan-id ${criticalVlan}` : ''}
${voiceVlan ? `set vlans ${voiceVlan} vlan-id ${voiceVlan}` : ''}

# --- 802.1X Global Configuration ---
set protocols dot1x authenticator authentication-profile-name dot1x-profile
set protocols dot1x authenticator interface all retry-count 3
set protocols dot1x authenticator interface all quiet-period 60
set protocols dot1x authenticator interface all transmit-period 30
${authMethod !== 'dot1x-only' ? 'set protocols dot1x authenticator interface all mac-radius restrict' : ''}

# --- Interface Configuration ---
set protocols dot1x authenticator interface ${interfaces} supplicant ${authMethod === 'mab-only' ? 'single' : 'multiple'}
set protocols dot1x authenticator interface ${interfaces} transmit-period 5
${authMethod !== 'dot1x-only' ? `set protocols dot1x authenticator interface ${interfaces} mac-radius` : ''}
set protocols dot1x authenticator interface ${interfaces} reauthentication 3600
set protocols dot1x authenticator interface ${interfaces} supplicant-timeout 30
set protocols dot1x authenticator interface ${interfaces} server-timeout 30
${criticalVlan ? `set protocols dot1x authenticator interface ${interfaces} server-fail vlan ${criticalVlan}` : ''}
${guestVlan ? `set protocols dot1x authenticator interface ${interfaces} guest-vlan ${guestVlan}` : ''}
${guestVlan ? `set protocols dot1x authenticator interface ${interfaces} server-reject vlan ${guestVlan}` : ''}
${voiceVlan ? `set protocols dot1x authenticator interface ${interfaces} voice-vlan ${voiceVlan}` : ''}`;
}

// Download generated configuration
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

// Copy generated configuration to clipboard
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

// AI chat functions
function sendAIQuery() {
  const queryInput = document.getElementById('ai-query');
  const query = queryInput.value.trim();
  
  if (!query) return;
  
  // Add user message to chat
  addChatMessage(query, 'user');
  
  // Clear input
  queryInput.value = '';
  
  // Show "thinking" state
  addChatMessage('Thinking...', 'ai', true);
  
  // In a real implementation, this would call an API
  // For demo purposes, we'll simulate a response after a delay
  setTimeout(() => {
    // Remove "thinking" message
    const loadingMessage = document.querySelector('.ai-message.loading');
    if (loadingMessage) loadingMessage.remove();
    
    // Add AI response
    const response = generateAIResponse(query);
    addChatMessage(response, 'ai');
  }, 1500);
}

function addChatMessage(message, type, isLoading = false) {
  const chatHistory = document.getElementById('chat-history');
  
  const messageDiv = document.createElement('div');
  messageDiv.className = type + '-message';
  if (isLoading) {
    messageDiv.classList.add('loading');
  }
  
  const avatarDiv = document.createElement('div');
  avatarDiv.className = 'message-avatar';
  
  const avatarImg = document.createElement('img');
  avatarImg.src = type === 'user' ? 'assets/icons/user-avatar.png' : 'assets/icons/ai-avatar.png';
  avatarImg.alt = type === 'user' ? 'You' : 'AI';
  
  avatarDiv.appendChild(avatarImg);
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.innerHTML = message.replace(/\n/g, '<br>');
  
  messageDiv.appendChild(avatarDiv);
  messageDiv.appendChild(contentDiv);
  
  chatHistory.appendChild(messageDiv);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

function generateAIResponse(query) {
  // In a real implementation, this would call an AI API
  // For demo purposes, we'll return predefined responses
  
  query = query.toLowerCase();
  
  if (query.includes('open') && query.includes('closed')) {
    return "Open mode allows traffic before authentication, making it suitable for initial deployment phases. Closed mode blocks all traffic until authentication succeeds, providing higher security. Start with Open mode for testing, then transition to Closed mode in production.";
  } else if (query.includes('mab')) {
    return "MAC Authentication Bypass (MAB) is for devices without 802.1X support. The switch sends the device's MAC address to the RADIUS server for authentication. It's less secure than 802.1X but necessary for printers, IoT devices, etc.";
  } else if (query.includes('radsec')) {
    return "RadSec (RADIUS over TLS/DTLS) encrypts RADIUS traffic between the switch and server. It requires proper certificate setup but significantly improves security compared to standard RADIUS.";
  } else {
    return "I can help you understand and optimize your 802.1X/AAA configuration. What specific aspect would you like me to explain or improve?";
  }
}

function useQuerySuggestion(button) {
  const queryInput = document.getElementById('ai-query');
  if (queryInput) {
    queryInput.value = button.textContent;
    queryInput.focus();
  }
}

// Network scan simulation
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
    { ip: '10.1.1.5', type: 'Switch', platform: 'Juniper EX4300', version: '20.4R1', aaa: 'Disabled' }
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

function analyzeDevice(ip) {
  // In a real app this would analyze the device configuration
  // For demo purposes, we just show a message
  showDiscoveryTab('analyze', document.querySelector('.discovery-tab[onclick*="analyze"]'));
}
