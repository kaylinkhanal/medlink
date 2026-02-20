import React from 'react'

const Home = () => {
  return (
    <div>
      

      Features:

**User Registration & Account**
- [x] User Registration with Email & Phone
- [ ] Secure Login with JWT Tokens
- [ ] Email Verification

**User Roles & Permissions**
- [ ] Role-based Access Control
  - Normal User
  - Admin

**Profile Management**
- [ ] Update Profile Information
- [ ] Avatar/Profile Picture Upload
- [ ] Bio & Description
- [ ] Location Settings
- [ ] Emergency Contacts

**Privacy & Settings**

- [ ] Notification Preferences (Email, Push, SMS)
- [ ] Emergency Alert Radius Settings

**Emergency Categories**
- [ ] 🩸 Blood Donation
- [ ] 🚑 Ambulance Request
- [ ] ❤️ Organ Donor Needed
- [ ] 🛏️ ICU Bed Availability
- [ ] 💰 Emergency Funding
- [ ] 🏥 General Medical Emergency

**Map Integration**
- [ ] Google Maps API Integration
- [ ] Interactive Emergency Map
- [ ] Map Expand/Collapse Functionality
- [ ] Custom Map Styling

**Location Features**
- [ ] Live User Location Tracking
- [ ] Auto-detect Current Location
- [ ] Manual Location Selection
- [ ] Location Permission Handling
- [ ] Fallback for Denied Permissions

**Emergency Visualization**
- [ ] Nearby Emergencies Display on Map
- [ ] Distance Calculation (Haversine Formula)
- [ ] Color-coded Emergency Markers
  - 🔴 Blood (Red)
  - 🟠 Ambulance (Orange)
  - 🔵 ICU/Organ (Blue)
  - 🟢 Funding (Green)
- [ ] Map Clustering for Multiple Emergencies
- [ ] Click Marker to View Emergency Details

**Navigation**
- [ ] Navigation to Hospital
- [ ] Estimated Time of Arrival (ETA)
- [ ] Turn-by-turn Directions Support

    </div>
  )
}

export default Home