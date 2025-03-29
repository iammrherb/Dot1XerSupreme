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
interface Vlan1
 description Management
 ip address 192.168.1.1 255.255.255.0
!
! Vendor Logo: <img src="assets/logos/${vendor}.png" alt="${vendor} logo" width="100">
`;
    document.getElementById("architectureConfigOutput").innerText = config;
    return { platform: "architecture", content: config };
}

function generateIosXeConfig() {
    const scope = document.getElementById("scope_iosxe").value;
    const config = `! IOS-XE Configuration
! Scope: ${scope}
... (IOS-XE config placeholder)
`;
    document.getElementById("iosxeConfigOutput").innerText = config;
    return { platform: "iosxe", content: config };
}

function generateNxOsConfig() {
    const scope = document.getElementById("scope_nxos").value;
    const config = `! NX-OS Configuration
! Scope: ${scope}
... (NX-OS config placeholder)
`;
    document.getElementById("nxosConfigOutput").innerText = config;
    return { platform: "nxos", content: config };
}

function generateArubaOsConfig() {
    const scope = document.getElementById("scope_arubaos").value;
    const config = `! ArubaOS Configuration
! Scope: ${scope}
... (ArubaOS config placeholder)
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
