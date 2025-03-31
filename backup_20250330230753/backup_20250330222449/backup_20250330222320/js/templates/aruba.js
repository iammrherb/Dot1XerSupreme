function generateArubaConfig(config) {
    let output = '';
    
    output += templateUtils.generateSectionHeader(config.platform, 'Aruba Switch Configuration');
    
    // RADIUS Server Configuration
    output += `; RADIUS Server Configuration\n`;
    output += `radius-server host ${config.radius.primaryIp} key "${config.radius.primarySecret}"\n`;
    output += `radius-server host ${config.radius.primaryIp} auth-port ${config.radius.primaryAuthPort}\n`;
    output += `radius-server host ${config.radius.primaryIp} acct-port ${config.radius.primaryAcctPort}\n`;
    output += `radius-server host ${config.radius.primaryIp} timeout 5\n`;
    output += `radius-server host ${config.radius.primaryIp} retransmit 3\n`;
    
    if (config.radius.secondary) {
        output += `radius-server host ${config.radius.secondaryIp} key "${config.radius.secondarySecret}"\n`;
        output += `radius-server host ${config.radius.secondaryIp} auth-port ${config.radius.secondaryAuthPort}\n`;
        output += `radius-server host ${config.radius.secondaryIp} acct-port ${config.radius.secondaryAcctPort}\n`;
        output += `radius-server host ${config.radius.secondaryIp} timeout 5\n`;
        output += `radius-server host ${config.radius.secondaryIp} retransmit 3\n`;
    }
    
    // AAA Configuration
    output += `\n; AAA Configuration\n`;
    output += `aaa authentication port-access eap-radius\n`;
    output += `aaa authentication mac-based radius\n`;
    output += `aaa port-access authenticator active\n`;
    
    // Authentication server group
    output += `aaa authentication port-access auth-server-group radius ${config.radius.groupName}\n`;
    output += `aaa server-group radius "${config.radius.groupName}" host ${config.radius.primaryIp}\n`;
    
    if (config.radius.secondary) {
        output += `aaa server-group radius "${config.radius.groupName}" host ${config.radius.secondaryIp}\n`;
    }
    
    // 802.1X Configuration
    if (config.dot1x.enable === '1') {
        output += `\n; 802.1X Configuration\n`;
        output += `aaa port-access authenticator 1-24\n`;
        
        // Host mode configuration
        switch (config.dot1x.hostMode) {
            case '1': 
                output += `aaa port-access authenticator 1-24 client-limit 1\n`; 
                break;
            case '2': 
                output += `aaa port-access authenticator 1-24 client-limit 32\n`; 
                break;
            case '3': 
                output += `aaa port-access authenticator 1-24 client-limit 32\n`; 
                break;
            case '4': 
                output += `aaa port-access authenticator 1-24 client-limit 32\n`; 
                break;
        }
        
        // VLAN configuration
        if (config.dot1x.vlanAssign === '1') {
            output += `aaa port-access authenticator 1-24 auth-vlan ${config.dot1x.guestVlan || 1}\n`;
            
            if (config.dot1x.guestVlan) {
                output += `aaa port-access authenticator 1-24 unauth-vlan ${config.dot1x.guestVlan}\n`;
            }
            
            if (config.dot1x.authFailVlan) {
                output += `aaa port-access authenticator 1-24 auth-fail-vlan ${config.dot1x.authFailVlan}\n`;
            }
            
            if (config.dot1x.criticalVlan) {
                output += `aaa port-access authenticator 1-24 auth-server-down-vlan ${config.dot1x.criticalVlan}\n`;
            }
        }
    }
    
    // MAC Authentication
    output += `\n; MAC Authentication Configuration\n`;
    output += `aaa port-access mac-based 1-24\n`;
    output += `aaa port-access mac-based 1-24 addr-limit 32\n`;
    
    if (config.dot1x.vlanAssign === '1') {
        output += `aaa port-access mac-based 1-24 auth-vlan ${config.dot1x.guestVlan || 1}\n`;
        
        if (config.dot1x.guestVlan) {
            output += `aaa port-access mac-based 1-24 unauth-vlan ${config.dot1x.guestVlan}\n`;
        }
        
        if (config.dot1x.criticalVlan) {
            output += `aaa port-access mac-based 1-24 auth-server-down-vlan ${config.dot1x.criticalVlan}\n`;
        }
    }
    
    // CoA configuration
    if (config.coa.enable === '1') {
        output += `\n; Dynamic Authorization (CoA) Configuration\n`;
        output += `radius-server host ${config.coa.clientIp} dynamic-authorization\n`;
        output += `radius-server host ${config.coa.clientIp} key "${config.coa.serverKey}"\n`;
        output += `radius-server host ${config.coa.clientIp} dyn-authorization udp-port ${config.coa.port}\n`;
    }
    
    return output;
}

