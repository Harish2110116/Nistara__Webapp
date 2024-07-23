import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const trimLabel = (label) => {
  // Trim the label to a maximum length of 10 characters
  return label.length > 10 ? `${label.substring(0, 10)}...` : label;
};

const GraphSection = ({ selectedWarning, currentStock }) => {
  if (!selectedWarning) return <p>Select a warning to view Resource Estimation</p>;

  if (!currentStock || Object.keys(currentStock).length === 0) {
    return <p>Loading data, please wait...</p>;
  }

  const categories = [
    'Emergency Lighting and Communication',
    'Health and Hygiene',
    'Tools and Equipment',
    'Personal Items',
    'Clothing and Shelter',
    'Safety and Protection'
  ];

  const colors = [
    '#8884d8', // Purple
    '#82ca9d', // Green
    '#ffc658', // Yellow
    '#ff7300', // Orange
    '#d88c7e', // Pink
    '#6a4f9b'  // Blue
  ];

  // Calculate the estimated population
  const estimatedPopulation = selectedWarning.area_covered ? selectedWarning.area_covered * 1000 : 'N/A';

  return (
    <div className="graph-section" style={{ paddingRight: '20px' }}>
      <h2>{selectedWarning.headline} - Resource Estimation</h2>
      {/* Display area covered and estimated population */}
      <div className="area-population-details">
        <p><strong>Area Covered:</strong> {selectedWarning.area_covered ? `${selectedWarning.area_covered} sq.km` : 'N/A'}</p>
        <p><strong>Estimated Population:</strong> {estimatedPopulation}</p>
      </div>
      {categories.map((category, index) => {
        const data = currentStock[category] || [];
        
        return (
            
          <div key={category} className="category-chart" style={{ marginBottom: '20px' }}>
            <h3>{category}</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="resourceName" 
                  angle={-45} 
                  textAnchor="end" 
                  interval={0} 
                  height={100} 
                  tickFormatter={trimLabel} // Use the trimLabel function
                  label={{ value: 'Resources', position: 'insideBottom', offset: -3 }}
                />
                <YAxis label={{ value: 'Quantity', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar 
                  dataKey="estimatedStock" 
                  fill={colors[index % colors.length]} 
                  name="Estimated Stock" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      })}
      
    </div>
  );
};

export default GraphSection;
