// CodeLookup Content Script
console.log('CodeLookup content script loaded!');

// Technology detection patterns
const TECHNOLOGY_PATTERNS = {
    // Frontend Frameworks
    'React': {
        patterns: [
            'react',
            '__REACT_DEVTOOLS_GLOBAL_HOOK__',
            'ReactDOM',
            'data-reactroot'
        ],
        confidence: 95
    },
    'Vue.js': {
        patterns: [
            'vue',
            '__VUE__',
            'Vue',
            'data-v-'
        ],
        confidence: 90
    },
    'Angular': {
        patterns: [
            'angular',
            'ng-',
            'data-ng-',
            'ng-app',
            'ng-controller'
        ],
        confidence: 90
    },
    'jQuery': {
        patterns: [
            'jquery',
            'jQuery',
            '$(',
            '$.'
        ],
        confidence: 85
    },
    'Bootstrap': {
        patterns: [
            'bootstrap',
            'Bootstrap',
            'data-bs-',
            'data-toggle'
        ],
        confidence: 80
    },
    'Tailwind CSS': {
        patterns: [
            'tailwind',
            'tailwindcss',
            'tw-',
            'from-',
            'to-',
            'bg-gradient-to'
        ],
        confidence: 85
    },
    'Material-UI': {
        patterns: [
            'material-ui',
            'Mui',
            'mui-'
        ],
        confidence: 80
    },

    // Backend Technologies
    'PHP': {
        patterns: [
            'php',
            'PHPSESSID',
            '.php',
            'X-Powered-By: PHP'
        ],
        confidence: 90
    },
    'Node.js': {
        patterns: [
            'node',
            'express',
            'next.js',
            'nuxt.js'
        ],
        confidence: 85
    },
    'Python': {
        patterns: [
            'python',
            'django',
            'flask',
            'wsgi'
        ],
        confidence: 85
    },
    'Ruby': {
        patterns: [
            'ruby',
            'rails',
            'rack',
            'sinatra'
        ],
        confidence: 85
    },
    'Java': {
        patterns: [
            'java',
            'spring',
            'jsessionid',
            'servlet'
        ],
        confidence: 85
    },
    '.NET': {
        patterns: [
            'asp.net',
            'microsoft',
            'iis',
            'aspx'
        ],
        confidence: 80
    },

    // Databases
    'MySQL': {
        patterns: [
            'mysql',
            'mysqli',
            'mysql_',
            'mysqldump'
        ],
        confidence: 75
    },
    'PostgreSQL': {
        patterns: [
            'postgresql',
            'postgres'
        ],
        confidence: 70
    },
    'MongoDB': {
        patterns: [
            'mongodb',
            'mongo'
        ],
        confidence: 70
    },
    'Redis': {
        patterns: [
            'redis'
        ],
        confidence: 65
    },

    // Infrastructure & Hosting
    'Cloudflare': {
        patterns: [
            'cloudflare',
            '__cfduid',
            'cf-ray'
        ],
        confidence: 95
    },
    'AWS': {
        patterns: [
            'amazonaws',
            'aws',
            's3.amazonaws',
            'cloudfront'
        ],
        confidence: 90
    },
    'Google Cloud': {
        patterns: [
            'googleapis',
            'gstatic',
            'googleusercontent'
        ],
        confidence: 85
    },
    'Azure': {
        patterns: [
            'azure',
            'microsoft.com',
            'azurewebsites'
        ],
        confidence: 85
    },

    // Analytics & Tracking
    'Google Analytics': {
        patterns: [
            'google-analytics',
            'gtag',
            'ga(',
            'analytics.js'
        ],
        confidence: 95
    },
    'Facebook Pixel': {
        patterns: [
            'facebook',
            'fbq',
            'pixel'
        ],
        confidence: 90
    },
    'Hotjar': {
        patterns: [
            'hotjar',
            'hjsv'
        ],
        confidence: 85
    },
    
    // Additional Technologies
    'WordPress': {
        patterns: [
            'wordpress',
            'wp-content',
            'wp-includes',
            'wp-admin'
        ],
        confidence: 90
    },
    'Shopify': {
        patterns: [
            'shopify',
            'myshopify.com'
        ],
        confidence: 90
    },
    'WooCommerce': {
        patterns: [
            'woocommerce',
            'wc-'
        ],
        confidence: 85
    }
};

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'scanWebsite') {
        const technologies = scanWebsite();
        sendResponse({
            success: true,
            technologies: technologies
        });
    }
});

