function generateIosXeConfig(config) {
  let output = generateBaseConfig(config);
  output.push('! Cisco IOS-XE Configuration');
  if (config.aaa.model === '1') {
    output.push('aaa authentication dot1x default group ' + (config.radius.groupName || 'RADIUS-SERVERS'));
    output.push('aaa authorization network default group ' + (config.radius.groupName || 'RADIUS-SERVERS'));
    output.push('aaa accounting dot1x default start-stop group ' + (config.radius.groupName || 'RADIUS-SERVERS'));
  }
  output.push(`radius server ${config.radius.primaryIp || '192.168.1.10'}`);
  output.push(` address ipv4 ${config.radius.primaryIp || '192.168.1.10'} auth-port ${config.radius.primaryAuthPort} acct-port ${config.radius.primaryAcctPort}`);
  output.push(` key ${config.radius.primarySecret || 'SecretKey'}`);
  if (config.radius.secondary) {
    output.push(`radius server ${config.radius.secondaryIp || '192.168.1.11'}`);
    output.push(` address ipv4 ${config.radius.secondaryIp || '192.168.1.11'} auth-port ${config.radius.secondaryAuthPort} acct-port ${config.radius.secondaryAcctPort}`);
    output.push(` key ${config.radius.secondarySecret || 'SecretKey2'}`);
  }
  output.push(`aaa group server radius ${config.radius.groupName || 'RADIUS-SERVERS'}`);
  output.push(` server name ${config.radius.primaryIp || '192.168.1.10'}`);
  if (config.radius.secondary) {
    output.push(` server name ${config.radius.secondaryIp || '192.168.1.11'}`);
  }
  if (config.dot1x.enable === '1') {
    output.push('dot1x system-auth-control');
    output.push(`interface ${config.dot1x.interface || 'GigabitEthernet1/0/1'}`);
    output.push(' switchport mode access');
    output.push(` switchport access vlan ${config.dot1x.vlan || '10'}`);
    output.push(` authentication order ${config.dot1x.authOrder === '1' ? 'dot1x mab' : 'mab dot1x'}`);
    output.push(` authentication host-mode ${config.dot1x.hostMode === '1' ? 'single-host' : config.dot1x.hostMode === '2' ? 'multi-auth' : config.dot1x.hostMode === '3' ? 'multi-domain' : 'multi-host'}`);
    if (config.dot1x.vlanAssign === '1') {
      if (config.dot1x.guestVlan) output.push(` authentication event no-response action authorize vlan ${config.dot1x.guestVlan}`);
      if (config.dot1x.authFailVlan) output.push(` authentication event fail action authorize vlan ${config.dot1x.authFailVlan}`);
      if (config.dot1x.criticalVlan) output.push(` authentication event server dead action authorize vlan ${config.dot1x.criticalVlan}`);
    }
    output.push(' dot1x pae authenticator');
  }
  if (config.ibns && config.platform === 'IOS-XE') {
    output.push(`policy-map type control subscriber ${config.ibns.policyMapName}`);
    output.push(' event session-started match-all');
    output.push('  10 class always do-until-failure');
    output.push('   10 authenticate using dot1x');
  }
  return output.join('\n');
}
