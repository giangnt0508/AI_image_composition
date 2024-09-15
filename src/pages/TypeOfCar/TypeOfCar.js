import React, { useState, useRef } from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Webcam from 'react-webcam';
import './TypeOfCar.css';

function TypeOfCar() {
  const navigate = useNavigate();
  const location = useLocation();

  const backgroundImage = location.state?.background;
  const [selectedColor, setSelectedColor] = useState(null);
  const [isWebcamOpen, setIsWebcamOpen] = useState(location.state?.openWebcam || false);
  const webcamRef = useRef(null);

  const handleBack = () => {
    navigate('/');
  };

  const handleCapture = () => {
    if (isWebcamOpen) {
      const imageSrc = webcamRef.current.getScreenshot();
      // Convert base64 to blob
      const byteString = atob(imageSrc.split(',')[1]);
      const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      const localImageUrl = URL.createObjectURL(blob);

      navigate('/qr', { state: { takeImage: localImageUrl, background: backgroundImage } });
    } else {
      setIsWebcamOpen(true);
    }
  };

  const handleCloseWebcam = () => {
    setIsWebcamOpen(false);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const lightenColor = (color) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `#${Math.min(255, r + 40).toString(16).padStart(2, '0')}${Math.min(255, g + 40).toString(16).padStart(2, '0')}${Math.min(255, b + 40).toString(16).padStart(2, '0')}`;
  };

  const colors = ['#000000', '#d9d9d9', '#808080', '#d19f29', '#8B0000', '#4B0082', '#0000FF', '#29d147'];

  return (
    <div className="type-of-car">
      <Button 
        variant="contained" 
        color="primary" 
        className="mui-button"
        disabled
      >
        Chọn màu xe mà bạn yêu thích
      </Button>
      <div className="color-grid">
        {colors.map((color, index) => (
          <div 
            key={index} 
            className="color-option" 
            style={{
              background: `linear-gradient(to bottom right, ${color} 50%, ${lightenColor(color)} 50%)`,
              border: selectedColor === color ? '3px solid white' : '1px solid white'
            }}
            onClick={() => handleColorSelect(color)}
          />
        ))}
      </div>
      <div className="car-image-container">
        {isWebcamOpen ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam"
          />
        ) : (
          <img src={backgroundImage} alt="Selected background" className="background-image" />
        )}
      </div>
      <Box className="grid-button">
        <Button 
          variant="contained" 
          color="secondary" 
          className="mui-button"
          onClick={isWebcamOpen ? handleCloseWebcam : handleBack}
        >
          {isWebcamOpen ? 'HỦY' : 'TRỞ LẠI'}
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          className="mui-button"
          onClick={handleCapture}
        >
          {isWebcamOpen ? 'CHỤP' : 'MỞ CAMERA'}
        </Button>
      </Box>
    </div>
  );
}

export default TypeOfCar;