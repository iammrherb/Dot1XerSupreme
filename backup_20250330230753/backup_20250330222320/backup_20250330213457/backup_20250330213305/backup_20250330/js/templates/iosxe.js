function generateIosXeConfig(config) {
  let output = `! IOS-XE Specific Configuration\n`;
  output += `! AAA Configuration\n`;
  if (config.aaa.model === '1') output += `aaa new-model\n`;
  if (config.aaa.sessionId === '1') output += `aaa session-id common\n`;
  switch (config.aaa.authMethod) {
    case '1': output += `aaa authentication login default local\n`; break;
    case '2': output += `aaa authentication login default group ${config.radius.groupName} local\n`; 
              output += `aaa authentication dot1x default group ${config.radius.groupName}\n`; break;
    case '3': output += `aaa authentication login default group ${config.tacacs.groupName} local\n`; 
              output += `aaa authentication dot1x default group ${config.radius.groupName}\n`; break;
    case '4': output += `aaa authentication login default group ${config.tacacs.groupName} group ${config.radius.groupName} local\n`; 
              output += `aaa authentication dot1x default group ${config.radius.groupName}\n`; break;
  }
  // Additional IOS-XE configuration ...
  output += `!\n`;
  return output;
}