// js/templates/wireless/cisco_wlc.js
function generateCiscoWlcConfig(config) {
    let output = '';
    
    output += templateUtils.generateSectionHeader(config.platform, 'Cisco WLC Configuration');
    
    // RADIUS Configuration
    output += `! RADIUS Server Configuration\n`;
    output += `config radius auth add ${config.radius.primaryIp} ${config.radius.primaryAuthPort} ascii ${config.radius.primarySecret}\n`;
    output += `config radius acct add ${config.radius.primaryIp} ${config.radius.primaryAcctPort} ascii ${config.radius.primarySecret}\n`;
    
    if (config.radius.secondary) {
        output += `config radius auth add ${config.radius.secondaryIp} ${config.radius.secondaryAuthPort} ascii ${config.radius.secondarySecret}\n`;
        output += `config radius acct add ${config.radius.secondaryIp} ${config.radius.secondaryAcctPort} ascii ${config.radius.secondarySecret}\n`;
    }
    
    // RADIUS Server Group
    output += `\n! RADIUS Server Group\n`;
    output += `config radius auth disable all\n`;
    output += `config radius auth enable 1\n`;
    
    if (config.radius.secondary) {
        output += `config radius auth enable 2\n`;
    }
    
    if (config.radius.monitoring === '1' && config.radius.testUser) {
        output += `config radius auth retransmit-timeout 1 5\n`;
        output += `config radius auth mgmt-retransmit-timeout 1 5\n`;
        output += `config radius auth network ${config.radius.primaryIp} enable\n`;
        output += `config radius auth network ${config.radius.primaryIp} test username ${config.radius.testUser} interval ${config.radius.idleTime}\n`;
    }
    
    if (config.radius.deadtime) {
        output += `config radius fallback-test mode passive\n`;
        output += `config radius fallback-test interval ${config.radius.deadtime}\n`;
    }
    
    // WLAN Configuration
    output += `\n! WLAN Configuration\n`;
    output += `config wlan create 1 ${config.wireless.ssid} ${config.wireless.ssid}\n`;
    
    // WPA2/WPA3 Configuration
    if (config.wireless.authType === 'wpa2') {
        output += `config wlan security wpa enable 1\n`;
        output += `config wlan security wpa wpa2 enable 1\n`;
        output += `config wlan security wpa wpa2 ciphers aes enable 1\n`;
        output += `config wlan security wpa akm 802.1x enable 1\n`;
    } else if (config.wireless.authType === 'wpa3') {
        output += `config wlan security wpa enable 1\n`;
        output += `config wlan security wpa wpa3 enable 1\n`;
        output += `config wlan security wpa wpa3 ciphers aes enable 1\n`;
        output += `config wlan security wpa akm 802.1x enable 1\n`;
    }
    
    // Enable AAA override if VLAN assignment is enabled
    if (config.wireless.vlanOverride === '1') {
        output += `config wlan aaa-override enable 1\n`;
    }
    
    // NAS-ID if provided
    if (config.wireless.nasId) {
        output += `config wlan radius_server nas-id 1 "${config.wireless.nasId}"\n`;
    }
    
    // Session timeout
    if (config.wireless.sessionTimeout) {
        output += `config wlan session-timeout 1 ${config.wireless.sessionTimeout}\n`;
    }
    
    // SSID Broadcast settings
    if (config.wireless.broadcastSsid === '1') {
        output += `config wlan broadcast-ssid enable 1\n`;
    } else {
        output += `config wlan broadcast-ssid disable 1\n`;
    }
    
    // Client Exclusion
    if (config.wireless.clientExclusion === '1') {
        output += `config wlan exclusionlist 1 enable\n`;
        output += `config wlan exclusionlist 1 timeout ${config.wireless.clientExclusionTimeout}\n`;
    } else {
        output += `config wlan exclusionlist 1 disable\n`;
    }
    
    // Fast Transition (802.11r)
    if (config.wireless.fastTransition === '1') {
        output += `config wlan security ft enable 1\n`;
        output += `config wlan security ft reassociation-timeout ${config.wireless.ftReassociationTimeout}\n`;
    } else {
        output += `config wlan security ft disable 1\n`;
    }
    
    // PMK Caching
    if (config.wireless.pmkCaching === '1') {
        output += `config wlan security pmk-cache enable 1\n`;
        output += `config wlan security pmk-cache lifetime ${config.wireless.pmkCacheTimeout}\n`;
    } else {
        output += `config wlan security pmk-cache disable 1\n`;
    }
    
    // FlexConnect settings
    if (config.wireless.flexConnect === '1') {
        output += `config wlan flexconnect local-switching 1 enable\n`;
        if (config.wireless.vlanOverride === '1') {
            output += `config wlan flexconnect vlan-central-switching 1 enable\n`;
        } else {
            output += `config wlan flexconnect vlan-central-switching 1 disable\n`;
        }
    } else {
        output += `config wlan flexconnect local-switching 1 disable\n`;
    }
    
    // AAA configuration
    output += `\n! AAA Configuration\n`;
    output += `config wlan radius_server auth add 1 1\n`;
    output += `config wlan radius_server acct add 1 1\n`;
    
    if (config.radius.secondary) {
        output += `config wlan radius_server auth add 1 2\n`;
        output += `config wlan radius_server acct add 1 2\n`;
    }
    
    // CoA configuration
    if (config.coa.enable === '1') {
        output += `\n! Change of Authorization (CoA) Configuration\n`;
        output += `config radius auth rfc3576 enable ${config.radius.primaryIp}\n`;
        
        if (config.radius.secondary) {
            output += `config radius auth rfc3576 enable ${config.radius.secondaryIp}\n`;
        }
        
        output += `config radius auth rfc3576 port ${config.coa.port}\n`;
    }
    
    // Enable the WLAN
    output += `\n! Enable WLAN\n`;
    output += `config wlan enable 1\n`;
    
    return output;
}

