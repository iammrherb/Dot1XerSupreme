/* Main JavaScript for Dot1xer Supreme Configurator */

let configData = {};

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("main-content");
  sidebar.classList.toggle("collapsed");
  mainContent.classList.toggle("expanded");
}

function showSection(sectionId) {
  const sections = document.getElementsByClassName("section");
  for (let sec of sections) {
    sec.classList.remove("active");
  }
  const links = document.querySelectorAll(".sidebar nav ul li a");
  for (let link of links) {
    link.classList.remove("active");
  }
  const selected = document.getElementById(sectionId);
  if (selected) {
    selected.classList.add("active");
    const link = document.querySelector("a[onclick=\"showSection('" + sectionId + "')\"]");
    if (link) link.classList.add("active");
  }
  updatePlatformSpecificSettings();
}

function updatePlatformInfo() {
  const platform = document.getElementById("platform").value;
  configData.platform = platform;
  const platformBlurb = document.getElementById("platform-blurb");
  const info = {
    "cisco_iosxe": "Cisco: IOS-XE (Catalyst) – Modern Catalyst switches with IBNS 2.0 support.",
    "cisco_nxos": "Cisco: NX-OS (Nexus) – Nexus switches with enhanced AAA features.",
    "juniper_junos": "Juniper: Junos – EX/QFX switches with advanced 802.1X support.",
    "aruba_arubaos": "Aruba: ArubaOS – Flexible wired configurations.",
    "arista_eos": "Arista: EOS – High-performance 802.1X implementations.",
    "fortinet_fortiswitch": "Fortinet: FortiSwitch – Secure and robust switch configurations.",
    "cisco_wlc": "Cisco Wireless LAN Controller – AireOS/IOS-XE based wireless management.",
    "aruba_wlc": "Aruba Wireless LAN Controller – Aruba Mobility Controller with ClearPass integration."
  };
  if (platformBlurb && info[platform]) {
    let parts = info[platform].split("–");
    platformBlurb.innerHTML = "<strong>" + parts[0] + ":</strong> " + parts[1];
  }
  updatePlatformSpecificSettings();
}

function updatePlatformSpecificSettings() {
  const platform = configData.platform;
  const ciscoSettings = document.getElementById("ciscoSettings");
  if (ciscoSettings) {
    ciscoSettings.style.display = (platform === "cisco_iosxe" || platform === "cisco_nxos") ? "block" : "none";
  }
}

let radiusServerCount = 1;
function addRadiusServer() {
  radiusServerCount++;
  const container = document.getElementById("radiusServers");
  const div = document.createElement("div");
  div.className = "server-entry";
  div.innerHTML = `
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
  container.appendChild(div);
}

let tacacsServerCount = 1;
function addTacacsServer() {
  tacacsServerCount++;
  const container = document.getElementById("tacacsServers");
  const div = document.createElement("div");
  div.className = "server-entry";
  div.innerHTML = `
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
  container.appendChild(div);
}

function generateConfig() {
  try {
    let config = "! Generated Configuration\n! Platform: " + configData.platform + "\n! Generated on " + new Date().toLocaleString() + "\n";
    const aaaMethod = document.getElementById("aaa_auth_method").value;
    const aaaAccounting = document.getElementById("aaa_accounting").checked;
    config += "\n! AAA Settings\n";
    config += "Authentication Method: " + aaaMethod + "\n";
    config += "Accounting: " + (aaaAccounting ? "Enabled" : "Disabled") + "\n";
    config += "\n! RADIUS Servers\n";
    for (let i = 1; i <= radiusServerCount; i++) {
      const ip = document.getElementById("radius_ip_" + i).value;
      const key = document.getElementById("radius_key_" + i).value;
      const authPort = document.getElementById("radius_auth_port_" + i).value || 1812;
      const acctPort = document.getElementById("radius_acct_port_" + i).value || 1813;
      const priority = document.getElementById("radius_priority_" + i).value || i;
      if (ip && key) {
        config += "RADIUS Server " + i + ": " + ip + ", Key: " + key + ", Auth Port: " + authPort + ", Acct Port: " + acctPort + ", Priority: " + priority + "\n";
      }
    }
    config += "\n! TACACS+ Servers\n";
    for (let i = 1; i <= tacacsServerCount; i++) {
      const ip = document.getElementById("tacacs_ip_" + i).value;
      const key = document.getElementById("tacacs_key_" + i).value;
      const authPort = document.getElementById("tacacs_auth_port_" + i).value || 49;
      const priority = document.getElementById("tacacs_priority_" + i).value || i;
      if (ip && key) {
        config += "TACACS+ Server " + i + ": " + ip + ", Key: " + key + ", Auth Port: " + authPort + ", Priority: " + priority + "\n";
      }
    }
    config += "\n! 802.1X Settings\n";
    const iface = document.getElementById("dot1x_interface").value;
    const vlan = document.getElementById("dot1x_vlan").value;
    const reauth = document.getElementById("dot1x_reauth").value || 3600;
    const tx = document.getElementById("dot1x_tx").value || 10;
    config += "Interface: " + iface + ", VLAN: " + vlan + ", Reauth Period: " + reauth + "s, TX Period: " + tx + "s\n";
    document.getElementById("configOutput").textContent = config;
  } catch (error) {
    alert("Error generating configuration: " + error.message);
    console.error(error);
  }
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

function analyzeConfig() {
  const provider = document.getElementById("ai_provider").value;
  const apiKey = document.getElementById("ai_api_key").value;
  const question = document.getElementById("ai_question").value;
  if (!apiKey || !question) {
    alert("Please enter your API key and a question.");
    return;
  }
  const resultDiv = document.getElementById("aiResult");
  resultDiv.innerHTML = "<p>Analyzing configuration with " + provider + " (simulated)...</p>";
  setTimeout(() => {
    resultDiv.innerHTML += "<p><strong>AI Suggestion:</strong> Consider adding a backup RADIUS server and reviewing your timeout values for increased resiliency.</p>";
  }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
  showSection("PlatformSelection");
});
