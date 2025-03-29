Vue.component('aaa', {
    props: ['config'],
    template: `
        <div>
            <h3>Step 3: AAA Configuration</h3>
            <div class="help-section">
                <h5>Help</h5>
                <p><strong>AAA Model:</strong> Enable or disable AAA (new-model is recommended for 802.1X).</p>
                <p><strong>Authentication Method:</strong> Choose the method (Local, RADIUS, TACACS+, or both).</p>
                <p><strong>Authorization Method:</strong> Select the method for user authorization.</p>
                <p><strong>Accounting Method:</strong> Choose how user activity is tracked.</p>
                <p><strong>Session ID:</strong> Use a common or unique session ID.</p>
                <p><strong>Password Encryption:</strong> Enable to encrypt passwords for security.</p>
            </div>
            <label class="form-label">AAA Model:</label>
            <select class="form-select" v-model="config.aaa.model" @change="$emit('update:config', config)">
                <option value="1">Enable AAA (new-model)</option>
                <option value="2">Disable AAA</option>
            </select>
            <label class="form-label">Authentication Method:</label>
            <select class="form-select" v-model="config.aaa.authMethod" @change="$emit('update:config', config)">
                <option value="1">Local Only</option>
                <option value="2">RADIUS</option>
                <option value="3">TACACS+</option>
                <option value="4">TACACS+ and RADIUS</option>
            </select>
            <label class="form-label">Authorization Method:</label>
            <select class="form-select" v-model="config.aaa.authorMethod" @change="$emit('update:config', config)">
                <option value="1">Local Only</option>
                <option value="2">RADIUS</option>
                <option value="3">TACACS+</option>
                <option value="4">TACACS+ and RADIUS</option>
            </select>
            <label class="form-label">Accounting Method:</label>
            <select class="form-select" v-model="config.aaa.accountMethod" @change="$emit('update:config', config)">
                <option value="1">Local Only</option>
                <option value="2">RADIUS</option>
                <option value="3">TACACS+</option>
                <option value="4">TACACS+ and RADIUS</option>
            </select>
            <label class="form-label">Session ID:</label>
            <select class="form-select" v-model="config.aaa.sessionId" @change="$emit('update:config', config)">
                <option value="1">Common</option>
                <option value="2">Unique</option>
            </select>
            <label class="form-label">Password Encryption:</label>
            <select class="form-select" v-model="config.aaa.pwdEncrypt" @change="$emit('update:config', config)">
                <option value="1">Enable</option>
                <option value="2">Disable</option>
            </select>
            <div class="step-navigation">
                <button @click="$parent.currentStep = 'basicInfo'">Previous</button>
                <button @click="$emit('next-step')">Next</button>
            </div>
        </div>
    `
});