// js/templates/wireless/aruba_wlc.js
function generateArubaWlcConfig(config) {
    let output = '';
    
    output += templateUtils.generateSectionHeader(config.platform, 'Aruba WLC Configuration');
    
    // RADIUS Configuration
    output += `! RADIUS Server Configuration\n`;
    output += `aaa authentication-server radius "${config.radius.groupName}-1"\n`;
    output += `  host ${config.radius.primaryIp}\n`;
    output += `  key ${config.radius.primarySecret}\n`;
    output += `  auth-port ${config.radius.primaryAuthPort}\n`;
    output += `  acct-port ${config.radius.primaryAcctPort}\n`;
    output += `  timeout 5\n`;
    output += `  retry-count 3\n`;
    output += `  rfc3576\n`;
    
    if (config.wireless.nasId) {
        output += `  nas-identifier "${config.wireless.nasId}"\n`;
    } else {
        output += `  nas-identifier "${config.hostname}"\n`;
    }
    
    if (config.radius.secondary) {
        output += `\naaa authentication-server radius "${config.radius.groupName}-2"\n`;
        output += `  host ${config.radius.secondaryIp}\n`;
        output += `  key ${config.radius.secondarySecret}\n`;
        output += `  auth-port ${config.radius.secondaryAuthPort}\n`;
        output += `  acct-port ${config.radius.secondaryAcctPort}\n`;
        output += `  timeout 5\n`;
        output += `  retry-count 3\n`;
        output += `  rfc3576\n`;
        
        if (config.wireless.nasId) {
            output += `  nas-identifier "${config.wireless.nasId}"\n`;
        } else {
            output += `  nas-identifier "${config.hostname}"\n`;
        }
    }
    
    // RADIUS Server Group
    output += `\n! RADIUS Server Group\n`;
    output += `aaa server-group "${config.radius.groupName}"\n`;
    output += `  auth-server "${config.radius.groupName}-1"\n`;
    
    if (config.radius.secondary) {
        output += `  auth-server "${config.radius.groupName}-2"\n`;
    }
    
    // AAA profile
    output += `\n! AAA Profile\n`;
    output += `aaa profile "dot1x-profile"\n`;
    output += `  authentication-dot1x "default"\n`;
    output += `  dot1x-default-role "authenticated"\n`;
    output += `  dot1x-server-group "${config.radius.groupName}"\n`;
    
    if (config.radius.secondary) {
        output += `  radius-accounting "${config.radius.groupName}"\n`;
    }
    
    // SSID Profile
    output += `\n! SSID Profile\n`;
    output += `wlan ssid-profile "${config.wireless.ssid}"\n`;
    output += `  essid "${config.wireless.ssid}"\n`;
    
    if (config.wireless.authType === 'wpa2') {
        output += `  opmode wpa2-aes\n`;
    } else if (config.wireless.authType === 'wpa3') {
        output += `  opmode wpa3-sae-aes\n`;
    }
    
    if (config.wireless.broadcastSsid !== '1') {
        output += `  hide-ssid\n`;
    }
    
    // 802.11r Fast Transition
    if (config.wireless.fastTransition === '1') {
        output += `  dot11r\n`;
        output += `  dot11r-mobility-domain-id 1\n`;
    }
    
    // VAP Profile
    output += `\n! Virtual AP Profile\n`;
    output += `wlan virtual-ap "dot1x-vap"\n`;
    output += `  ssid-profile "${config.wireless.ssid}"\n`;
    output += `  aaa-profile "dot1x-profile"\n`;
    
    if (config.wireless.vlanOverride === '1') {
        output += `  forward-mode tunnel\n`;
    } else {
        output += `  forward-mode bridge\n`;
    }
    
    output += `  vlan 1\n`;
    
    // VLAN pooling (for dynamic VLAN assignment)
    if (config.wireless.vlanOverride === '1') {
        output += `  allowed-vlan 1-4094\n`;
    }
    
    // Apply to an AP Group 
    output += `\n! AP Group Configuration\n`;
    output += `ap-group "default"\n`;
    output += `  virtual-ap "dot1x-vap"\n`;
    
    return output;
}

