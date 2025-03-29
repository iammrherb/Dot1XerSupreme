Vue.component('ibns', {
    props: ['config'],
    template: `
        <div>
            <h3>Step 10: IBNS 2.0 Configuration</h3>
            <div class="help-section">
                <h5>Help</h5>
                <p><strong>IBNS Mode:</strong> Choose between High Security (strict policies) or Low Impact (more permissive) mode. High Security is recommended for secure environments.</p>
                <p><strong>Policy Map Name:</strong> Enter the name of the policy map (e.g., DOT1X_MAB_POLICY).</p>
                <p><strong>Enable Templates:</strong> Enable if you want to use predefined interface templates.</p>
                <p><strong>Open Template Name:</strong> Name of the open template (e.g., WIRED_DOT1X_OPEN).</p>
                <p><strong>Closed Template Name:</strong> Name of the closed template (e.g., WIRED_DOT1X_CLOSED).</p>
            </div>
            <label class="form-label">IBNS Mode:</label>
            <select class="form-select" v-model="config.ibns.mode" @change="$emit('update:config', config)">
                <option value="1">High Security</option>
                <option value="2">Low Impact</option>
            </select>
            <label class="form-label">Policy Map Name:</label>
            <input type="text" class="form-control" v-model="config.ibns.policyMapName" placeholder="e.g., DOT1X_MAB_POLICY" @input="$emit('update:config', config)">
            <label class="form-label">Enable Templates:</label>
            <select class="form-select" v-model="config.ibns.templates" @change="$emit('update:config', config)">
                <option value="1">Yes</option>
                <option value="2">No</option>
            </select>
            <div v-if="config.ibns.templates === '1'">
                <label class="form-label">Open Template:</label>
                <select class="form-select" v-model="config.ibns.openTemplate" @change="$emit('update:config', config)">
                    <option value="1">Enable</option>
                    <option value="2">Disable</option>
                </select>
                <div v-if="config.ibns.openTemplate === '1'">
                    <label class="form-label">Open Template Name:</label>
                    <input type="text" class="form-control" v-model="config.ibns.openTemplateName" placeholder="e.g., WIRED_DOT1X_OPEN" @input="$emit('update:config', config)">
                </div>
                <label class="form-label">Closed Template:</label>
                <select class="form-select" v-model="config.ibns.closedTemplate" @change="$emit('update:config', config)">
                    <option value="1">Enable</option>
                    <option value="2">Disable</option>
                </select>
                <div v-if="config.ibns.closedTemplate === '1'">
                    <label class="form-label">Closed Template Name:</label>
                    <input type="text" class="form-control" v-model="config.ibns.closedTemplateName" placeholder="e.g., WIRED_DOT1X_CLOSED" @input="$emit('update:config', config)">
                </div>
            </div>
            <div class="step-navigation">
                <button @click="$parent.currentStep = 'deviceTracking'">Previous</button>
                <button @click="$emit('next-step')" :disabled="!config.ibns.policyMapName">Next</button>
            </div>
        </div>
    `
});
