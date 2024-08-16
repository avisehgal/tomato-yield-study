import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '@fontsource/source-sans-pro';

const HeatStressTracking = () => {
  // Static data for testing purposes
  const staticData = [
    { year: "2010", value: 5 },
    { year: "2015", value: 10 },
    { year: "2020", value: 15 },
    { year: "2023", value: 20 },
    { year: "2025", value: 25 },
    { year: "2030", value: 30 },
    { year: "2040", value: 35 }
  ];

  return (
    <Box sx={{ padding: 4, backgroundColor: '#1c1c1c', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)' }}>
      <Typography variant="h5" sx={{ color: '#ffffff', fontFamily: '"Source Sans Pro", sans-serif', fontWeight: 'bold', marginBottom: 2 }}>
        Heat Stress Tracking
      </Typography>
      <div style={{ width: '100%', height: '400px' }}>
        <LineChart width={600} height={400} data={staticData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#FF7043" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
    </Box>
  );
};

export default HeatStressTracking;
