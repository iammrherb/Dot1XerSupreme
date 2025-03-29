function generateAristaConfig(config) {
    let output = generateBaseConfig(config);
    output.push('! Arista Configuration');
    output.push(`radius-server host ${config.radius.primaryIp || '192.168.1.10'} key ${config.radius.primarySecret || 'SecretKey'}`);
    if (config.radius.secondary) {
        output.push(`radius-server host ${config.radius.secondaryIp || '192.168.1.11'} key ${config.radius.secondarySecret || 'SecretKey2'}`);
    }
    if (config.dot1x.enable === '1') {
        output.push('dot1x system-auth-control');
        output.push(`interface ${config.dot1x.interface || 'Ethernet1'}`);
        output.push(` switchport access vlan ${config.dot1x.vlan || '10'}`);
        output.push(' dot1x pae authenticator');
    }
    return output.join('\n');
}
