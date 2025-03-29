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

function generateArchitectureConfig() {
    const vendor = document.getElementById("vendor").value;
    const scope = document.getElementById("scope").value;
    const config = `! Architecture Configuration for ${vendor.toUpperCase()}
! Scope: ${scope}
! Vendor Logo: <img src="assets/logos/${vendor}.png" alt="${vendor} logo" width="100">
radius-server host 192.168.1.10 auth-port 1812 acct-port 1813 key SecretKey
vlan 10
 name Authenticated
vlan 99
 name Quarantine
interface Vlan1
 description Management
 ip address 192.168.1.1 255.255.255.0
`;
    document.getElementById("architectureConfigOutput").innerText = config;
    return { platform: "architecture", content: config };
}

function generateIosXeConfig() {
    const scope = document.getElementById("scope_iosxe").value;
    const config = `! IOS-XE Configuration
! Scope: ${scope}
aaa new-model
radius-server host 192.168.1.10 key SecretKey
interface GigabitEthernet0/1
 switchport mode access
 authentication port-control auto
 dot1x pae authenticator
 spanning-tree portfast
`;
    document.getElementById("iosxeConfigOutput").innerText = config;
    return { platform: "iosxe", content: config };
}

function generateNxOsConfig() {
    const scope = document.getElementById("scope_nxos").value;
    const config = `! NX-OS Configuration
! Scope: ${scope}
feature dot1x
radius-server host 192.168.1.10 key SecretKey
interface Ethernet1/1
 switchport mode access
 dot1x port-control auto
 spanning-tree port type edge
`;
    document.getElementById("nxosConfigOutput").innerText = config;
    return { platform: "nxos", content: config };
}

function generateArubaOsConfig() {
    const scope = document.getElementById("scope_arubaos").value;
    const config = `! ArubaOS Configuration
! Scope: ${scope}
aaa authentication dot1x "dot1x-profile"
 radius-server host 192.168.1.10 key SecretKey
interface gigabitethernet 0/0/1
 switchport access vlan 10
 dot1x enable
`;
    document.getElementById("arubaosConfigOutput").innerText = config;
    return { platform: "arubaos", content: config };
}

function downloadConfig(platform) {
    let config;
    if (platform === "iosxe") config = generateIosXeConfig();
    else if (platform === "nxos") config = generateNxOsConfig();
    else if (platform === "arubaos") config = generateArubaOsConfig();
    else config = generateArchitectureConfig();
    const blob = new Blob([config.content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `dot1xer_${config.platform || 'architecture'}_config.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Open the first tab by default
document.getElementsByClassName("tablinks")[0].click();
