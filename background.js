// CodeLookup Background Service Worker
console.log('CodeLookup background script loaded!');

// Listen for extension installation
chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason === 'install') {
        console.log('Extension installed for the first time');
        // You can perform setup tasks here
    } else if (details.reason === 'update') {
        console.log('Extension updated');
    }
});

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('Message received in background:', request);
    
    if (request.action === 'scanWebsite') {
        // Handle website scanning request
        const result = {
            success: true,
            message: 'Website scan initiated',
            timestamp: new Date().toISOString()
        };
        sendResponse(result);
    }
    
    // Return true to indicate async response
    return true;
});

// Example: Listen for tab updates
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.url) {
        console.log('Tab updated:', tab.url);
        // You can perform actions when tabs are updated
    }
});
