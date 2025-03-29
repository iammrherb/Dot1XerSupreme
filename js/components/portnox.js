function renderPortnox(config) {
  return `
    <div>
      <h3>Portnox Integration</h3>
      <label>
        <input type="checkbox" onchange="config.portnox.enable=this.checked ? '1' : '0'" ${config.portnox.enable==='1'?'checked':''}>
        Enable Portnox Integration
      </label><br>
      <label>Portnox Region:
        <select onchange="config.portnox.region=this.value">
          <option value="1" ${config.portnox.region==='1'?'selected':''}>US Only</option>
          <option value="2" ${config.portnox.region==='2'?'selected':''}>EU Only</option>
          <option value="3" ${config.portnox.region==='3'?'selected':''}>Both (High Availability)</option>
        </select>
      </label><br>
      <label>Primary Shared Secret:
        <input type="password" value="${config.portnox.secret}" onchange="config.portnox.secret=this.value">
      </label>
      <div class="step-navigation">
        <button onclick="setStep('ibns')">Previous</button>
        <button onclick="alert('Setup complete!')">Finish</button>
      </div>
    </div>
  `;
}
