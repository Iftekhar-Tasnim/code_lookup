# My Chrome Extension

A Chrome extension plugin with a modern UI and basic functionality.

## Features

- Popup interface with modern design
- Content script integration
- Background service worker
- Message passing between components

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked" and select this folder
4. The extension should now appear in your extensions list

## Usage

1. Click the extension icon in your Chrome toolbar
2. Use the popup interface to interact with the extension
3. The extension will run content scripts on web pages
4. Check the browser console for debug information

## File Structure

```
├── manifest.json          # Extension configuration
├── popup.html            # Popup interface HTML
├── popup.css             # Popup styling
├── popup.js              # Popup functionality
├── content.js            # Content script for web pages
├── background.js         # Background service worker
├── icons/                # Extension icons (create this folder)
└── README.md             # This file
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
