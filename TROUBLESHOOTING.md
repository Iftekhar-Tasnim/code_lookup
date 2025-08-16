# CodeLookup Extension Troubleshooting Guide

## 🚨 **If the UI is not working:**

### **Step 0: CSP Issues Fixed! ✅**
- **Content Security Policy violations have been resolved**
- **No more external script loading errors**
- **Extension now uses self-contained CSS and JavaScript**

### **Step 1: Check Console for Errors**
1. Right-click on the extension popup
2. Select "Inspect" or "Inspect Element"
3. Look at the Console tab for error messages
4. Check for any red error messages

### **Step 2: Verify Extension Loading**
1. Go to `chrome://extensions/`
2. Make sure CodeLookup is enabled
3. Check if there are any error messages
4. Try clicking the "Reload" button on the extension

### **Step 3: Test Basic Functionality**
1. The extension now has a **red "Test UI" button**
2. Click it to verify the basic UI works
3. You should see "UI test successful!" message
4. Test results should appear

### **Step 4: Check Permissions**
1. Go to `chrome://extensions/`
2. Click on CodeLookup extension
3. Click "Details"
4. Make sure these permissions are granted:
   - Access to tabs
   - Access to scripting
   - Access to active tab
   - Access to all websites

### **Step 5: Test on Different Websites**
1. Try on a simple website like `google.com`
2. Avoid Chrome system pages (`chrome://`, `chrome-extension://`)
3. Make sure the website is fully loaded

## 🔧 **Common Issues & Solutions:**

### **Issue: "Cannot access tabs"**
- **Solution**: Grant tab permissions when prompted

### **Issue: "Script injection failed"**
- **Solution**: Make sure you're on a regular website (not Chrome system page)

### **Issue: "No response from content script"**
- **Solution**: Wait for page to fully load, then try again

### **Issue: Extension icon not showing**
- **Solution**: Pin the extension to toolbar in `chrome://extensions/`

## 📝 **Debug Information:**

The extension now includes:
- Console logging for debugging
- Test UI button to verify functionality
- Better error messages
- Increased timeouts for script injection
- **Fixed CSP issues** - No more external script loading errors
- Custom CSS instead of Tailwind CDN

## 🆘 **Still Not Working?**

1. **Check the Console** for specific error messages
2. **Try the Test UI button** to isolate the issue
3. **Reload the extension** in `chrome://extensions/`
4. **Check if the website allows extensions** (some corporate sites block them)

## 📞 **What to Report:**

If you're still having issues, please share:
1. Console error messages
2. What happens when you click "Test UI"
3. What website you're trying to scan
4. Chrome version
5. Any error messages from `chrome://extensions/`
