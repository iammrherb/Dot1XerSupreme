const { createApp, reactive, computed } = Vue;

const app = createApp({
  data() {
    return {
      currentStep: 'platform',
      steps: [
        'platform','basicInfo','aaa','radius','tacacs','dot1x','coa','radsec',
        'deviceTracking','ibns','portnox','aiAssist'
      ],
      config: reactive({
        // Basic fields
        platform: '',
        hostname: '',
        domainName: '',
        deviceType: 'switch',  // 'switch' or 'wireless'
        // Additional fields can be added as needed
      }),
      generatedConfig: ''
    };
  },
  computed: {
    progress() {
      const idx = this.steps.indexOf(this.currentStep);
      return Math.round(((idx + 1) / this.steps.length) * 100);
    }
  },
  methods: {
    updateConfig(newData) {
      Object.assign(this.config, newData);
    },
    goNextStep() {
      const idx = this.steps.indexOf(this.currentStep);
      if (idx < this.steps.length - 1) {
        this.currentStep = this.steps[idx + 1];
      }
    },
    generateConfig() {
      // In a real app, you'd merge all fields from the config object
      // and produce vendor-specific lines. For demonstration:
      let out = [];
      out.push(`! Dot1Xer Supreme Configuration`);
      out.push(`! Platform: ${this.config.platform}`);
      out.push(`hostname ${this.config.hostname}`);
      out.push(`ip domain-name ${this.config.domainName}`);
      out.push(`! (AAA, RADIUS, TACACS, 802.1X, etc. would be appended here)`);
      out.push(`! For best practices, see https://www.wiresandwi.fi/aaa-templates`);
      this.generatedConfig = out.join('\n');
    },
    copyToClipboard() {
      if (!this.generatedConfig) return;
      navigator.clipboard.writeText(this.generatedConfig)
        .then(() => alert('Configuration copied!'))
        .catch(err => console.error('Copy failed: ', err));
    },
    saveConfig() {
      // Could store in localStorage
      const name = prompt('Enter config name:');
      if (!name) return;
      let all = JSON.parse(localStorage.getItem('dot1xConfigs')||'{}');
      all[name] = JSON.parse(JSON.stringify(this.config));
      localStorage.setItem('dot1xConfigs', JSON.stringify(all));
      alert(`Configuration "${name}" saved!`);
    },
    loadConfig() {
      let all = JSON.parse(localStorage.getItem('dot1xConfigs')||'{}');
      const names = Object.keys(all);
      if (!names.length) {
        alert('No saved configs found.');
        return;
      }
      const choice = prompt(`Enter config name to load:\n${names.join(', ')}`);
      if (!choice) return;
      if (!all[choice]) {
        alert('No config with that name.');
        return;
      }
      Object.assign(this.config, all[choice]);
      alert(`Configuration "${choice}" loaded!`);
    },
    downloadConfig() {
      if (!this.generatedConfig) return;
      const blob = new Blob([this.generatedConfig], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = (this.config.hostname || 'dot1x') + '-config.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }
});

app.mount('#app');
