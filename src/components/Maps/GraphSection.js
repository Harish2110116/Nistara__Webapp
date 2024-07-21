import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

const GraphSection = ({ selectedWarning, currentStock }) => {
  if (!selectedWarning) return <p>Select a warning to view graphs</p>;

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

  return (
    <div className="graph-section" style={{ paddingRight: '20px' }}>
      <h2>{selectedWarning.headline} - Resource Comparison</h2>
      {categories.map((category, index) => {
        const data = currentStock[category] || [];
        
        return (
          <div key={category} className="category-chart">
            <h3>{category}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="resourceName" />
                <YAxis />
                <Tooltip />
                <Legend />
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
