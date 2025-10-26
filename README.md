# UNF Career Hub V2

Enhanced career platform for University of North Florida students with location-aware features, Google Maps integration, and detailed opportunity pages.

## 🌟 New Features in V2

- **📍 Location Intelligence**: Distance calculation from UNF campus (1 UNF Drive, Jacksonville, FL 32224)
- **🗺️ Google Maps Integration**: Interactive maps showing opportunity locations and routes
- **📋 Detailed Opportunity Pages**: Comprehensive modal views with company info, requirements, and benefits  
- **🎯 Enhanced Filtering**: Filter by distance from UNF, location, type, and major
- **📊 Advanced Analytics**: Track opportunity views, map interactions, and user engagement
- **🚗 Travel Time Estimates**: Estimated drive times from UNF campus
- **📱 Mobile-Optimized**: Responsive design for all devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Maps API key
- Notion account and integration token (optional)

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd /Users/carlosdiazplaza/PrototypeV2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env .env.local
   # Edit .env.local with your actual values
   ```

4. Add your Google Maps API key to `index.html`:
   ```html
   <!-- Replace YOUR_API_KEY with your actual Google Maps API key -->
   <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMaps&libraries=geometry"></script>
   ```

5. Start the backend server:
   ```bash
   ./start-backend.sh
   # Or alternatively: npm start
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:3001
   ```

## 🏗️ Project Structure

```
PrototypeV2/
├── index.html              # Main HTML file with enhanced UI
├── styles.css              # Enhanced CSS with map and card animations
├── script.js               # JavaScript with location features and Google Maps
├── notion-config.js         # Enhanced Notion integration service
├── server.js               # Express server with additional API endpoints
├── package.json            # Project dependencies
├── .env                    # Environment variables (template)
├── start-backend.sh        # Startup script
└── README.md              # This file
```

## 📊 Key Features

### Location-Aware Opportunities

All opportunities include:
- Distance from UNF campus in miles
- Estimated travel time by car
- Real company addresses with coordinates
- Interactive Google Maps integration

### Enhanced Opportunity Cards

Each opportunity card displays:
- Company name and job title
- Distance badge showing miles from UNF
- Job type, salary, and posting date
- Skill tags and requirements
- "View Details" and "Apply" buttons

### Detailed Opportunity Modal

Clicking "View Details" opens a comprehensive modal with:
- Company information and industry
- Full job description and requirements
- Benefits and perks
- Interactive map with route from UNF
- Apply and share functionality

### Google Maps Integration

- **Full Map View**: Shows all opportunities on a campus-centered map
- **Individual Maps**: Route display from UNF to specific opportunity
- **Marker Categories**: Color-coded by job type (internship, entry-level, etc.)
- **Info Windows**: Quick opportunity details on marker click

### Advanced Filtering

Filter opportunities by:
- **Distance**: Within 5, 10, 25, or 50 miles of UNF
- **Location**: Near UNF, Jacksonville, Florida, Remote, Nationwide
- **Type**: Internship, Entry Level, Part Time, Full Time
- **Major**: Business, Engineering, Computer Science, etc.
- **Search**: Text search across titles, companies, and descriptions

## 🎯 Opportunity Data

The platform includes 15+ carefully curated opportunities featuring:

- Real Jacksonville companies (CSX, VyStar, UF Health, etc.)
- Accurate addresses and coordinates
- Varied distances from UNF (0.5 to 400+ miles)
- Multiple job types and majors
- Realistic salary ranges and requirements

## 🔧 API Endpoints

### Core Endpoints
- `GET /api/health` - Server health check
- `POST /api/job-application` - Submit job applications
- `POST /api/feedback` - Submit user feedback
- `POST /api/button-click` - Track button interactions
- `POST /api/page-view` - Track page views

### Enhanced Endpoints (V2)
- `POST /api/opportunity-view` - Track opportunity detail views
- `POST /api/map-interaction` - Track map interactions
- `GET /api/analytics` - Analytics dashboard data

## 📈 Analytics & Tracking

The platform tracks:
- **User Engagement**: Page views, button clicks, session duration
- **Opportunity Interest**: View counts, application rates, popular companies
- **Map Usage**: Marker clicks, zoom levels, route requests
- **Search Patterns**: Popular search terms and filter combinations
- **Location Preferences**: Distance-based filtering patterns

### Console Commands

Access analytics in the browser console:
```javascript
// View all collected data
exportDemoData()

// Get summary statistics  
getDataSummary()

// Get detailed analytics insights
getAnalyticsInsights()

// Clear all tracking data
clearDemoData()
```

## 🌍 Location Features

### UNF Campus Integration
- **Campus Location**: 1 UNF Drive, Jacksonville, FL 32224
- **Coordinates**: 30.2672°N, 81.5114°W
- **Campus Marker**: Special star icon on all maps
- **Distance Calculation**: Haversine formula for accurate distances

### Travel Time Estimation
- Based on average Jacksonville traffic patterns
- Assumes 35 mph average speed including traffic
- Displays in minutes for short trips, hours + minutes for longer trips

### Company Locations
All opportunities include real addresses:
- Downtown Jacksonville (multiple companies)
- Southside (Tech Solutions, Brooks Rehabilitation)
- Beaches area (NEFCU)
- Northside (Anheuser-Busch)
- Remote opportunities (various companies)

## 🛠️ Customization

### Adding New Opportunities

Edit the `enhancedOpportunities` array in `script.js`:

```javascript
{
    id: 16,
    title: "Your Job Title",
    company: "Company Name", 
    location: "Full Address, City, FL ZIP",
    coordinates: { lat: latitude, lng: longitude },
    type: "internship|entry-level|part-time|full-time",
    major: "business|computer-science|engineering|etc",
    description: "Job description...",
    tags: ["Skill1", "Skill2", "Skill3"],
    requirements: ["Requirement 1", "Requirement 2"],
    benefits: ["Benefit 1", "Benefit 2"],
    salary: "$XX-XX/hour or $XX,XXX/year",
    posted: "X days ago",
    url: "https://company.com/apply",
    companySize: "XX-XX employees", 
    companyIndustry: "Industry Type"
}
```

### Styling Customization

Key CSS classes for customization:
- `.opportunity-card` - Main opportunity cards
- `.distance-badge` - Distance display styling
- `.opportunity-modal` - Detail modal appearance
- `.map-legend` - Map legend styling
- Color variables in `:root` for theme changes

### Google Maps Customization

Modify map appearance in the `initMaps()` function:
- Map center and zoom levels
- Marker icons and colors
- Info window content
- Route display options

## 🔒 Privacy & Data

The platform respects user privacy:
- No personal data collection without explicit consent
- Analytics data is anonymized
- Local storage fallback when Notion is unavailable
- GDPR-compliant data handling

## 🤝 Contributing

To contribute to the project:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📧 Support

For questions or support:
- UNF Career Services: career.services@unf.edu
- Phone: (904) 620-2955
- Visit: UNF Career Services Office

## 📄 License

This project is for educational purposes and UNF student use.

---

**UNF Career Hub V2** - Connecting Ospreys with their future careers! 🦅