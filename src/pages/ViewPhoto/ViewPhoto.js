import React from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import './ViewPhoto.css';
import { requestFullscreen } from '../../commonFunction/fullscreenUtils';

function ViewPhoto() {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundImage = location.state?.background;
  const takeImage = location.state?.takeImage;

  const handleGotoQR = () => {
    requestFullscreen();
    navigate('/qr', { state: { takeImage: takeImage, background: backgroundImage } });
  };

  const handleTakeImageBack = () => {
    requestFullscreen();
    navigate('/type-of-car', { state: { openWebcam: true, background: backgroundImage } });
  };

  return (
    <div className="qr-page-view">
      <Button 
        variant="contained" 
        color="primary" 
        className="mui-button"
        disabled
      >
        XEM HÌNH CỦA BẠN
      </Button>
      <div className="image-grid-view">
        <div>
            <div className="image-grid-item-qr-view">
                <img src={takeImage.trim()} alt='image-original' onLoad={() => console.log('Image loaded')} 
         onError={() => console.log('Image failed to load')} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '15px' }}>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    className="mui-button"
                    onClick={handleTakeImageBack}
                >
                    CHỤP LẠI
                </Button>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    className="mui-button"
                    onClick={handleGotoQR}
                >
                    TẠO QR CODE
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPhoto;