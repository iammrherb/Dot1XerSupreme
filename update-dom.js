// DOM update script for Dot1Xer Supreme
console.log('Executing DOM updates for Dot1Xer Supreme...');

// Apply server tab updates
eval(document.getElementById('server-tab-update-script').textContent);
console.log('Applied server tab updates');

// Apply discovery tab updates
eval(document.getElementById('discovery-tab-update-script').textContent);
console.log('Applied discovery tab updates');

// Apply vendor options updates
eval(document.getElementById('vendor-options-update-script').textContent);
console.log('Applied vendor options updates');

// Fix accordion functionality
document.querySelectorAll('.accordion-header').forEach(header => {
  if (!header.hasAttribute('data-event-bound')) {
    header.setAttribute('data-event-bound', 'true');
    header.addEventListener('click', function() {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      
      if (content) {
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
      }
    });
  }
});
console.log('Fixed accordion functionality');

// Open first accordion in each group
document.querySelectorAll('.accordion-group').forEach(group => {
  const firstAccordion = group.querySelector('.accordion-header');
  if (firstAccordion && !firstAccordion.classList.contains('active')) {
    // Simulate click to open
    firstAccordion.click();
  }
});
console.log('Opened first accordion in each group');

// Initialize vendor-specific options
const vendorSelect = document.getElementById('vendor-select');
const platformSelect = document.getElementById('platform-select');
if (vendorSelect && platformSelect) {
  vendorSelect.addEventListener('change', updateVendorSpecificOptions);
  platformSelect.addEventListener('change', updateVendorSpecificOptions);
  
  // Initial update
  updateVendorSpecificOptions();
}
console.log('Initialized vendor-specific options');

// Initialize EAP method checkboxes
document.querySelectorAll('.eap-method').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    const optionsId = `${this.id}-options`;
    const options = document.getElementById(optionsId);
    if (options) {
      options.style.display = this.checked ? 'block' : 'none';
    }
  });
  
  // Set initial state
  if (checkbox.checked) {
    const optionsId = `${checkbox.id}-options`;
    const options = document.getElementById(optionsId);
    if (options) {
      options.style.display = 'block';
    }
  }
});
console.log('Initialized EAP method checkboxes');

console.log('DOM updates completed successfully');
