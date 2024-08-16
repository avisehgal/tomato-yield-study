import React, { useState } from 'react';
import RegionCard from './RegionCard';
import data from './data.json';
import heatStressData from './HeatStressTracking.json'; // Import Heat Stress Tracking data
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import WorldFlag from 'react-world-flags';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import HeatStressTracking from './HeatStressTracking'; // Import the HeatStressTracking component
import '@fontsource/source-sans-pro';

const countryFlags = {
  California: 'US', // US flag for California
  China: 'CN',
  Turkey: 'TR',
  Spain: 'ES'
};

function App() {
  const [selectedRegion, setSelectedRegion] = useState('California');
  const [heatOpen, setHeatOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setSelectedRegion(newValue);
  };

  const handleHeatOpen = () => {
    setHeatOpen(true);
  };

  const handleClose = () => {
    setHeatOpen(false);
  };

  const regionData = data.regions[selectedRegion];
  const selectedHeatStressData = heatStressData[selectedRegion]?.extreme_heat_days || null; // Get heat stress data for selected region

  return (
    <div style={{ 
      backgroundColor: '#1c1c1c', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      fontFamily: '"Source Sans Pro", sans-serif',
      margin: 0, 
      padding: 0,
      width: '100%',
      overflowX: 'hidden', // Prevent horizontal overflow
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
              fontFamily: '"Source Sans Pro", sans-serif',
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

      {/* Heat Stress Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        {selectedHeatStressData && (
          <Button variant="contained" color="primary" onClick={handleHeatOpen}>
            View Heat Stress Data
          </Button>
        )}
      </Box>

      {/* Heat Stress Dialog */}
      <Dialog open={heatOpen} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          <HeatStressTracking data={selectedHeatStressData} />
        </DialogContent>
      </Dialog>

      <Container 
        maxWidth="lg" 
        sx={{ 
          paddingTop: 4, 
          paddingBottom: 4,
          flexGrow: 1, // Allow the container to grow and shrink with the content
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)', // 1 column for extra small screens
            sm: 'repeat(2, 1fr)', // 2 columns for small screens
            md: 'repeat(3, 1fr)', // 3 columns for medium screens
            lg: 'repeat(4, 1fr)', // 4 columns for large screens
          },
          gap: 8,
          justifyItems: 'center',
          alignItems: 'center',
          padding: '10px', // Add padding for breathing space
        }}>
          {regionData ? (
            Object.entries(regionData).map(([factor, details]) => (
              <RegionCard 
                key={factor} 
                region={factor} 
                data={details} 
              />
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
