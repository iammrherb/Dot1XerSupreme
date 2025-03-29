function generateNxOsConfig(config) {
    let output = `! Cisco NX-OS Configuration\n`;

    output += `! AAA Configuration\n`;
    switch (config.aaa.authMethod) {
        case '1': output += `aaa authentication login default local\n`; break;
        case '2': output += `aaa authentication login default group ${config.radius.groupName}\n`;
                  output += `aaa authentication dot1x default group ${config.radius.groupName}\n`; break;
        case '3': output += `aaa authentication login default group ${config.tacacs.groupName}\n`;
                  output += `aaa authentication dot1x default group ${config.radius.groupName}\n`; break;
        case '4': output += `aaa authentication login default group ${config.tacacs.groupName} ${config.radius.groupName}\n`;
                  output += `aaa authentication dot1x default group ${config.radius.groupName}\n`; break;
    }
    switch (config.aaa.authorMethod) {
        case '2': output += `aaa authorization network default group ${config.radius.groupName}\n`; break;
        case '3': output += `aaa authorization commands 15 default group ${config.tacacs.groupName}\n`; break;
        case '4': output += `aaa authorization commands 15 default group ${config.tacacs.groupName}\n`;
                  output += `aaa authorization network default group ${config.radius.groupName}\n`; break;
    }
    switch (config.aaa.accountMethod) {
        case '2': output += `aaa accounting network default start-stop group ${config.radius.groupName}\n`; break;
        case '3': output += `aaa accounting commands 15 default start-stop group ${config.tacacs.groupName}\n`; break;
        case '4': output += `aaa accounting commands 15 default start-stop group ${config.tacacs.groupName}\n`;
                  output += `aaa accounting network default start-stop group ${config.radius.groupName}\n`; break;
    }
    output += `!\n`;

    if (config.portnox.enable === '1') {
        output += `! Portnox Cloud RADIUS Configuration\n`;
        const regions = {
            '1': { ip: 'us-radius.portnox.com', name: 'PORTNOX-US' },
            '2': { ip: 'eu-radius.portnox.com', name: 'PORTNOX-EU' },
            '3': { ip1: 'us-radius.portnox.com', ip2: 'eu-radius.portnox.com', name1: 'PORTNOX-US', name2: 'PORTNOX-EU' }
        };
        const region = regions[config.portnox.region];
        if (region.ip) {
            output += `radius-server host ${region.ip} key ${config.portnox.secret} auth-port 1812 acct-port 1813\n`;
        } else if (region.ip1 && region.ip2) {
            output += `radius-server host ${region.ip1} key ${config.portnox.secret} auth-port 1812 acct-port 1813\n`;
            output += `radius-server host ${region.ip2} key ${config.portnox.sameSecret === '1' ? config.portnox.secret : config.portnox.secondarySecret} auth-port 1812 acct-port 1813\n`;
        }
        output += `aaa group server radius PORTNOX\n`;
        output += ` server ${region.ip1 || region.ip}\n`;
        if (region.ip2) output += ` server ${region.ip2}\n`;
        output += ` deadtime 15\n`;
        output += `!\n`;
    }

    if (config.radius.type === '1' || (config.radius.type === '2' && config.portnox.enable !== '1')) {
        output += `! RADIUS Server Configuration\n`;
        output += `radius-server host ${config.radius.primaryIp} key ${config.radius.primarySecret} auth-port ${config.radius.primaryAuthPort} acct-port ${config.radius.primaryAcctPort}\n`;
        if (config.radius.secondary) {
            output += `radius-server host ${config.radius.secondaryIp} key ${config.radius.secondarySecret} auth-port ${config.radius.secondaryAuthPort} acct-port ${config.radius.secondaryAcctPort}\n`;
        }
        output += `aaa group server radius ${config.radius.groupName}\n`;
        output += ` server ${config.radius.primaryIp}\n`;
        if (config.radius.secondary) output += ` server ${config.radius.secondaryIp}\n`;
        output += ` deadtime ${config.radius.deadtime}\n`;
        output += `!\n`;
    }

    if (config.tacacs.enable) {
        output += `! TACACS+ Server Configuration\n`;
        output += `tacacs-server host ${config.tacacs.primaryIp} port ${config.tacacs.primaryPort} key ${config.tacacs.primarySecret}\n`;
        if (config.tacacs.secondary) {
            output += `tacacs-server host ${config.tacacs.secondaryIp} port ${config.tacacs.secondaryPort} key ${config.tacacs.secondarySecret}\n`;
        }
        output += `aaa group server tacacs+ ${config.tacacs.groupName}\n`;
        output += ` server ${config.tacacs.primaryIp}\n`;
        if (config.tacacs.secondary) output += ` server ${config.tacacs.secondaryIp}\n`;
        output += `!\n`;
    }

    if (config.dot1x.enable === '1') {
        output += `! 802.1X Global Configuration\n`;
        output += `feature dot1x\n`;
        output += `!\n`;
        output += `! Interface Configuration\n`;
        output += `vlan ${config.dot1x.vlan}\n`;
        output += ` name Authenticated\n`;
        output += `interface ${config.dot1x.interface}\n`;
        output += ` switchport mode access\n`;
        output += ` switchport access vlan ${config.dot1x.vlan}\n`;
        output += ` dot1x port-control auto\n`;
        output += ` dot1x timeout tx-period ${config.dot1x.txPeriod}\n`;
        output += ` dot1x reauthentication\n`;
        output += ` dot1x reauth-period ${config.dot1x.reauthPeriod}\n`;
        output += ` spanning-tree port type edge\n`;
        output += ` ip dhcp snooping trust\n`;
        output += ` ip arp inspection trust\n`;
        output += ` description 802.1X Enabled Port\n`;
        output += `ip dhcp snooping\n`;
        output += `ip arp inspection\n`;
        if (config.dot1x.vlanAssign === '1') {
            if (config.dot1x.guestVlan) output += ` dot1x guest-vlan ${config.dot1x.guestVlan}\n`;
            if (config.dot1x.authFailVlan) output += ` dot1x auth-fail vlan ${config.dot1x.authFailVlan}\n`;
            if (config.dot1x.criticalVlan) output += ` dot1x critical vlan ${config.dot1x.criticalVlan}\n`;
        }
        output += `!\n`;
    }

    return output;
}
