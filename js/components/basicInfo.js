Vue.component('basicInfo', {
  props: ['config'],
  template: `
    <div>
      <h3>Step 2: Basic Settings</h3>
      <div class="help-section">
        <h5>Help</h5>
        <p><strong>Hostname:</strong> Enter the device hostname (e.g., Switch1). This identifies the device in your network.</p>
        <p><strong>Domain Name:</strong> Enter the domain name (e.g., example.com). This is used for DNS and certificate generation.</p>
        <p><strong>Scope:</strong> Describe the configuration scope (e.g., Campus LAN). This is for documentation and planning.</p>
      </div>
      <label class="form-label">Hostname:</label>
      <input type="text" class="form-control" v-model="config.hostname" placeholder="e.g., Switch1" @input="$emit('update:config', config)">
      <label class="form-label">Domain Name:</label>
      <input type="text" class="form-control" v-model="config.domainName" placeholder="e.g., example.com" @input="$emit('update:config', config)">
      <label class="form-label">Scope:</label>
      <input type="text" class="form-control" v-model="config.scope" placeholder="e.g., Campus LAN" @input="$emit('update:config', config)">
      <div class="step-navigation">
        <button @click="$parent.currentStep = 'platform'">Previous</button>
        <button @click="$emit('next-step')" :disabled="!config.hostname || !config.domainName || !config.scope">Next</button>
      </div>
    </div>
  `
});
