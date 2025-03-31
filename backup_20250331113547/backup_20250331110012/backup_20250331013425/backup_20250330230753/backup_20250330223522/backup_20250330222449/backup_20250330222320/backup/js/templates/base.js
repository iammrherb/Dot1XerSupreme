function generateBaseConfig(config) {
  let output = `! Dot1Xer Supreme Configuration\n`;
  output += `! Generated: ${new Date().toLocaleString()}\n`;
  output += `! Platform: ${config.platform}\n\n`;
  output += `! Basic Configuration\n`;
  output += `hostname ${config.hostname}\n`;
  output += `ip domain name ${config.domainName}\n`;
  if (config.aaa.pwdEncrypt === '1') {
    output += `password encryption aes\n`;
  }
  output += `!\n`;
  return output;
}
