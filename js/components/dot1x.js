function renderDot1x(config) {
  return `
    <div>
      <h3>802.1X Settings</h3>
      <label>
        <input type="checkbox" onchange="config.dot1x.enable=this.checked ? '1' : '0'" ${config.dot1x.enable==='1'?'checked':''}>
        Enable 802.1X
      </label><br>
      <label>Recovery Delay (ms):
        <input type="number" value="${config.dot1x.recoveryDelay}" onchange="config.dot1x.recoveryDelay=this.value">
      </label><br>
      <label>Host Mode:
        <select onchange="config.dot1x.hostMode=this.value">
          <option value="1" ${config.dot1x.hostMode==='1'?'selected':''}>Single-Host</option>
          <option value="2" ${config.dot1x.hostMode==='2'?'selected':''}>Multi-Auth</option>
          <option value="3" ${config.dot1x.hostMode==='3'?'selected':''}>Multi-Domain</option>
          <option value="4" ${config.dot1x.hostMode==='4'?'selected':''}>Multi-Host</option>
        </select>
      </label>
      <div class="step-navigation">
        <button onclick="setStep('tacacs')">Previous</button>
        <button onclick="setStep('coa')">Next</button>
      </div>
    </div>
  `;
}
