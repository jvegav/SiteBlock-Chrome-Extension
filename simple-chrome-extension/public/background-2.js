// Variable para controlar si se bloquean páginas o no
let blockPages = false;

// Inicializar y cargar la lista de URLs bloqueadas (si se deben bloquear)
chrome.runtime.onInstalled.addListener(() => {
  updateBlockedURLS();
});

// Listener para activar/desactivar el bloqueo de URLs
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "toggleBlocking") {
    blockPages = request.value; // Establecer el valor recibido (true/false)
    updateBlockedURLS(); // Actualizar las URLs bloqueadas según el nuevo estado
  }
});

async function updateBlockedURLS() {
  try {
    const result = await chrome.storage.local.get(['blockedURLS']);
    const blockedURLS = result.blockedURLS || [];

    const rules = blockedURLS.map((tab, index) => ({
      "id": index + 1, // Convert index to string for rule ID
      "priority": 1,
      "action": {
        "type": blockPages ? "redirect" : "allow",
        "redirect": {
          "extensionPath": '/blocked.html'
        }
      },
      "condition": {
        "urlFilter": tab.url,
        "resourceTypes": ["main_frame"]
      }
    }));

    console.log("Rules to be applied:", rules);

    const existingRules = await chrome.declarativeNetRequest.getDynamicRules({});
    const existingRuleIds = existingRules.map(rule => rule.id);
    console.log("Existing rules before update:", existingRules);

    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: existingRuleIds,
      addRules: rules
    });

    console.log('Rules updated successfully');

    const appliedRules = await chrome.declarativeNetRequest.getDynamicRules({});
    console.log("Applied rules after update:", appliedRules);
  } catch (error) {
    console.error("Error updating rules:", error);
  }
}





