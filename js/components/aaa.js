function renderAaa(config) {
  return `
    <div>
      <h3>AAA Configuration</h3>
      <label>AAA Model:
        <select onchange="config.aaa.model=this.value">
          <option value="1" ${config.aaa.model==='1'?'selected':''}>New Model (Recommended)</option>
          <option value="0" ${config.aaa.model==='0'?'selected':''}>Legacy Model</option>
        </select>
      </label><br>
      <label>Authentication Method:
        <select onchange="config.aaa.authMethod=this.value">
          <option value="1" ${config.aaa.authMethod==='1'?'selected':''}>Local Only</option>
          <option value="2" ${config.aaa.authMethod==='2'?'selected':''}>RADIUS + Local Fallback</option>
          <option value="3" ${config.aaa.authMethod==='3'?'selected':''}>TACACS+ + Local Fallback</option>
          <option value="4" ${config.aaa.authMethod==='4'?'selected':''}>TACACS+ then RADIUS + Local Fallback</option>
        </select>
      </label>
      <div class="step-navigation">
        <button onclick="setStep('basicInfo')">Previous</button>
        <button onclick="setStep('radius')">Next</button>
      </div>
    </div>
  `;
}
