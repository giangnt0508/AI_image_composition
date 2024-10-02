import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { requestFullscreen } from '../../commonFunction/fullscreenUtils';
function Permission() {
  const navigate = useNavigate();

  const handleClickCar = () => {
    requestFullscreen(); // Call the new function
    navigate('/main-page');
  };

  const handleClickVNMap = () => {
    requestFullscreen(); // Call the new function
    navigate('/mux');
  };

  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '20px', 
        alignItems: 'center', // Center buttons horizontally
        justifyContent: 'center', // Center buttons vertically
        height: '100vh' // Full height to center vertically
      }}
    >
      <div>
          <Button variant="contained" 
            color="primary" 
            className="mui-button"
            onClick={handleClickVNMap} 
          >
          TRUY CẬP STORY WALL
        </Button>
      </div>
      <div>
        <Button variant="contained" 
              color="primary" 
              className="mui-button"
              onClick={handleClickCar} 
              >
          TRUY CẬP CHỤP HÌNH AI
        </Button>
      </div>
    </div>
    
  );
}

export default Permission;