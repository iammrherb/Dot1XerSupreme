function renderPlatform(config) {
  return `
    <div>
      <h3>Platform Selection</h3>
      <p>Select the network platform:</p>
      <select id="platformSelect" onchange="config.platform=this.value">
        <option value="">Select a platform</option>
        <option value="IOS-XE">IOS-XE (Catalyst)</option>
        <option value="NX-OS">NX-OS (Nexus)</option>
        <option value="IOS" disabled>IOS (Coming Soon)</option>
        <option value="ASA" disabled>ASA (Coming Soon)</option>
      </select>
      <div class="help-section">
        <h5>Platform Information</h5>
        <p><strong>IOS-XE</strong>: Modern Catalyst switches with IBNS 2.0 support.</p>
        <p><strong>NX-OS</strong>: Nexus switches with different AAA syntax.</p>
      </div>
      <div class="step-navigation">
        <button onclick="setStep('basicInfo')">Next</button>
      </div>
    </div>
  `;
}
