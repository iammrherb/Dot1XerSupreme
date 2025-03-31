function generateNxOsConfig(config) {
  let output = `! NX-OS Specific Configuration\n`;
  output += `! AAA Configuration\n`;
  switch (config.aaa.authMethod) {
    case '1': output += `aaa authentication login default local\n`; break;
    case '2': output += `aaa authentication login default group ${config.radius.groupName}\n`; break;
    case '3': output += `aaa authentication login default group ${config.tacacs.groupName}\n`; break;
    case '4': output += `aaa authentication login default group ${config.tacacs.groupName} ${config.radius.groupName}\n`; break;
  }
  output += `!\n`;
  return output;
}
