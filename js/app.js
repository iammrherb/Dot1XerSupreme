// Core UI functions
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("main-content");
  sidebar.classList.toggle("collapsed");
  mainContent.classList.toggle("expanded");
}

function showSection(sectionId) {
  const sections = document.getElementsByClassName("section");
  for (let i = 0; i < sections.length; i++) {
    sections[i].classList.remove("active");
  }
  const links = document.querySelectorAll(".sidebar nav ul li a");
  links.forEach(link => link.classList.remove("active"));
  const selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.classList.add("active");
    const selectedLink = document.querySelector('a[onclick="showSection(\'' + sectionId + '\')"]');
    if (selectedLink) {
      selectedLink.classList.add("active");
    }
  }
  updatePlatformSpecificSettings();
}

function updatePlatformInfo() {
  const platform = document.getElementById("platform").value;
  const platformInfo = document.getElementById("platformInfo");
  const info = {
    "cisco_iosxe": "Cisco: IOS-XE (Catalyst) – Modern Catalyst switches with advanced AAA and IBNS 2.0 support.",
    "cisco_nxos": "Cisco: NX-OS (Nexus) – Nexus switches with different AAA syntax and features.",
    "cisco_wlc": "Cisco: WLC 9800 – Wireless LAN Controller with robust AAA, RADIUS, and CoA support.",
    "juniper_junos": "Juniper: Junos – EX/QFX switches with comprehensive 802.1X capabilities.",
    "aruba_arubaos": "Aruba: ArubaOS – Wired and wireless switches with dot1x profiles.",
    "aruba_wlc": "Aruba: WLC – Wireless controller solutions for enterprise deployments.",
    "fortinet_fortiswitch": "Fortinet: FortiSwitch/Access Point – Integrated security and AAA on Fortinet hardware.",
    "arista_eos": "Arista: EOS – High-performance switches with modern AAA support.",
    "extreme_exos": "Extreme: EXOS – Extreme Networks switches with advanced netlogin and AAA.",
    "ubiquiti": "Ubiquiti – Affordable enterprise-grade switches and wireless devices.",
    "huawei": "Huawei – Comprehensive network solutions with AAA and NAC support.",
    "alcatel": "Alcatel – Carrier-grade networking with integrated AAA."
  };
  platformInfo.innerHTML = "<p><strong>" + info[platform].split(":")[0] + ":</strong> " + info[platform].split("–")[1] + "</p>";
  updatePlatformSpecificSettings();
}

function updatePlatformSpecificSettings() {
  const platform = document.getElementById("platform").value;
  const ciscoSettings = document.getElementById("ciscoSettings");
  if (ciscoSettings) {
    ciscoSettings.style.display = (platform === "cisco_iosxe" || platform === "cisco_nxos" || platform === "cisco_wlc") ? "block" : "none";
  }
}

let radiusServerCount = 1;
function addRadiusServer() {
  radiusServerCount++;
  const container = document.getElementById("radiusServers");
  const newDiv = document.createElement("div");
  newDiv.className = "server-entry";
  newDiv.innerHTML = `
    <h3>RADIUS Server ${radiusServerCount}</h3>
    <label for="radius_ip_${radiusServerCount}">RADIUS Server IP:</label>
    <input type="text" id="radius_ip_${radiusServerCount}" placeholder="e.g., 192.168.1.11"><br>
    <label for="radius_key_${radiusServerCount}">Shared Key:</label>
    <input type="text" id="radius_key_${radiusServerCount}" placeholder="e.g., SecretKey2"><br>
    <label for="radius_auth_port_${radiusServerCount}">Auth Port:</label>
    <input type="number" id="radius_auth_port_${radiusServerCount}" placeholder="1812" min="1" max="65535"><br>
    <label for="radius_acct_port_${radiusServerCount}">Acct Port:</label>
    <input type="number" id="radius_acct_port_${radiusServerCount}" placeholder="1813" min="1" max="65535"><br>
    <label for="radius_priority_${radiusServerCount}">Priority:</label>
    <input type="number" id="radius_priority_${radiusServerCount}" placeholder="${radiusServerCount}" min="1" max="10"><br>
  `;
  container.appendChild(newDiv);
}

let tacacsServerCount = 1;
function addTacacsServer() {
  tacacsServerCount++;
  const container = document.getElementById("tacacsServers");
  const newDiv = document.createElement("div");
  newDiv.className = "server-entry";
  newDiv.innerHTML = `
    <h3>TACACS+ Server ${tacacsServerCount}</h3>
    <label for="tacacs_ip_${tacacsServerCount}">TACACS+ Server IP:</label>
    <input type="text" id="tacacs_ip_${tacacsServerCount}" placeholder="e.g., 192.168.1.21"><br>
    <label for="tacacs_key_${tacacsServerCount}">Shared Key:</label>
    <input type="text" id="tacacs_key_${tacacsServerCount}" placeholder="e.g., TacacsKey2"><br>
    <label for="tacacs_auth_port_${tacacsServerCount}">Auth Port:</label>
    <input type="number" id="tacacs_auth_port_${tacacsServerCount}" placeholder="49" min="1" max="65535"><br>
    <label for="tacacs_priority_${tacacsServerCount}">Priority:</label>
    <input type="number" id="tacacs_priority_${tacacsServerCount}" placeholder="${tacacsServerCount}" min="1" max="10"><br>
  `;
  container.appendChild(newDiv);
}

function generateConfig() {
  let config = `! Generated Configuration\n! Platform: ${document.getElementById("platform").value}\n! Date: ${new Date().toLocaleString()}\n\n`;
  config += "# AAA Settings\n";
  config += "aaa new-model\n";
  config += "aaa authentication dot1x default group radius\n";
  config += "\n# 802.1X Settings\n";
  config += "dot1x system-auth-control\n";
  config += "interface GigabitEthernet0/1\n switchport mode access\n switchport access vlan 10\n dot1x port-control auto\n";
  document.getElementById("configOutput").textContent = config;
}

function downloadConfig() {
  let config = document.getElementById("configOutput").textContent;
  if (!config) {
    alert("Please generate a config first!");
    return;
  }
  let blob = new Blob([config], { type: "text/plain" });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "dot1xer_config_" + new Date().toISOString().split("T")[0] + ".txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.addEventListener("DOMContentLoaded", function() {
  showSection("PlatformSelection");
});
