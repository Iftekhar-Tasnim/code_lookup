// Content script that runs on web pages
console.log('My Chrome Extension content script loaded!');

// Example: Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'getPageInfo') {
        const pageInfo = {
            title: document.title,
            url: window.location.href,
            timestamp: new Date().toISOString()
        };
        sendResponse(pageInfo);
    }
});

// Example: Add a custom element to the page
function addCustomElement() {
    const div = document.createElement('div');
    div.id = 'my-extension-element';
    div.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px;
        border-radius: 5px;
        z-index: 10000;
        font-family: Arial, sans-serif;
        font-size: 12px;
    `;
    div.textContent = 'Extension Active';
    document.body.appendChild(div);
}

// Uncomment the line below if you want to add the custom element
// addCustomElement();
