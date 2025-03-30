let configData = {
    platform: '',
    aaa: {},
    radius: {},
    tacacs: {},
    dot1x: {},
    coa: {},
    deviceTracking: {},
    ibns: {},
    port: {}
};

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function showSection(sectionId) {
    // Hide all sections
    const sections = document.getElementsByClassName('section');
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none';
        sections[i].classList.remove('active');
    }

    // Remove active class from all sidebar links
    const links = document.querySelectorAll('.sidebar nav ul li a');
    for (let i = 0; i < links.length; i++) {
        links[i].classList.remove('active');
    }

    // Show the selected section and mark the link as active
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
        selectedSection.classList.add('active');
        const selectedLink = document.querySelector(`a[onclick="showSection('${sectionId}')"]`);
        if (selectedLink) {
            selectedLink.classList.add('active');
        }
    } else {
        console.error(`Section with ID ${sectionId} not found.`);
    }
}

function updatePlatformInfo() {
    const platform = document.getElementById('platform').value;
    configData.platform = platform;
    const platformInfo = document.getElementById('platformInfo');
    const info = {
        'cisco_iosxe': "Cisco: IOS-XE (Catalyst): Modern Catalyst switches (9000, 3800, etc.) with IBNS 2.0 support.",
        'cisco_nxos': "Cisco: NX-OS (Nexus): Nexus switches with different AAA syntax and features.",
        'aruba_arubaos': "Aruba: ArubaOS: Wired and wireless switches with dot1x profiles.",
        'juniper_junos': "Juniper: Junos: EX/QFX switches with 802.1X support.",
        'extreme_exos': "Extreme: EXOS: Extreme Networks switches with netlogin.",
        'arista_eos': "Arista: EOS: EOS switches with 802.1X capabilities."
    };
    platformInfo.innerHTML = `<p><strong>${info[platform].split(':')[0]}: ${info[platform].split(':')[1]}:</strong> ${info[platform].split(':')[2]}</p>`;
}

