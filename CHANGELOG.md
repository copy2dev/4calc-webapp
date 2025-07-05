# Changelog

All notable changes to 4Calc will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Planned Features
- Taxi Fare Calculator
- Pregnancy Calculator
- Interest Calculator (Simple & Compound)
- BTU Calculator
- Distance Calculator
- User Account System
- Calculator History
- Favorite Calculators
- Export Results to PDF/Excel

---

## [1.1.0] - 2025-07-05

### Added
- **🚇 Enhanced MRT Calculator**
  - Complete Bangkok MRT station database (66+ stations)
  - Blue Line: 34 stations from Lak Song (BL01) to Krung Thon Buri (BL34)
  - Purple Line: 16 stations from Khlong Bang Phai (PP01) to Tao Pun (PP16)
  - Official MRT fare calculation (₿16 base + ₿2 per station, max ₿42)
  - Peak hour travel time adjustments (+30% during rush hours)
  - Transfer detection between different MRT lines
  - Station code display (BL01, PP01, etc.) for easy identification

- **🏗️ Data Infrastructure**
  - Comprehensive MRT station data integration
  - Bilingual station names (Thai and English)
  - Line-specific organization and color coding
  - Interchange station mapping
  - Official MRTA distance and time calculations

### Changed
- **🎨 User Interface Improvements**
  - Station dropdown now organized by MRT lines
  - Added optgroup labels for Blue Line and Purple Line
  - Enhanced result display with station codes and line information
  - Added peak hour checkbox for rush hour calculations
  - Improved transfer notifications for cross-line journeys

- **⚡ Calculation Engine**
  - Updated from basic estimation to official MRT calculations
  - Real-time fare calculation based on MRTA pricing structure
  - Enhanced travel time calculation with proper wait times
  - Cross-line transfer handling with estimated times

### Technical Details
- **Data Source**: Based on official MRTA Bangkok MRT system information
- **Calculation Accuracy**: Uses real MRT fare structure and timing
- **Performance**: Optimized station lookup and calculation algorithms
- **Compatibility**: Maintains backward compatibility with existing functionality

---

## [1.0.0] - 2024-07-05

### Added
- **🌐 Multi-language System**
  - Thai language as default
  - English language support
  - Language switcher in header
  - Persistent language preference in localStorage
  - Thai font support (Noto Sans Thai)

- **🧮 Core Calculator System**
  - Calculator hub dashboard
  - Category-based organization
  - Search functionality with real-time filtering
  - Responsive grid layout
  - Modal-based calculator interface

- **🚇 MRT Time Calculator**
  - Bangkok MRT station database
  - Travel time calculation (2 minutes per station + 3 minutes waiting)
  - Fare calculation (15 THB base + 2 THB per station)
  - Thai station names with English fallback
  - Results display with summary, time, distance, and fare

- **🎨 User Interface**
  - Modern, clean design with Tailwind CSS
  - Responsive layout (mobile-first approach)
  - Interactive elements with hover effects
  - Professional color scheme (blue primary)
  - Thai typography support

- **🏗️ Technical Infrastructure**
  - Pure HTML/CSS/JavaScript implementation
  - Node.js development server
  - Modular component structure
  - Client-side state management
  - Cross-browser compatibility

### Technical Details
- **Languages**: HTML5, CSS3, JavaScript ES6+
- **Frameworks**: Tailwind CSS, Google Fonts
- **Server**: Node.js HTTP server
- **Storage**: localStorage for preferences
- **Performance**: < 2MB total size, < 1s load time

### Browser Support
- Chrome 80+ ✅
- Firefox 75+ ✅
- Safari 13+ ✅
- Edge 80+ ✅
- Mobile browsers ✅

### Security
- No external API dependencies
- Client-side only calculations
- No user data collection
- HTTPS ready

---

## Version Guidelines

### Version Numbering
- **Major version (X.0.0)**: Breaking changes, major new features
- **Minor version (X.Y.0)**: New features, backwards compatible
- **Patch version (X.Y.Z)**: Bug fixes, minor improvements

### Release Process
1. **Development**: Feature development and testing
2. **Code Review**: Peer review of all changes
3. **Testing**: Comprehensive testing across browsers/devices
4. **Documentation**: Update VERSION.md and CHANGELOG.md
5. **Approval**: Stakeholder approval for release
6. **Deployment**: Production deployment
7. **Monitoring**: Post-deployment monitoring

### Change Categories
- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Now removed features
- **Fixed**: Bug fixes
- **Security**: Security improvements