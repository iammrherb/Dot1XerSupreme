function renderDeviceTracking(config) {
  return `
    <div>
      <h3>Device Tracking</h3>
      <label>
        <input type="checkbox" onchange="config.deviceTracking.enable=this.checked ? '1' : '0'" ${config.deviceTracking.enable==='1'?'checked':''}>
        Enable Device Tracking
      </label><br>
      <label>Access Policy Name:
        <input type="text" value="${config.deviceTracking.accessName}" onchange="config.deviceTracking.accessName=this.value">
      </label>
      <div class="step-navigation">
        <button onclick="setStep('radsec')">Previous</button>
        <button onclick="setStep('ibns')">Next</button>
      </div>
    </div>
  `;
}
