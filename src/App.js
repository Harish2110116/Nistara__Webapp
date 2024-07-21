import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import "./App.css";

import MainDash from "./components/MainDash/MainDash";
import RightSide from "./components/RightSide/RightSide";
import Sidebar from "./components/Sidebar";
import OrdersMainDash from "./components/Orders/OrdersMainDash";
import OrdersRightSide from "./components/Orders/OrdersRightSide";
import EarlyWarningsMainDash from "./components/EarlyWarnings/MainDash";
import GraphSection from './components/EarlyWarnings/GraphSection';
import AdminLogin from './components/AdminLogin';
import AdminSignup from './components/AdminSignup';
import ResourceCards from './components/Analytics/ResourceCards';
import BasicTable from './components/Analytics/AnalyticsTable';
import FundTransactionsTable from './components/Analytics/FundTransactionsTable';
import MapComponent from './components/Maps/MapComponent'; // Import the new MapComponent
import MyMapComponent from './components/Maps/MyMapComponent';
import { CurrentStock,resourcesData } from './Data/Data';
const earlyWarningData = [
  { 
    id: 1, 
    headline: 'Flood Alert', 
    content: 'Heavy rains expected causing potential flooding in low-lying areas.', 
    time: '2024-07-20T08:00:00Z', 
    category: 'Flood',
    profilePic: 'path/to/flood-profile-pic.jpg' // Add profile picture path
  },
  { 
    id: 2, 
    headline: 'Earthquake Alert', 
    content: 'Magnitude 6.0 earthquake detected. Be prepared for aftershocks.', 
    time: '2024-07-20T09:00:00Z', 
    category: 'Earthquake',
    profilePic: 'path/to/earthquake-profile-pic.jpg' // Add profile picture path
  },
  { 
    id: 3, 
    headline: 'Tsunami Alert', 
    content: 'Tsunami warning issued. Evacuate coastal areas immediately.', 
    time: '2024-07-20T10:00:00Z', 
    category: 'Tsunami',
    profilePic: 'path/to/tsunami-profile-pic.jpg' // Add profile picture path
  },
];

