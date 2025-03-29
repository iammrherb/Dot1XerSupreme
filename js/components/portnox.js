Vue.component('portnox', {
  props: ['config'],
  template: `
    <div>
      <h3>Step 11: Portnox Integration</h3>
      <div class="help-section">
        <h5>Help</h5>
        <p><strong>Enable Portnox:</strong> Integrate with Portnox Cloud for RADIUS authentication. Select your region and enter the shared secret.</p>
        <p><strong>Region:</strong> Choose US, EU, or US and EU (Failover) based on your location.</p>
        <p><strong>Shared Secret:</strong> The shared secret for Portnox (e.g., PortnoxSecret).</p>
        <p><strong>Use Same Secret for EU:</strong> If using failover, indicate if the EU secret is the same.</p>
        <p><strong>EU Shared Secret:</strong> If different, enter the EU shared secret.</p>
        <p><strong>Enable RADSEC:</strong> Optionally enable RADSEC for secure communication.</p>
      </div>
      <label class="form-label">Enable Portnox:</label>
      <select class="form-select" v-model="config.portnox.enable" @change="$emit('update:config', config)">
        <option value="1">Yes</option>
        <option value="2">No</option>
      </select>
      <div v-if="config.portnox.enable === '1'">
        <label class="form-label">Region:</label>
        <select class="form-select" v-model="config.portnox.region" @change="$emit('update:config', config)">
          <option value="1">US</option>
          <option value="2">EU</option>
          <option value="3">US and EU (Failover)</option>
        </select>
        <label class="form-label">Shared Secret:</label>
        <input type="text" class="form-control" v-model="config.portnox.secret" placeholder="e.g., PortnoxSecret" @input="$emit('update:config', config)">
        <div v-if="config.portnox.region === '3'">
          <label class="form-label">Use Same Secret for EU:</label>
          <select class="form-select" v-model="config.portnox.sameSecret" @change="$emit('update:config', config)">
            <option value="1">Yes</option>
            <option value="2">No</option>
          </select>
          <div v-if="config.portnox.sameSecret === '2'">
            <label class="form-label">EU Shared Secret:</label>
            <input type="text" class="form-control" v-model="config.portnox.secondarySecret" placeholder="e.g., PortnoxSecretEU" @input="$emit('update:config', config)">
          </div>
        </div>
        <label class="form-label">Enable RADSEC:</label>
        <select class="form-select" v-model="config.portnox.radsec" @change="$emit('update:config', config)">
          <option value="1">Yes</option>
          <option value="2">No</option>
        </select>
      </div>
      <div class="step-navigation">
        <button @click="$parent.currentStep = config.platform === 'IOS-XE' ? 'ibns' : 'deviceTracking'">Previous</button>
        <button disabled>Next</button>
      </div>
    </div>
  `
});
