Vue.component('tacacs', {
  props: ['config'],
  template: `
    <div>
      <h3>Step 5: TACACS+ Servers</h3>
      <div class="help-section">
        <h5>Help</h5>
        <p><strong>Enable TACACS+:</strong> Enable TACACS+ for authentication and authorization (optional if using RADIUS).</p>
        <p><strong>Primary TACACS+ Server IP:</strong> Enter the primary TACACS+ server IP (e.g., 192.168.1.20).</p>
        <p><strong>Primary Port:</strong> Port number (default: 49).</p>
        <p><strong>Primary Shared Secret:</strong> Shared secret for TACACS+.</p>
        <p><strong>Enable Secondary Server:</strong> Optionally add a secondary TACACS+ server.</p>
        <p><strong>TACACS+ Group Name:</strong> Name the TACACS+ server group (e.g., TACACS-SERVERS).</p>
        <p><strong>Single Connection:</strong> Use a single connection to the server (recommended: Yes).</p>
        <p><strong>Command Authorization:</strong> Enable if command authorization is required.</p>
        <p><strong>Max Privilege Level:</strong> Maximum privilege level (default: 15).</p>
      </div>
      <label class="form-label">Enable TACACS+:</label>
      <input type="checkbox" class="form-check-input" v-model="config.tacacs.enable" @change="$emit('update:config', config)">
      <div v-if="config.tacacs.enable">
        <label class="form-label">Primary TACACS+ Server IP:</label>
        <input type="text" class="form-control" v-model="config.tacacs.primaryIp" placeholder="e.g., 192.168.1.20" @input="$emit('update:config', config)">
        <label class="form-label">Primary Port:</label>
        <input type="text" class="form-control" v-model="config.tacacs.primaryPort" placeholder="49" @input="$emit('update:config', config)">
        <label class="form-label">Primary Shared Secret:</label>
        <input type="text" class="form-control" v-model="config.tacacs.primarySecret" placeholder="e.g., TacacsKey" @input="$emit('update:config', config)">
        <label class="form-label">Enable Secondary Server:</label>
        <input type="checkbox" class="form-check-input" v-model="config.tacacs.secondary" @change="$emit('update:config', config)">
        <div v-if="config.tacacs.secondary">
          <label class="form-label">Secondary TACACS+ Server IP:</label>
          <input type="text" class="form-control" v-model="config.tacacs.secondaryIp" placeholder="e.g., 192.168.1.21" @input="$emit('update:config', config)">
          <label class="form-label">Secondary Port:</label>
          <input type="text" class="form-control" v-model="config.tacacs.secondaryPort" placeholder="49" @input="$emit('update:config', config)">
          <label class="form-label">Secondary Shared Secret:</label>
          <input type="text" class="form-control" v-model="config.tacacs.secondarySecret" placeholder="e.g., TacacsKey2" @input="$emit('update:config', config)">
        </div>
        <label class="form-label">TACACS+ Group Name:</label>
        <input type="text" class="form-control" v-model="config.tacacs.groupName" placeholder="e.g., TACACS-SERVERS" @input="$emit('update:config', config)">
        <label class="form-label">Single Connection:</label>
        <select class="form-select" v-model="config.tacacs.singleConn" @change="$emit('update:config', config)">
          <option value="1">Yes</option>
          <option value="2">No</option>
        </select>
        <label class="form-label">Command Authorization:</label>
        <select class="form-select" v-model="config.tacacs.cmdAuth" @change="$emit('update:config', config)">
          <option value="1">Enable</option>
          <option value="2">Disable</option>
        </select>
        <label class="form-label">Max Privilege Level:</label>
        <input type="number" class="form-control" v-model="config.tacacs.maxPriv" placeholder="15" @input="$emit('update:config', config)">
      </div>
      <div class="step-navigation">
        <button @click="$parent.currentStep = 'radius'">Previous</button>
        <button @click="$emit('next-step')" :disabled="config.tacacs.enable && (!config.tacacs.primaryIp || !config.tacacs.primarySecret || !config.tacacs.groupName)">Next</button>
      </div>
    </div>
  `
});