// Sample current stock data for each category
const currentStock = {
  'Emergency Lighting and Communication': [
    { resourceName: 'Flashlights', currentStock: 200, estimatedStock: 250 },
    { resourceName: 'Communication Radios', currentStock: 150, estimatedStock: 180 },
    { resourceName: 'Emergency Flares', currentStock: 100, estimatedStock: 120 },
    { resourceName: 'Batteries', currentStock: 500, estimatedStock: 600 },
    { resourceName: 'Portable Chargers', currentStock: 80, estimatedStock: 100 },
    { resourceName: 'Solar Lights', currentStock: 60, estimatedStock: 75 },
    { resourceName: 'Signal Mirrors', currentStock: 30, estimatedStock: 40 },
    { resourceName: 'Two-Way Radios', currentStock: 120, estimatedStock: 140 },
    { resourceName: 'Emergency Horns', currentStock: 70, estimatedStock: 90 },
    { resourceName: 'Rechargeable Lanterns', currentStock: 45, estimatedStock: 55 },
  ],
  'Health and Hygiene': [
    { resourceName: 'First Aid Kits', currentStock: 120, estimatedStock: 150 },
    { resourceName: 'Medical Supplies', currentStock: 80, estimatedStock: 100 },
    { resourceName: 'Sanitation Wipes', currentStock: 250, estimatedStock: 300 },
    { resourceName: 'Hand Sanitizer', currentStock: 200, estimatedStock: 250 },
    { resourceName: 'Face Masks', currentStock: 300, estimatedStock: 350 },
    { resourceName: 'Gloves', currentStock: 150, estimatedStock: 180 },
    { resourceName: 'Antiseptic Cream', currentStock: 90, estimatedStock: 110 },
    { resourceName: 'Thermometers', currentStock: 60, estimatedStock: 70 },
    { resourceName: 'Bandages', currentStock: 300, estimatedStock: 350 },
    { resourceName: 'Oxygen Masks', currentStock: 30, estimatedStock: 40 },
  ],
  'Tools and Equipment': [
    { resourceName: 'Shovels', currentStock: 100, estimatedStock: 120 },
    { resourceName: 'Axes', currentStock: 70, estimatedStock: 90 },
    { resourceName: 'Crowbars', currentStock: 50, estimatedStock: 60 },
    { resourceName: 'Portable Generators', currentStock: 40, estimatedStock: 50 },
    { resourceName: 'Saws', currentStock: 60, estimatedStock: 70 },
    { resourceName: 'Multi-Tools', currentStock: 90, estimatedStock: 110 },
    { resourceName: 'Emergency Ropes', currentStock: 80, estimatedStock: 100 },
    { resourceName: 'Toolkits', currentStock: 55, estimatedStock: 65 },
    { resourceName: 'Flashlights', currentStock: 200, estimatedStock: 240 },
    { resourceName: 'Battery Chargers', currentStock: 30, estimatedStock: 40 },
  ],
  'Personal Items': [
    { resourceName: 'Blankets', currentStock: 180, estimatedStock: 220 },
    { resourceName: 'Sleeping Bags', currentStock: 150, estimatedStock: 180 },
    { resourceName: 'Clothing Kits', currentStock: 80, estimatedStock: 100 },
    { resourceName: 'Personal Hygiene Kits', currentStock: 120, estimatedStock: 140 },
    { resourceName: 'Hand Warmers', currentStock: 50, estimatedStock: 60 },
    { resourceName: 'Portable Toilets', currentStock: 30, estimatedStock: 40 },
    { resourceName: 'Insect Repellents', currentStock: 70, estimatedStock: 85 },
    { resourceName: 'Rain Gear', currentStock: 100, estimatedStock: 120 },
    { resourceName: 'Sunscreen', currentStock: 90, estimatedStock: 110 },
    { resourceName: 'Travel Pillows', currentStock: 60, estimatedStock: 75 },
  ],
  'Clothing and Shelter': [
    { resourceName: 'Tents', currentStock: 70, estimatedStock: 90 },
    { resourceName: 'Tarps', currentStock: 50, estimatedStock: 60 },
    { resourceName: 'Raincoats', currentStock: 120, estimatedStock: 140 },
    { resourceName: 'Sleeping Bags', currentStock: 150, estimatedStock: 180 },
    { resourceName: 'Blankets', currentStock: 180, estimatedStock: 220 },
    { resourceName: 'Mattresses', currentStock: 60, estimatedStock: 75 },
    { resourceName: 'Cots', currentStock: 40, estimatedStock: 50 },
    { resourceName: 'Clothing Kits', currentStock: 80, estimatedStock: 100 },
    { resourceName: 'Heat Packs', currentStock: 90, estimatedStock: 110 },
    { resourceName: 'Solar Blankets', currentStock: 30, estimatedStock: 40 },
  ],
  'Safety and Protection': [
    { resourceName: 'Safety Helmets', currentStock: 250, estimatedStock: 300 },
    { resourceName: 'Gloves', currentStock: 150, estimatedStock: 180 },
    { resourceName: 'Protective Glasses', currentStock: 100, estimatedStock: 120 },
    { resourceName: 'Knee Pads', currentStock: 60, estimatedStock: 75 },
    { resourceName: 'Face Shields', currentStock: 90, estimatedStock: 110 },
    { resourceName: 'Safety Vests', currentStock: 80, estimatedStock: 100 },
    { resourceName: 'Ear Protection', currentStock: 70, estimatedStock: 85 },
    { resourceName: 'Fire Extinguishers', currentStock: 50, estimatedStock: 60 },
    { resourceName: 'First Aid Kits', currentStock: 120, estimatedStock: 150 },
    { resourceName: 'Emergency Whistles', currentStock: 40, estimatedStock: 50 },
  ],
};
// Sample fund transactions data
const fundTransactions = [
  { date: '2024-07-20', description: 'Donation from NGO A', amount: '$5,000' },
  { date: '2024-07-21', description: 'Government Grant', amount: '$10,000'},
  { date: '2024-07-22', description: 'Corporate Sponsorship', amount: '$7,500' },
  { date: '2024-07-23', description: 'Individual Contribution', amount: '$1,200' },
  // Add more transactions as needed
];


