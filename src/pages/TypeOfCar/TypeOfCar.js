import React, { useState, useRef, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Webcam from 'react-webcam';
import './TypeOfCar.css';

function TypeOfCar() {
  const navigate = useNavigate();
  const location = useLocation();
  const webcamRef = useRef(null);

  const backgroundImageOriginal = location.state?.background;

  const [selectedColor, setSelectedColor] = useState(null);
  const [isWebcamOpen, setIsWebcamOpen] = useState(location.state?.openWebcam || false);
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(backgroundImageOriginal);

  const handleBack = () => {
    navigate('/');
  };

  const handleCapture = async () => {
    if (isWebcamOpen) {
      const imageSrc = webcamRef.current.getScreenshot();
      
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/save-image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ base64: imageSrc }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Image saved successfully:', result);
          navigate('/qr', { state: { takeImage: result.url, background: backgroundImage } });
        } else {
          console.error('Failed to save image');
        }
      } catch (error) {
        console.error('Error saving image:', error);
      }
    } else {
      setIsWebcamOpen(true);
    }
  };

  const handleCloseWebcam = () => {
    setIsWebcamOpen(false);
  };

  const handleColorSelect = async (color) => {
    if (color === selectedColor) return; // Prevent unnecessary API calls if the color hasn't changed
    
    setSelectedColor(color);
    setIsLoading(true);
    
    if (backgroundImageOriginal) {
      try {
        // Fetch the image file
        const imageResponse = await fetch(backgroundImageOriginal);
        const imageBlob = await imageResponse.blob();
        // Create FormData and append the image file
        const formData = new FormData();
        formData.append('image', imageBlob, 'background.jpg');
        formData.append('color', color);  // Add the color to the form data

        const response = await fetch(`${process.env.REACT_APP_API_URL}/change-color`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Color changed successfully:', result);
          // Update the backgroundImage with the new colored image URL
          setBackgroundImage(result.url + '?t=' + new Date().getTime());
        } else {
          console.error('Failed to change color');
        }
      } catch (error) {
        console.error('Error changing color:', error);
      } finally {
        setIsLoading(false);
      }
    }
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
      {isLoading && <div className="loading-overlay">Changing color...</div>}
    </div>
  );
}

export default TypeOfCar;