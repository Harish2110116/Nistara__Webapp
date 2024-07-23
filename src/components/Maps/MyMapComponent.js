import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ReactBingmaps } from 'react-bingmaps';
import GraphSection from './GraphSection'; // Import the GraphSection component
import './WarningsAlertsScreen.css'; // Import your CSS file

const WarningsAlertsScreen = () => {
  const [alerts, setAlerts] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [msg, setMsg] = useState('');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [currentStock, setCurrentStock] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch alerts on component mount
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get('/cap_public_website/FetchAllAlertDetails');
        setAlerts(response.data);
      } catch (error) {
        setMsg('Error fetching alerts');
        console.error('Error fetching alerts:', error);
      }
    };

    fetchAlerts();
  }, []);

  // Fetch user location on component mount and every 5 minutes
  useEffect(() => {
    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setMsg('Error fetching user location');
          console.error('Error fetching user location:', error);
        }
      );
    };

    fetchLocation();
    const intervalId = setInterval(fetchLocation, 300000); // Fetch location every 5 minutes

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  // Fetch current stock data when selectedAlert changes
  useEffect(() => {
    if (selectedAlert) {
      const fetchCurrentStock = async () => {
        setLoading(true); // Start loading
        setCurrentStock({}); // Clear the current stock data
        
        try {
          const input_data = {
            severity: selectedAlert.severity || 'likely', // Default severity level
            identifier: selectedAlert.identifier,
            effective_start_time: selectedAlert.effective_start_time,
            effective_end_time: selectedAlert.effective_end_time,
            disaster_type: selectedAlert.disaster_type === 'flood' ? 'flood' : 'flood', // Default to flood if not specified
            area_description: selectedAlert.area_description,
            severity_level: selectedAlert.severity_level || 'likely', // Default severity level
            type: selectedAlert.type,
            actual_lang: selectedAlert.actual_lang,
            warning_message: selectedAlert.warning_message,
            disseminated: selectedAlert.disseminated,
            severity_color: selectedAlert.severity_color,
            alert_id_sdma_autoinc: selectedAlert.alert_id_sdma_autoinc,
            centroid: selectedAlert.centroid,
            alert_source: selectedAlert.alert_source,
            area_covered: selectedAlert.area_covered,
            sender_org_id: selectedAlert.sender_org_id,
          };
  
          console.log('Sending request for current stock data...'); // Log request
          const response = await axios.post('https://6c3f-34-168-116-149.ngrok-free.app/predict', input_data); // Use ngrok URL
          setCurrentStock(response.data);
          setLoading(false); // Stop loading
        } catch (error) {
          setMsg('Error fetching current stock data');
          console.error('Error fetching current stock data:', error);
          setLoading(false); // Stop loading
        }
      };
  
      fetchCurrentStock();
    }
  }, [selectedAlert]); // Dependency array ensures this runs whenever selectedAlert changes

  // Create infoboxes with pushpins
  const getInfoboxesWithPushPins = () => {
    return alerts.map(alert => {
      const [longitude, latitude] = alert.centroid.split(',').map(coord => parseFloat(coord));
      let color;
      if (alert.disaster_type.toLowerCase() === 'flood') {
        color = 'blue';
      } else if (alert.disaster_type.toLowerCase() === 'earthquake') {
        color = 'red';
      } else {
        color = alert.severity_color; // Default color for other disaster types
      }
      return {
        location: [latitude, longitude],
        addHandler: 'click',
        infoboxOption: { 
          title: alert.disaster_type, 
          description: `
            <div class="infobox-content">
              <h2>${alert.disaster_type}</h2>
              <p><strong>Disaster Type:</strong> ${alert.disaster_type}</p>
              <p><strong>Severity:</strong> ${alert.severity}</p>
              <p><strong>Severity Level:</strong> ${alert.severity_level}</p>
              <p><strong>Effective Time:</strong> ${alert.effective_start_time} - ${alert.effective_end_time}</p>
              <p><strong>Area Description:</strong> ${alert.area_description}</p>
              <p><strong>Warning Message:</strong> ${alert.warning_message}</p>
              <p><strong>Alert Source:</strong> ${alert.alert_source}</p>
              <p><strong>Area Covered:</strong> ${alert.area_covered} sq.km</p>
              <p><strong>Centroid:</strong> ${alert.centroid}</p>
            </div>
          ` 
        },
        pushPinOption: { 
          color: color 
        },
        infoboxAddHandler: { 
          type: 'click', 
          callback: () => setSelectedAlert(alert) // Set the selected alert when pushpin is clicked
        }
      };
    });
  };

  // Styles for layout
  const containerStyle = {
    display: 'flex',
    height: '90vh', // Full viewport height
    overflow: 'hidden', // Hide overflow on this container
  };

  const mapSectionStyle = {
    height: '85%',
    flex: 1, // Take up half of the container width
    overflow: 'hidden', // Ensure no overflow within the map container
  };

  const graphSectionStyle = {
    flex: 1, // Take up the remaining half of the container width
    height: '90%',
    // padding: '20px', // Add padding for better view
    boxSizing: 'border-box', // Include padding in the element's total width and height
    overflowY: 'auto', // Enables vertical scrolling
  };

  return (
    <div>
      <h1>Warnings and Alerts</h1>
      {msg && <p>{msg}</p>}
      <div className="map-container" style={containerStyle}>
        {userLocation && (
          <>
            <div style={mapSectionStyle}>
              <ReactBingmaps
                bingmapKey="AnK1IGWE20I4jxXYE6lqu5sPHf9rQR5OEBs1vyrXBt6LGy4HpbAHqc0kGvq1pFpf"
                center={[userLocation.latitude, userLocation.longitude]}
                zoom={10}
                mapTypeId={"aerial"}
                infoboxesWithPushPins={getInfoboxesWithPushPins()}
              />
            </div>
            <div className="graph-section-container" style={graphSectionStyle}>
              {loading ? <p>Loading data, please wait...</p> : <GraphSection selectedWarning={selectedAlert} currentStock={currentStock} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WarningsAlertsScreen;