// js/components/wireless/ssid.js
app.component('ssid', {
    props: ['config'],
    template: `
        <div>
            <h3>SSID Configuration</h3>
            <p class="text-muted">Configure your wireless network settings for 802.1X authentication.</p>
            
            <div class="mb-3">
                <label class="form-label">SSID Name</label>
                <input type="text" class="form-control" v-model="ssid" placeholder="e.g., Enterprise-Secure" maxlength="32">
                <div class="form-text">The wireless network name that will be broadcast.</div>
            </div>
            
            <div class="mb-3">
                <label class="form-label">Authentication Type</label>
                <select class="form-select" v-model="authType">
                    <option value="wpa2">WPA2-Enterprise (802.1X)</option>
                    <option value="wpa3">WPA3-Enterprise (802.1X)</option>
                </select>
                <div class="form-text">WPA3 offers stronger security but may not be supported by all client devices.</div>
            </div>
            
            <div class="mb-3">
                <label class="form-label">Encryption</label>
                <select class="form-select" v-model="encryption">
                    <option value="aes">AES (CCMP)</option>
                    <option value="tkip-aes" :disabled="authType === 'wpa3'">TKIP+AES (Mixed)</option>
                </select>
                <div class="form-text">AES (CCMP) is recommended. TKIP is legacy and less secure.</div>
            </div>
            
            <div class="mb-3">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="broadcastSsid" id="broadcast-ssid">
                    <label class="form-check-label" for="broadcast-ssid">Broadcast SSID</label>
                </div>
                <div class="form-text">Hidden SSIDs provide no real security benefit and can cause connection problems.</div>
            </div>
            
            <div class="mb-3">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="vlanOverride" id="vlan-override">
                    <label class="form-check-label" for="vlan-override">Enable RADIUS VLAN Assignment</label>
                </div>
                <div class="form-text">Allows the RADIUS server to dynamically assign VLANs to clients.</div>
            </div>
            
            <div class="help-section mt-4">
                <h5><i class="bi bi-info-circle"></i> SSID Configuration Help</h5>
                <p>WPA2/WPA3-Enterprise uses 802.1X authentication to provide secure access to your wireless network. Each client authenticates individually using credentials or certificates.</p>
                <p>Best practices:</p>
                <ul>
                    <li>Use a descriptive but not overly revealing SSID name</li>
                    <li>Choose WPA3 for maximum security if all clients support it</li>
                    <li>Always use AES encryption (required for WPA3)</li>
                    <li>Enable VLAN assignment if you need to segment users on different VLANs</li>
                </ul>
            </div>
            
            <div class="step-navigation">
                <button class="btn btn-outline-secondary" @click="goBack">Previous</button>
                <button class="btn btn-primary" @click="saveAndContinue" :disabled="!isValid">Next</button>
            </div>
        </div>
    `,
    data() {
        return {
            ssid: this.config.wireless.ssid || '',
            authType: this.config.wireless.authType || 'wpa2',
            encryption: this.config.wireless.encryption || 'aes',
            broadcastSsid: this.config.wireless.broadcastSsid === '1',
            vlanOverride: this.config.wireless.vlanOverride === '1'
        };
    },
    computed: {
        isValid() {
            return validators.isValidSsid(this.ssid);
        }
    },
    watch: {
        authType(newVal) {
            if (newVal === 'wpa3') {
                this.encryption = 'aes';
            }
        }
    },
    methods: {
        goBack() {
            this.saveConfig();
            this.$parent.currentStep = 'tacacs';
        },
        saveAndContinue() {
            if (this.isValid) {
                this.saveConfig();
                this.$emit('next-step');
            } else {
                alert('Please provide a valid SSID name (1-32 characters).');
            }
        },
        saveConfig() {
            const updatedWireless = {
                ...this.config.wireless,
                ssid: this.ssid,
                authType: this.authType,
                encryption: this.encryption,
                broadcastSsid: this.broadcastSsid ? '1' : '0',
                vlanOverride: this.vlanOverride ? '1' : '0'
            };
            
            this.$emit('update:config', {
                wireless: updatedWireless
            });
        }
    }
});

