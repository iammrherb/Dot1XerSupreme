function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function showSection(sectionId) {
    const sections = document.getElementsByClassName('section');
    const links = document.querySelectorAll('.sidebar nav ul li a');
    for (let i = 0; i < sections.length; i++) {
        sections[i].classList.remove('active');
    }
    for (let i = 0; i < links.length; i++) {
        links[i].classList.remove('active');
    }
    document.getElementById(sectionId).classList.add('active');
    document.querySelector(`a[onclick="showSection('${sectionId}')"]`).classList.add('active');
}

function generateConfig(section) {
    let config = "";
    let outputElement = document.getElementById(section + "Output");

    if (section === "architecture") {
        let scope = document.getElementById("arch_scope").value;
        let vlan = document.getElementById("arch_vlan").value;
        let radiusIp = document.getElementById("arch_radius_ip").value;
        let dhcpSnooping = document.getElementById("arch_dhcp_snooping").checked;
        let arpInspection = document.getElementById("arch_arp_inspection").checked;
        config = `! Network Architecture Config\n! Scope: ${scope}\nvlan ${vlan}\n name Authenticated\nradius-server host ${radiusIp} key SecretKey\n`;
        if (dhcpSnooping) config += `ip dhcp snooping vlan ${vlan}\n`;
        if (arpInspection) config += `ip arp inspection vlan ${vlan}\n`;
    } else if (section === "iosxe") {
        let scope = document.getElementById("iosxe_scope").value;
        let intf = document.getElementById("iosxe_interface").value;
        let vlan = document.getElementById("iosxe_vlan").value;
        let radiusIp = document.getElementById("iosxe_radius_ip").value;
        let reauth = document.getElementById("iosxe_reauth").value || 3600;
        let tx = document.getElementById("iosxe_tx").value || 10;
        config = `! Cisco IOS-XE Config\n! Scope: ${scope}\naaa new-model\ndot1x system-auth-control\nradius-server host ${radiusIp} key SecretKey\nvlan ${vlan}\n name Authenticated\ninterface ${intf}\n switchport access vlan ${vlan}\n authentication port-control auto\n dot1x pae authenticator\n authentication timer reauthenticate ${reauth}\n dot1x timeout tx-period ${tx}\n`;
    } else if (section === "nxos") {
        let scope = document.getElementById("nxos_scope").value;
        let intf = document.getElementById("nxos_interface").value;
        let vlan = document.getElementById("nxos_vlan").value;
        let radiusIp = document.getElementById("nxos_radius_ip").value;
        let reauth = document.getElementById("nxos_reauth").value || 3600;
        config = `! Cisco NX-OS Config\n! Scope: ${scope}\nfeature dot1x\nradius-server host ${radiusIp} key SecretKey\nvlan ${vlan}\n name Authenticated\ninterface ${intf}\n switchport access vlan ${vlan}\n dot1x port-control auto\n dot1x reauthentication ${reauth}\n`;
    } else if (section === "arubaos") {
        let scope = document.getElementById("arubaos_scope").value;
        let intf = document.getElementById("arubaos_interface").value;
        let vlan = document.getElementById("arubaos_vlan").value;
        let radiusIp = document.getElementById("arubaos_radius_ip").value;
        config = `! ArubaOS Config\n! Scope: ${scope}\n aaa authentication dot1x "dot1x-profile"\nradius-server host ${radiusIp} key SecretKey\nvlan ${vlan}\n name Authenticated\ninterface ${intf}\n switchport access vlan ${vlan}\n dot1x enable\n`;
    } else if (section === "juniper") {
        let scope = document.getElementById("juniper_scope").value;
        let intf = document.getElementById("juniper_interface").value;
        let vlan = document.getElementById("juniper_vlan").value;
        let radiusIp = document.getElementById("juniper_radius_ip").value;
        let reauth = document.getElementById("juniper_reauth").value || 3600;
        config = `! Juniper Config\n! Scope: ${scope}\nset system radius-server ${radiusIp} secret SecretKey\nset vlans authenticated vlan-id ${vlan}\nset protocols dot1x authenticator interface ${intf} reauthentication ${reauth}\n`;
    } else if (section === "extreme") {
        let scope = document.getElementById("extreme_scope").value;
        let intf = document.getElementById("extreme_interface").value;
        let vlan = document.getElementById("extreme_vlan").value;
        let radiusIp = document.getElementById("extreme_radius_ip").value;
        config = `! Extreme Config\n! Scope: ${scope}\nconfigure radius netlogin primary server ${radiusIp} 1812 client-ip 192.168.1.1 shared-secret SecretKey\nconfigure vlan ${vlan} name Authenticated\nconfigure netlogin dot1x port ${intf} authentication enable\n`;
    } else if (section === "arista") {
        let scope = document.getElementById("arista_scope").value;
        let intf = document.getElementById("arista_interface").value;
        let vlan = document.getElementById("arista_vlan").value;
        let radiusIp = document.getElementById("arista_radius_ip").value;
        config = `! Arista Config\n! Scope: ${scope}\nradius-server host ${radiusIp} key SecretKey\ndot1x system-auth-control\nvlan ${vlan}\n name Authenticated\ninterface ${intf}\n switchport access vlan ${vlan}\n dot1x pae authenticator\n`;
    } else if (section === "networkDiscovery") {
        let scope = document.getElementById("discovery_scope").value;
        let ipRange = document.getElementById("ip_range").value;
        let protocol = document.getElementById("protocol").value;
        config = `! Network Discovery Diagram\n! Scope: ${scope}\n! IP Range: ${ipRange}\n! Protocol: ${protocol.toUpperCase()}\nTarget Range: ${ipRange}\nDevices: Core Switch, Access Switch, Wireless AP\n`;
    }

    outputElement.textContent = config;
}

function downloadConfig(section) {
    let outputElement = document.getElementById(section + "Output");
    let config = outputElement.textContent;
    if (!config) {
        alert("Please generate a config first!");
        return;
    }
    let blob = new Blob([config], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `dot1xer_${section}_config.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Show the first section by default
showSection('Architecture');
