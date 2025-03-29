function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function validateForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll("input[required]");
    for (let input of inputs) {
        if (!input.value.trim()) {
            alert(`Please fill out the ${input.name} field.`);
            return false;
        }
    }
    const ipInputs = form.querySelectorAll("input[name='radius_ip'], input[name='ip_range']");
    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}(?:\/[0-9]{1,2})?$/;
    for (let ipInput of ipInputs) {
        if (ipInput.value && !ipRegex.test(ipInput.value)) {
            alert(`Please enter a valid IP address or range for ${ipInput.name} (e.g., 192.168.1.10 or 192.168.1.0/24).`);
            return false;
        }
    }
    return true;
}

function generateArchitectureConfig() {
    const scope = document.getElementById("arch_scope").value;
    const vlan = document.getElementById("arch_vlan").value;
    const radiusIp = document.getElementById("arch_radius_ip").value;
    const dhcpSnooping = document.getElementById("arch_dhcp_snooping").checked;
    const arpInspection = document.getElementById("arch_arp_inspection").checked;
    const config = `! Network Architecture Configuration
! Scope: ${scope}
radius-server host ${radiusIp} auth-port 1812 acct-port 1813 key SecretKey
aaa authentication dot1x default group radius
aaa authorization network default group radius
vlan ${vlan}
 name Authenticated
vlan 99
 name Quarantine
interface Vlan1
 description Management
 ip address ${radiusIp.split('.').slice(0, 3).join('.')}.1 255.255.255.0
${dhcpSnooping ? `ip dhcp snooping vlan ${vlan}` : '! DHCP Snooping Disabled'}
${arpInspection ? `ip arp inspection vlan ${vlan}` : '! ARP Inspection Disabled'}
`;
    document.getElementById("architectureConfigOutput").innerText = config;
    return { platform: "architecture", content: config };
}

function generateNetworkDiscovery() {
    const scope = document.getElementById("discovery_scope").value;
    const ipRange = document.getElementById("ip_range").value;
    const protocol = document.getElementById("protocol").value;
    const baseIp = ipRange.split('/')[0];
    const diagram = `! Network Discovery Architecture Diagram
! Scope: ${scope}
! IP Range: ${ipRange}
! Discovery Protocol: ${protocol.toUpperCase()}
[Network Diagram Start]
 - Discovery Tool: ${protocol === "snmp" ? "SNMP Poller" : protocol === "icmp" ? "Ping Sweep" : protocol === "lldp" ? "LLDP Scanner" : "CDP Scanner"}
 - Target Range: ${ipRange}
 - Devices:
   - Core Switch (IP: ${baseIp.replace(/\.\d+$/, '.1')})
   - Access Switch (IP: ${baseIp.replace(/\.\d+$/, '.2')})
   - Wireless AP (IP: ${baseIp.replace(/\.\d+$/, '.3')})
 - Connections:
   - Core Switch <--> Access Switch (Protocol: ${protocol.toUpperCase()})
   - Access Switch <--> Wireless AP (Protocol: ${protocol.toUpperCase()})
[Network Diagram End]
! Note: This is a basic template. Enhance with real topology data.
`;
    document.getElementById("networkDiscoveryOutput").innerText = diagram;
    return { platform: "networkdiscovery", content: diagram };
}

