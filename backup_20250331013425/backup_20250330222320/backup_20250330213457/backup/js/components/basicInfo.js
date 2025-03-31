app.component('basicInfo', {
  props: ['config'],
  template: \`
    <div>
      <h3>Basic Settings</h3>
      <p class="text-muted">Configure hostname, domain name, etc.</p>

      <div class="mb-3">
        <label class="form-label">Hostname</label>
        <input type="text" class="form-control" v-model="hostname" placeholder="e.g., Switch01">
      </div>
      <div class="mb-3">
        <label class="form-label">Domain Name</label>
        <input type="text" class="form-control" v-model="domainName" placeholder="e.g., example.com">
      </div>

      <div class="step-navigation d-flex justify-content-between">
        <button class="btn btn-outline-secondary" @click="goBack">Previous</button>
        <button class="btn btn-primary" @click="saveAndNext" :disabled="!hostname || !domainName">Next</button>
      </div>
    </div>
  \`,
  data() {
    return {
      hostname: this.config.hostname,
      domainName: this.config.domainName
    };
  },
  methods: {
    goBack() {
      this.$parent.currentStep = 'platform';
    },
    saveAndNext() {
      this.$emit('update:config', {
        hostname: this.hostname,
        domainName: this.domainName
      });
      this.$emit('next-step');
    }
  }
});
