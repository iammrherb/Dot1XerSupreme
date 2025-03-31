// Add vendor-specific options to Step 5 (Advanced)
const advancedStep = document.getElementById('step-5');
if (advancedStep) {
  // Create vendor-specific options section
  const vendorOptionsSection = document.createElement('div');
  vendorOptionsSection.className = 'accordion';
  vendorOptionsSection.innerHTML = `
    <div class="accordion-header">
      <span>Vendor-Specific Options</span>
      <span class="accordion-icon">+</span>
    </div>
    <div class="accordion-content">
      <div id="vendor-specific-placeholder">
        Loading vendor options...
      </div>
    </div>
  `;
  
  // Add it to the page
  const navButtons = advancedStep.querySelector('.nav-buttons');
  if (navButtons) {
    advancedStep.insertBefore(vendorOptionsSection, navButtons);
  }
  
  // Fetch vendor-specific options
  fetch('vendor-specific-options.html')
    .then(response => response.text())
    .then(html => {
      const placeholder = document.getElementById('vendor-specific-placeholder');
      if (placeholder) {
        placeholder.innerHTML = html;
      }
      
      // Initialize event listeners
      const wirelessVendor = document.getElementById('wireless-vendor');
      if (wirelessVendor) {
        wirelessVendor.addEventListener('change', updateWirelessModels);
      }
      
      const switchVendor = document.getElementById('switch-vendor');
      if (switchVendor) {
        switchVendor.addEventListener('change', updateSwitchModels);
      }
      
      // Setup event for NX-OS source interface
      const nxosSourceInterface = document.getElementById('nxos-source-interface');
      if (nxosSourceInterface) {
        nxosSourceInterface.addEventListener('change', function() {
          const group = document.getElementById('nxos-source-interface-group');
          if (group) {
            group.style.display = this.checked ? 'block' : 'none';
          }
        });
      }
      
      // Setup event for Extreme MAC refresh timer
      const extremeMacRefresh = document.getElementById('extreme-mac-refresh-time');
      if (extremeMacRefresh) {
        extremeMacRefresh.addEventListener('change', function() {
          const group = document.getElementById('extreme-mac-refresh-group');
          if (group) {
            group.style.display = this.checked ? 'block' : 'none';
          }
        });
      }
      
      // Initialize vendor options based on current selection
      updateVendorSpecificOptions();
    })
    .catch(error => {
      console.error('Error loading vendor-specific options:', error);
      const placeholder = document.getElementById('vendor-specific-placeholder');
      if (placeholder) {
        placeholder.innerHTML = 'Error loading vendor-specific options.';
      }
    });
}
