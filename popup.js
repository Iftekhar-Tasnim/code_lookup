document.addEventListener('DOMContentLoaded', function() {
    const actionButton = document.getElementById('actionButton');
    const resultDiv = document.getElementById('result');
    
    actionButton.addEventListener('click', function() {
        // Example functionality - you can modify this based on your needs
        resultDiv.textContent = 'Button clicked! Extension is working.';
        
        // You can add more functionality here, such as:
        // - Sending messages to content scripts
        // - Making API calls
        // - Storing data
        // - etc.
    });
    
    // Example of getting current tab info
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0]) {
            console.log('Current tab:', tabs[0].url);
        }
    });
});
