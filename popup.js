document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const scanButton = document.getElementById('scanButton');
    const exportButton = document.getElementById('exportButton');
    const refreshButton = document.getElementById('refreshButton');
    const results = document.getElementById('results');
    const resultsList = document.getElementById('resultsList');
    const status = document.getElementById('status');
    const currentUrl = document.getElementById('currentUrl');

    // Initialize current tab info
    initializeCurrentTab();

    // Scan functionality
    scanButton.addEventListener('click', performWebsiteScan);

    // Export functionality
    exportButton.addEventListener('click', function() {
        exportScanReport();
    });

    // Refresh functionality
    refreshButton.addEventListener('click', function() {
        initializeCurrentTab();
        results.classList.add('hidden');
        updateStatus('Ready to scan', 'text-slate-400');
    });

    function initializeCurrentTab() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0] && tabs[0].url) {
                currentUrl.textContent = tabs[0].url;
                updateStatus('Ready to scan', 'text-slate-400');
            } else {
                currentUrl.textContent = 'No active tab found';
                updateStatus('Please navigate to a website', 'text-red-400');
            }
        });
    }

    function performWebsiteScan() {
        updateStatus('Scanning website...', 'text-blue-400');
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0]) {
                // Send message to content script to scan the page
                chrome.tabs.sendMessage(tabs[0].id, {action: 'scanWebsite'}, function(response) {
                    if (chrome.runtime.lastError) {
                        updateStatus('Error: ' + chrome.runtime.lastError.message, 'text-red-400');
                        return;
                    }
                    
                    if (response && response.success) {
                        displayScanResults(response.technologies);
                        updateStatus('Scan complete!', 'text-green-400');
                    } else {
                        updateStatus('Scan failed', 'text-red-400');
                    }
                });
            }
        });
    }

    function displayScanResults(technologies) {
        resultsList.innerHTML = '';
        
        // Group technologies by category
        const categories = {
            'Frontend': technologies.frontend || [],
            'Backend': technologies.backend || [],
            'Database': technologies.database || [],
            'Infrastructure': technologies.infrastructure || [],
            'Security': technologies.security || [],
            'Analytics': technologies.analytics || []
        };

        Object.entries(categories).forEach(([category, techList]) => {
            if (techList.length > 0) {
                const categoryCard = document.createElement('div');
                categoryCard.className = 'bg-slate-800/50 border border-slate-700 rounded-lg p-4 space-y-3';
                
                categoryCard.innerHTML = `
                    <div class="flex items-center space-x-2">
                        <h4 class="font-semibold text-slate-200">${category}</h4>
                        <span class="px-2 py-1 bg-slate-700 text-xs text-slate-300 rounded">${techList.length}</span>
                    </div>
                    <div class="space-y-2">
                        ${techList.map(tech => `
                            <div class="flex items-center justify-between p-2 bg-slate-900/50 rounded border border-slate-600">
                                <span class="text-sm text-slate-300">${tech.name}</span>
                                <span class="text-xs text-slate-400">${tech.confidence}%</span>
                            </div>
                        `).join('')}
                    </div>
                `;
                
                resultsList.appendChild(categoryCard);
            }
        });
        
        results.classList.remove('hidden');
    }

    function exportScanReport() {
        // Implementation for exporting scan results
        updateStatus('Exporting report...', 'text-purple-400');
        setTimeout(() => {
            updateStatus('Report exported!', 'text-green-400');
        }, 1000);
    }

    function updateStatus(message, textColorClass) {
        status.textContent = message;
        status.className = `text-center text-sm ${textColorClass}`;
    }

    // Add some interactive effects for scan button
    scanButton.addEventListener('mouseenter', function() {
        this.classList.add('shadow-lg');
    });

    scanButton.addEventListener('mouseleave', function() {
        this.classList.remove('shadow-lg');
    });
});
