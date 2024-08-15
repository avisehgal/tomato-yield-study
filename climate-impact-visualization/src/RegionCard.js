import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const severityColor = (impact) => {
  if (!impact) return '#8bc34a'; // Default to green if no impact is present

  const percentageMatch = impact.match(/(\d+)%/);
  if (percentageMatch) {
    const percentage = parseInt(percentageMatch[1], 10);
    if (percentage > 20) return '#b71c1c'; // Dark Red for impact > 20%
    if (percentage > 15) return '#ff7043'; // Orange for impact > 15%
    return '#8bc34a'; // Green for impact <= 15%
  }
  return '#8bc34a'; // Green if no percentage is mentioned
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
          backgroundColor: cardColor,
        }}
      >
        <CardContent style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          <Typography 
            variant="h5" 
            component="div" 
            gutterBottom 
            style={{ 
              fontWeight: 'bold', 
              color: '#ffffff', 
              textTransform: 'capitalize',
              whiteSpace: 'nowrap' 
            }}
          >
            {region.replace(/_/g, ' ')}
          </Typography>
          <Typography 
            variant="body2" 
            style={{ 
              color: '#ffffff', 
              marginBottom: '10px', 
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              display: '-webkit-box', 
              WebkitLineClamp: 3, 
              WebkitBoxOrient: 'vertical' 
            }}
          >
            {data.description}
          </Typography>

        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle 
  style={{ 
    backgroundColor: cardColor, 
    color: '#ffffff', 
    textTransform: 'capitalize'  // Capitalizes the first letter of each word
  }}
>
  {region.replace(/_/g, ' ')}
</DialogTitle>
        <DialogContent style={{ backgroundColor: cardColor, color: '#ffffff' }}>
          <Typography variant="body2" style={{ marginBottom: '10px' }}>
            {data.description}
          </Typography>
          <Typography variant="body2" style={{ marginBottom: '10px' }}>
            Impact: {data.impact}
          </Typography>
          <Typography variant="body2" style={{ marginBottom: '10px' }}>
            Source: {data.source.join(', ')}
          </Typography>
          {data.potential_remedies && data.potential_remedies.length > 0 && (
            <>
              <Typography variant="h6" component="div" style={{ textDecoration: 'underline', marginBottom: '10px' }}>
                Potential Remedies:
              </Typography>
              <Box component="ul" style={{ paddingLeft: '20px' }}>
                {data.potential_remedies.map((remedy, index) => (
                  <li key={index} style={{ marginBottom: '5px' }}>{remedy}</li>
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
    width: '100%',  // Make the card width responsive to the grid
    height: '100%', // Make the card height responsive to the grid
    margin: '10px',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    border: '1px solid #ddd',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
};

export default RegionCard;
