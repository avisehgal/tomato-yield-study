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

function App() {
  const [selectedRegion, setSelectedRegion] = useState('California');

  const handleTabChange = (event, newValue) => {
    setSelectedRegion(newValue);
  };

  const regionData = data.regions[selectedRegion];

  return (
    <div style={{ backgroundColor: '#2F4F4F', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" style={{ backgroundColor: '#3f51b5' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Climate Impact Dashboard
          </Typography>
        </Toolbar>
        <Tabs
          value={selectedRegion}
          onChange={handleTabChange}
          centered
          indicatorColor="secondary"
          textColor="inherit"
          style={{ backgroundColor: '#3949ab' }}
        >
          {Object.keys(data.regions).map((region) => (
            <Tab
              key={region}
              label={region}
              value={region}
              style={{ color: '#ffffff', fontWeight: 'bold' }}
            />
          ))}
        </Tabs>
      </AppBar>

      <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', // 4 columns
          gridTemplateRows: 'repeat(5, 1fr)', // 5 rows
          gap: 2,
          justifyItems: 'center',
          alignItems: 'center',
          height: '100vh',
          maxHeight: '80vh', // Adjust the height to fit within the viewport
        }}>
          {regionData ? (
            Object.entries(regionData).map(([factor, details]) => (
              <RegionCard key={factor} region={factor} data={details} />
            ))
          ) : (
            <Typography variant="h6" style={{ color: '#ffffff' }}>
              No data available for the selected region.
            </Typography>
          )}
        </Box>
      </Container>
    </div>
  );
}

export default App;
