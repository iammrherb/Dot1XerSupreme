Ubiquiti UniFi Switch 802.1X Configuration Instructions
Since UniFi devices are configured through the UniFi Network Controller rather than CLI, follow these steps:

Configure RADIUS Servers

In the UniFi Controller, navigate to Settings > Profiles > RADIUS
Create a new RADIUS profile with the following settings:

Name: 802.1X_Authentication
Primary RADIUS Server: <RADIUS_IP_PRIMARY>
Port: 1812
Secret: <RADIUS_KEY_PRIMARY>
Secondary RADIUS Server: <RADIUS_IP_SECONDARY>
Port: 1812
Secret: <RADIUS_KEY_SECONDARY>




Enable 802.1X on Switch

Navigate to Devices > (select your switch)
Go to Services > 802.1X Control
Enable 802.1X Control
Select the RADIUS profile you created
Set Fallback VLAN: <GUEST_VLAN>


Configure Port Profiles

Navigate to Settings > Profiles > Switch Ports
Create a new profile:

Name: 802.1X_Ports
Native Network: <DATA_VLAN>
Voice Network: <VOICE_VLAN>
802.1X Control: On
MAC Authentication: Enabled




Apply Port Profile to Ports

Go to Devices > (select your switch) > Ports
Select the ports where you want to enable 802.1X
Click "Edit Selected"
Apply the 802.1X_Ports profile
Click Apply


Verify Configuration

In the switch details, check the Clients tab to verify authentication status
