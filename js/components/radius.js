function renderRadius(config) {
  return `
    <div>
      <h3>RADIUS Servers</h3>
      <label>RADIUS Type:
        <select onchange="config.radius.type=this.value">
          <option value="1" ${config.radius.type==='1'?'selected':''}>Standard RADIUS</option>
          <option value="2" ${config.radius.type==='2'?'selected':''}>RADSEC (TLS)</option>
        </select>
      </label><br>
      <label>Primary RADIUS Server IP:
        <input type="text" value="${config.radius.primaryIp}" onchange="config.radius.primaryIp=this.value" placeholder="e.g., 192.168.1.10">
      </label><br>
      <label>Primary Auth Port:
        <input type="number" value="${config.radius.primaryAuthPort}" onchange="config.radius.primaryAuthPort=this.value">
      </label><br>
      <label>Primary Accounting Port:
        <input type="number" value="${config.radius.primaryAcctPort}" onchange="config.radius.primaryAcctPort=this.value">
      </label><br>
      <label>Primary Shared Secret:
        <input type="password" value="${config.radius.primarySecret}" onchange="config.radius.primarySecret=this.value">
      </label>
      <div class="step-navigation">
        <button onclick="setStep('aaa')">Previous</button>
        <button onclick="setStep('tacacs')">Next</button>
      </div>
    </div>
  `;
}
