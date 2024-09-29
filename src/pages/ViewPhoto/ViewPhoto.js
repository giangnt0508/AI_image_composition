import React from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import './ViewPhoto.css';

function ViewPhoto() {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundImage = location.state?.background;
  const takeImage = location.state?.takeImage;
console.log("takeImage", takeImage);
  const handleGotoQR = () => {
    navigate('/qr', { state: { takeImage: takeImage, background: backgroundImage } });
  };

  const handleTakeImageBack = () => {
    navigate('/type-of-car', { state: { openWebcam: true, background: backgroundImage } });
  };

  return (
    <div className="qr-page">
      <Button 
        variant="contained" 
        color="primary" 
        className="mui-button"
        disabled
      >
        XEM HÌNH CỦA BẠN
      </Button>
      <div className="image-grid-qr">
        <div>
            <div className="image-grid-item-qr">
                <img src={takeImage} alt='image-original' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '15px' }}>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    className="mui-button"
                    onClick={handleTakeImageBack}
                >
                    CHỤP LẠI
                </Button>
            </div>
        </div>
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '15px' }}>
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