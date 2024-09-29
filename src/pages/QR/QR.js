import React from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import './QR.css';

function QR() {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundImage = location.state?.background;
  const takeImage = location.state?.takeImage;

  const handleBack = () => {
    navigate('/');
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
        Quét mã QR code, tải hình ảnh vào máy của bạn
      </Button>
      <div className="image-grid-qr">
        <div className="image-grid-item-qr">
            <a href={takeImage} download="background-image.jpg" style={{ display: 'block', width: '100%', height: '100%' }}>
                <QRCodeSVG value={takeImage} width="100%" height="100%" bgColor="#FFFFFF" fgColor="#FF0000"/>
            </a>
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
                onClick={handleBack}
            >
                HOME
            </Button>
        </div>
      </div>
    </div>
  );
}

export default QR;