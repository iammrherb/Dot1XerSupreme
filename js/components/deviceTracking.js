Vue.component('deviceTracking', {
    props: ['config'],
    template: `
        <div>
            <h3>Step 9: Device Tracking</h3>
            <div class="help-section">
                <h5>Help</h5>
                <p><strong>Enable Device Tracking:</strong> Enable device tracking to monitor IP-to-MAC bindings on access and trunk ports.</p>
                <p><strong>Tracking Mode:</strong> Select 'Auto-Source' for automatic tracking or 'Manual' for manual configuration.</p>
                <p><strong>Access Policy Name:</strong> Name for the access policy (e.g., IP-TRACKING).</p>
                <p><strong>Address Limit:</strong> Maximum number of addresses per port (default: 4).</p>
                <p><strong>Lifetime:</strong> Lifetime of the binding in seconds (default: 30).</p>
                <p><strong>Trunk Policy Name:</strong> Name for the trunk policy (e.g., DISABLE-IP-TRACKING).</p>
            </div>
            <label class="form-label">Enable Device Tracking:</label>
            <select class="form-select" v-model="config.deviceTracking.enable" @change="$emit('update:config', config)">
                <option value="1">Yes</option>
                <option value="2">No</option>
            </select>
            <div v-if="config.deviceTracking.enable === '1'">
                <label class="form-label">Tracking Mode:</label>
                <select class="form-select" v-model="config.deviceTracking.mode" @change="$emit('update:config', config)">
                    <option value="1">Auto-Source</option>
                    <option value="2">Manual</option>
                </select>
                <label class="form-label">Access Policy Name:</label>
                <input type="text" class="form-control" v-model="config.deviceTracking.accessName" placeholder="e.g., IP-TRACKING" @input="$emit('update:config', config)">
                <label class="form-label">Address Limit:</label>
                <input type="number" class="form-control" v-model="config.deviceTracking.addrLimit" placeholder="4" @input="$emit('update:config', config)">
                <label class="form-label">Lifetime (seconds):</label>
                <input type="number" class="form-control" v-model="config.deviceTracking.lifetime" placeholder="30" @input="$emit('update:config', config)">
                <label class="form-label">Trunk Policy Name:</label>
                <input type="text" class="form-control" v-model="config.deviceTracking.trunkName" placeholder="e.g., DISABLE-IP-TRACKING" @input="$emit('update:config', config)">
            </div>
            <div class="step-navigation">
                <button @click="$parent.currentStep = config.radius.type === '2' ? 'radsec' : 'coa'">Previous</button>
                <button @click="$emit('next-step')" :disabled="config.deviceTracking.enable === '1' && !config.deviceTracking.accessName">Next</button>
            </div>
        </div>
    `
});
