function generateJuniperConfig(config) {
    let output = `! Juniper Configuration\n`;

    output += `! AAA Configuration\n`;
    switch (config.aaa.authMethod) {
        case '1': output += `set system authentication-order local\n`; break;
        case '2': output += `set access profile dot1x-profile authentication-order radius\n`; break;
        case '3': output += `set system authentication-order tacacs\n`; break;
        case '4': output += `set system authentication-order tacacs radius\n`;
                  output += `set access profile dot1x-profile authentication-order radius\n`; break;
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
            output += `set system radius-server ${region.ip} secret ${config.portnox.secret}\n`;
            output += `set system radius-server ${region.ip} authentication-port 1812\n`;
            output += `set system radius-server ${region.ip} accounting-port 1813\n`;
        } else if (region.ip1 && region.ip2) {
            output += `set system radius-server ${region.ip1} secret ${config.portnox.secret}\n`;
            output += `set system radius-server ${region.ip1} authentication-port 1812\n`;
            output += `set system radius-server ${region.ip1} accounting-port 1813\n`;
            output += `set system radius-server ${region.ip2} secret ${config.portnox.sameSecret === '1' ? config.portnox.secret : config.portnox.secondarySecret}\n`;
            output += `set system radius-server ${region.ip2} authentication-port 1812\n`;
            output += `set system radius-server ${region.ip2} accounting-port 1813\n`;
        }
        output += `set access profile dot1x-profile radius-server ${region.ip1 || region.ip}\n`;
        if (region.ip2) output += `set access profile dot1x-profile radius-server ${region.ip2}\n`;
        output += `!\n`;
    }

    if (config.radius.type === '1' || (config.radius.type === '2' && config.portnox.enable !== '1')) {
        output += `! RADIUS Server Configuration\n`;
        output += `set system radius-server ${config.radius.primaryIp} secret ${config.radius.primarySecret}\n`;
        output += `set system radius-server ${config.radius.primaryIp} authentication-port ${config.radius.primaryAuthPort}\n`;
        output += `set system radius-server ${config.radius.primaryIp} accounting-port ${config.radius.primaryAcctPort}\n`;
        if (config.radius.secondary) {
            output += `set system radius-server ${config.radius.secondaryIp} secret ${config.radius.secondarySecret}\n`;
            output += `set system radius-server ${config.radius.secondaryIp} authentication-port ${config.radius.secondaryAuthPort}\n`;
            output += `set system radius-server ${config.radius.secondaryIp} accounting-port ${config.radius.secondaryAcctPort}\n`;
        }
        output += `set access profile dot1x-profile radius-server ${config.radius.primaryIp}\n`;
        if (config.radius.secondary) output += `set access profile dot1x-profile radius-server ${config.radius.secondaryIp}\n`;
        output += `!\n`;
    }

    if (config.tacacs.enable) {
        output += `! TACACS+ Server Configuration\n`;
        output += `set system tacacs-server ${config.tacacs.primaryIp} secret ${config.tacacs.primarySecret}\n`;
        if (config.tacacs.secondary) {
            output += `set system tacacs-server ${config.tacacs.secondaryIp} secret ${config.tacacs.secondarySecret}\n`;
        }
        output += `!\n`;
    }

    if (config.dot1x.enable === '1') {
        output += `! 802.1X Configuration\n`;
        output += `set vlans authenticated vlan-id ${config.dot1x.vlan}\n`;
        output += `set protocols dot1x authenticator authentication-profile-name dot1x-profile\n`;
        output += `set protocols dot1x authenticator interface ${config.dot1x.interface} supplicant multiple\n`;
                output += `set protocols dot1x authenticator interface ${config.dot1x.interface} retries ${config.dot1x.maxReauth}\n`;
        output += `set protocols dot1x authenticator interface ${config.dot1x.interface} transmit-period ${config.dot1x.txPeriod}\n`;
        if (config.dot1x.vlanAssign === '1') {
            if (config.dot1x.guestVlan) output += `set protocols dot1x authenticator interface ${config.dot1x.interface} guest-vlan ${config.dot1x.guestVlan}\n`;
            if (config.dot1x.authFailVlan) output += `set protocols dot1x authenticator interface ${config.dot1x.interface} authentication-failed-vlan ${config.dot1x.authFailVlan}\n`;
        }
        output += `set interfaces ${config.dot1x.interface} unit 0 family ethernet-switching vlan members authenticated\n`;
        output += `set ethernet-switching-options secure-access-port interface ${config.dot1x.interface} dhcp-trusted\n`;
        output += `set ethernet-switching-options secure-access-port interface ${config.dot1x.interface} arp-inspection\n`;
        output += `set ethernet-switching-options secure-access-port vlan authenticated examine-dhcp\n`;
        output += `set ethernet-switching-options secure-access-port vlan authenticated arp-inspection\n`;
        output += `!\n`;
    }

    return output;
}
