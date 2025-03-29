function renderBasicInfo(config) {
  return `
    <div>
      <h3>Basic Settings</h3>
      <label>Hostname: <input type="text" value="${config.hostname}" onchange="config.hostname=this.value" placeholder="e.g., Switch01"></label><br>
      <label>Domain Name: <input type="text" value="${config.domainName}" onchange="config.domainName=this.value" placeholder="e.g., example.com"></label>
      <div class="step-navigation">
        <button onclick="setStep('platform')">Previous</button>
        <button onclick="setStep('aaa')">Next</button>
      </div>
    </div>
  `;
}
