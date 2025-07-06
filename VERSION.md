# 4Calc Version History

## v1.4.1 - Solar Calculator Manual Input Enhancement (2025-07-06)

### 🔧 Manual Override Features *(New)*
- **Manual kWp Input**: Users can specify exact system capacity instead of auto-calculation from roof area
- **Manual Cost Input**: Users can enter actual installation quotes instead of market estimates
- **Flexible Calculation Modes**: Auto (roof area), Manual kWp, Manual cost, or Full manual modes
- **Visual Indicators**: Clear badges showing "Manual" vs "Auto" for capacity and cost calculations

### ☀️ Enhanced Solar Calculator
- **Smart Input Validation**: Only electricity usage required, roof area OR manual kWp accepted
- **Dual Mode Operation**: Auto-calculate from roof area OR use manual system specifications
- **Cost Flexibility**: Market-based estimates OR user-provided actual quotes
- **Real-world Compatibility**: Perfect for users with existing quotes or specific requirements

---

## v1.4.0 - Solar Rooftop Calculator (2025-07-06)

### ☀️ Major New Calculator
- **Solar Rooftop Calculator**: Comprehensive solar panel ROI and savings analysis system
- **Thailand-Specific Data**: Regional solar irradiance data for all 5 regions
- **MEA/PEA Electricity Rates**: Official 2024 tiered electricity pricing from both providers
- **Expandable Advanced Options**: Clean UI with collapsible sections for optional parameters

### 🔧 Advanced Solar Calculation Engine
- **Capacity Calculation**: Automatic kWp sizing based on roof area and panel type
- **Energy Production**: Daily/monthly/yearly production with performance ratio and loss factors
- **Financial Analysis**: 25-year ROI, payback period, and lifetime savings calculations
- **Net Metering Integration**: Grid export income and self-consumption optimization
- **Electricity Bill Analysis**: Accurate tiered rate calculations for MEA/PEA customers

### 🎨 Expandable UI Design
- **Core Inputs Only**: Simple roof area + electricity usage for basic calculation
- **⚙️ Advanced Options**: Expandable section with panel type, provider, performance settings
- **Smooth Animations**: CSS-based expand/collapse with rotate icons and transitions
- **No Company Recommendations**: Clean focus on calculations, prepared for future advertising

### 📊 Comprehensive Results Dashboard
- **System Configuration**: Capacity, usable area, panel type, efficiency display
- **Energy Production**: Daily/monthly/yearly kWh with solar irradiance data
- **Financial Analysis**: System cost, monthly/yearly savings, payback period, 25-year ROI
- **Energy Independence**: Self-sufficiency percentage with visual progress bar
- **Environmental Impact**: CO₂ reduction and trees equivalent calculations

### 🇹🇭 Thailand Market Data
- **5 Regional Solar Data**: Central (4.8), North (4.6), Northeast (5.1), South (4.4), East (4.9) kWh/m²/day
- **MEA Electricity Rates**: 7-tier structure with ฿38.22 base fee for Bangkok metro
- **PEA Electricity Rates**: 7-tier structure with ฿24.62 base fee for provinces
- **Solar Panel Types**: Monocrystalline (20%), Polycrystalline (17%), Thin Film (13%)
- **System Costs**: Tiered pricing ฿45k-35k per kWp based on system size

### 🧪 Testing Verified
- **Sample Calculation**: 50sqm roof + 300kWh usage = 8kWp system, ฿304k cost, 6.2yr payback
- **Advanced Options**: All expandable sections function with smooth animations
- **Multi-language**: Complete Thai/English switching for all solar terminology
- **Input Validation**: Comprehensive error handling for all edge cases

---

## v1.3.0 - Taxi Fare Calculator (2025-07-05)

### 🚕 Major New Calculator
- **Taxi Fare Calculator**: Complete Bangkok taxi fare calculation system
- **Official Rates**: Based on Ministry of Transport announcement (B.E. 2565/2023)
- **Dual Input System**: Distance (km) + Traffic waiting time (minutes)
- **Multiple Vehicle Types**: Regular (฿35 base) and Large (฿40 base) taxi support

