Vue.component('coa', {
    props: ['config'],
    template: `
        <div>
            <h3>Step 7: Change of Authorization (CoA)</h3>
            <div class="help-section">
                <h5>Help</h5>
                <p><strong>Enable CoA:</strong> Enable Change of Authorization for dynamic policy updates from the RADIUS server.</p>
                <p><strong>Client IP:</strong> IP address of the CoA client (e.g., 192.168.1.10). Typically the RADIUS server IP.</p>
                <p><strong>Server Key:</strong> Shared key for CoA communication (e.g., CoAKey).</p>
                <p><strong>Port:</strong> Port for CoA communication (default: 1700).</p>
            </div>
            <label class="form-label">Enable CoA:</label>
            <select class="form-select" v-model="config.coa.enable" @change="$emit('update:config', config)">
                <option value="1">Yes</option>
                <option value="2">No</option>
            </select>
            <div v-if="config.coa.enable === '1'">
                <label class="form-label">Client IP:</label>
                <input type="text" class="form-control" v-model="config.coa.clientIp" placeholder="e.g., 192.168.1.10" @input="$emit('update:config', config)">
                <label class="form-label">Server Key:</label>
                <input type="text" class="form-control" v-model="config.coa.serverKey" placeholder="e.g., CoAKey" @input="$emit('update:config', config)">
                <label class="form-label">Port:</label>
                <input type="text" class="form-control" v-model="config.coa.port" placeholder="1700" @input="$emit('update:config', config)">
            </div>
            <div class="step-navigation">
                <button @click="$parent.currentStep = 'dot1x'">Previous</button>
                <button @click="$emit('next-step')" :disabled="config.coa.enable === '1' && (!config.coa.clientIp || !config.coa.serverKey)">Next</button>
            </div>
        </div>
    `
});
