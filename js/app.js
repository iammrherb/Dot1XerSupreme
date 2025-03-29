const { createApp, reactive, computed } = Vue;

const app = createApp({
  data() {
    return {
      currentStep: "platform",
      config: reactive({
        deviceType: "switch",          // "switch" or "wireless"
        platformVendor: "",            // e.g., "cisco", "juniper", "aruba"
        platform: "",                  // e.g., "IOS-XE", "NX-OS", "JUNOS", etc.
        ibnsOption: "no",              // "yes" to enable IBNS 2.0 (for Cisco)
        hostname: "",
        domainName: ""
        // Additional configuration sections (AAA, RADIUS, etc.) can be added here.
      }),
      generatedConfig: "",
      steps: ["platform", "basicInfo", "aaa", "radius", "tacacs", "dot1x", "coa", "radsec", "deviceTracking", "ibns", "portnox", "aiAssist"],
      helpTitle: "",
      helpContent: ""
    };
  },
  computed: {
    progress() {
      const idx = this.steps.indexOf(this.currentStep);
      return Math.round(((idx + 1) / this.steps.length) * 100);
    },
    isWiredDevice() {
      return this.config.deviceType === "switch";
    }
  },
  methods: {
    updateConfig(newConfig) {
      Object.assign(this.config, newConfig);
    },
    nextStep() {
      const idx = this.steps.indexOf(this.currentStep);
      if (idx < this.steps.length - 1) {
        this.currentStep = this.steps[idx + 1];
      }
    },
    generateConfig() {
      // For demonstration, generate a basic header.
      this.generatedConfig = `# Configuration for ${this.config.platform}\nhostname ${this.config.hostname}\nip domain name ${this.config.domainName}\n`;
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.generatedConfig)
        .then(() => alert("Configuration copied to clipboard!"))
        .catch(err => console.error("Copy failed: ", err));
    },
    downloadConfiguration() {
      const element = document.createElement("a");
      const file = new Blob([this.generatedConfig], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = `${this.config.hostname || "dot1x"}-config.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    },
    saveConfiguration() {
      alert("Save functionality coming soon.");
    },
    loadConfiguration() {
      alert("Load functionality coming soon.");
    },
    showHelp(topic) {
      if (topic === "general") {
        this.helpTitle = "802.1X Best Practices";
        this.helpContent = "Refer to https://www.wiresandwi.fi/aaa-templates for detailed AAA configuration examples.";
      } else if (topic === "vendor") {
        this.helpTitle = "Vendor Documentation";
        this.helpContent = "Visit vendor sites: Cisco, Juniper, Aruba.";
      } else if (topic === "examples") {
        this.helpTitle = "Example Configurations";
        this.helpContent = "See sample configurations in the templates for guidance.";
      }
      alert(this.helpTitle + "\n" + this.helpContent);
    }
  }
});

app.mount("#app");