function downloadConfig(platform) {
    let config;
    if (platform === "networkdiscovery") {
        config = generateNetworkDiscovery();
    } else {
        config = generateArchitectureConfig();
    }
    const blob = new Blob([config.content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `dot1xer_${config.platform}_config.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Vue.js app for step-by-step configuration
const { createApp, ref, computed, reactive } = Vue;

const app = createApp({
    data() {
        return {
            currentStep: 'platform',
            config: reactive({
                platform: '',
                hostname: '',
                domainName: '',
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
                portnox: { enable: '1', region: '3', secret: '', sameSecret: '1', secondarySecret: '', radsec: '1' },
                scope: ''
            }),
            generatedConfig: '',
            steps: ['platform', 'basicInfo', 'aaa', 'radius', 'tacacs', 'dot1x', 'coa', 'radsec', 'deviceTracking', 'ibns', 'portnox']
        };
    },
    computed: {
        progress() {
            const currentIndex = this.steps.indexOf(this.currentStep);
            return Math.round((currentIndex + 1) / this.steps.length * 100);
        }
    },
    methods: {
        updateConfig(newConfig) {
            Object.assign(this.config, newConfig);
        },
        nextStep() {
            const currentIndex = this.steps.indexOf(this.currentStep);
            if (currentIndex < this.steps.length - 1) {
                const nextStep = this.steps[currentIndex + 1];
                if ((this.config.platform === 'NX-OS' && nextStep === 'ibns') ||
                    (this.config.radius.type !== '2' && nextStep === 'radsec')) {
                    this.currentStep = this.steps[currentIndex + 2];
                } else {
                    this.currentStep = nextStep;
                }
            }
        },
        generateConfig() {
            let output = generateBaseConfig(this.config);
            if (this.config.platform === 'IOS-XE') {
                output += generateIosXeConfig(this.config);
            } else if (this.config.platform === 'NX-OS') {
                output += generateNxOsConfig(this.config);
            } else if (this.config.platform === 'ArubaOS') {
                output += generateArubaOsConfig(this.config);
            } else if (this.config.platform === 'Juniper') {
                output += generateJuniperConfig(this.config);
            } else if (this.config.platform === 'Extreme') {
                output += generateExtremeConfig(this.config);
            } else if (this.config.platform === 'Arista') {
                output += generateAristaConfig(this.config);
            }
            this.generatedConfig = output;
        },
        copyToClipboard() {
            navigator.clipboard.writeText(this.generatedConfig)
                .then(() => alert('Configuration copied to clipboard!'))
                .catch(err => console.error('Failed to copy: ', err));
        },
        downloadConfiguration() {
            const element = document.createElement('a');
            const file = new Blob([this.generatedConfig], {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = `${this.config.hostname || 'dot1x'}-config.txt`;
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        },
        saveConfiguration() {
            const configName = prompt('Enter a name for this configuration:');
            if (configName) {
                const savedConfigs = JSON.parse(localStorage.getItem('savedConfigs') || '{}');
                savedConfigs[configName] = JSON.parse(JSON.stringify(this.config));
                localStorage.setItem('savedConfigs', JSON.stringify(savedConfigs));
                alert(`Configuration "${configName}" saved successfully!`);
            }
        },
        loadConfiguration() {
            const savedConfigs = JSON.parse(localStorage.getItem('savedConfigs') || '{}');
            const configNames = Object.keys(savedConfigs);
            if (configNames.length === 0) {
                alert('No saved configurations found.');
                return;
            }
            const configName = prompt(`Enter the name of the configuration to load (${configNames.join(', ')}):`);
            if (configName && savedConfigs[configName]) {
                Object.assign(this.config, savedConfigs[configName]);
                alert(`Configuration "${configName}" loaded successfully!`);
            } else {
                alert('Configuration not found.');
            }
        }
    }
});

app.mount('#app');

// Open the first tab by default
document.getElementsByClassName("tablinks")[0].click();
1700' },
                radsec: { certOption: '1', trustpoint: 'PORTNOX-CA' },
                deviceTracking: { enable: '1', mode: '1', accessPolicy: '1', accessName: 'IP-TRACKING', addrLimit: '4',
                                  lifetime: '30', trunkPolicy: '1', trunkName: 'DISABLE-IP-TRACKING' },
                ibns: { mode: '1', policyMapName: 'DOT1X_MAB_POLICY', templates: '1', openTemplate: '1',
                        openTemplateName: 'WIRED_DOT1X_OPEN', closedTemplate: '1', closedTemplateName: 'WIRED_DOT1X_CLOSED' },
                portnox: { enable: '1', region: '1', secret: '', sameSecret: '1', secondarySecret: '', radsec: '1' }
            }),
            generatedConfig: '',
            steps: [
                'platform', 'basicInfo', 'aaa', 'radius', 'tacacs', 'dot1x', 'coa',
                'radsec', 'deviceTracking', 'ibns', 'portnox'
            ]
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
                // Skip radsec if RADIUS type is not RADSEC
                if (nextStep === 'radsec' && this.config.radius.type !== '2') {
                    nextStep = this.steps[currentIndex + 2];
                }
                // Skip ibns if platform is not IOS-XE
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
        // Initialize tabs
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
