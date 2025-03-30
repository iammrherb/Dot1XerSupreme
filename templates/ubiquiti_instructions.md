# Ubiquiti UniFi Switch 802.1X Configuration – Instructions

1. In the UniFi Network Controller, navigate to Settings > Profiles > RADIUS.
2. Create a new RADIUS profile using the following details:
   - Primary RADIUS Server: <RADIUS_IP_PRIMARY> (port 1812, key: <RADIUS_KEY_PRIMARY>)
   - Secondary RADIUS Server: <RADIUS_IP_SECONDARY> (if available)
3. In the Switch settings, assign the newly created RADIUS profile to the desired switch or switchport group.
4. Under Wireless Networks, ensure that the 802.1X (WPA Enterprise) settings use the same RADIUS profile.
5. Optionally, configure a fallback or guest VLAN if authentication fails.
