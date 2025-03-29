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
        config = `! Network Architecture Config (Wires & Wi-Fi Inspired)\n! Scope: ${scope}\n! Generated on ${new Date().toLocaleString()}\nvlan ${vlan}\n name Authenticated\nradius-server host ${radiusIp} auth-port 1812 acct-port 1813 key SecretKey\n`;
        if (dhcpSnooping) config += `ip dhcp snooping vlan ${vlan}\nip dhcp snooping\n`;
        if (arpInspection) config += `ip arp inspection vlan ${vlan}\n`;
    } else if (section === "iosxe") {
        let scope = document.getElementById("iosxe_scope").value;
        let intf = document.getElementById("iosxe_interface").value;
        let vlan = document.getElementById("iosxe_vlan").value;
        let radiusIp = document.getElementById("iosxe_radius_ip").value;
        let reauth = document.getElementById("iosxe_reauth").value || 3600;
        let tx = document.getElementById("iosxe_tx").value || 10;
        let dacl = document.getElementById("iosxe_dacl").value || "PERMIT_ALL";
        config = `! Cisco IOS-XE Config with ISE (Wires & Wi-Fi Template)\n! Scope: ${scope}\n! Generated on ${new Date().toLocaleString()}\naaa new-model\naaa authentication dot1x default group radius\naaa authorization network default group radius\naaa accounting dot1x default start-stop group radius\ndot1x system-auth-control\nradius server ISE\n address ipv4 ${radiusIp} auth-port 1812 acct-port 1813\n key SecretKey\nradius-server vsa send accounting\nradius-server vsa send authentication\nip dhcp snooping vlan ${vlan}\nip dhcp snooping\nip device tracking\nvlan ${vlan}\n name Authenticated\ninterface ${intf}\n switchport mode access\n switchport access vlan ${vlan}\n authentication order dot1x mab\n authentication priority dot1x mab\n authentication event fail action next-method\n authentication event server dead action authorize vlan ${vlan}\n authentication event server alive action reinitialize\n authentication host-mode multi-auth\n authentication port-control auto\n authentication timer reauthenticate server\n authentication violation restrict\n dot1x pae authenticator\n dot1x timeout tx-period ${tx}\n ip access-group ${dacl} in\n`;
    } else if (section === "nxos") {
        let scope = document.getElementById("nxos_scope").value;
        let intf = document.getElementById("nxos_interface").value;
        let vlan = document.getElementById("nxos_vlan").value;
        let radiusIp = document.getElementById("nxos_radius_ip").value;
        let reauth = document.getElementById("nxos_reauth").value || 3600;
        config = `! Cisco NX-OS Config with ISE (Wires & Wi-Fi Template)\n! Scope: ${scope}\n! Generated on ${new Date().toLocaleString()}\nfeature dot1x\naaa authentication dot1x default group radius\nradius-server host ${radiusIp} key SecretKey auth-port 1812 acct-port 1813\nvlan ${vlan}\n name Authenticated\ninterface ${intf}\n switchport access vlan ${vlan}\n dot1x port-control auto\n dot1x reauthentication\n dot1x timeout reauth-period ${reauth}\n`;
    } else if (section === "arubaos") {
        let scope = document.getElementById("arubaos_scope").value;
        let intf = document.getElementById("arubaos_interface").value;
        let vlan = document.getElementById("arubaos_vlan").value;
        let radiusIp = document.getElementById("arubaos_radius_ip").value;
        let profile = document.getElementById("arubaos_profile").value;
        config = `! ArubaOS Config with ISE (Wires & Wi-Fi Template)\n! Scope: ${scope}\n! Generated on ${new Date().toLocaleString()}\naaa authentication dot1x "${profile}"\n dot1x enable\n aaa server-group "radius-group"\n  auth-server ${radiusIp}\nradius-server host ${radiusIp} key SecretKey port 1812\nvlan ${vlan}\n name Authenticated\ninterface ${intf}\n switchport access vlan ${vlan}\n dot1x enable\n aaa authentication dot1x "${profile}"\n`;
    } else if (section === "juniper") {
        let scope = document.getElementById("juniper_scope").value;
        let intf = document.getElementById("juniper_interface").value;
        let vlan = document.getElementById("juniper_vlan").value;
        let radiusIp = document.getElementById("juniper_radius_ip").value;
        let reauth = document.getElementById("juniper_reauth").value || 3600;
        config = `! Juniper Config with ISE (Wires & Wi-Fi Template)\n! Scope: ${scope}\n! Generated on ${new Date().toLocaleString()}\nset system radius-server ${radiusIp} secret SecretKey port 1812\nset access profile dot1x-profile authentication-order radius\nset access profile dot1x-profile radius authentication-server ${radiusIp}\nset vlans authenticated vlan-id ${vlan}\nset protocols dot1x authenticator authentication-profile-name dot1x-profile\nset protocols dot1x authenticator interface ${intf} reauthentication ${reauth}\nset protocols dot1x authenticator interface ${intf} supplicant multiple\n`;
    } else if (section === "extreme") {
        let scope = document.getElementById("extreme_scope").value;
        let intf = document.getElementById("extreme_interface").value;
        let vlan = document.getElementById("extreme_vlan").value;
        let radiusIp = document.getElementById("extreme_radius_ip").value;
        let clientIp = document.getElementById("extreme_client_ip").value;
        config = `! Extreme Config with ISE (Wires & Wi-Fi Template)\n! Scope: ${scope}\n! Generated on ${new Date().toLocaleString()}\nconfigure radius netlogin primary server ${radiusIp} 1812 client-ip ${clientIp} shared-secret SecretKey\nconfigure radius netlogin primary accounting-server ${radiusIp} 1813 client-ip ${clientIp} shared-secret SecretKey\nenable radius netlogin\nconfigure vlan ${vlan} name Authenticated\nconfigure netlogin vlan ${vlan}\nenable netlogin dot1x\nconfigure netlogin dot1x port ${intf} authentication enable\n`;
    } else if (section === "arista") {
        let scope = document.getElementById("arista_scope").value;
        let intf = document.getElementById("arista_interface").value;
        let vlan = document.getElementById("arista_vlan").value;
        let radiusIp = document.getElementById("arista_radius_ip").value;
        config = `! Arista Config with ISE (Wires & Wi-Fi Template)\n! Scope: ${scope}\n! Generated on ${new Date().toLocaleString()}\naaa authentication dot1x default group radius\ndot1x system-auth-control\nradius-server host ${radiusIp} auth-port 1812 acct-port 1813 key SecretKey\nvlan ${vlan}\n name Authenticated\ninterface ${intf}\n switchport access vlan ${vlan}\n dot1x pae authenticator\n dot1x port-control auto\n`;
    } else if (section === "networkDiscovery") {
        let scope = document.getElementById("discovery_scope").value;
        let ipRange = document.getElementById("ip_range").value;
        let protocol = document.getElementById("protocol").value;
        config = `! Network Discovery Diagram\n! Scope: ${scope}\n! Generated on ${new Date().toLocaleString()}\n! IP Range: ${ipRange}\n! Protocol: ${protocol.toUpperCase()}\nTarget Range: ${ipRange}\nDiscovery Protocol: ${protocol.toUpperCase()}\nDevices: Core Switch, Access Switch, Wireless AP (example topology)\n`;
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
    link.download = `dot1xer_${section}_config_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Show the first section by default
showSection('Architecture');
