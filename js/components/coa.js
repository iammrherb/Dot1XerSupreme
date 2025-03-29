function renderCoa(config) {
  return `
    <div>
      <h3>Change of Authorization (CoA)</h3>
      <label>
        <input type="checkbox" onchange="config.coa.enable=this.checked ? '1' : '0'" ${config.coa.enable==='1'?'checked':''}>
        Enable CoA
      </label><br>
      <label>Client IP:
        <input type="text" value="${config.coa.clientIp}" onchange="config.coa.clientIp=this.value" placeholder="e.g., 192.168.1.100">
      </label><br>
      <label>Server Key:
        <input type="password" value="${config.coa.serverKey}" onchange="config.coa.serverKey=this.value">
      </label><br>
      <label>Port:
        <input type="number" value="${config.coa.port}" onchange="config.coa.port=this.value">
      </label>
      <div class="step-navigation">
        <button onclick="setStep('dot1x')">Previous</button>
        <button onclick="setStep('radsec')">Next</button>
      </div>
    </div>
  `;
}
