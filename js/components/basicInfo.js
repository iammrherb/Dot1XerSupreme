Vue.component('basicInfo', {
    props: ['config'],
    template: `
        <div>
            <h3>Step 2: Basic Settings</h3>
            <div class="help-section">
                <h5>Help</h5>
                <p><strong>Hostname:</strong> The device hostname (e.g., Switch1).</p>
                <p><strong>Domain Name:</strong> The domain name (e.g., example.com).</p>
                <p><strong>Scope:</strong> A description of the configuration scope (e.g., Campus LAN).</p>
            </div>
            <label class="form-label">Hostname:</label>
            <input type="text" class="form-control" v-model="config.hostname" placeholder="e.g., Switch1" @input="$emit('update:config', config)">
            <label class="form-label">Domain Name:</label>
            <input type="text" class="form-control" v-model="config.domainName" placeholder="e.g., example.com" @input="$emit('update:config', config)">
            <label class="form-label">Scope:</label>
            <input type="text" class="form-control" v-model="config.scope" placeholder="e.g., Campus LAN" @input="$emit('update:config', config)">
            <div class="step-navigation">
                <button @click="$parent.currentStep = 'platform'">Previous</button>
                <button @click="$emit('next-step')" :disabled="!config.hostname || !config.domainName || !config.scope">Next</button>
            </div>
        </div>
    `
});
