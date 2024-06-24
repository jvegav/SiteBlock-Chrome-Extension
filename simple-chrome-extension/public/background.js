
let blockPages = false;


chrome.runtime.onInstalled.addListener(() => {
  updateBlockedURLS();
});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "toggleBlocking") {
    blockPages = request.value; 
    updateBlockedURLS();
  }
});

function updateBlockedURLS() {
  chrome.storage.local.get(['blockedURLS'], function(result) {
    const blockedURLS = result.blockedURLS || [];
    const rules = blockedURLS.map((tab, index) => ({
      id: index + 1,
      priority: 1,
      action: { type: blockPages ? "block" : "allow" }, // "noop" para no hacer nada si no se bloquean páginas
      condition: { urlFilter: tab.url, resourceTypes: ["main_frame"] }
    }));

    console.log("Rules to be applied:", rules);

    
    chrome.declarativeNetRequest.getDynamicRules((existingRules) => {
      const existingRuleIds = existingRules.map(rule => rule.id);
      console.log("Existing rules before update:", existingRules);

      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: existingRuleIds,
        addRules: rules
      }, () => {
        if (chrome.runtime.lastError) {
          console.error("Error updating rules:", chrome.runtime.lastError);
        } else {
          console.log('Rules updated successfully');
          
          chrome.declarativeNetRequest.getDynamicRules((appliedRules) => {
            console.log("Applied rules after update:", appliedRules);
          });
        }
      });
    });
  });
}
