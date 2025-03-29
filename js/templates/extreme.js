function generateExtremeConfig(config) {
    let output = `! Extreme Networks Configuration\n`;

    output += `! AAA Configuration\n`;
    switch (config.aaa.authMethod) {
        case '1': output += `configure netlogin authentication local\n`; break;
        case '2': output += `configure netlogin authentication radius\n`; break;
        case '3': output += `configure netlogin authentication tacacs\n`; break;
        case '4': output += `configure netlogin authentication tacacs radius\n`;
                  output += `configure netlogin dot1x radius\n`; break;
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
            output += `configure radius netlogin primary server ${region.ip} 1812 client-ip ${region.ip.split('.').slice(0, 3).join('.') + '.1'} shared-secret ${config.portnox.secret}\n`;
        } else if (region.ip1 && region.ip2) {
            output += `configure radius netlogin primary server ${region.ip1} 1812 client-ip ${region.ip1.split('.').slice(0, 3).join('.') + '.1'} shared-secret ${config.portnox.secret}\n`;
            output += `configure radius netlogin secondary server ${region.ip2} 1812 client-ip ${region.ip2.split('.').slice(0, 3).join('.') + '.1'} shared-secret ${config.portnox.sameSecret === '1' ? config.portnox.secret : config.portnox.secondarySecret}\n`;
        }
        output += `enable radius netlogin\n`;
        output += `!\n`;
    }

    if (config.radius.type === '1' || (config.radius.type === '2' && config.portnox.enable !== '1')) {
        output += `! RADIUS Server Configuration\n`;
        output += `configure radius netlogin primary server ${config.radius.primaryIp} ${config.radius.primaryAuthPort} client-ip ${config.radius.primaryIp.split('.').slice(0, 3).join('.') + '.1'} shared-secret ${config.radius.primarySecret}\n`;
        if (config.radius.secondary) {
            output += `configure radius netlogin secondary server ${config.radius.secondaryIp} ${config.radius.secondaryAuthPort} client-ip ${config.radius.secondaryIp.split('.').slice(0, 3).join('.') + '.1'} shared-secret ${config.radius.secondarySecret}\n`;
        }
        output += `enable radius netlogin\n`;
        output += `!\n`;
    }

    if (config.tacacs.enable) {
        output += `! TACACS+ Server Configuration\n`;
        output += `configure tacacs primary server ${config.tacacs.primaryIp} ${config.tacacs.primaryPort} client-ip ${config.tacacs.primaryIp.split('.').slice(0, 3).join('.') + '.1'} shared-secret ${config.tacacs.primarySecret}\n`;
        if (config.tacacs.secondary) {
            output += `configure tacacs secondary server ${config.tacacs.secondaryIp} ${config.tacacs.secondaryPort} client-ip ${config.tacacs.secondaryIp.split('.').slice(0, 3).join('.') + '.1'} shared-secret ${config.tacacs.secondarySecret}\n`;
        }
        output += `enable tacacs\n`;
        output += `!\n`;
    }

    if (config.dot1x.enable === '1') {
        output += `! 802.1X Configuration\n`;
        output += `create vlan "Authenticated" vid ${config.dot1x.vlan}\n`;
        output += `configure netlogin vlan Authenticated\n`;
        output += `enable netlogin dot1x\n`;
        output += `configure netlogin dot1x port ${config.dot1x.interface} mode port-based\n`;
        output += `configure netlogin dot1x port ${config.dot1x.interface} reauth-period ${config.dot1x.reauthPeriod}\n`;
        output += `configure netlogin dot1x port ${config.dot1x.interface} max-reauth-req ${config.dot1x.maxReauth}\n`;
        output += `configure netlogin dot1x port ${config.dot1x.interface} tx-period ${config.dot1x.txPeriod}\n`;
        output += `configure vlan Authenticated add ports ${config.dot1x.interface} untagged\n`;
        output += `enable ip-security dhcp-snooping vlan Authenticated ports ${config.dot1x.interface}\n`;
        output += `enable ip-security arp inspection vlan Authenticated ports ${config.dot1x.interface}\n`;
        if (config.dot1x.vlanAssign === '1') {
            if (config.dot1x.guestVlan) {
                output += `create vlan "Guest" vid ${config.dot1x.guestVlan}\n`;
                output += `configure netlogin dot1x guest-vlan ${config.dot1x.guestVlan} ports ${config.dot1x.interface}\n`;
            }
            if (config.dot1x.authFailVlan) {
                output += `create vlan "Quarantine" vid ${config.dot1x.authFailVlan}\n`;
                output += `configure netlogin dot1x auth-fail-vlan ${config.dot1x.authFailVlan} ports ${config.dot1x.interface}\n`;
            }
        }
        output += `!\n`;
    }

    return output;
}
