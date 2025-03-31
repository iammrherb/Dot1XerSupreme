// Find the discovery tabs section
const discoveryTabs = document.querySelector('.discovery-tabs');
if (discoveryTabs) {
  // Create the Network Scoping tab
  const scopingTab = document.createElement('button');
  scopingTab.className = 'discovery-tab';
  scopingTab.setAttribute('onclick', 'showDiscoveryTab(\'scoping\', this)');
  scopingTab.textContent = 'Network Scoping';
  
  // Add it after the first tab (usually Network Scan)
  const firstTab = discoveryTabs.querySelector('.discovery-tab');
  if (firstTab) {
    discoveryTabs.insertBefore(scopingTab, firstTab.nextSibling);
  } else {
    discoveryTabs.appendChild(scopingTab);
  }
}

// Create a placeholder for the Network Scoping content
const scopingPlaceholder = document.createElement('div');
scopingPlaceholder.id = 'disc-scoping';
scopingPlaceholder.className = 'discovery-section';
scopingPlaceholder.style.display = 'none';
scopingPlaceholder.innerHTML = 'Loading Network Scoping...';

// Add it to the discovery content area
const discoveryContent = document.querySelector('.discovery-content');
if (discoveryContent) {
  discoveryContent.appendChild(scopingPlaceholder);
}

// Load the Network Scoping content
fetch('network-scoping.html')
  .then(response => response.text())
  .then(html => {
    scopingPlaceholder.innerHTML = html;
    // Initialize any required components
    document.querySelectorAll('#disc-scoping .eap-method').forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        const optionsId = `${this.id}-options`;
        const options = document.getElementById(optionsId);
        if (options) {
          options.style.display = this.checked ? 'block' : 'none';
        }
      });
    });
    
    // Initialize wireless/switch model selectors
    const wirelessVendor = document.getElementById('wireless-vendor');
    if (wirelessVendor) {
      wirelessVendor.addEventListener('change', updateWirelessModels);
      // Initialize models
      updateWirelessModels();
    }
    
    const switchVendor = document.getElementById('switch-vendor');
    if (switchVendor) {
      switchVendor.addEventListener('change', updateSwitchModels);
      // Initialize models
      updateSwitchModels();
    }
    
    // Setup scoping type radio buttons
    document.querySelectorAll('input[name="scoping_type"]').forEach(radio => {
      radio.addEventListener('change', function() {
        const basicScoping = document.getElementById('basic-scoping');
        const advancedScoping = document.getElementById('advanced-scoping');
        
        if (basicScoping && advancedScoping) {
          basicScoping.style.display = this.value === 'basic' ? 'block' : 'none';
          advancedScoping.style.display = this.value === 'advanced' ? 'block' : 'none';
        }
      });
    });
  })
  .catch(error => {
    console.error('Error loading Network Scoping content:', error);
    scopingPlaceholder.innerHTML = 'Error loading Network Scoping content.';
  });
