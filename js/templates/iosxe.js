function generateIosXeConfig(config) {
    let output = `! Cisco IOS-XE Configuration\n`;

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
    switch (config.aaa.authorMethod) {
        case '2': output += `aaa authorization network default group ${config.radius.groupName}\n`;
                  output += `aaa authorization auth-proxy default group ${config.radius.groupName}\n`; break;
        case '3': output += `aaa authorization commands 15 default group ${config.tacacs.groupName} local\n`;
                  output += `aaa authorization network default group ${config.radius.groupName}\n`; break;
        case '4': output += `aaa authorization commands 15 default group ${config.tacacs.groupName} local\n`;
                  output += `aaa authorization network default group ${config.radius.groupName}\n`;
                  output += `aaa authorization auth-proxy default group ${config.radius.groupName}\n`; break;
    }
    switch (config.aaa.accountMethod) {
        case '2': output += `aaa accounting update newinfo periodic 1440\n`;
                  output += `aaa accounting identity default start-stop group ${config.radius.groupName}\n`;
                  output += `aaa accounting network default start-stop group ${config.radius.groupName}\n`; break;
        case '3': output += `aaa accounting commands 15 default start-stop group ${config.tacacs.groupName}\n`; break;
        case '4': output += `aaa accounting update newinfo periodic 1440\n`;
                  output += `aaa accounting commands 15 default start-stop group ${config.tacacs.groupName}\n`;
                  output += `aaa accounting identity default start-stop group ${config.radius.groupName}\n`;
                  output += `aaa accounting network default start-stop group ${config.radius.groupName}\n`; break;
    }
    output += `!\n`;

    if (config.portnox.enable === '1') {
        output += `! Portnox Cloud RADIUS Configuration\n`;
        const regions = {
            '1': { ip: 'us-radius.portnox.com', name: 'PORTNOX-US' },
            '2': { ip: 'eu-radius.portnox.com', name: 'PORTNOX-EU' },
            '3': { ip1: 'us-radius.portnox.com', ip2: 'eu-radius.portnox.com', name1: 'PORTNOX-US', name2: 'PORTNOX-EU' }
        };
        const region = regions[config.portnox.region];
        if (region.ip) {
            output += `radius server ${region.name}\n`;
            output += ` address ipv4 ${region.ip} auth-port 1812 acct-port 1813\n`;
            output += ` key ${config.portnox.secret}\n`;
            output += ` automate-tester username probe idle-time 5\n`;
            output += `!\n`;
        } else if (region.ip1 && region.ip2) {
            output += `radius server ${region.name1}\n`;
            output += ` address ipv4 ${region.ip1} auth-port 1812 acct-port 1813\n`;
            output += ` key ${config.portnox.secret}\n`;
            output += ` automate-tester username probe idle-time 5\n`;
            output += `!\n`;
            output += `radius server ${region.name2}\n`;
            output += ` address ipv4 ${region.ip2} auth-port 1812 acct-port 1813\n`;
            output += ` key ${config.portnox.sameSecret === '1' ? config.portnox.secret : config.portnox.secondarySecret}\n`;
            output += ` automate-tester username probe idle-time 5\n`;
            output += `!\n`;
        }
        output += `aaa group server radius PORTNOX\n`;
        output += ` server name ${region.name1 || region.name}\n`;
        if (region.name2) output += ` server name ${region.name2}\n`;
        output += ` deadtime 15\n`;
        output += `!\n`;
    }

    if (config.radius.type === '1' || (config.radius.type === '2' && config.portnox.enable !== '1')) {
        output += `! RADIUS Server Configuration\n`;
        output += `radius server RADIUS-SERVER-1\n`;
        output += ` address ipv4 ${config.radius.primaryIp} auth-port ${config.radius.primaryAuthPort} acct-port ${config.radius.primaryAcctPort}\n`;
        output += ` key ${config.radius.primarySecret}\n`;
        if (config.radius.monitoring === '1' && config.radius.testUser) {
            output += ` automate-tester username ${config.radius.testUser} idle-time ${config.radius.idleTime}\n`;
        }
        if (config.radius.secondary) {
            output += `!\n`;
            output += `radius server RADIUS-SERVER-2\n`;
            output += ` address ipv4 ${config.radius.secondaryIp} auth-port ${config.radius.secondaryAuthPort} acct-port ${config.radius.secondaryAcctPort}\n`;
            output += ` key ${config.radius.secondarySecret}\n`;
            if (config.radius.monitoring === '1' && config.radius.testUser) {
                output += ` automate-tester username ${config.radius.testUser} idle-time ${config.radius.idleTime}\n`;
            }
        }
        output += `!\n`;
        output += `aaa group server radius ${config.radius.groupName}\n`;
        output += ` server name RADIUS-SERVER-1\n`;
        if (config.radius.secondary) output += ` server name RADIUS-SERVER-2\n`;
        output += ` deadtime ${config.radius.deadtime}\n`;
        output += `!\n`;
    }

    if (config.tacacs.enable) {
        output += `! TACACS+ Server Configuration\n`;
        output += `tacacs server TACACS-SERVER-1\n`;
        output += ` address ipv4 ${config.tacacs.primaryIp}\n`;
        output += ` port ${config.tacacs.primaryPort}\n`;
        output += ` key ${config.tacacs.primarySecret}\n`;
        if (config.tacacs.secondary) {
            output += `!\n`;
            output += `tacacs server TACACS-SERVER-2\n`;
            output += ` address ipv4 ${config.tacacs.secondaryIp}\n`;
            output += ` port ${config.tacacs.secondaryPort}\n`;
            output += ` key ${config.tacacs.secondarySecret}\n`;
        }
        output += `!\n`;
        output += `aaa group server tacacs+ ${config.tacacs.groupName}\n`;
        output += ` server name TACACS-SERVER-1\n`;
        if (config.tacacs.secondary) output += ` server name TACACS-SERVER-2\n`;
        output += `!\n`;
    }

    if (config.dot1x.enable === '1') {
        output += `! 802.1X Global Configuration\n`;
        output += `dot1x system-auth-control\n`;
        if (config.dot1x.criticalEapol === '1') {
            output += `dot1x critical eapol\n`;
            output += `authentication critical recovery delay ${config.dot1x.recoveryDelay}\n`;
        }
        output += `!\n`;
        output += `! Interface Configuration\n`;
        output += `vlan ${config.dot1x.vlan}\n`;
        output += ` name Authenticated\n`;
        output += `interface ${config.dot1x.interface}\n`;
        output += ` switchport mode access\n`;
        output += ` switchport access vlan ${config.dot1x.vlan}\n`;
        output += ` authentication order ${config.dot1x.authOrder === '1' ? 'dot1x mab' : 'mab dot1x'}\n`;
        output += ` authentication priority dot1x mab\n`;
        output += ` authentication port-control auto\n`;
        output += ` authentication periodic\n`;
        output += ` authentication timer reauthenticate ${config.dot1x.reauthPeriod}\n`;
        output += ` dot1x pae authenticator\n`;
        output += ` dot1x timeout tx-period ${config.dot1x.txPeriod}\n`;
        output += ` dot1x max-reauth-req ${config.dot1x.maxReauth}\n`;
        output += ` spanning-tree portfast\n`;
        output += ` ip dhcp snooping trust\n`;
        output += ` ip arp inspection trust\n`;
        output += ` description 802.1X Enabled Port\n`;
        output += `ip dhcp snooping\n`;
        output += `ip arp inspection\n`;
        if (config.dot1x.vlanAssign === '1') {
            if (config.dot1x.guestVlan) output += ` authentication event no-response action authorize vlan ${config.dot1x.guestVlan}\n`;
            if (config.dot1x.authFailVlan) output += ` authentication event fail action authorize vlan ${config.dot1x.authFailVlan}\n`;
            if (config.dot1x.criticalVlan) output += ` authentication event server dead action authorize vlan ${config.dot1x.criticalVlan}\n`;
        }
        output += `!\n`;
    }

    if (config.coa.enable === '1') {
        output += `! Change of Authorization (CoA) Configuration\n`;
        output += `aaa server radius dynamic-author\n`;
        output += ` client ${config.coa.clientIp} server-key ${config.coa.serverKey}\n`;
        output += ` port ${config.coa.port}\n`;
        output += `!\n`;
    }

    if (config.radius.type === '2' && config.portnox.enable !== '1') {
        output += `! RADSEC (RADIUS over TLS) Configuration\n`;
        if (config.radsec.certOption === '1') {
            output += `crypto pki trustpoint ${config.radsec.trustpoint}\n`;
            output += ` enrollment terminal\n`;
            output += ` revocation-check none\n`;
            output += `!\n`;
            output += `! Note: Import certificate manually using 'crypto pki authenticate ${config.radsec.trustpoint}'\n`;
        }
        output += `radius server RADSEC-SERVER-1\n`;
        output += ` address ipv4 ${config.radius.primaryIp} auth-port ${config.radius.primaryAuthPort} acct-port ${config.radius.primaryAcctPort}\n`;
        output += ` key ${config.radius.primarySecret}\n`;
        output += ` tls connectiontimeout 5\n`;
        output += ` tls trustpoint ${config.radsec.trustpoint}\n`;
        if (config.radius.secondary) {
            output += `!\n`;
            output += `radius server RADSEC-SERVER-2\n`;
            output += ` address ipv4 ${config.radius.secondaryIp} auth-port ${config.radius.secondaryAuthPort} acct-port ${config.radius.secondaryAcctPort}\n`;
            output += ` key ${config.radius.secondarySecret}\n`;
            output += ` tls connectiontimeout 5\n`;
            output += ` tls trustpoint ${config.radsec.trustpoint}\n`;
        }
        output += `!\n`;
    }

    if (config.deviceTracking.enable === '1') {
        output += `! Device Tracking Configuration\n`;
        if (config.deviceTracking.mode === '1') output += `device-tracking tracking auto-source\n`;
        if (config.deviceTracking.accessPolicy === '1') {
            output += `!\n`;
            output += `device-tracking policy ${config.deviceTracking.accessName}\n`;
            output += ` limit address-count ${config.deviceTracking.addrLimit}\n`;
            output += ` security-level glean\n`;
            output += ` no protocol ndp\n`;
            output += ` no protocol dhcp6\n`;
            output += ` tracking enable\n`;
            output += ` reachable-lifetime ${config.deviceTracking.lifetime}\n`;
        }
        if (config.deviceTracking.trunkPolicy === '1') {
            output += `!\n`;
            output += `device-tracking policy ${config.deviceTracking.trunkName}\n`;
            output += ` tracking disable\n`;
            output += ` trusted-port\n`;
            output += ` device-role switch\n`;
        }
        output += `!\n`;
    }

    if (config.ibns.mode) {
        output += `! IBNS 2.0 Configuration\n`;
        output += `class-map type control subscriber match-all DOT1X\n match method dot1x\n!\n`;
        output += `class-map type control subscriber match-all DOT1X_FAILED\n match method dot1x\n match result-type method dot1x authoritative\n!\n`;
        output += `class-map type control subscriber match-all DOT1X_NO_RESP\n match method dot1x\n match result-type method dot1x agent-not-found\n!\n`;
        output += `class-map type control subscriber match-all MAB\n match method mab\n!\n`;
        output += `class-map type control subscriber match-all MAB_FAILED\n match method mab\n match result-type method mab authoritative\n!\n`;
        output += `class-map type control subscriber match-all SERVER_DOWN\n match result-type aaa-timeout\n!\n`;
        output += `policy-map type control subscriber ${config.ibns.policyMapName}\n`;
        if (config.ibns.mode === '1') {
            output += ` event session-started match-all\n  10 class always do-until-failure\n   10 authenticate using dot1x priority 10\n`;
            output += ` event authentication-failure match-first\n  5 class DOT1X_FAILED do-until-failure\n   10 terminate dot1x\n   20 authenticate using mab priority 20\n`;
            output += `  10 class DOT1X_NO_RESP do-until-failure\n   10 terminate dot1x\n   20 authenticate using mab priority 20\n`;
            output += `  20 class MAB_FAILED do-until-failure\n   10 terminate mab\n   20 authentication-restart 60\n`;
            output += `  30 class SERVER_DOWN do-until-failure\n   10 authorize\n`;
            output += `  40 class always do-until-failure\n   10 terminate dot1x\n   20 terminate mab\n   30 authentication-restart 60\n`;
            output += ` event agent-found match-all\n  10 class always do-until-failure\n   10 terminate mab\n   20 authenticate using dot1x priority 10\n`;
        } else {
            output += ` event session-started match-all\n  10 class always do-all\n   10 authenticate using dot1x priority 10\n   20 authenticate using mab priority 20\n`;
            output += ` event authentication-failure match-first\n  10 class SERVER_DOWN do-until-failure\n   10 authorize\n`;
            output += `  20 class DOT1X_FAILED do-until-failure\n   10 terminate dot1x\n`;
            output += `  30 class MAB_FAILED do-until-failure\n   10 terminate mab\n`;
            output += `  40 class always do-until-failure\n   10 terminate dot1x\n   20 terminate mab\n   30 authentication-restart 60\n`;
            output += ` event agent-found match-all\n  10 class always do-until-failure\n   10 terminate mab\n   20 authenticate using dot1x priority 10\n`;
        }
        if (config.ibns.templates === '1') {
            output += `!\n`;
            if (config.ibns.openTemplate === '1') {
                output += `template ${config.ibns.openTemplateName}\n`;
                output += ` switchport mode access\n`;
                output += ` access-session host-mode ${['single-host', 'multi-auth', 'multi-domain', 'multi-host'][parseInt(config.dot1x.hostMode) - 1]}\n`;
                output += ` access-session port-control auto\n`;
                output += ` dot1x pae authenticator\n`;
                output += ` dot1x timeout tx-period ${config.dot1x.txPeriod}\n`;
                output += ` dot1x max-reauth-req ${config.dot1x.maxReauth}\n`;
                output += ` service-policy type control subscriber ${config.ibns.policyMapName}\n`;
                output += ` no shutdown\n`;
                output += `!\n`;
            }
            if (config.ibns.closedTemplate === '1') {
                output += `template ${config.ibns.closedTemplateName}\n`;
                output += ` switchport mode access\n`;
                output += ` access-session host-mode ${['single-host', 'multi-auth', 'multi-domain', 'multi-host'][parseInt(config.dot1x.hostMode) - 1]}\n`;
                output += ` access-session closed\n`;
                output += ` access-session port-control auto\n`;
                output += ` dot1x pae authenticator\n`;
                output += ` dot1x timeout tx-period ${config.dot1x.txPeriod}\n`;
                output += ` dot1x max-reauth-req ${config.dot1x.maxReauth}\n`;
                output += ` service-policy type control subscriber ${config.ibns.policyMapName}\n`;
                output += ` no shutdown\n`;
                output += `!\n`;
            }
        }
    }

    return output;
}
