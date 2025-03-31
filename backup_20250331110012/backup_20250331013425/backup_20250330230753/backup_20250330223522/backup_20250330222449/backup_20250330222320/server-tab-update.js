// Helper function to create accordion
function createAccordion(title, content, open = false) {
  const accordion = document.createElement('div');
  accordion.className = 'accordion';
  
  const header = document.createElement('div');
  header.className = 'accordion-header';
  header.innerHTML = `<span>${title}</span><span class="accordion-icon">${open ? '-' : '+'}</span>`;
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'accordion-content';
  contentDiv.style.display = open ? 'block' : 'none';
  contentDiv.innerHTML = content;
  
  accordion.appendChild(header);
  accordion.appendChild(contentDiv);
  
  return accordion;
}

// Find the RADIUS tab content
const radiusTab = document.getElementById('radius-tab');
if (radiusTab) {
  // Temporarily store the original content
  const originalContent = radiusTab.innerHTML;
  
  // Clear the tab
  radiusTab.innerHTML = '';
  
  // Create the main RADIUS servers section
  const serversSection = document.createElement('div');
  serversSection.innerHTML = `
    <h4>RADIUS Servers</h4>
    <div class="form-group">
      <label for="radius-server-group">Server Group Name:</label>
      <input type="text" id="radius-server-group" value="RADIUS-SERVERS" placeholder="e.g., RADIUS-SERVERS">
      
      <div class="row">
        <div class="col">
          <label for="radius-ip-1">Primary Server IP:</label>
          <input type="text" id="radius-ip-1" placeholder="e.g., 10.1.1.100">
        </div>
        <div class="col">
          <label for="radius-key-1">Primary Shared Secret:</label>
          <input type="password" id="radius-key-1" placeholder="Shared secret">
        </div>
      </div>
      
      <div class="row">
        <div class="col">
          <label for="radius-ip-2">Secondary Server IP:</label>
          <input type="text" id="radius-ip-2" placeholder="e.g., 10.1.1.101">
        </div>
        <div class="col">
          <label for="radius-key-2">Secondary Shared Secret:</label>
          <input type="password" id="radius-key-2" placeholder="Shared secret">
        </div>
      </div>
    </div>
  `;
  radiusTab.appendChild(serversSection);
  
  // Create accordion group for RADIUS settings
  const accordionGroup = document.createElement('div');
  accordionGroup.className = 'accordion-group';
  
  // Add the RADIUS port configuration accordion
  const portContent = `
    <div class="row">
      <div class="col">
        <label for="radius-auth-port">Authentication Port:</label>
        <input type="number" id="radius-auth-port" value="1812">
      </div>
      <div class="col">
        <label for="radius-acct-port">Accounting Port:</label>
        <input type="number" id="radius-acct-port" value="1813">
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label for="radius-coa-port">CoA Port:</label>
        <input type="number" id="radius-coa-port" value="3799">
      </div>
    </div>
  `;
  accordionGroup.appendChild(createAccordion('RADIUS Port Configuration', portContent, true));
  
  // Add timeout and retry accordion
  const timeoutContent = `
    <div class="row">
      <div class="col">
        <label for="radius-timeout">Timeout (seconds):</label>
        <input type="number" id="radius-timeout" value="5">
      </div>
      <div class="col">
        <label for="radius-retransmit">Retransmit Count:</label>
        <input type="number" id="radius-retransmit" value="3">
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label for="radius-deadtime">Dead Time (minutes):</label>
        <input type="number" id="radius-deadtime" value="15">
      </div>
    </div>
  `;
  accordionGroup.appendChild(createAccordion('RADIUS Timeout & Retransmit', timeoutContent));
  
  // Add load balancing accordion
  const loadBalanceContent = `
    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="radius-load-balance"> 
        Enable Load Balancing
      </label>
    </div>
    
    <div id="load-balance-options" style="display: none;">
      <label for="load-balance-method">Load Balance Method:</label>
      <select id="load-balance-method">
        <option value="least-outstanding">Least Outstanding</option>
        <option value="batch">Batch</option>
        <option value="simple">Simple Round-Robin</option>
      </select>
    </div>
  `;
  accordionGroup.appendChild(createAccordion('Load Balancing Configuration', loadBalanceContent));
  
  // Add server testing accordion
  const testingContent = `
    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="radius-testing" checked> 
        Enable Automated Server Testing
      </label>
    </div>
    
    <div id="testing-options">
      <label for="testing-username">Testing Username:</label>
      <input type="text" id="testing-username" value="radius-test">
      
      <div class="checkbox-group">
        <label>
          <input type="checkbox" id="testing-idle-time" checked> 
          Enable Idle-Time Testing
        </label>
      </div>
      
      <div id="idle-time-options">
        <label for="idle-time">Idle Time (minutes):</label>
        <input type="number" id="idle-time" value="60">
      </div>
    </div>
  `;
  accordionGroup.appendChild(createAccordion('Server Testing', testingContent));
  
  // Add RADIUS attributes accordion
  const attributesContent = `
    <div class="row">
      <div class="col">
        <div class="checkbox-group">
          <label>
            <input type="checkbox" id="attr-nas-ip" checked> 
            Include NAS-IP-Address (4)
          </label>
        </div>
        <div class="checkbox-group">
          <label>
            <input type="checkbox" id="attr-service-type" checked> 
            Include Service-Type (6)
          </label>
        </div>
      </div>
      <div class="col">
        <div class="checkbox-group">
          <label>
            <input type="checkbox" id="attr-framed-mtu"> 
            Include Framed-MTU (12)
          </label>
        </div>
        <div class="checkbox-group">
          <label>
            <input type="checkbox" id="attr-class" checked> 
            Include Class (25)
          </label>
        </div>
      </div>
    </div>
    
    <label for="mac-format">MAC Address Format:</label>
    <select id="mac-format">
      <option value="ietf">IETF (xx-xx-xx-xx-xx-xx)</option>
      <option value="cisco">Cisco (xxxx.xxxx.xxxx)</option>
      <option value="unformatted">Unformatted (xxxxxxxxxxxx)</option>
    </select>
    
    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="mac-case" checked> 
        Use Uppercase for MAC Address
      </label>
    </div>
  `;
  accordionGroup.appendChild(createAccordion('RADIUS Attributes', attributesContent));
  
  // Add the accordion group to the tab
  radiusTab.appendChild(accordionGroup);
}

