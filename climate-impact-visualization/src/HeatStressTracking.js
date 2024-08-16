import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '@fontsource/source-sans-pro';

const HeatStressTracking = ({ data }) => {
  if (!data || !data.historical_data || !data.projections) {
    return (
      <Box sx={{ padding: 4, backgroundColor: '#1c1c1c', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)' }}>
        <Typography variant="h5" sx={{ color: '#ffffff', fontFamily: '"Source Sans Pro", sans-serif', fontWeight: 'bold', marginBottom: 2 }}>
          No Data Available
        </Typography>
      </Box>
    );
  }

  const combinedData = [
    ...Object.keys(data.historical_data).map(year => ({
      year,
      value: data.historical_data[year],
    })),
    ...Object.keys(data.projections).map(year => ({
      year,
      value: data.projections[year],
    })),
  ];

  return (
    <Box sx={{ padding: 4, backgroundColor: '#1c1c1c', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)' }}>
      <Typography variant="h5" sx={{ color: '#ffffff', fontFamily: '"Source Sans Pro", sans-serif', fontWeight: 'bold', marginBottom: 2 }}>
        Heat Stress Tracking
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={combinedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#FF7043" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default HeatStressTracking;
