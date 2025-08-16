# CodeLookup

A Chrome extension that scans websites to detect technologies, frameworks, databases, and infrastructure used to build them.

## Features

- **Technology Detection**: Automatically detects frontend frameworks, backend technologies, databases, and infrastructure
- **Real-time Scanning**: Scans the current active tab when the extension is opened
- **Modern UI**: Beautiful Tailwind CSS interface with dark theme
- **Comprehensive Analysis**: Covers React, Vue, Angular, PHP, Node.js, Python, AWS, Google Cloud, and more
- **Confidence Scoring**: Each detected technology includes a confidence percentage
- **Export Reports**: Save scan results for later analysis

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked" and select this folder
4. The extension should now appear in your extensions list

## Usage

1. **Navigate** to any website you want to analyze
2. **Click** the extension icon in your Chrome toolbar
3. **View** the current website URL in the popup
4. **Click** "Scan Website" to analyze the page
5. **Review** detected technologies organized by category
6. **Export** the scan report if needed

## What It Detects

### Frontend Technologies
- React, Vue.js, Angular, jQuery
- Bootstrap, Tailwind CSS, Material-UI
- CSS frameworks and UI libraries

### Backend Technologies  
- PHP, Node.js, Python, Ruby, Java, .NET
- Web frameworks and server technologies

### Databases
- MySQL, PostgreSQL, MongoDB, Redis
- Database connection patterns

### Infrastructure & Hosting
- AWS, Google Cloud, Azure, Cloudflare
- CDN services and hosting providers

### Analytics & Tracking
- Google Analytics, Facebook Pixel, Hotjar
- User tracking and analytics tools

## File Structure

```
├── manifest.json          # Extension configuration
├── popup.html            # Modern Tailwind CSS interface
├── popup.js              # Website scanning functionality
├── content.js            # Technology detection engine
├── background.js         # Background service worker
├── README.md             # This file
└── icons/                # Extension icons folder
    └── placeholder.txt   # Icon instructions
```

## Customization

- Modify `manifest.json` to change permissions and settings
- Update `popup.html` and `popup.css` for UI changes
- Add functionality in `popup.js`, `content.js`, or `background.js`
- Create icon files in the `icons/` folder (16x16, 48x48, 128x128 pixels)

## Development

- Make changes to the code
- Go to `chrome://extensions/`
- Click the refresh button on your extension
- Test the changes

## Permissions

Currently, this extension has no special permissions. Add permissions to `manifest.json` as needed for your specific functionality.

## Notes

- This extension uses Manifest V3 (the latest Chrome extension format)
- Content scripts run on all URLs by default (modify `matches` in manifest.json to restrict)
- The background script is a service worker that can be terminated by Chrome
