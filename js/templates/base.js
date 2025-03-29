function generateBaseConfig(config) {
    let output = [];
    output.push(`! Basic Configuration for ${config.platform || 'Unknown Platform'}`);
    output.push(`hostname ${config.hostname || 'Switch1'}`);
    output.push(`ip domain-name ${config.domainName || 'example.com'}`);
    if (config.aaa.model === '1') {
        output.push('aaa new-model');
        output.push(`aaa session-id ${config.aaa.sessionId === '1' ? 'common' : 'unique'}`);
        if (config.aaa.pwdEncrypt === '1') {
            output.push('service password-encryption');
        }
    }
    return output;
}
