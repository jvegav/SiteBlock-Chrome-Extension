// Inicializar y cargar la lista de URLs bloqueadas
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['blockedURLS'], function(result) {
    const blockedURLS = result.blockedURLS || [];
    updateBlockedURLS(blockedURLS);
  });
});

// Listener para actualizar la lista de URLs bloqueadas
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "updateBlockedURLS") {
    chrome.storage.local.get(['blockedURLS'], function(result) {
      const blockedURLS = result.blockedURLS || [];
      updateBlockedURLS(blockedURLS);
    });
  }
});

function updateBlockedURLS(blockedURLS) {
  const rules = blockedURLS.map((tab, index) => (
    {
    "id": index+1,
    "priority": 1,
    "action": { "type": "block" },
    "condition": { "urlFilter": tab.url , "resourceTypes": ["main_frame"]}
    
  }));

  console.log(rules)

  // Primero eliminar todas las reglas existentes
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
        // Verificar las reglas aplicadas
        chrome.declarativeNetRequest.getDynamicRules((appliedRules) => {
          console.log("Applied rules after update:", appliedRules);
        });
      }
    })
  })};