### 📊 Advanced Calculation Algorithm
- **Tiered Distance Rates**: 6 different rate brackets (1km, 1-10km, 10-20km, 20-40km, 40-60km, 60-80km, 80km+)
- **Waiting Time Charges**: ฿3 per minute when speed < 6 km/hr
- **Additional Services**: App booking (+฿20) and Airport surcharge (+฿50)
- **Accurate Rate Structure**: Matches official government taxi meter rates

### 🎨 User Interface Features
- **Simple 2-Input Design**: Main focus on distance and traffic time
- **Service Options**: Checkboxes for additional services
- **Detailed Breakdown**: Shows base fare, distance fare, waiting fare, and extras separately
- **Legal Reference**: Notes official rate announcement date and authority
- **Responsive Layout**: Works seamlessly on all devices

### 🔧 Technical Architecture
- **Modular Design**: Created separate `taxi-calculator.js` file for reusability
- **Independent Functions**: Each calculation aspect separated for easy maintenance
- **Input Validation**: Comprehensive error checking and user feedback
- **Bilingual Support**: Full Thai/English interface and results

### 📋 Available Calculators (7 Total)
1. **MRT Time Calculator** 🚇
   - Complete 4-line Bangkok MRT system (109 stations)
   - Expandable route details with station-by-station breakdown
   - Travel time and fare calculations
   
2. **Taxi Fare Calculator** 🚕
   - Official Bangkok taxi rates
   - Distance + traffic time inputs
   - Detailed fare breakdown
   - Additional service charges

3. **Solar Rooftop Calculator** ☀️ *(New)*
   - Thailand-specific solar irradiance data (5 regions)
   - MEA/PEA electricity rate analysis
   - ROI and payback period calculations
   - Expandable advanced options
   
4. **Pregnancy Calculator** 🤱
   - LMP and conception date calculations
   - Trimester tracking and milestones
   - Due date predictions
   
5. **Interest Calculator** 💰
   - Simple, compound, savings, and loan calculations
   - Market rate comparisons
   - Detailed breakdown tables

6. **BTU Calculator** ❄️
   - Air conditioning sizing calculations
   - Room area and cooling requirements
   
7. **Distance Calculator** 📍
   - GPS and location search integration
   - Haversine distance calculations
   - Travel time estimates

### 🧪 Testing Verified
- **Sample Calculation**: 5km + 10min wait + app booking = ฿111
- **Rate Accuracy**: All 6 distance brackets tested
- **UI/UX Flow**: Complete user journey validation
- **Multi-language**: Thai/English switching functionality

---

## v1.2.0 - Expandable Route Details (2025-07-05)

### ✨ Major New Features
- **Expandable Route Details**: Click on station count to view detailed station-by-station breakdown
- **Interactive Station List**: Shows all stations along the route with travel times
- **Smooth Animations**: CSS-based expand/collapse with max-height transitions
- **Visual Enhancements**: Color-coded stations, toggle icons, and hover effects

### 🚇 MRT System Coverage
- **Complete 4-Line System**: Blue (38), Purple (16), Yellow (23), Pink (32) = 109 total stations
- **Real-Time Calculations**: 2 minutes per station + 3 minutes waiting time
- **Station Codes**: Official MRT station codes (BL01, PP01, YL01, PK01)
- **Bilingual Support**: Full Thai/English station names and interface

### 🎨 User Experience Improvements
- **Click-to-Expand**: Intuitive interaction for route details
- **Station Timing**: Shows +2 minutes travel time from previous station
- **Route Visualization**: Clear start/end markers and line colors
- **Responsive Design**: Works seamlessly on all devices

### 🔧 Technical Improvements
- **DOM Handling**: Fixed element recreation issues in innerHTML updates
- **Event Management**: Robust event listener handling for dynamic content
- **Error Handling**: User-friendly alerts and fallback behaviors
- **Performance**: Optimized height calculations and smooth animations

### 🧪 Tested Features
- Route calculation: Tha Phra → Sanam Chai (9 stations, 19 minutes)
- Expand/collapse functionality with rotation animations
- Multi-language support and station data accuracy
- Cross-line transfer detection and notifications

---

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