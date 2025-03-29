function generateArubaOsConfig(config) {
    let output = `! ArubaOS Configuration\n`;

    output += `! AAA Configuration\n`;
    switch (config.aaa.authMethod) {
        case '1': output += `aaa authentication login default local\n`; break;
        case '2': output += `aaa authentication dot1x "dot1x-profile" radius\n`; break;
        case '3': output += `aaa authentication login default tacacs\n`; break;
        case '4': output += `aaa authentication login default tacacs radius\n`;
                  output += `aaa authentication dot1x "dot1x-profile" radius\n`; break;
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
            output += `radius-server host ${region.ip} key ${config.portnox.secret}\n`;
        } else if (region.ip1 && region.ip2) {
            output += `radius-server host ${region.ip1} key ${config.portnox.secret}\n`;
            output += `radius-server host ${region.ip2} key ${config.portnox.sameSecret === '1' ? config.portnox.secret : config.portnox.secondarySecret}\n`;
        }
        output += `aaa server group "PORTNOX"\n`;
        output += ` auth-server ${region.ip1 || region.ip}\n`;
        if (region.ip2) output += ` auth-server ${region.ip2}\n`;
        output += `!\n`;
    }

    if (config.radius.type === '1' || (config.radius.type === '2' && config.portnox.enable !== '1')) {
        output += `! RADIUS Server Configuration\n`;
        output += `radius-server host ${config.radius.primaryIp} key ${config.radius.primarySecret}\n`;
        if (config.radius.secondary) {
            output += `radius-server host ${config.radius.secondaryIp} key ${config.radius.secondarySecret}\n`;
        }
        output += `aaa server group "${config.radius.groupName}"\n`;
        output += ` auth-server ${config.radius.primaryIp}\n`;
        if (config.radius.secondary) output += ` auth-server ${config.radius.secondaryIp}\n`;
        output += `!\n`;
    }

    if (config.tacacs.enable) {
        output += `! TACACS+ Server Configuration\n`;
        output += `tacacs-server host ${config.tacacs.primaryIp} key ${config.tacacs.primarySecret}\n`;
        if (config.tacacs.secondary) {
            output += `tacacs-server host ${config.tacacs.secondaryIp} key ${config.tacacs.secondarySecret}\n`;
        }
        output += `aaa server group "${config.tacacs.groupName}"\n`;
        output += ` auth-server ${config.tacacs.primaryIp}\n`;
        if (config.tacacs.secondary) output += ` auth-server ${config.tacacs.secondaryIp}\n`;
        output += `!\n`;
    }

    if (config.dot1x.enable === '1') {
        output += `! 802.1X Configuration\n`;
        output += `aaa authentication dot1x "dot1x-profile"\n`;
        output += ` radius-server group "${config.radius.groupName}"\n`;
        output += `!\n`;
        output += `vlan ${config.dot1x.vlan}\n`;
        output += ` name Authenticated\n`;
        output += `interface ${config.dot1x.interface}\n`;
        output += ` switchport access vlan ${config.dot1x.vlan}\n`;
        output += ` dot1x enable\n`;
        output += ` authentication dot1x\n`;
        output += ` description 802.1X Enabled Port\n`;
        output += `aaa profile "dot1x-profile"\n`;
        output += ` authentication-dot1x\n`;
        output += ` dot1x-server-group "${config.radius.groupName}"\n`;
        output += ` dot1x-default-role "authenticated"\n`;
        if (config.dot1x.vlanAssign === '1') {
            if (config.dot1x.guestVlan) output += ` initial-role "guest"\n`;
            if (config.dot1x.authFailVlan) output += ` authentication-failure-role "quarantine"\n`;
        }
        output += `!\n`;
    }

    return output;
}
