let blockPages = false;

chrome.runtime.onInstalled.addListener(() => {
	updateBlockedURLS();
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action === "toggleBlocking") {
		blockPages = request.value; // Establecer el valor recibido (true/false)
		updateBlockedURLS(); // Actualizar las URLs bloqueadas según el nuevo estado
	}
});

async function updateBlockedURLS() {
	try {
		const result = await chrome.storage.local.get(["blockedURLS"]);
		const blockedURLS = result.blockedURLS || [];

		const rules = blockedURLS.map((tab, index) => ({
			id: index + 1,
			priority: 1,
			action: {
				type: blockPages ? "redirect" : "allow",
				redirect: {
					extensionPath: "/blocked.html",
				},
			},
			condition: {
				urlFilter: tab.url,
				resourceTypes: ["main_frame"],
			},
		}));

		const existingRules = await chrome.declarativeNetRequest.getDynamicRules(
			{}
		);
		const existingRuleIds = existingRules.map((rule) => rule.id);

		await chrome.declarativeNetRequest.updateDynamicRules({
			removeRuleIds: existingRuleIds,
			addRules: rules,
		});
	} catch (error) {
		console.log(error);
	}
}
