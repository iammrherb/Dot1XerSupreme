function generateJuniperConfig(config) {
  let output = generateBaseConfig(config);
  output.push('! Juniper Configuration');
  output.push('set system radius-server ' + (config.radius.primaryIp || '192.168.1.10') + ' secret ' + (config.radius.primarySecret || 'SecretKey'));
  if (config.radius.secondary) {
    output.push('set system radius-server ' + (config.radius.secondaryIp || '192.168.1.11') + ' secret ' + (config.radius.secondarySecret || 'SecretKey2'));
  }
  if (config.dot1x.enable === '1') {
    output.push('set protocols dot1x');
    output.push(`set interfaces ${config.dot1x.interface || 'ge-0/0/1'} dot1x`);
    output.push(`set vlans vlan${config.dot1x.vlan || '10'} vlan-id ${config.dot1x.vlan || '10'}`);
  }
  return output.join('\n');
}
