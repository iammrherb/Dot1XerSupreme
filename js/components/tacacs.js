function renderTacacs(config) {
  return `
    <div>
      <h3>TACACS+ Servers</h3>
      <label>
        <input type="checkbox" onchange="config.tacacs.enable=this.checked" ${config.tacacs.enable?'checked':''}>
        Enable TACACS+
      </label><br>
      <label>Primary TACACS+ Server IP:
        <input type="text" value="${config.tacacs.primaryIp}" onchange="config.tacacs.primaryIp=this.value" placeholder="e.g., 192.168.1.20">
      </label><br>
      <label>Primary Port:
        <input type="number" value="${config.tacacs.primaryPort}" onchange="config.tacacs.primaryPort=this.value">
      </label><br>
      <label>Primary Shared Secret:
        <input type="password" value="${config.tacacs.primarySecret}" onchange="config.tacacs.primarySecret=this.value">
      </label>
      <div class="step-navigation">
        <button onclick="setStep('radius')">Previous</button>
        <button onclick="setStep('dot1x')">Next</button>
      </div>
    </div>
  `;
}
