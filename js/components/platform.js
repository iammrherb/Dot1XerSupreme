Vue.component('platform', {
    props: ['config'],
    template: \`
        <div>
            <h3>Step 1: Platform Selection</h3>
            <div class="help-section">
                <h5>Help</h5>
                <p>Select the platform for which you want to generate the 802.1X configuration. This will determine the syntax and available features.</p>
            </div>
            <label class="form-label">Platform:</label>
            <select class="form-select" v-model="config.platform" @change="$emit('update:config', config)">
                <option value="">Select Platform</option>
                <option value="IOS-XE">Cisco IOS-XE</option>
                <option value="NX-OS">Cisco NX-OS</option>
                <option value="ArubaOS">ArubaOS</option>
                <option value="Juniper">Juniper</option>
                <option value="Extreme">Extreme Networks</option>
                <option value="Arista">Arista</option>
            </select>
            <div class="step-navigation">
                <button disabled>Previous</button>
                <button @click="$emit('next-step')" :disabled="!config.platform">Next</button>
            </div>
        </div>
    \`
});
