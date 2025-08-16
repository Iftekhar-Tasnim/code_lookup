document.addEventListener('DOMContentLoaded', function() {
    console.log('CodeLookup popup loaded!');
    
    // Get DOM elements
    const scanButton = document.getElementById('scanButton');
    const exportButton = document.getElementById('exportButton');
    const refreshButton = document.getElementById('refreshButton');
    const results = document.getElementById('results');
    const resultsList = document.getElementById('resultsList');
    const status = document.getElementById('status');
    const currentUrl = document.getElementById('currentUrl');

    console.log('DOM elements found:', {
        scanButton: !!scanButton,
        exportButton: !!exportButton,
        refreshButton: !!refreshButton,
        results: !!results,
        resultsList: !!resultsList,
        status: !!status,
        currentUrl: !!currentUrl
    });

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
        updateStatus('🔄 Refreshed - Ready to scan!', 'text-slate-400');
    });

    function initializeCurrentTab() {
        console.log('Initializing current tab...');
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            console.log('Tabs found:', tabs);
                            if (tabs[0] && tabs[0].url) {
                    currentUrl.textContent = tabs[0].url;
                    updateStatus('🚀 Ready to scan!', 'text-slate-400');
                    console.log('Current URL set to:', tabs[0].url);
                } else {
                    currentUrl.textContent = 'No active tab found';
                    updateStatus('⚠️ Please navigate to a website', 'text-red-400');
                    console.log('No active tab found');
                }
        });
    }

    function performWebsiteScan() {
        console.log('Starting website scan...');
        updateStatus('🔍 Scanning website...', 'text-blue-400');
        
        // Add loading state to button
        const originalText = scanButton.innerHTML;
        scanButton.innerHTML = '<span class="loading"></span> Scanning...';
        scanButton.disabled = true;
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            console.log('Tabs for scanning:', tabs);
            if (tabs[0]) {
                // Check if we can inject content script
                if (tabs[0].url.startsWith('chrome://') || tabs[0].url.startsWith('chrome-extension://')) {
                    updateStatus('Cannot scan Chrome system pages', 'text-red-400');
                    return;
                }
                
                // Try to inject content script and scan
                try {
                    chrome.scripting.executeScript({
                        target: {tabId: tabs[0].id},
                        files: ['content.js']
                    }, function() {
                                                 if (chrome.runtime.lastError) {
                             console.error('Script injection error:', chrome.runtime.lastError);
                             updateStatus('❌ Failed to inject script: ' + chrome.runtime.lastError.message, 'text-red-400');
                             
                             // Restore button state
                             scanButton.innerHTML = originalText;
                             scanButton.disabled = false;
                             return;
                         }
                        
                        console.log('Content script injected successfully');
                        
                        // Wait a moment for script to load, then scan
                        setTimeout(() => {
                            chrome.tabs.sendMessage(tabs[0].id, {action: 'scanWebsite'}, function(response) {
                                if (chrome.runtime.lastError) {
                                    console.error('Message error:', chrome.runtime.lastError);
                                    updateStatus('Scan failed: ' + chrome.runtime.lastError.message, 'text-red-400');
                                    return;
                                }
                                
                                console.log('Scan response:', response);
                                
                                if (response && response.success) {
                                    window.lastScanResults = response.technologies;
                                    displayScanResults(response.technologies);
                                    updateStatus('✅ Scan complete!', 'text-green-400');
                                } else {
                                    updateStatus('❌ Scan failed - no response', 'text-red-400');
                                }
                                
                                // Restore button state
                                scanButton.innerHTML = originalText;
                                scanButton.disabled = false;
                            });
                        }, 500); // Increased timeout
                    });
                } catch (error) {
                    console.error('Error during scan:', error);
                    updateStatus('❌ Scan error: ' + error.message, 'text-red-400');
                    
                    // Restore button state
                    scanButton.innerHTML = originalText;
                    scanButton.disabled = false;
                }
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
                categoryCard.className = 'category-card';
                
                categoryCard.innerHTML = `
                    <div class="category-header">
                        <h4 class="category-name">${category}</h4>
                        <span class="category-count">${techList.length}</span>
                    </div>
                    <div class="tech-list">
                        ${techList.map(tech => `
                            <div class="tech-item">
                                <span class="tech-name">${tech.name}</span>
                                <span class="tech-confidence">${tech.confidence}%</span>
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
        if (!window.lastScanResults) {
            updateStatus('No scan results to export', 'text-red-400');
            return;
        }
        
        updateStatus('📄 Exporting text report...', 'text-purple-400');
        
        // Create formatted text report
        const url = document.getElementById('currentUrl').textContent;
        const timestamp = new Date().toLocaleString();
        
        let reportText = `CodeLookup Technology Scan Report
${'='.repeat(50)}

Website: ${url}
Scan Date: ${timestamp}

${'='.repeat(50)}

DETECTED TECHNOLOGIES:
${'='.repeat(50)}

`;

        // Add technologies by category
        const categories = {
            'Frontend': window.lastScanResults.frontend || [],
            'Backend': window.lastScanResults.backend || [],
            'Database': window.lastScanResults.database || [],
            'Infrastructure': window.lastScanResults.infrastructure || [],
            'Security': window.lastScanResults.security || [],
            'Analytics': window.lastScanResults.analytics || []
        };

        Object.entries(categories).forEach(([category, techList]) => {
            if (techList.length > 0) {
                reportText += `\n${category.toUpperCase()} TECHNOLOGIES:\n`;
                reportText += `${'-'.repeat(category.length + 20)}\n`;
                
                techList.forEach(tech => {
                    reportText += `• ${tech.name} (Confidence: ${tech.confidence}%)\n`;
                });
                
                reportText += '\n';
            }
        });

        // Add summary
        const totalTechs = Object.values(categories).reduce((sum, techs) => sum + techs.length, 0);
        reportText += `${'='.repeat(50)}\n`;
        reportText += `SUMMARY:\n`;
        reportText += `${'-'.repeat(10)}\n`;
        reportText += `Total Technologies Detected: ${totalTechs}\n`;
        reportText += `Scan completed successfully\n`;
        reportText += `Report generated by CodeLookup Extension\n`;
        reportText += `${'='.repeat(50)}`;

        // Create and download text file
        const dataBlob = new Blob([reportText], {type: 'text/plain;charset=utf-8'});
        const url_download = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url_download;
        link.download = `codelookup-scan-${new Date().toISOString().split('T')[0]}.txt`;
        link.click();
        
        URL.revokeObjectURL(url_download);
        updateStatus('📄 Text report exported successfully!', 'text-green-400');
    }

    function updateStatus(message, textColorClass) {
        status.textContent = message;
        // Remove old color classes and add new ones
        status.className = 'status-section';
        if (textColorClass.includes('green')) {
            status.style.color = '#10b981';
        } else if (textColorClass.includes('red')) {
            status.style.color = '#ef4444';
        } else if (textColorClass.includes('blue')) {
            status.style.color = '#3b82f6';
        } else if (textColorClass.includes('purple')) {
            status.style.color = '#8b5cf6';
        } else {
            status.style.color = '#94a3b8';
        }
    }

    // Add some interactive effects for scan button
    scanButton.addEventListener('mouseenter', function() {
        this.classList.add('shadow-lg');
    });

    scanButton.addEventListener('mouseleave', function() {
        this.classList.remove('shadow-lg');
    });
    
    // Test function to verify UI works
    function testUI() {
        console.log('Testing UI functionality...');
        updateStatus('🎉 UI test successful!', 'text-green-400');
        
        // Test results display
        const testResults = {
            frontend: [{name: '⚛️ React', confidence: 95}, {name: '🎨 Tailwind CSS', confidence: 88}],
            backend: [{name: '🐘 PHP', confidence: 90}, {name: '🟢 Node.js', confidence: 85}],
            database: [{name: '🐬 MySQL', confidence: 75}],
            infrastructure: [{name: '☁️ AWS', confidence: 80}]
        };
        displayScanResults(testResults);
        
        // Store test results for export testing
        window.lastScanResults = testResults;
        updateStatus('🧪 Test data loaded - try exporting!', 'text-blue-400');
    }
    
    // Add test button temporarily
    const testButton = document.createElement('button');
    testButton.textContent = '🧪 Test UI & Demo';
    testButton.className = 'test-button';
    testButton.onclick = testUI;
    document.querySelector('.scan-section').appendChild(testButton);
});
