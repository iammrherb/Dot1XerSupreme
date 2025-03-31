// Find the discovery tabs section
const discoveryTabs = document.querySelector('.discovery-tabs');
if (discoveryTabs) {
  // Add the Network Scoping tab after the first tab
  const firstTab = discoveryTabs.querySelector('.discovery-tab');
  if (firstTab) {
    const scopingTab = document.createElement('button');
    scopingTab.className = 'discovery-tab';
    scopingTab.setAttribute('onclick', 'showDiscoveryTab(\'scoping\', this)');
    scopingTab.textContent = 'Network Scoping';
    discoveryTabs.insertBefore(scopingTab, firstTab.nextSibling);
  }
}

// Load the Network Scoping content
fetch('network-scoping.html')
  .then(response => response.text())
  .then(html => {
    // Find the discovery content section
    const discoveryContent = document.querySelector('.discovery-content');
    if (discoveryContent) {
      // Add the Network Scoping content after the Network Scan section
      const scanSection = document.getElementById('disc-scan');
      if (scanSection) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const scopingSection = tempDiv.firstChild;
        discoveryContent.insertBefore(scopingSection, scanSection.nextSibling);
      }
    }
  })
  .catch(error => {
    console.error('Error loading Network Scoping content:', error);
  });