// Find the TACACS+ tab content and apply similar restructuring
const tacacsTab = document.getElementById('tacacs-tab');
if (tacacsTab) {
  // Temporarily store the original content
  const originalContent = tacacsTab.innerHTML;
  
  // Clear the tab
  tacacsTab.innerHTML = '';
  
  // Create the main TACACS+ servers section
  const serversSection = document.createElement('div');
  serversSection.innerHTML = `
    <h4>TACACS+ Servers</h4>
    <div class="form-group">
      <label for="tacacs-server-group">Server Group Name:</label>
      <input type="text" id="tacacs-server-group" value="TACACS-SERVERS" placeholder="e.g., TACACS-SERVERS">
      
      <div class="row">
        <div class="col">
          <label for="tacacs-ip-1">Primary Server IP:</label>
          <input type="text" id="tacacs-ip-1" placeholder="e.g., 10.1.1.102">
        </div>
        <div class="col">
          <label for="tacacs-key-1">Primary Shared Secret:</label>
          <input type="password" id="tacacs-key-1" placeholder="Shared secret">
        </div>
      </div>
      
      <div class="row">
        <div class="col">
          <label for="tacacs-ip-2">Secondary Server IP:</label>
          <input type="text" id="tacacs-ip-2" placeholder="e.g., 10.1.1.103">
        </div>
        <div class="col">
          <label for="tacacs-key-2">Secondary Shared Secret:</label>
          <input type="password" id="tacacs-key-2" placeholder="Shared secret">
        </div>
      </div>
    </div>
  `;
  tacacsTab.appendChild(serversSection);
  
  // Create accordion group for TACACS+ settings
  const accordionGroup = document.createElement('div');
  accordionGroup.className = 'accordion-group';
  
  // Add the TACACS+ options accordion
  const optionsContent = `
    <div class="row">
      <div class="col">
        <label for="tacacs-port">Port:</label>
        <input type="number" id="tacacs-port" value="49">
      </div>
      <div class="col">
        <label for="tacacs-timeout">Timeout (seconds):</label>
        <input type="number" id="tacacs-timeout" value="5">
      </div>
    </div>
    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="tacacs-single-connection"> 
        Enable Single-Connection Mode
      </label>
    </div>
    
    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="tacacs-directed-request"> 
        Enable Directed-Request Mode
      </label>
    </div>
  `;
  accordionGroup.appendChild(createAccordion('TACACS+ Options', optionsContent, true));
  
  // Add TACACS+ authorization accordion
  const authorizationContent = `
    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="auth-exec" checked> 
        Enable EXEC Authorization
      </label>
    </div>
    
    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="auth-commands" checked> 
        Enable Command Authorization
      </label>
    </div>
    
    <div id="command-auth-options">
      <div class="checkbox-group">
        <label>
          <input type="checkbox" id="auth-commands-15" checked> 
          Privilege Level 15 (Enable)
        </label>
      </div>
      
      <div class="checkbox-group">
        <label>
          <input type="checkbox" id="auth-commands-1"> 
          Privilege Level 1 (User)
        </label>
      </div>
    </div>
  `;
  accordionGroup.appendChild(createAccordion('TACACS+ Authorization', authorizationContent));
  
  // Add TACACS+ accounting accordion
  const accountingContent = `
    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="acct-exec" checked> 
        Enable EXEC Session Accounting
      </label>
    </div>
    
    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="acct-commands" checked> 
        Enable Command Accounting
      </label>
    </div>
    
    <div id="command-acct-options">
      <div class="checkbox-group">
        <label>
          <input type="checkbox" id="acct-commands-15" checked> 
          Privilege Level 15 (Enable)
        </label>
      </div>
      
      <div class="checkbox-group">
        <label>
          <input type="checkbox" id="acct-commands-1"> 
          Privilege Level 1 (User)
        </label>
      </div>
    </div>
  `;
  accordionGroup.appendChild(createAccordion('TACACS+ Accounting', accountingContent));
  
  // Add the accordion group to the tab
  tacacsTab.appendChild(accordionGroup);
}
echo -e "${BLUE}Creating DOM manipulation script to update the UI...${NC}"
cat > update-dom.js << 'EOF'

