// Lista de URLs a bloquear
const blockedUrls = [
    '*://www.example.com/*',
    '*://www.facebook.com/*',
    '*://www.twitter.com/*'
  ];
  
  // Interceptar y bloquear las solicitudes a las URLs especificadas
  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      return { cancel: true };
    },
    { urls: blockedUrls },
    ["blocking"]
  );
  
  chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed and site blocking is active.');
  });
