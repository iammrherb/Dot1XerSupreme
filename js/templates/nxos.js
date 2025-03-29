function generateNxOsConfig(config) {
    let output = generateBaseConfig(config);
    output.push('! Cisco NX-OS Configuration');
    output.push('feature dot1x');
    if (config.aaa.model === '1') {
        output.push('aaa authentication dot1x default group ' + (config.radius.groupName || 'RADIUS-SERVERS'));
    }
    output.push(`radius-server host ${config.radius.primaryIp || '192.168.1.10'} key ${config.radius.primarySecret || 'SecretKey'} auth-port ${config.radius.primaryAuthPort} acct-port ${config.radius.primaryAcctPort}`);
    if (config.radius.secondary) {
        output.push(`radius-server host ${config.radius.secondaryIp || '192.168.1.11'} key ${config.radius.secondarySecret || 'SecretKey2'} auth-port ${config.radius.secondaryAuthPort} acct-port ${config.radius.secondaryAcctPort}`);
    }
    output.push(`aaa group server radius ${config.radius.groupName || 'RADIUS-SERVERS'}`);
    output.push(` server ${config.radius.primaryIp || '192.168.1.10'}`);
    if (config.radius.secondary) {
        output.push(` server ${config.radius.secondaryIp || '192.168.1.11'}`);
    }
    if (config.dot1x.enable === '1') {
        output.push(`interface ${config.dot1x.interface || 'Ethernet1/1'}`);
        output.push(` switchport`);
        output.push(` switchport access vlan ${config.dot1x.vlan || '10'}`);
        output.push(` dot1x port-control auto`);
    }
    return output.join('\n');
}
