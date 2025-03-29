function generateJuniperConfig(config) {
    let output = '';
    
    output += templateUtils.generateSectionHeader(config.platform, 'Juniper JUNOS Configuration');
    
    // RADIUS Server Configuration
    output += `# RADIUS Server Configuration\n`;
    output += `set access radius-server ${config.radius.primaryIp} secret "${config.radius.primarySecret}"\n`;
    output += `set access radius-server ${config.radius.primaryIp} port ${config.radius.primaryAuthPort}\n`;
    output += `set access radius-server ${config.radius.primaryIp} accounting-port ${config.radius.primaryAcctPort}\n`;
    output += `set access radius-server ${config.radius.primaryIp} retry 3\n`;
    output += `set access radius-server ${config.radius.primaryIp} timeout 5\n`;
    
    if (config.radius.secondary) {
        output += `set access radius-server ${config.radius.secondaryIp} secret "${config.radius.secondarySecret}"\n`;
        output += `set access radius-server ${config.radius.secondaryIp} port ${config.radius.secondaryAuthPort}\n`;
        output += `set access radius-server ${config.radius.secondaryIp} accounting-port ${config.radius.secondaryAcctPort}\n`;
        output += `set access radius-server ${config.radius.secondaryIp} retry 3\n`;
        output += `set access radius-server ${config.radius.secondaryIp} timeout 5\n`;
    }
    
    // AAA Profile Configuration
    output += `\n# AAA Profile Configuration\n`;
    output += `set access profile ${config.radius.groupName} authentication-order radius\n`;
    output += `set access profile ${config.radius.groupName} radius authentication-server ${config.radius.primaryIp}\n`;
    
    if (config.radius.secondary) {
        output += `set access profile ${config.radius.groupName} radius authentication-server ${config.radius.secondaryIp}\n`;
    }
    
    // Add accounting if enabled
    if (config.aaa.accountMethod !== '1') {
        output += `set access profile ${config.radius.groupName} accounting order radius\n`;
        output += `set access profile ${config.radius.groupName} radius accounting-server ${config.radius.primaryIp}\n`;
        
        if (config.radius.secondary) {
            output += `set access profile ${config.radius.groupName} radius accounting-server ${config.radius.secondaryIp}\n`;
        }
    }
    
    // 802.1X Configuration
    if (config.dot1x.enable === '1') {
        output += `\n# 802.1X Configuration\n`;
        output += `set protocols dot1x authenticator authentication-profile-name ${config.radius.groupName}\n`;
        
        // Configure server fail options
        if (config.dot1x.criticalVlan) {
            output += `set protocols dot1x authenticator interface all server-fail vlan-name vlan-${config.dot1x.criticalVlan}\n`;
        } else {
            output += `set protocols dot1x authenticator interface all server-fail deny\n`;
        }
        
        // Configure supplicant mode
        switch (config.dot1x.hostMode) {
            case '1': 
                output += `set protocols dot1x authenticator interface all supplicant single\n`; 
                break;
            case '2': 
                output += `set protocols dot1x authenticator interface all supplicant multiple\n`; 
                break;
            case '3': 
                output += `set protocols dot1x authenticator interface all supplicant multiple\n`; 
                break;
            case '4': 
                output += `set protocols dot1x authenticator interface all supplicant multiple\n`; 
                break;
        }
        
        // Guest VLAN
        if (config.dot1x.guestVlan) {
            output += `set protocols dot1x authenticator interface all guest-vlan vlan-${config.dot1x.guestVlan}\n`;
        }
        
        // Authentication fail VLAN
        if (config.dot1x.authFailVlan) {
            output += `set protocols dot1x authenticator interface all server-reject-vlan vlan-${config.dot1x.authFailVlan}\n`;
        }
        
        // MAC RADIUS
        output += `set protocols dot1x authenticator interface all mac-radius\n`;
        output += `set protocols dot1x authenticator interface all reauthentication 3600\n`;
        output += `set protocols dot1x authenticator interface all quiet-period 60\n`;
        output += `set protocols dot1x authenticator interface all transmit-period ${config.dot1x.txPeriod}\n`;
        output += `set protocols dot1x authenticator interface all maximum-requests ${config.dot1x.maxReauth}\n`;
    }
    
    // CoA Configuration
    if (config.coa.enable === '1') {
        output += `\n# Dynamic Authorization (CoA) Configuration\n`;
        output += `set access profile ${config.radius.groupName} radius options coa\n`;
    }
    
    // VLAN definitions
    output += `\n# VLAN Configuration\n`;
    
    if (config.dot1x.guestVlan) {
        output += `set vlans vlan-${config.dot1x.guestVlan} vlan-id ${config.dot1x.guestVlan}\n`;
    }
    
    if (config.dot1x.authFailVlan) {
        output += `set vlans vlan-${config.dot1x.authFailVlan} vlan-id ${config.dot1x.authFailVlan}\n`;
    }
    
    if (config.dot1x.criticalVlan) {
        output += `set vlans vlan-${config.dot1x.criticalVlan} vlan-id ${config.dot1x.criticalVlan}\n`;
    }
    
    // Example Interface Configuration
    output += `\n# Example Interface Configuration\n`;
    output += `# set interfaces ge-0/0/1 unit 0 family ethernet-switching interface-mode access\n`;
    output += `# set interfaces ge-0/0/1 unit 0 family ethernet-switching vlan members vlan-10\n`;
    output += `# set interfaces ge-0/0/1 unit 0 family ethernet-switching authentication-protocol dot1x\n`;
    output += `# set interfaces ge-0/0/1 unit 0 family ethernet-switching authentication-mac-radius restrict\n`;
    
    return output;
}
