function renderRadsec(config) {
  return `
    <div>
      <h3>RADSEC Configuration</h3>
      <label>Certificate Option:
        <select onchange="config.radsec.certOption=this.value">
          <option value="1" ${config.radsec.certOption==='1'?'selected':''}>Use Trustpoint</option>
          <option value="0" ${config.radsec.certOption==='0'?'selected':''}>Manual Configuration</option>
        </select>
      </label><br>
      <label>Trustpoint Name:
        <input type="text" value="${config.radsec.trustpoint}" onchange="config.radsec.trustpoint=this.value" placeholder="e.g., PORTNOX-CA">
      </label>
      <div class="step-navigation">
        <button onclick="setStep('coa')">Previous</button>
        <button onclick="setStep('deviceTracking')">Next</button>
      </div>
    </div>
  `;
}
