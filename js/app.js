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
    const vendor = document.getElementById("vendor").value;
    const scope = document.getElementById("scope").value;
    const vlan = document.getElementById("vlan").value;
    const radiusIp = document.getElementById("radius_ip").value;
    const config = `! Architecture Configuration for ${vendor.toUpperCase()}
! Scope: ${scope}
! Vendor Logo: <img src="assets/logos/${vendor}.png" alt="${vendor} logo" width="100">
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
ip dhcp snooping vlan ${vlan}
ip arp inspection vlan ${vlan}
ip verify source vlan ${vlan}
`;
    document.getElementById("architectureConfigOutput").innerText = config;
    return { platform: "architecture", content: config };
}

function generateIosXeConfig() {
    const scope = document.getElementById("scope_iosxe").value;
    const interface = document.getElementById("interface_iosxe").value;
    const vlan = document.getElementById("vlan_iosxe").value;
    const radiusIp = document.getElementById("radius_ip_iosxe").value;
    const config = `! Cisco IOS-XE Configuration
! Scope: ${scope}
aaa new-model
aaa authentication dot1x default group radius
aaa authorization network default group radius
aaa accounting dot1x default start-stop group radius
radius server dot1xer-radius
 address ipv4 ${radiusIp} auth-port 1812 acct-port 1813
 key SecretKey
 timeout 5
 retransmit 3
dot1x system-auth-control
vlan ${vlan}
 name Authenticated
interface ${interface}
 switchport mode access
 switchport access vlan ${vlan}
 authentication order dot1x mab
 authentication priority dot1x mab
 authentication port-control auto
 authentication periodic
 authentication timer reauthenticate server
 dot1x pae authenticator
 dot1x timeout tx-period 10
 spanning-tree portfast
 ip dhcp snooping trust
 ip arp inspection trust
 description 802.1X Enabled Port
ip dhcp snooping
ip arp inspection
`;
    document.getElementById("iosxeConfigOutput").innerText = config;
    return { platform: "iosxe", content: config };
}

function generateNxOsConfig() {
    const scope = document.getElementById("scope_nxos").value;
    const interface = document.getElementById("interface_nxos").value;
    const vlan = document.getElementById("vlan_nxos").value;
    const radiusIp = document.getElementById("radius_ip_nxos").value;
    const config = `! Cisco NX-OS Configuration
! Scope: ${scope}
feature dot1x
aaa authentication dot1x default group radius
radius-server host ${radiusIp} key SecretKey auth-port 1812 acct-port 1813
vlan ${vlan}
 name Authenticated
interface ${interface}
 switchport mode access
 switchport access vlan ${vlan}
 dot1x port-control auto
 dot1x timeout tx-period 10
 dot1x reauthentication
 spanning-tree port type edge
 ip dhcp snooping trust
 ip arp inspection trust
 description 802.1X Enabled Port
ip dhcp snooping
ip arp inspection
`;
    document.getElementById("nxosConfigOutput").innerText = config;
    return { platform: "nxos", content: config };
}

function generateArubaOsConfig() {
    const scope = document.getElementById("scope_arubaos").value;
    const interface = document.getElementById("interface_arubaos").value;
    const vlan = document.getElementById("vlan_arubaos").value;
    const radiusIp = document.getElementById("radius_ip_arubaos").value;
    const config = `! ArubaOS Configuration
! Scope: ${scope}
aaa authentication dot1x "dot1x-profile"
 radius-server host ${radiusIp} key SecretKey
 aaa server group "radius-group"
  auth-server ${radiusIp}
vlan ${vlan}
 name Authenticated
interface ${interface}
 switchport access vlan ${vlan}
 dot1x enable
 authentication dot1x
 description 802.1X Enabled Port
aaa profile "dot1x-profile"
 authentication-dot1x
 dot1x-server-group "radius-group"
 dot1x-default-role "authenticated"
`;
    document.getElementById("arubaosConfigOutput").innerText = config;
    return { platform: "arubaos", content: config };
}

