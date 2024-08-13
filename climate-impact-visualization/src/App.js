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

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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

      <Container maxWidth="md" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{  flexGrow: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          <RegionCard region={selectedRegion} data={data.regions[selectedRegion]} />
        </Box>
      </Container>
    </div>
  );
}

export default App;
