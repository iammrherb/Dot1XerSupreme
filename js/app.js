function showTab(tabName) {
  let tabs = document.getElementsByClassName('tab-content');
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
  let btns = document.getElementsByClassName('tab-btn');
  for (let i = 0; i < btns.length; i++) {
    btns[i].classList.remove('active');
  }
  event.target.classList.add('active');
}

function updatePlatformInfo() {
  // In a full implementation, update UI hints based on the selected platform.
  console.log("Platform changed to " + document.getElementById('platform').value);
}

function generateConfig() {
  // In a complete tool, use the user inputs to select the proper vendor template,
  // substitute variables (e.g., VLAN IDs, RADIUS IPs, etc.) and then display the full CLI config.
  let platform = document.getElementById('platform').value;
  let dataVlan = document.getElementById('data_vlan').value;
  let guestVlan = document.getElementById('guest_vlan').value || "Not Set";
  let config = "Generating configuration for platform: " + platform + "\n";
  config += "Data VLAN: " + dataVlan + "\nGuest VLAN: " + guestVlan + "\n\n";
  config += "[CLI configuration snippet goes here]\n";
  // For example, load the vendor template via an AJAX call or preloaded JS object.
  document.getElementById('configOutput').textContent = config;
}

function sendAIQuery() {
  // Placeholder for AI integration. In a real version, send the query to OpenAI/Anthropic APIs.
  let query = document.querySelector('#aiChat textarea').value;
  document.getElementById('aiResponse').innerHTML = "<p>AI Response for: " + query + "</p>";
}
document.addEventListener('DOMContentLoaded', function() {
  showTab('configurator'); // show configurator tab on load
});
