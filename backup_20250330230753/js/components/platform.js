app.component('platform', {
  props: ['config'],
  template: \`
    <div>
      <h3>Platform Selection</h3>
      <p class="text-muted">Select your vendor/OS to generate the correct 802.1X configuration.</p>

      <div class="mb-3">
        <label class="form-label">Platform / OS</label>
        <select class="form-select" v-model="platform">
          <option value="">Select a platform</option>
          <option value="IOS-XE">IOS-XE (Catalyst)</option>
          <option value="NX-OS">NX-OS (Nexus)</option>
          <option value="IOS">IOS (Classic)</option>
          <option value="JUNOS">Juniper JUNOS</option>
          <option value="ARUBA-SWITCH">Aruba Switch</option>
          <option value="ARUBA-WLC">Aruba WLC</option>
          <option value="FORTINET">Fortinet Switch</option>
          <option value="ARISTA">Arista EOS</option>
        </select>
      </div>

      <div class="help-section mt-4 p-3 bg-light border rounded">
        <h5><i class="bi bi-info-circle"></i> Platform Info</h5>
        <p v-if="platform==='IOS-XE'">
          <strong>IOS-XE:</strong> Modern Catalyst with IBNS 2.0 support.
        </p>
        <p v-else-if="platform==='NX-OS'">
          <strong>NX-OS:</strong> Nexus with different AAA syntax.
        </p>
        <p v-else-if="platform==='IOS'">
          <strong>IOS (Classic):</strong> Legacy Catalyst switches.
        </p>
        <p v-else-if="platform==='JUNOS'">
          <strong>JUNOS:</strong> Juniper EX/QFX series.
        </p>
        <p v-else-if="platform==='ARUBA-SWITCH'">
          <strong>Aruba Switch:</strong> ProCurve or ArubaOS-Switch.
        </p>
        <p v-else-if="platform==='ARUBA-WLC'">
          <strong>Aruba WLC:</strong> Mobility Controller.
        </p>
        <p v-else-if="platform==='FORTINET'">
          <strong>Fortinet:</strong> FortiSwitch with 802.1X support.
        </p>
        <p v-else-if="platform==='ARISTA'">
          <strong>Arista EOS:</strong> Similar to Cisco style CLI.
        </p>
        <p v-else>
          Please select a platform.
        </p>
      </div>

      <div class="step-navigation mt-4 d-flex justify-content-between">
        <button class="btn btn-outline-secondary" disabled>Previous</button>
        <button class="btn btn-primary" :disabled="!platform" @click="saveAndNext">Next</button>
      </div>
    </div>
  \`,
  data() {
    return {
      platform: this.config.platform
    }
  },
  methods: {
    saveAndNext() {
      this.$emit('update:config', { platform: this.platform });
      this.$emit('next-step');
    }
  }
});
