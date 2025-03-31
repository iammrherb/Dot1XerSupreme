// Helper function to create accordion
function createAccordion(title, content, open = false) {
  const accordion = document.createElement('div');
  accordion.className = 'accordion';
  
  const header = document.createElement('div');
  header.className = 'accordion-header';
  if (open) header.classList.add('active');
  header.innerHTML = `<span>${title}</span><span class="accordion-icon">${open ? '-' : '+'}</span>`;
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'accordion-content';
  contentDiv.style.display = open ? 'block' : 'none';
  contentDiv.innerHTML = content;
  
  accordion.appendChild(header);
  accordion.appendChild(contentDiv);
  
  return accordion;
}

// Find the RADIUS tab content and reorganize
const radiusTab = document.getElementById('radius-tab');
if (radiusTab) {
  // Save original content
  const originalContent = radiusTab.innerHTML;
  
  // Clear the tab
  radiusTab.innerHTML = '';
  
  // Add section title
  const sectionTitle = document.createElement('h4');
  sectionTitle.textContent = 'RADIUS Servers';
  radiusTab.appendChild(sectionTitle);
  
  // Create main RADIUS server form group
  const serverGroup = document.createElement('div');
  serverGroup.className = 'form-group';
  serverGroup.innerHTML = `
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
  `;
  radiusTab.appendChild(serverGroup);
  
  // Create accordion group for RADIUS settings
  const accordionGroup = document.createElement('div');
  accordionGroup.className = 'accordion-group';
  
  // Add RADIUS port configuration accordion
  const portConfig = `
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
  accordionGroup.appendChild(createAccordion('RADIUS Port Configuration', portConfig, true));
  
  // Add timeout settings accordion
  const timeoutConfig = `
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
  accordionGroup.appendChild(createAccordion('RADIUS Timeouts & Retransmit', timeoutConfig));
  
  // Add load balancing accordion
  const loadBalanceConfig = `
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
  accordionGroup.appendChild(createAccordion('Load Balancing Configuration', loadBalanceConfig));
  
  // Add server testing accordion
  const testingConfig = `
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
  accordionGroup.appendChild(createAccordion('Server Testing', testingConfig));
  
  // Add RADIUS attributes accordion
  const attributesConfig = `
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
  accordionGroup.appendChild(createAccordion('RADIUS Attributes', attributesConfig));
  
  // Add to tab
  radiusTab.appendChild(accordionGroup);
}

// Similarly reorganize the TACACS+ tab
const tacacsTab = document.getElementById('tacacs-tab');
if (tacacsTab) {
  // Save original content
  const originalContent = tacacsTab.innerHTML;
  
  // Clear the tab
  tacacsTab.innerHTML = '';
  
  // Add section title
  const sectionTitle = document.createElement('h4');
  sectionTitle.textContent = 'TACACS+ Servers';
  tacacsTab.appendChild(sectionTitle);
  
  // Create main TACACS+ server form group
  const serverGroup = document.createElement('div');
  serverGroup.className = 'form-group';
  serverGroup.innerHTML = `
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
  `;
  tacacsTab.appendChild(serverGroup);
  
  // Create accordion group for TACACS+ settings
  const accordionGroup = document.createElement('div');
  accordionGroup.className = 'accordion-group';
  
  // Add TACACS+ basic options accordion
  const basicConfig = `
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
  accordionGroup.appendChild(createAccordion('TACACS+ Connection Options', basicConfig, true));
  
  // Add TACACS+ authorization accordion
  const authConfig = `
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
  accordionGroup.appendChild(createAccordion('TACACS+ Authorization', authConfig));
  
  // Add TACACS+ accounting accordion
  const acctConfig = `
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
  accordionGroup.appendChild(createAccordion('TACACS+ Accounting', acctConfig));
  
  // Add to tab
  tacacsTab.appendChild(accordionGroup);
}
