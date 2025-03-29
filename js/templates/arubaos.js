function generateArubaOsConfig(config) {
  let output = generateBaseConfig(config);
  output.push('! ArubaOS Configuration');
  output.push(`aaa server-group radius "${config.radius.groupName || 'RADIUS-SERVERS'}"`);
  output.push(` auth-server ${config.radius.primaryIp || '192.168.1.10'} port ${config.radius.primaryAuthPort} acct-port ${config.radius.primaryAcctPort} key ${config.radius.primarySecret || 'SecretKey'}`);
  if (config.radius.secondary) {
    output.push(` auth-server ${config.radius.secondaryIp || '192.168.1.11'} port ${config.radius.secondaryAuthPort} acct-port ${config.radius.secondaryAcctPort} key ${config.radius.secondarySecret || 'SecretKey2'}`);
  }
  if (config.dot1x.enable === '1') {
    output.push('aaa authentication dot1x "dot1x-profile"');
    output.push('aaa profile "dot1x-aaa-profile"');
    output.push(' authentication-dot1x "dot1x-profile"');
    output.push(`interface ${config.dot1x.interface || 'GE1/0/1'}`);
    output.push(` vlan ${config.dot1x.vlan || '10'}`);
    output.push(' aaa-profile "dot1x-aaa-profile"');
  }
  return output.join('\n');
}
