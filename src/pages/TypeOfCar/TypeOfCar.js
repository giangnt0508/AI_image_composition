import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function TypeOfCar() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handleCapture = () => {
    // Implement capture functionality
    console.log('Capture button clicked');
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ color: 'white', textAlign: 'center', mb: 2 }}>
        Chọn màu xe mà bạn yêu thích
      </Typography>
      
      <Grid container spacing={1} justifyContent="center" sx={{ mb: 2 }}>
        {[...Array(8)].map((_, index) => (
          <Grid item key={index}>
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                backgroundColor: 'white',
                border: '2px solid #fff',
              }}
            />
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ 
        width: '100%', 
        height: 300, 
        backgroundColor: 'white', 
        mb: 2,
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* Replace this with actual car image */}
        <Typography>Car Image Placeholder</Typography>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button 
        className="mui-button"
          variant="contained" 
          color="secondary" 
          onClick={handleBack}
          sx={{ color: '#d32f2f', fontWeight: 'bold' }}
        >
          TRỞ LẠI
        </Button>
        <Button 
        className="mui-button"
          variant="contained" 
          color="secondary" 
          onClick={handleCapture}
          sx={{ color: '#d32f2f', fontWeight: 'bold' }}
        >
          CHỤP
        </Button>
      </Box>
    </Box>
  );
}

export default TypeOfCar;