function generateJuniperConfig() {
    const scope = document.getElementById("scope_juniper").value;
    const interface = document.getElementById("interface_juniper").value;
    const vlan = document.getElementById("vlan_juniper").value;
    const radiusIp = document.getElementById("radius_ip_juniper").value;
    const config = `! Juniper Configuration
! Scope: ${scope}
set system radius-server ${radiusIp} secret SecretKey
set system radius-server ${radiusIp} authentication-port 1812
set system radius-server ${radiusIp} accounting-port 1813
set access profile dot1x-profile authentication-order radius
set access profile dot1x-profile radius-server ${radiusIp}
set vlans authenticated vlan-id ${vlan}
set protocols dot1x authenticator authentication-profile-name dot1x-profile
set protocols dot1x authenticator interface ${interface} supplicant multiple
set protocols dot1x authenticator interface ${interface} reauthentication 3600
set interfaces ${interface} unit 0 family ethernet-switching vlan members authenticated
set ethernet-switching-options secure-access-port vlan ${vlan}
set ethernet-switching-options secure-access-port interface ${interface} dhcp-snooping
`;
    document.getElementById("juniperConfigOutput").innerText = config;
    return { platform: "juniper", content: config };
}

function generateExtremeConfig() {
    const scope = document.getElementById("scope_extreme").value;
    const interface = document.getElementById("interface_extreme").value;
    const vlan = document.getElementById("vlan_extreme").value;
    const radiusIp = document.getElementById("radius_ip_extreme").value;
    const config = `! Extreme Networks Configuration
! Scope: ${scope}
configure radius netlogin primary server ${radiusIp} 1812 client-ip ${radiusIp.split('.').slice(0, 3).join('.')}.1 shared-secret SecretKey
configure radius netlogin primary enable
configure vlan ${vlan} name Authenticated
configure netlogin vlan ${vlan}
enable netlogin dot1x
configure netlogin dot1x port ${interface} authentication enable
configure netlogin dot1x port ${interface} reauthentication-period 3600
configure netlogin dot1x port ${interface} authentication-mode multi-supplicant
configure vlan ${vlan} ports ${interface} untagged
configure ip-security dhcp-snooping vlan ${vlan} ports ${interface} enable
`;
    document.getElementById("extremeConfigOutput").innerText = config;
    return { platform: "extreme", content: config };
}

function generateAristaConfig() {
    const scope = document.getElementById("scope_arista").value;
    const interface = document.getElementById("interface_arista").value;
    const vlan = document.getElementById("vlan_arista").value;
    const radiusIp = document.getElementById("radius_ip_arista").value;
    const config = `! Arista Configuration
! Scope: ${scope}
radius-server host ${radiusIp} key SecretKey auth-port 1812 acct-port 1813
aaa authentication dot1x default group radius
aaa authorization network default group radius
dot1x system-auth-control
vlan ${vlan}
 name Authenticated
interface ${interface}
 switchport mode access
 switchport access vlan ${vlan}
 dot1x pae authenticator
 dot1x authentication
 dot1x reauthentication
 dot1x timeout tx-period 10
 spanning-tree portfast
 description 802.1X Enabled Port
ip dhcp snooping vlan ${vlan}
ip arp inspection vlan ${vlan}
`;
    document.getElementById("aristaConfigOutput").innerText = config;
    return { platform: "arista", content: config };
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
    if (platform === "iosxe") config = generateIosXeConfig();
    else if (platform === "nxos") config = generateNxOsConfig();
    else if (platform === "arubaos") config = generateArubaOsConfig();
    else if (platform === "juniper") config = generateJuniperConfig();
    else if (platform === "extreme") config = generateExtremeConfig();
    else if (platform === "arista") config = generateAristaConfig();
    else if (platform === "networkdiscovery") config = generateNetworkDiscovery();
    else config = generateArchitectureConfig();
    const blob = new Blob([config.content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `dot1xer_${config.platform}_config.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Open the first tab by default
document.getElementsByClassName("tablinks")[0].click();
