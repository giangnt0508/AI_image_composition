import React from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import './ViewPhoto.css';
import { requestFullscreen } from '../../commonFunction/fullscreenUtils';
import { QRCode } from 'react-qrcode-logo';
import logoIsuzu from '../../images/logo-isuzu-do.png'

function ViewPhoto() {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundImage = location.state?.background;
  const takeImage = location.state?.takeImage;

  const handleGotoQR = () => {
    requestFullscreen();
    navigate('/main-page');
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
        <div className="image-grid-item-qr-view">
            <img
              src={takeImage.trim()} 
              alt='image-original' 
              onLoad={() => console.log('Image loaded')} 
              onError={() => console.log('Image failed to load')} 
            />
            <div className='qr-scan'>
              <QRCode 
                value={takeImage} 
                bgColor="#FFFFFF" 
                fgColor="#000000" 
                logoImage={logoIsuzu}
              />
              <div className="qr-h1">
                <h1>
                  SCAN ĐỂ LƯU LẠI HÌNH ẢNH
                </h1>
              </div>
            </div>
            
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
                    HOME
                </Button>
            </div>
      </div>
    </div>
  );
}

export default ViewPhoto;
