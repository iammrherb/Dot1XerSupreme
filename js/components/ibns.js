function renderIbns(config) {
  return `
    <div>
      <h3>IBNS 2.0 Configuration</h3>
      <label>Policy Map Name:
        <input type="text" value="${config.ibns.policyMapName}" onchange="config.ibns.policyMapName=this.value">
      </label><br>
      <label>
        <input type="checkbox" onchange="config.ibns.templates=this.checked ? '1' : '0'" ${config.ibns.templates==='1'?'checked':''}>
        Enable Interface Templates
      </label>
      <div class="step-navigation">
        <button onclick="setStep('deviceTracking')">Previous</button>
        <button onclick="setStep('portnox')">Next</button>
      </div>
    </div>
  `;
}
