Vue.component('coa', {
    props: ['config'],
    template: \`
        <div>
            <h3>Step 7: Change of Authorization (CoA)</h3>
            <div class="help-section">
                <h5>Help</h5>
                <p>Configure Change of Authorization (CoA) for dynamic policy updates from the RADIUS server.</p>
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
    \`
});
