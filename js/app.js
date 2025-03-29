// Global configuration object
let config = {
  platform: '',
  hostname: '',
  domainName: '',
  aaa: { model: '1', authMethod: '2', authorMethod: '2', accountMethod: '2', sessionId: '1', pwdEncrypt: '1' },
  radius: { type: '1', primaryIp: '', primaryAuthPort: '1812', primaryAcctPort: '1813', primarySecret: '', secondary: false, secondaryIp: '', secondaryAuthPort: '1812', secondaryAcctPort: '1813', secondarySecret: '', groupName: 'RADIUS-SERVERS', monitoring: '1', testUser: '', idleTime: '5', deadtime: '15' },
  tacacs: { enable: false, primaryIp: '', primaryPort: '49', primarySecret: '', secondary: false, secondaryIp: '', secondaryPort: '49', secondarySecret: '', groupName: 'TACACS-SERVERS', singleConn: '1', cmdAuth: '1', maxPriv: '15' },
  dot1x: { enable: '1', criticalEapol: '1', recoveryDelay: '2000', authOrder: '1', hostMode: '3', vlanAssign: '1', guestVlan: '', authFailVlan: '', criticalVlan: '', txPeriod: '10', maxReauth: '2' },
  coa: { enable: '1', clientIp: '', serverKey: '', port: '1700' },
  radsec: { certOption: '1', trustpoint: 'PORTNOX-CA' },
  deviceTracking: { enable: '1', mode: '1', accessPolicy: '1', accessName: 'IP-TRACKING', addrLimit: '4', lifetime: '30', trunkPolicy: '1', trunkName: 'DISABLE-IP-TRACKING' },
  ibns: { mode: '1', policyMapName: 'DOT1X_MAB_POLICY', templates: '1', openTemplate: '1', openTemplateName: 'WIRED_DOT1X_OPEN', closedTemplate: '1', closedTemplateName: 'WIRED_DOT1X_CLOSED' },
  portnox: { enable: '1', region: '3', secret: '', sameSecret: '1', secondarySecret: '', radsec: '1' }
};

// Current step identifier (default to platform)
let currentStep = 'platform';

// Update navigation and progress (for simplicity, progress is computed based on hardcoded steps order)
const stepsOrder = ['platform', 'basicInfo', 'aaa', 'radius', 'tacacs', 'dot1x', 'coa', 'radsec', 'deviceTracking', 'ibns', 'portnox'];
function updateProgress() {
  const index = stepsOrder.indexOf(currentStep);
  const progress = Math.round(((index + 1) / stepsOrder.length) * 100);
  document.getElementById('progress-bar').style.width = progress + '%';
}
updateProgress();

// Function to load a step's HTML content (each step component is a separate JS file that injects its content)
function setStep(step) {
  currentStep = step;
  updateProgress();
  // Clear active nav links and set the active one
  stepsOrder.forEach(function(s) {
    const el = document.getElementById('nav-' + s);
    if(el) el.classList.remove('active');
  });
  const activeNav = document.getElementById('nav-' + step);
  if(activeNav) activeNav.classList.add('active');
  // Load the step content (each component file should implement a render[Step] function)
  const container = document.getElementById('step-container');
  container.innerHTML = "";
  if(typeof window['render' + capitalize(step)] === 'function') {
    container.innerHTML = window['render' + capitalize(step)](config);
  } else {
    container.innerHTML = "<p>Component not found.</p>";
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Configuration generation using vendor-specific templates
function generateConfig() {
  let output = generateBaseConfig(config);
  if (config.platform === 'IOS-XE') {
    output += generateIosXeConfig(config);
  } else if (config.platform === 'NX-OS') {
    output += generateNxOsConfig(config);
  }
  document.getElementById('generatedConfig').innerText = output;
  document.getElementById('config-output-card').style.display = 'block';
  // Also, call the ChatGPT integration to get suggestions/updates
  fetch('/api/generateConfig', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config)
  })
  .then(response => response.json())
  .then(data => {
    // Append ChatGPT suggestions to the output
    document.getElementById('generatedConfig').innerText += "\n\n! ChatGPT Suggestions:\n" + data.config;
  })
  .catch(err => console.error('ChatGPT API error:', err));
}

function copyToClipboard() {
  const text = document.getElementById('generatedConfig').innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert('Configuration copied to clipboard!');
  });
}

function downloadConfiguration() {
  const text = document.getElementById('generatedConfig').innerText;
  const blob = new Blob([text], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = (config.hostname || 'dot1x') + '-config.txt';
  a.click();
}

function saveConfiguration() {
  localStorage.setItem('dot1xConfig', JSON.stringify(config));
  alert('Configuration saved.');
}

function loadConfiguration() {
  const data = localStorage.getItem('dot1xConfig');
  if (data) {
    config = JSON.parse(data);
    alert('Configuration loaded.');
    setStep(currentStep); // refresh current step UI if needed
  } else {
    alert('No saved configuration found.');
  }
}

// Initialize first step on page load
document.addEventListener("DOMContentLoaded", function() {
  setStep(currentStep);
});