// manifest.json
{
    "name": "Dot1Xer Supreme 2.0",
    "short_name": "Dot1Xer",
    "description": "Ultimate 802.1X Configuration Generator with Multi-vendor Support",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#f8f9fa",
    "theme_color": "#007bff",
    "orientation": "any",
    "icons": [
        {
            "src": "assets/icons/icon-192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any maskable"
        },
        {
            "src": "assets/icons/icon-512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any maskable"
        }
    ],
    "categories": ["utilities", "productivity", "network", "developer tools"],
    "screenshots": [
        {
            "src": "assets/screenshots/screen1.png",
            "sizes": "1280x720",
            "type": "image/png"
        },
        {
            "src": "assets/screenshots/screen2.png",
            "sizes": "1280x720",
            "type": "image/png"
        }
    ]
}

# Download real icons instead of placeholders
echo "Downloading default icons..."
mkdir -p assets/icons
curl -s "https://img.icons8.com/fluency/96/null/wifi-lock.png" > assets/icons/supreme-logo.png
curl -s "https://img.icons8.com/fluency/192/null/wifi-lock.png" > assets/icons/icon-192.png
curl -s "https://img.icons8.com/fluency/512/null/wifi-lock.png" > assets/icons/icon-512.png

# Notify about future improvements
echo "Future improvements:"
echo "- Integrate with ChatGPT's API to continuously update or improve switch configurations. For example, a backend service could submit your current config to ChatGPT and retrieve suggestions to update the UI."
echo "- Add additional tabs or menus for Network 802.1X planning, Project Planning, and Architecture modularly."
echo "- Vendor-specific configuration files are modularized (in js/templates/), making maintenance easier. Future vendors can be added by simply creating new template files and updating the vendor dropdown."
echo "- Add real-time AI-driven security analysis via integration with OpenAI or Claude APIs"
echo "- Implement real-time configuration validation and best practice analysis"
echo "- Add a marketplace for community-contributed templates and configurations"
