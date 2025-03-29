const { createApp, ref, computed, reactive } = Vue;

const app = createApp({
  data() {
    return {
      currentStep: 'platform',
      config: reactive({
        platform: '',
        hostname: '',
        domainName: '',
        scope: '',
        aaa: { model: '1', authMethod: '2', authorMethod: '2', accountMethod: '2', sessionId: '1', pwdEncrypt: '1' },
        radius: { type: '1', primaryIp: '', primaryAuthPort: '1812', primaryAcctPort: '1813', primarySecret: '',
                  secondary: false, secondaryIp: '', secondaryAuthPort: '1812', secondaryAcctPort: '1813', secondarySecret: '',
                  groupName: 'RADIUS-SERVERS', monitoring: '1', testUser: '', idleTime: '5', deadtime: '15' },
        tacacs: { enable: false, primaryIp: '', primaryPort: '49', primarySecret: '',
                  secondary: false, secondaryIp: '', secondaryPort: '49', secondarySecret: '',
                  groupName: 'TACACS-SERVERS', singleConn: '1', cmdAuth: '1', maxPriv: '15' },
        dot1x: { enable: '1', criticalEapol: '1', recoveryDelay: '2000', authOrder: '1', hostMode: '3',
                 vlanAssign: '1', guestVlan: '', authFailVlan: '', criticalVlan: '', txPeriod: '10', maxReauth: '2',
                 interface: '', vlan: '', reauthPeriod: '3600' },
        coa: { enable: '1', clientIp: '', serverKey: '', port: '1700' },
        radsec: { certOption: '1', trustpoint: 'PORTNOX-CA' },
        deviceTracking: { enable: '1', mode: '1', accessPolicy: '1', accessName: 'IP-TRACKING', addrLimit: '4',
                          lifetime: '30', trunkPolicy: '1', trunkName: 'DISABLE-IP-TRACKING' },
        ibns: { mode: '1', policyMapName: 'DOT1X_MAB_POLICY', templates: '1', openTemplate: '1',
                openTemplateName: 'WIRED_DOT1X_OPEN', closedTemplate: '1', closedTemplateName: 'WIRED_DOT1X_CLOSED' },
        portnox: { enable: '1', region: '1', secret: '', sameSecret: '1', secondarySecret: '', radsec: '1' }
      }),
      generatedConfig: '',
      steps: ['platform', 'basicInfo', 'aaa', 'radius', 'tacacs', 'dot1x', 'coa', 'radsec', 'deviceTracking', 'ibns', 'portnox']
    };
  },
  computed: {
    progress() {
      const totalSteps = this.config.platform === 'IOS-XE' ? 11 : this.config.radius.type === '2' ? 10 : 9;
      const currentIndex = this.steps.indexOf(this.currentStep);
      return ((currentIndex + 1) / totalSteps) * 100;
    }
  },
  methods: {
    updateConfig(newConfig) {
      Object.assign(this.config, newConfig);
    },
    nextStep() {
      const currentIndex = this.steps.indexOf(this.currentStep);
      if (currentIndex < this.steps.length - 1) {
        let nextStep = this.steps[currentIndex + 1];
        if (nextStep === 'radsec' && this.config.radius.type !== '2') {
          nextStep = this.steps[currentIndex + 2];
        }
        if (nextStep === 'ibns' && this.config.platform !== 'IOS-XE') {
          nextStep = this.steps[currentIndex + 2];
        }
        this.currentStep = nextStep;
      }
    },
    generateConfig() {
      let configOutput = '';
      switch (this.config.platform) {
        case 'IOS-XE':
          configOutput = generateIosXeConfig(this.config);
          break;
        case 'NX-OS':
          configOutput = generateNxOsConfig(this.config);
          break;
        case 'ArubaOS':
          configOutput = generateArubaOsConfig(this.config);
          break;
        case 'Juniper':
          configOutput = generateJuniperConfig(this.config);
          break;
        case 'Extreme':
          configOutput = generateExtremeConfig(this.config);
          break;
        case 'Arista':
          configOutput = generateAristaConfig(this.config);
          break;
        default:
          configOutput = 'Please select a platform to generate the configuration.';
      }
      this.generatedConfig = configOutput;
    },
    saveConfiguration() {
      localStorage.setItem('dot1xerConfig', JSON.stringify(this.config));
      alert('Configuration saved successfully!');
    },
    loadConfiguration() {
      const savedConfig = localStorage.getItem('dot1xerConfig');
      if (savedConfig) {
        Object.assign(this.config, JSON.parse(savedConfig));
        alert('Configuration loaded successfully!');
      } else {
        alert('No saved configuration found.');
      }
    },
    downloadConfiguration() {
      if (!this.generatedConfig) return;
      const blob = new Blob([this.generatedConfig], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dot1xer-supreme-config-${this.config.platform || 'unknown'}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.generatedConfig).then(() => {
        alert('Configuration copied to clipboard!');
      });
    }
  },
  mounted() {
    document.getElementById('Configuration').style.display = 'block';
    document.querySelector('.tablinks').classList.add('active');
  }
});

app.component('platform', Vue.component('platform'));
app.component('basicInfo', Vue.component('basicInfo'));
app.component('aaa', Vue.component('aaa'));
app.component('radius', Vue.component('radius'));
app.component('tacacs', Vue.component('tacacs'));
app.component('dot1x', Vue.component('dot1x'));
app.component('coa', Vue.component('coa'));
app.component('radsec', Vue.component('radsec'));
app.component('deviceTracking', Vue.component('deviceTracking'));
app.component('ibns', Vue.component('ibns'));
app.component('portnox', Vue.component('portnox'));

app.mount('#app');

function openTab(evt, tabName) {
  const tabcontent = document.getElementsByClassName('tabcontent');
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }
  const tablinks = document.getElementsByClassName('tablinks');
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }
  document.getElementById(tabName).style.display = 'block';
  evt.currentTarget.className += ' active';
}
