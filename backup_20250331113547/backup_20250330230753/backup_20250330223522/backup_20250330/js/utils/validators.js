/**
 * Utility functions for form validation
 */

// IP address validator
function isValidIpAddress(ip) {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
}

// Port number validator
function isValidPort(port) {
    const portNum = parseInt(port, 10);
    return !isNaN(portNum) && portNum >= 1 && portNum <= 65535;
}

// Hostname validator
function isValidHostname(hostname) {
    // Basic hostname validation
    const hostnameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;
    return hostnameRegex.test(hostname);
}

// Domain name validator
function isValidDomainName(domain) {
    // Basic domain name validation
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](\.[a-zA-Z]{2,})+$/;
    return domainRegex.test(domain);
}

// VLAN ID validator
function isValidVlanId(vlan) {
    if (vlan === '') return true; // Empty is valid (optional)
    const vlanNum = parseInt(vlan, 10);
    return !isNaN(vlanNum) && vlanNum >= 1 && vlanNum <= 4094;
}

// SSID validator
function isValidSsid(ssid) {
    return ssid.length >= 1 && ssid.length <= 32;
}

// Check if all required radius settings are valid
function validateRadiusSettings(radius) {
    const primary = isValidIpAddress(radius.primaryIp) && 
                   isValidPort(radius.primaryAuthPort) && 
                   isValidPort(radius.primaryAcctPort) && 
                   radius.primarySecret;
                   
    const secondary = !radius.secondary || (
                     isValidIpAddress(radius.secondaryIp) && 
                     isValidPort(radius.secondaryAuthPort) && 
                     isValidPort(radius.secondaryAcctPort) && 
                     radius.secondarySecret);
                     
    return primary && secondary && radius.groupName;
}

// Check if all required TACACS settings are valid
function validateTacacsSettings(tacacs) {
    if (!tacacs.enable) return true;
    
    const primary = isValidIpAddress(tacacs.primaryIp) && 
                   isValidPort(tacacs.primaryPort) && 
                   tacacs.primarySecret;
                   
    const secondary = !tacacs.secondary || (
                     isValidIpAddress(tacacs.secondaryIp) && 
                     isValidPort(tacacs.secondaryPort) && 
                     tacacs.secondarySecret);
                     
    return primary && secondary && tacacs.groupName;
}

// Export validation functions
window.validators = {
    isValidIpAddress,
    isValidPort,
    isValidHostname,
    isValidDomainName,
    isValidVlanId,
    isValidSsid,
    validateRadiusSettings,
    validateTacacsSettings
};
