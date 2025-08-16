# 🔍 CodeLookup - Smart Technology Detection Extension

A powerful Chrome extension that automatically detects and analyzes the technologies used to build any website. Get instant insights into frontend frameworks, backend technologies, databases, infrastructure, and more!

## ✨ **Features**

### 🎯 **Core Functionality**
- **Real-time Technology Detection** - Scan any website instantly
- **Comprehensive Analysis** - Detects 30+ technologies across 6 categories
- **Confidence Scoring** - Each detection includes confidence percentage
- **Smart Pattern Matching** - Advanced algorithms for accurate detection

### 🎨 **Modern User Interface**
- **Glassmorphism Design** - Beautiful, modern UI with backdrop blur effects
- **Responsive Layout** - Optimized for 380px popup width
- **Smooth Animations** - Hover effects, loading states, and transitions
- **Dark Theme** - Professional gradient backgrounds and modern typography

### 📊 **Technology Categories**
- **Frontend**: React, Vue.js, Angular, jQuery, Bootstrap, Tailwind CSS, Material-UI
- **Backend**: PHP, Node.js, Python, Ruby, Java, .NET, WordPress, Shopify, WooCommerce
- **Database**: MySQL, PostgreSQL, MongoDB, Redis
- **Infrastructure**: Cloudflare, AWS, Google Cloud, Azure
- **Security**: HTTPS/SSL, security headers
- **Analytics**: Google Analytics, Facebook Pixel, Hotjar

### 📄 **Export & Reporting**
- **Text Document Export** - Generate professional .txt reports
- **Formatted Output** - Clean, readable reports with categories and confidence scores
- **Automatic Naming** - Files named with date and timestamp
- **Instant Download** - One-click export functionality

## 🚀 **Installation**

### **Method 1: Load Unpacked (Development)**
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the `Code_lookup` folder
6. Pin the extension to your toolbar

### **Method 2: Chrome Web Store (Coming Soon)**
- Extension will be available on Chrome Web Store for easy installation

## 📖 **Usage**

### **Basic Scanning**
1. **Navigate** to any website you want to analyze
2. **Click** the CodeLookup extension icon in your toolbar
3. **Click** "🔍 Scan Website" button
4. **Wait** for the scan to complete (usually 2-5 seconds)
5. **Review** detected technologies organized by category

### **Exporting Reports**
1. **Complete a scan** to gather technology data
2. **Click** "📄 Export Text Report" button
3. **Download** the automatically generated .txt file
4. **Share** or save the report for future reference

### **Testing & Demo**
- Use the "🧪 Test UI & Demo" button to see sample results
- Perfect for testing the export functionality
- Demonstrates the UI capabilities

## 🛠 **Technical Details**

### **Architecture**
- **Manifest V3** - Latest Chrome extension standard
- **Content Scripts** - Injected into web pages for analysis
- **Background Service Worker** - Handles extension lifecycle
- **Dynamic Script Injection** - Ensures compatibility across all websites

### **Permissions Required**
- `tabs` - Access to current tab information
- `scripting` - Inject content scripts for analysis
- `activeTab` - Access to active tab content
- `host_permissions` - Scan any website

### **Technology Detection Methods**
- **HTML Content Analysis** - Pattern matching in page source
- **Meta Tag Scanning** - Check meta tags for technology hints
- **Script Source Analysis** - Analyze external script URLs
- **Header Detection** - Server and security header analysis
- **CDN Pattern Recognition** - Identify content delivery networks

## 📁 **File Structure**

```
Code_lookup/
├── manifest.json          # Extension configuration & permissions
├── popup.html            # Main popup interface
├── popup.css             # Modern UI styles with glassmorphism
├── popup.js              # Popup logic & user interactions
├── content.js            # Technology detection engine
├── background.js         # Background service worker
├── icons/                # Extension icons
│   └── logo (2).png     # Main extension logo
├── README.md             # This documentation
├── TROUBLESHOOTING.md    # Debug & fix guide
└── UI_FIX.md            # UI troubleshooting guide
```

## 🎨 **UI Features**

### **Design Elements**
- **Gradient Backgrounds** - Deep space theme with purple/blue gradients
- **Glassmorphism Cards** - Semi-transparent elements with backdrop blur
- **Animated Elements** - Shimmer effects, rotating logos, pulse animations
- **Modern Typography** - Inter font family with proper hierarchy
- **Responsive Layout** - Adapts to different screen sizes

### **Interactive Elements**
- **Hover Effects** - Cards lift and glow on hover
- **Loading States** - Spinner animations during scans
- **Status Updates** - Real-time feedback with emojis
- **Smooth Transitions** - 300ms ease transitions throughout

## 🔧 **Troubleshooting**

### **Common Issues**
- **UI not loading** - Reload extension in `chrome://extensions/`
- **Scan fails** - Ensure you're on a regular website (not Chrome system page)
- **No results** - Wait for page to fully load before scanning
- **Export fails** - Complete a scan first to generate data

### **Getting Help**
1. Check the **TROUBLESHOOTING.md** file
2. Right-click popup → Inspect → Console for error messages
3. Verify all files are present in the extension folder
4. Try reloading the extension

## 🚀 **Performance**

### **Optimizations**
- **Efficient Pattern Matching** - Fast technology detection algorithms
- **Minimal Resource Usage** - Lightweight content script injection
- **Smart Caching** - Results stored for quick export
- **Background Processing** - Non-blocking UI during scans

### **Scan Speed**
- **Typical websites**: 2-5 seconds
- **Complex applications**: 5-10 seconds
- **Large pages**: 10-15 seconds
- **Real-time feedback** throughout the process

## 🔮 **Future Features**

### **Planned Enhancements**
- **PDF Export** - Professional PDF reports
- **Technology Database** - Detailed information about detected technologies
- **Scan History** - Save and compare multiple scans
- **API Integration** - Connect with external technology databases
- **Custom Patterns** - User-defined detection rules

### **Platform Expansion**
- **Firefox Extension** - Cross-browser compatibility
- **Edge Extension** - Microsoft Edge support
- **Mobile App** - iOS/Android companion app

## 🤝 **Contributing**

### **Development Setup**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### **Code Standards**
- **ES6+ JavaScript** - Modern JavaScript features
- **CSS3** - Advanced CSS with fallbacks
- **HTML5** - Semantic markup
- **Chrome Extension Best Practices** - Follow official guidelines

## 📄 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 **Acknowledgments**

- **Chrome Extension APIs** - For the powerful extension framework
- **Modern CSS Techniques** - For the beautiful glassmorphism design
- **Technology Detection Patterns** - Based on industry best practices
- **Open Source Community** - For inspiration and feedback

## 📞 **Support**

### **Getting Help**
- **GitHub Issues** - Report bugs or request features
- **Documentation** - Check troubleshooting guides first
- **Community** - Join discussions and share experiences

### **Feature Requests**
- **GitHub Discussions** - Suggest new features
- **Issue Tracker** - Report bugs or problems
- **Pull Requests** - Contribute code improvements

---

**Made with ❤️ for developers, security researchers, and technology enthusiasts**

*Scan smarter, understand deeper, build better.*