function scanWebsite() {
    const results = {
        frontend: [],
        backend: [],
        database: [],
        infrastructure: [],
        security: [],
        analytics: []
    };

    // Scan HTML content
    const htmlContent = document.documentElement.outerHTML.toLowerCase();
    const pageSource = document.documentElement.innerHTML.toLowerCase();
    
    // Scan for technologies
    Object.entries(TECHNOLOGY_PATTERNS).forEach(([techName, techInfo]) => {
        let detected = false;
        
        // Check HTML content
        techInfo.patterns.forEach(pattern => {
            if (htmlContent.includes(pattern.toLowerCase()) || pageSource.includes(pattern.toLowerCase())) {
                detected = true;
            }
        });
        
        // Check meta tags
        const metaTags = document.querySelectorAll('meta');
        metaTags.forEach(meta => {
            const content = meta.getAttribute('content') || '';
            const name = meta.getAttribute('name') || '';
            techInfo.patterns.forEach(pattern => {
                if (content.toLowerCase().includes(pattern.toLowerCase()) || 
                    name.toLowerCase().includes(pattern.toLowerCase())) {
                    detected = true;
                }
            });
        });
        
        // Check script tags
        const scripts = document.querySelectorAll('script');
        scripts.forEach(script => {
            const src = script.getAttribute('src') || '';
            techInfo.patterns.forEach(pattern => {
                if (src.toLowerCase().includes(pattern.toLowerCase())) {
                    detected = true;
                }
            });
        });
        
        if (detected) {
            const category = categorizeTechnology(techName);
            if (category && !results[category].find(t => t.name === techName)) {
                results[category].push({
                    name: techName,
                    confidence: techInfo.confidence
                });
            }
        }
    });
    
    // Additional detection methods
    detectAdditionalTechnologies(results);
    
    return results;
}

function categorizeTechnology(techName) {
    const frontendTechs = ['React', 'Vue.js', 'Angular', 'jQuery', 'Bootstrap', 'Tailwind CSS', 'Material-UI'];
    const backendTechs = ['PHP', 'Node.js', 'Python', 'Ruby', 'Java', '.NET', 'WordPress', 'Shopify', 'WooCommerce'];
    const databaseTechs = ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'];
    const infrastructureTechs = ['Cloudflare', 'AWS', 'Google Cloud', 'Azure'];
    const analyticsTechs = ['Google Analytics', 'Facebook Pixel', 'Hotjar'];
    
    if (frontendTechs.includes(techName)) return 'frontend';
    if (backendTechs.includes(techName)) return 'backend';
    if (databaseTechs.includes(techName)) return 'database';
    if (infrastructureTechs.includes(techName)) return 'infrastructure';
    if (analyticsTechs.includes(techName)) return 'analytics';
    
    return 'infrastructure'; // Default category
}

function detectAdditionalTechnologies(results) {
    // Detect server technology from headers (if available)
    const serverHeader = document.querySelector('meta[http-equiv="Server"]');
    if (serverHeader) {
        const server = serverHeader.getAttribute('content');
        if (server) {
            results.infrastructure.push({
                name: `Server: ${server}`,
                confidence: 90
            });
        }
    }
    
    // Detect CDN from common patterns
    const cdnPatterns = [
        { name: 'jsDelivr', pattern: 'cdn.jsdelivr.net' },
        { name: 'unpkg', pattern: 'unpkg.com' },
        { name: 'cdnjs', pattern: 'cdnjs.cloudflare.com' }
    ];
    
    cdnPatterns.forEach(cdn => {
        if (document.querySelector(`script[src*="${cdn.pattern}"]`)) {
            results.infrastructure.push({
                name: cdn.name,
                confidence: 85
            });
        }
    });
    
    // Detect security headers and features
    if (window.location.protocol === 'https:') {
        results.security.push({
            name: 'HTTPS/SSL',
            confidence: 100
        });
    }
}