function App() {
  
  const orders = [
    { name: "Inflatable Rescue Boats", trackingId: 18908424, time: "12:30 PM", date: "2 March 2022", status: "Request" },
    { name: "Life Jackets and Personal Flotation Devices (PFDs)", trackingId: 18908424, time: "01:00 PM", date: "2 March 2022", status: "Pending" },
    { name: "Emergency Food and Water Supplies", trackingId: 18908424, time: "02:15 PM", date: "2 March 2022", status: "Approved" },
    { name: "First Aid Kits", trackingId: 18908421, time: "03:00 PM", date: "2 March 2022", status: "Delivered" },
    { name: "Safety Helmets", trackingId: 18908425, time: "04:30 PM", date: "2 March 2022", status: "Request" },
    { name: "Portable Generators", trackingId: 18908426, time: "05:45 PM", date: "2 March 2022", status: "Approved" },
    { name: "Water Purification Tablets", trackingId: 18908427, time: "06:00 PM", date: "2 March 2022", status: "Pending" },
    { name: "Tents and Shelter Kits", trackingId: 18908428, time: "07:15 PM", date: "2 March 2022", status: "Approved" },
    { name: "Communication Radios", trackingId: 18908429, time: "08:00 PM", date: "2 March 2022", status: "Delivered" },
    { name: "Flashlights and Batteries", trackingId: 18908430, time: "09:30 PM", date: "2 March 2022", status: "Request" },
    { name: "Medical Supplies", trackingId: 18908431, time: "10:45 PM", date: "2 March 2022", status: "Pending" },
    { name: "Blankets and Sleeping Bags", trackingId: 18908432, time: "11:00 PM", date: "2 March 2022", status: "Approved" },
    { name: "Food Rations", trackingId: 18908433, time: "12:15 AM", date: "3 March 2022", status: "Request" },
    { name: "Hygiene Kits", trackingId: 18908434, time: "01:30 AM", date: "3 March 2022", status: "Approved" },
    { name: "GPS Devices", trackingId: 18908435, time: "02:45 AM", date: "3 March 2022", status: "Pending" }
  ];
  const [selectedMenuItem, setSelectedMenuItem] = useState(0);
  const [selectedWarning, setSelectedWarning] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleMenuClick = (item) => {
    setSelectedMenuItem(item);
    setSelectedWarning(null); // Reset selected warning when menu changes
  };

  const handleCardClick = (category) => {
    setSelectedCategory(category);
  };

  const renderTableForCategory = (category) => {
    const categoryData = CurrentStock.find(item => item.category === category);
    return categoryData ? <BasicTable rows={categoryData.resources} /> : <p>No data available</p>;
  };

  return (
    <div className="App" style={{paddingRight:'0.5rem'}}>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/signup" element={<AdminSignup />} />
        <Route path="/dashboard" element={
          <div className="AppGlass">
            <Sidebar onMenuClick={handleMenuClick} />
            {selectedMenuItem === 0 && (
              <div style={{ display: 'flex', width: '100%' }}>
              <div style={{ width: '70%', padding: '1rem' }}>
                <MainDash />
              </div>
              <div style={{ width: '30%', padding: '1rem' }}>
                <RightSide />
              </div>
            </div>
            )}
            {selectedMenuItem === 1 && (
  <div style={{ display: 'flex', width: '100%' }}>
    <div style={{ width: '60%', padding: '1rem' }}>
      <OrdersMainDash orders={orders} />
    </div>
    <div style={{ width: '30%', padding: '1rem', paddingRight: '2rem', paddingBottom: '2rem' }}>
      <OrdersRightSide orders={orders} />
    </div>
  </div>
)}

            {selectedMenuItem === 2 && (
              <>
                <div style={{ display: 'flex', width: '100%' }}>
                  <EarlyWarningsMainDash 
                    earlyWarningData={earlyWarningData} 
                    setSelectedWarning={setSelectedWarning} 
                  />
                  <div style={{ width: '50%', padding: '1rem', overflow: 'auto', height: 'calc(100vh - 4rem)' }}>
                    {selectedWarning && (
                      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'auto' }}>
                        <GraphSection selectedWarning={selectedWarning} currentStock={currentStock} />
                      </div>
                    )}
                  </div>
                </div>
                {/* <MapComponent /> */}
              </>
            )}
            {selectedMenuItem === 3 && (
              <div style={{ display: 'flex', width: '100%' }}>
              <div style={{ width: '30%', padding: '1rem' }}>
                <ResourceCards onCardClick={handleCardClick} />
              </div>
              <div style={{ width: '30%', padding: '1rem' }}>
                {selectedCategory && renderTableForCategory(selectedCategory)}
              </div>
              <div style={{ width: '30%', padding: '1rem' }}>
                <FundTransactionsTable transactions={fundTransactions} />
              </div>
            </div>
             
            )}
            {selectedMenuItem === 4 && (
              <>
              
                {/* <MapComponent /> Render the MapComponent */}
                <MyMapComponent/>
                
              </>
            )}
            {selectedMenuItem === 5 && (
              <>
                <div style={{ padding: '1rem' }}>
                  
                </div>
              </>
            )}
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;