# Check if the file was created successfully
if [ ! -f "update-dom.js" ]; then
  echo -e "${RED}Error: Failed to create update-dom.js${NC}"
  exit 1
else
  echo -e "${GREEN}Created update-dom.js successfully${NC}"
fi
// Execute the server tab updates
eval(document.getElementById('server-tab-update-script').textContent);

// Execute the discovery tab updates
eval(document.getElementById('discovery-tab-update-script').textContent);

// Fix accordion functionality
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', function() {
    this.classList.toggle('active');
    const content = this.nextElementSibling;
    
    if (content.style.display === 'block') {
      content.style.display = 'none';
      // Update icon
      const icon = this.querySelector('.accordion-icon');
      if (icon) {
        icon.textContent = '+';
      }
    } else {
      content.style.display = 'block';
      // Update icon
      const icon = this.querySelector('.accordion-icon');
      if (icon) {
        icon.textContent = '-';
      }
    }
  });
});

// Add vendor-specific option sections
const advancedStep = document.getElementById('step-5');
if (advancedStep) {
  const vendorSpecificDiv = document.createElement('div');
  vendorSpecificDiv.className = 'accordion';
  vendorSpecificDiv.innerHTML = `
    <div class="accordion-header">
      <span>Vendor-Specific Options</span>
      <span class="accordion-icon">+</span>
    </div>
    <div class="accordion-content">
      <!-- Cisco IOS-XE Specific Options -->
      <div id="cisco-ios-xe-options" class="vendor-specific">
        <h4>Cisco IOS-XE Specific Options</h4>
        <div class="checkbox-group">
          <label>
            <input type="checkbox" id="cisco-ibns2" checked> 
            Use IBNS 2.0 Policy Maps
          </label>
        </div>
        <div class="checkbox-group">
          <label>
            <input type="checkbox" id="cisco-multi-auth"> 
            Enable Multi-Auth Host Mode
          </label>
        </div>
        <div class="checkbox-group">
          <label>
            <input type="checkbox" id="cisco-autoconf"> 
            Enable Auto-Configuration
          </label>
        </div>
      </div>
      
      <!-- Cisco NX-OS Specific Options -->
      <div id="cisco-nx-os-options" class="vendor-specific">
        <h4>Cisco NX-OS Specific Options</h4>
        <div class="checkbox-group">
          <label>
            <input type="checkbox" id="nxos-source-interface" checked> 
            Specify Source Interface
          </label>
        </div>
        <div class="form-group" id="nxos-source-interface-group">
          <label for="nxos-mgmt-interface">Management Interface:</label>
          <input type="text" id="nxos-mgmt-interface" placeholder="e.g., mgmt0" value="mgmt0">
        </div>
        <div class="checkbox-group">
          <label>
            <input type="checkbox" id="nxos-dot1x-pae-filter"> 
            Enable DOT1X PAE Filter
          </label>
        </div>
      </div>
      
      <!-- Aruba AOS-CX Specific Options -->
      <div id="aruba-aos-cx-options" class="vendor-specific">
        <h4>Aruba AOS-CX Specific Options</h4>
        <div class="form-group">
          <label for="aruba-auth-precedence">Authentication Precedence:</label>
          <select id="aruba-auth-precedence">
            <option value="dot1x-first">Dot1X First, then MAC Auth</option>
            <option value="mac-auth-first">MAC Auth First, then Dot1X</option>
            <option value="both">Both Methods Simultaneously</option>
          </select>
        </div>
        <div class="form-group">
          <label for="aruba-auth-failure">Authentication Failure Behavior:</label>
          <select id="aruba-auth-failure">
            <option value="strict">Strict (No access on failure)</option>
            <option value="fail-open">Fail Open (Allow access on failure)</option>
            <option value="fail-through">Fail Through (Try next method)</option>
          </select>
        </div>
      </div>
      
      <!-- Juniper Specific Options -->
      <div id="juniper-ex-options" class="vendor-specific">
        <h4>Juniper EX Specific Options</h4>
        <div class="form-group">
          <label for="juniper-supplicant-mode">Supplicant Mode:</label>
          <select id="juniper-supplicant-mode">
            <option value="single">Single (One device per port)</option>
            <option value="multiple">Multiple (Multiple devices, first authenticates)</option>
            <option value="multiple-secure">Multiple-Secure (Each device authenticates)</option>
          </select>
        </div>
        <div class="checkbox-group">
          <label>
            <input type="checkbox" id="juniper-server-reject-vlan" checked> 
            Enable Server-Reject VLAN
          </label>
        </div>
        <div class="checkbox-group">
          <label>
            <input type="checkbox" id="juniper-nas-port-extended"> 
            Use Extended NAS-Port-ID Format
          </label>
        </div>
      </div>
      
      <!-- Fortinet Specific Options -->
      <div id="fortinet-fortiswitch-options" class="vendor-specific">
        <h4>FortiSwitch Specific Options</h4>
        <div class="checkbox-group">
          <label>
            <input type="checkbox" id="fortiswitch-security-mode" checked> 
            Enable 802.1X Security Mode
          </label>
        </div>
        <div class="checkbox-group">
          <label>
            <input type="checkbox" id="fortiswitch-radius-timeout-override"> 
            Override Global RADIUS Timeout
          </label>
        </div>
      </div>
    </div>
  `;
  
  // Add the vendor-specific options after the existing accordions
  const existingAccordions = advancedStep.querySelectorAll('.accordion');
  if (existingAccordions.length > 0) {
    const lastAccordion = existingAccordions[existingAccordions.length - 1];
    lastAccordion.parentNode.insertBefore(vendorSpecificDiv, lastAccordion.nextSibling);
  } else {
    // If no existing accordions, add it before the nav buttons
    const navButtons = advancedStep.querySelector('.nav-buttons');
    if (navButtons) {
      advancedStep.insertBefore(vendorSpecificDiv, navButtons);
    }
  }
  
  // Initialize the vendor-specific options
  updateVendorSpecificOptions();
}

// Fix accordion functionality again after adding new elements
document.querySelectorAll('.accordion-header').forEach(header => {
  if (!header.hasAttribute('data-initialized')) {
    header.setAttribute('data-initialized', 'true');
    header.addEventListener('click', function() {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      
      if (content.style.display === 'block') {
        content.style.display = 'none';
        // Update icon
        const icon = this.querySelector('.accordion-icon');
        if (icon) {
          icon.textContent = '+';
        }
      } else {
        content.style.display = 'block';
        // Update icon
        const icon = this.querySelector('.accordion-icon');
        if (icon) {
          icon.textContent = '-';
        }
      }
    });
  }
});

console.log('DOM updates completed successfully');
