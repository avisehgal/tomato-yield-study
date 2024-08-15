import React, { useState } from 'react';
import RegionCard from './RegionCard';
import data from './data.json';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import WorldFlag from 'react-world-flags';

const countryFlags = {
  California: 'US', // US flag for California
  China: 'CN',
  Turkey: 'TR',
  Spain: 'ES'
};

function App() {
  const [selectedRegion, setSelectedRegion] = useState('California');

  const handleTabChange = (event, newValue) => {
    setSelectedRegion(newValue);
  };

  const regionData = data.regions[selectedRegion];

  return (
    <div style={{ 
      backgroundColor: '#1c1c1c', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      fontFamily: '"Poppins", sans-serif',
      margin: 0, 
      padding: 0,
      width: '100%',
      overflowX: 'hidden'
    }}>
      <AppBar 
        position="static" 
        style={{ 
          background: 'linear-gradient(90deg, #1e3c72 0%, #2a5298 50%, #1e3c72 100%)', 
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)' 
        }}
      >
        <Toolbar>
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontFamily: '"Roboto", sans-serif', 
            fontWeight: 'bold',
            textAlign: 'center'  // Center align the text
          }}
        >
          Climate Impact Dashboard
        </Typography>

        </Toolbar>
        <Tabs
          value={selectedRegion}
          onChange={handleTabChange}
          centered
          indicatorColor="secondary"
          textColor="inherit"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
        >
          {Object.keys(data.regions).map((region) => (
            <Tab
              key={region}
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <WorldFlag code={countryFlags[region]} height="16" style={{ marginRight: '8px' }} />
                  {region}
                </div>
              }
              value={region}
              style={{ color: '#ffffff', fontWeight: 'bold', fontFamily: '"Roboto", sans-serif' }}
            />
          ))}
        </Tabs>
      </AppBar>

      <Container maxWidth="lg" sx={{ paddingTop: 4, paddingBottom: 4 }}>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', // 3 columns
          gridTemplateRows: 'repeat(5, 1fr)', // 5 rows
          gap: 4,
          justifyItems: 'center',
          alignItems: 'center',
          padding: '10px', // Add padding for breathing space
        }}>
          {regionData ? (
            Object.entries(regionData).map(([factor, details]) => (
              <RegionCard key={factor} region={factor} data={details} />
            ))
          ) : (
            <Typography variant="h6" style={{ color: '#333333', textAlign: 'center' }}>
              No data available for the selected region.
            </Typography>
          )}
        </Box>
      </Container>
    </div>
  );
}

export default App;
