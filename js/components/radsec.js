Vue.component('radsec', {
    props: ['config'],
    template: `
        <div>
            <h3>Step 8: RADSEC Configuration</h3>
            <div class="help-section">
                <h5>Help</h5>
                <p><strong>Certificate Option:</strong> Choose to use a trustpoint or manual certificate for RADSEC.</p>
                <p><strong>Trustpoint Name:</strong> Name of the trustpoint for RADSEC (e.g., PORTNOX-CA). Used for TLS encryption.</p>
            </div>
            <label class="form-label">Certificate Option:</label>
            <select class="form-select" v-model="config.radsec.certOption" @change="$emit('update:config', config)">
                <option value="1">Use Trustpoint</option>
                <option value="2">Manual Certificate</option>
            </select>
            <label class="form-label">Trustpoint Name:</label>
            <input type="text" class="form-control" v-model="config.radsec.trustpoint" placeholder="e.g., PORTNOX-CA" @input="$emit('update:config', config)">
            <div class="step-navigation">
                <button @click="$parent.currentStep = 'coa'">Previous</button>
                <button @click="$emit('next-step')" :disabled="!config.radsec.trustpoint">Next</button>
            </div>
        </div>
    `
});
