function generateExtremeConfig(config) {
    let output = generateBaseConfig(config);
    output.push('! Extreme Networks Configuration');
    output.push(`configure radius netlogin primary server ${config.radius.primaryIp || '192.168.1.10'} ${config.radius.primaryAuthPort} client-ip 192.168.1.1 shared-secret ${config.radius.primarySecret || 'SecretKey'}`);
    if (config.radius.secondary) {
        output.push(`configure radius netlogin secondary server ${config.radius.secondaryIp || '192.168.1.11'} ${config.radius.secondaryAuthPort} client-ip 192.168.1.1 shared-secret ${config.radius.secondarySecret || 'SecretKey2'}`);
    }
    output.push('enable radius netlogin');
    if (config.dot1x.enable === '1') {
        output.push('configure netlogin dot1x enable');
        output.push(`configure vlan ${config.dot1x.vlan || '10'} add ports ${config.dot1x.interface || '1:1'} untagged`);
        output.push(`configure netlogin add port ${config.dot1x.interface || '1:1'} dot1x`);
    }
    return output.join('\n');
}
