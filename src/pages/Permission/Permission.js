import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function Permission() {
  const navigate = useNavigate();

  const requestFullscreen = () => {
    const elem = document.documentElement; // To make the entire document fullscreen

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, Opera
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
      elem.msRequestFullscreen();
    }
  };

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