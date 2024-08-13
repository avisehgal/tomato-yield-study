import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import HeatIcon from '@mui/icons-material/Whatshot';
import PestIcon from '@mui/icons-material/BugReport';
import LaborIcon from '@mui/icons-material/Work';
import RainIcon from '@mui/icons-material/Opacity';

const iconMapping = {
  new_pests: <PestIcon style={{ color: 'black' }} />,
  labor_productivity: <LaborIcon style={{ color: 'black' }} />,
  untimely_rain_drought: <RainIcon style={{ color: 'black' }} />,
  too_much_heat: <HeatIcon style={{ color: 'black' }} />,
  human_rights: <LaborIcon style={{ color: 'black' }} />
};

// Function to extract percentage from the impact description and assign color
const severityColor = (impact) => {
  const percentageMatch = impact.match(/(\d+)%/);
  if (percentageMatch) {
    const percentage = parseInt(percentageMatch[1], 10);
    if (percentage > 20) return '#ef5350'; // Red for impact > 20%
    if (percentage > 15) return '#ffa726'; // Orange for impact > 15%
    return '#66bb6a'; // Green for impact <= 15%
  }
  return '#66bb6a'; // Green if no percentage is mentioned
};

const RegionCard = ({ region, data }) => {
  if (!data) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {region}
          </Typography>
          <Typography variant="body2">
            No climate data available for this region.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        minWidth: 275,
        marginBottom: 2,
        boxShadow: 3,
        borderRadius: 2,
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom style={{ fontWeight: 'bold' }}>
          {region}
        </Typography>
        {Object.entries(data).map(([factor, details]) => (
          <Box
            key={factor}
            sx={{
              marginTop: 2,
              marginBottom: 2,
              display: 'flex',
              alignItems: 'center',
              backgroundColor: severityColor(details.impact),
              borderRadius: 1,
              padding: 2,
            }}
          >
            <Tooltip title={factor.replace(/_/g, ' ')} arrow>
              <IconButton>{iconMapping[factor]}</IconButton>
            </Tooltip>
            <Box sx={{ marginLeft: 2 }}>
              <Typography variant="h6" component="div" style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                {factor.replace(/_/g, ' ')}
              </Typography>
              <Typography variant="body2">{details.description}</Typography>
              <Typography variant="body2" color="text.secondary" style={{ marginTop: 4, fontWeight: 'bold' }}>
                Impact: <span style={{ fontWeight: 'normal' }}>{details.impact}</span>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Source: <a href={details.source} target="_blank" rel="noopener noreferrer">Learn more</a>
              </Typography>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default RegionCard;