function generateConfig() {
    let config = `! Generated Configuration\n! Platform: ${configData.platform}\n! Generated on ${new Date().toLocaleString()}\n`;

    // AAA Settings
    configData.aaa = {
        authMethod: document.getElementById('aaa_auth_method').value,
        accounting: document.getElementById('aaa_accounting').checked
    };

    // RADIUS Servers
    configData.radius = {
        ip: document.getElementById('radius_ip').value,
        key: document.getElementById('radius_key').value
    };

    // TACACS+ Servers
    configData.tacacs = {
        ip: document.getElementById('tacacs_ip').value || '',
        key: document.getElementById('tacacs_key').value || ''
    };

    // 802.1X Settings
    configData.dot1x = {
        interface: document.getElementById('dot1x_interface').value,
        vlan: document.getElementById('dot1x_vlan').value,
        reauth: document.getElementById('dot1x_reauth').value || 3600,
        tx: document.getElementById('dot1x_tx').value || 10
    };

    // CoA
    configData.coa = {
        enable: document.getElementById('coa_enable').checked,
        port: document.getElementById('coa_port').value || 1700
    };

    // Device Tracking
    configData.deviceTracking = {
        enable: document.getElementById('device_tracking_enable').checked,
        policy: document.getElementById('device_tracking_policy').value || 'IP-TRACKING'
    };

    // IBNS 2.0
    configData.ibns = {
        enable: document.getElementById('ibns_enable').checked,
        policy: document.getElementById('ibns_policy').value || 'DOT1X_MAB_POLICY'
    };

    // Port Integration
    configData.port = {
        mode: document.getElementById('port_mode').value,
        hostMode: document.getElementById('port_host_mode').value
    };

    // Generate config based on platform
    if (configData.platform === 'cisco_iosxe') {
        config += `aaa new-model\n`;
        if (configData.aaa.authMethod === 'radius') {
            config += `aaa authentication dot1x default group radius\n`;
            config += `aaa authorization network default group radius\n`;
            if (configData.aaa.accounting) {
                config += `aaa accounting dot1x default start-stop group radius\n`;
            }
            config += `radius server ISE\n address ipv4 ${configData.radius.ip} auth-port 1812 acct-port 1813\n key ${configData.radius.key}\n`;
        }
        config += `dot1x system-auth-control\n`;
        if (configData.deviceTracking.enable) {
            config += `ip device tracking\n`;
            config += `device-tracking policy ${configData.deviceTracking.policy}\n`;
        }
        if (configData.ibns.enable) {
            config += `policy-map type control subscriber ${configData.ibns.policy}\n`;
            config  config += ` event session-started match-all\n  10 class always do-until-failure\n   10 authenticate using dot1x priority 10\n`;
        }
        config += `interface ${configData.dot1x.interface}\n`;
        config += ` switchport mode ${configData.port.mode}\n`;
        config += ` switchport access vlan ${configData.dot1x.vlan}\n`;
        config += ` authentication host-mode ${configData.port.hostMode}\n`;
        config += ` authentication port-control auto\n`;
        config += ` dot1x pae authenticator\n`;
        config += ` dot1x timeout tx-period ${configData.dot1x.tx}\n`;
    } else if (configData.platform === 'cisco_nxos') {
        config += `feature dot1x\n`;
        if (configData.aaa.authMethod === 'radius') {
            config += `aaa authentication dot1x default group radius\n`;
            config += `radius-server host ${configData.radius.ip} key ${configData.radius.key} auth-port 1812 acct-port 1813\n`;
        }
        config += `interface ${configData.dot1x.interface}\n`;
        config += ` switchport access vlan ${configData.dot1x.vlan}\n`;
        config += ` dot1x port-control auto\n`;
        config += ` dot1x timeout reauth-period ${configData.dot1x.reauth}\n`;
    } else if (configData.platform === 'aruba_arubaos') {
        config += `aaa authentication dot1x "dot1x-profile"\n dot1x enable\n`;
        if (configData.aaa.authMethod === 'radius') {
            config += `aaa server-group "radius-group"\n  auth-server ${configData.radius.ip}\n`;
            config += `radius-server host ${configData.radius.ip} key ${configData.radius.key} port 1812\n`;
        }
        config += `interface ${configData.dot1x.interface}\n`;
        config += ` switchport access vlan ${configData.dot1x.vlan}\n`;
        config += ` dot1x enable\n aaa authentication dot1x "dot1x-profile"\n`;
    } else if (configData.platform === 'juniper_junos') {
        config += `set system radius-server ${configData.radius.ip} secret ${configData.radius.key} port 1812\n`;
        config += `set access profile dot1x-profile authentication-order radius\n`;
        config += `set access profile dot1x-profile radius authentication-server ${configData.radius.ip}\n`;
        config += `set vlans authenticated vlan-id ${configData.dot1x.vlan}\n`;
        config += `set protocols dot1x authenticator authentication-profile-name dot1x-profile\n`;
        config += `set protocols dot1x authenticator interface ${configData.dot1x.interface} reauthentication ${configData.dot1x.reauth}\n`;
    } else if (configData.platform === 'extreme_exos') {
        config += `configure radius netlogin primary server ${configData.radius.ip} 1812 client-ip ${configData.radius.ip} shared-secret ${configData.radius.key}\n`;
        config += `enable radius netlogin\n`;
        config += `configure vlan ${configData.dot1x.vlan} name Authenticated\n`;
        config += `configure netlogin vlan ${configData.dot1x.vlan}\n`;
        config += `enable netlogin dot1x\n`;
        config += `configure netlogin dot1x port ${configData.dot1x.interface} authentication enable\n`;
    } else if (configData.platform === 'arista_eos') {
        config += `aaa authentication dot1x default group radius\n`;
        config += `dot1x system-auth-control\n`;
        config += `radius-server host ${configData.radius.ip} auth-port 1812 acct-port 1813 key ${configData.radius.key}\n`;
        config += `interface ${configData.dot1x.interface}\n`;
        config += ` switchport access vlan ${configData.dot1x.vlan}\n`;
        config += ` dot1x pae authenticator\n`;
        config += ` dot1x port-control auto\n`;
    }

    document.getElementById('configOutput').textContent = config;
}

function downloadConfig() {
    let config = document.getElementById('configOutput').textContent;
    if (!config) {
        alert("Please generate a config first!");
        return;
    }
    let blob = new Blob([config], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `dot1xer_config_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Show the first section by default
document.addEventListener('DOMContentLoaded', () => {
    showSection('PlatformSelection');
});
