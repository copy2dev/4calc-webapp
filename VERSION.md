# 4Calc Version History

## v1.1.0 - Enhanced MRT Calculator (2025-07-05)

### ✨ New Features
- **Comprehensive MRT Station Database**: Complete Bangkok MRT system with 66+ stations
- **Multi-Line Support**: Blue Line (34 stations) and Purple Line (16 stations)
- **Advanced Fare Calculation**: Official MRT fare structure (₿16 base + ₿2 per station, max ₿42)
- **Peak Hour Adjustments**: Rush hour travel time calculations with 30% delay factor
- **Transfer Detection**: Automatic detection and handling of cross-line transfers
- **Station Code Display**: Official station codes (BL01, PP01, etc.) for easy identification
- **Line-Specific Organization**: Stations organized by MRT lines in dropdown menus

### 🔧 Technical Improvements
- **Real MRT Data Integration**: Based on actual MRTA system information
- **Enhanced Calculation Logic**: Proper distance and time calculations per official standards
- **Improved UI/UX**: Better station selection with grouped options and clear line identification
- **Bilingual Station Names**: Complete Thai and English station names for all stations

### 📋 Updated Calculator Features
1. **MRT Time Calculator** 🚇
   - 66+ stations across Blue and Purple lines
   - Accurate travel time calculation (2 min/station + 3 min wait time)
   - Real fare calculation based on MRTA pricing
   - Peak hour adjustments for rush hour travel
   - Transfer notifications for cross-line journeys
   - Station codes and line information display

---

## v1.0.0 - Initial Release (2024-07-05)

### ✨ Features
- **Multi-language Support**: Thai (default) and English language switching
- **Calculator Hub**: Centralized dashboard for all calculators
- **MRT Time Calculator**: Calculate travel time and fare between MRT stations in Bangkok
- **Search & Filter**: Search calculators by name/description and filter by categories
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with Tailwind CSS and Thai font support

### 🛠️ Technical Implementation
- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS with custom Thai font integration
- **Language System**: Client-side translation with localStorage persistence
- **Categories**: Transportation, Health, Finance, Utilities, Geography
- **Server**: Node.js simple HTTP server for development

### 📋 Available Calculators
1. **MRT Time Calculator** 🚇
   - Station-to-station travel time calculation
   - Fare estimation based on distance
   - Thai and English station names
   - Real-time calculation results

### 🎯 Browser Support
- Modern browsers (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)
- Mobile browsers (iOS Safari, Chrome Mobile, Samsung Internet)

### 📁 File Structure
```
4calc-webapp/
├── index.html              # Main application file
├── server.js               # Development server
├── test-preview.html       # Testing version
├── VERSION.md              # This file
├── CHANGELOG.md            # Detailed change log
└── deployment/             # Deployment configurations
```

### 🔧 Development Setup
```bash
cd 4calc-webapp
node server.js
# Access at http://localhost:3000
```

---

## Release Approval Status
- [ ] Code Review Completed
- [ ] Testing Completed
- [ ] Performance Testing Passed
- [ ] Security Review Passed
- [ ] Documentation Updated
- [ ] Ready for Production Deployment

**Approved by:** _[Pending]_  
**Approval Date:** _[Pending]_  
**Deployment Date:** _[Pending]_