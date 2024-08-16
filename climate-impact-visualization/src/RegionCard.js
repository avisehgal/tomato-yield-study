import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// Import the Poppins font
import '@fontsource/poppins';

const severityColor = (impact) => {
  if (!impact) return '#4CAF50'; // Default Green

  const percentageMatch = impact.match(/(\d+)%/);
  if (percentageMatch) {
    const percentage = parseInt(percentageMatch[1], 10);
    if (percentage > 20) return '#D32F2F'; // Red for impact > 20%
    if (percentage > 15) return '#FFA726'; // Orange for impact > 15%
    return '#66BB6A'; // Green for impact <= 15%
  }
  return '#4CAF50'; // Default Green
};

const RegionCard = ({ region, data }) => {
  const [open, setOpen] = useState(false);
  const cardColor = severityColor(data.impact);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card 
        onClick={handleClickOpen}
        style={{
          ...styles.card,
          background: `linear-gradient(to top right, ${cardColor}, #ffffff20)`,
          color: '#ffffff',
          fontFamily: '"Poppins", sans-serif', // Apply Poppins font
        }}
      >
        <CardContent style={{ padding: '16px' }}>
          <Typography 
            variant="h5" 
            component="div" 
            gutterBottom 
            style={{ 
              fontWeight: 700, 
              textTransform: 'capitalize',
              whiteSpace: 'normal', // Allow the text to wrap to the next line
              overflow: 'hidden',
              textAlign: 'center' // Center-align the text
            }}
          >
            {region.replace(/_/g, ' ')}
          </Typography>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle style={{ display: 'none' }}>
          {region.replace(/_/g, ' ')}
        </DialogTitle>
        <DialogContent 
          style={{ 
            backgroundColor: cardColor, 
            color: '#ffffff', 
            padding: '20px', 
            fontFamily: '"Poppins", sans-serif',
            fontSize: '16px',
            lineHeight: '1.6',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
            borderRadius: '15px' // Make the edges rounder
          }}
        >
          <Typography 
            variant="h5" 
            style={{ 
              marginBottom: '20px', 
              fontWeight: 'bold', 
              fontSize: '22px', 
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
              textTransform: 'capitalize' // Capitalize the title
            }}
          >
            {region.replace(/_/g, ' ')}
          </Typography>

          <Typography 
            variant="body1" 
            style={{ 
              marginBottom: '15px', 
              fontWeight: 'normal', 
              fontSize: '18px', 
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)' 
            }}
          >
            {data.description}
          </Typography>

          <Typography 
            variant="body2" 
            style={{ 
              marginBottom: '10px', 
              fontWeight: 'bold', 
              fontSize: '18px', 
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)' 
            }}
          >
            Impact: {data.impact}
          </Typography>

          <Typography 
            variant="body2" 
            style={{ 
              marginBottom: '20px', 
              fontWeight: 'bold', 
              fontSize: '18px', 
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)' 
            }}
          >
            Source: {data.source.join(', ')}
          </Typography>

          {data.potential_remedies && data.potential_remedies.length > 0 && (
            <>
              <Typography 
                variant="h6" 
                component="div" 
                style={{ 
                  textDecoration: 'underline', 
                  marginBottom: '15px', 
                  fontWeight: 'bold', 
                  fontSize: '20px', 
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' 
                }}
              >
                Potential Remedies:
              </Typography>
              <Box component="ul" style={{ paddingLeft: '20px', fontSize: '18px', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)' }}>
                {data.potential_remedies.map((remedy, index) => (
                  <li key={index} style={{ marginBottom: '10px' }}>{remedy}</li>
                ))}
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

const styles = {
  card: {
    width: '100%',  // Responsive width
    height: '150px', // Fixed height for all cards
    margin: '10px',
    borderRadius: '20px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)', // Soft shadow for depth
    transition: 'transform 0.3s, box-shadow 0.3s',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center', // Center-align the text within the card
  },
};

export default RegionCard;
