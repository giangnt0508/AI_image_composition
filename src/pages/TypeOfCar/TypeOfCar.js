import React, { useState, useRef, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Webcam from 'react-webcam';
import './TypeOfCar.css';
import personImage from '../../images/ahalfperson.jpg';
import { SelfieSegmentation  } from '@mediapipe/selfie_segmentation'; // Add this line
import * as cam from "@mediapipe/camera_utils";

// Import images for option1
import option1White from '../../images/option1/F5F5F1.png';
import option1Gray from '../../images/option1/B1B3B3.png';
import option1DarkGray from '../../images/option1/4E5D5E.png';
import option1Black from '../../images/option1/1A1A1A.png';
import option1Red from '../../images/option1/C51C1C.png';
import option1Brown from '../../images/option1/7B4B38.png';
import option1Blue from '../../images/option1/2C3E83.png';
import option1LightGray from '../../images/option1/F8F8F7.png';

// Import images for option2
import option2White from '../../images/option2/F5F5F1.png';
import option2Gray from '../../images/option2/B1B3B3.png';
import option2DarkGray from '../../images/option2/4E5D5E.png';
import option2Black from '../../images/option2/1A1A1A.png';
import option2Red from '../../images/option2/C51C1C.png';
import option2Brown from '../../images/option2/7B4B38.png';
import option2Blue from '../../images/option2/2C3E83.png';
import option2LightGray from '../../images/option2/F8F8F7.png';

// Import images for option3
import option3White from '../../images/option3/F5F5F1.png';
import option3Gray from '../../images/option3/B1B3B3.png';
import option3DarkGray from '../../images/option3/4E5D5E.png';
import option3Black from '../../images/option3/1A1A1A.png';
import option3Red from '../../images/option3/C51C1C.png';
import option3Brown from '../../images/option3/7B4B38.png';
import option3Blue from '../../images/option3/2C3E83.png';
import option3LightGray from '../../images/option3/F8F8F7.png';

// Import images for option4
import option4White from '../../images/option4/F5F5F1.png';
import option4Gray from '../../images/option4/B1B3B3.png';
import option4DarkGray from '../../images/option4/4E5D5E.png';
import option4Black from '../../images/option4/1A1A1A.png';
import option4Red from '../../images/option4/C51C1C.png';
import option4Brown from '../../images/option4/7B4B38.png';
import option4Blue from '../../images/option4/2C3E83.png';
import option4LightGray from '../../images/option4/F8F8F7.png';

// Import images for option5
import option5White from '../../images/option5/F5F5F1.png';
import option5Gray from '../../images/option5/B1B3B3.png';
import option5DarkGray from '../../images/option5/4E5D5E.png';
import option5Black from '../../images/option5/1A1A1A.png';
import option5Red from '../../images/option5/C51C1C.png';
import option5Brown from '../../images/option5/7B4B38.png';
import option5Blue from '../../images/option5/2C3E83.png';
import option5LightGray from '../../images/option5/F8F8F7.png';

// Import images for option6
import option6White from '../../images/option6/F5F5F1.png';
import option6Gray from '../../images/option6/B1B3B3.png';
import option6DarkGray from '../../images/option6/4E5D5E.png';
import option6Black from '../../images/option6/1A1A1A.png';
import option6Red from '../../images/option6/C51C1C.png';
import option6Brown from '../../images/option6/7B4B38.png';
import option6Blue from '../../images/option6/2C3E83.png';
import option6LightGray from '../../images/option6/F8F8F7.png';


function TypeOfCar() {
  const navigate = useNavigate();
  const location = useLocation();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  
  const backgroundImageOriginal = location.state?.background;
  const folderOriginal = location.state?.folder;
  
  const [selectedColor, setSelectedColor] = useState(null);
  const [isWebcamOpen, setIsWebcamOpen] = useState(location.state?.openWebcam || false);
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(backgroundImageOriginal);
  
  const [selectedOption, setSelectedOption] = useState(folderOriginal);

  const [load, setLoad] = useState(false);


  const colorImages = {
    option1: {
      '#F5F5F1': option1White,
      '#B1B3B3': option1Gray,
      '#4E5D5E': option1DarkGray,
      '#1A1A1A': option1Black,
      '#C51C1C': option1Red,
      '#7B4B38': option1Brown,
      '#2C3E83': option1Blue,
      '#F8F8F7': option1LightGray,
    },
    option2: {
      '#F5F5F1': option2White,
      '#B1B3B3': option2Gray,
      '#4E5D5E': option2DarkGray,
      '#1A1A1A': option2Black,
      '#C51C1C': option2Red,
      '#7B4B38': option2Brown,
      '#2C3E83': option2Blue,
      '#F8F8F7': option2LightGray,
    },
    option3: {
      '#F5F5F1': option3White,
      '#B1B3B3': option3Gray,
      '#4E5D5E': option3DarkGray,
      '#1A1A1A': option3Black,
      '#C51C1C': option3Red,
      '#7B4B38': option3Brown,
      '#2C3E83': option3Blue,
      '#F8F8F7': option3LightGray,
    },
    option4: {
      '#F5F5F1': option4White,
      '#B1B3B3': option4Gray,
      '#4E5D5E': option4DarkGray,
      '#1A1A1A': option4Black,
      '#C51C1C': option4Red,
      '#7B4B38': option4Brown,
      '#2C3E83': option4Blue,
      '#F8F8F7': option4LightGray,
    },
    option5: {
      '#F5F5F1': option5White,
      '#B1B3B3': option5Gray,
      '#4E5D5E': option5DarkGray,
      '#1A1A1A': option5Black,
      '#C51C1C': option5Red,
      '#7B4B38': option5Brown,
      '#2C3E83': option5Blue,
      '#F8F8F7': option5LightGray,
    },
    option6: {
      '#F5F5F1': option6White,
      '#B1B3B3': option6Gray,
      '#4E5D5E': option6DarkGray,
      '#1A1A1A': option6Black,
      '#C51C1C': option6Red,
      '#7B4B38': option6Brown,
      '#2C3E83': option6Blue,
      '#F8F8F7': option6LightGray,
    },
  };

  const handleBack = () => {
    navigate('/choose-background');
  };
  const [capturedImage, setCapturedImage] = useState(null); // Thêm state để lưu ảnh chụp

  const handleCapture = async () => {
    if (isWebcamOpen && webcamRef.current.video.readyState === 4) {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log("Image Source:", imageSrc); // Kiểm tra giá trị của imageSrc

      setCapturedImage(imageSrc);
      try {
        setIsLoading(true);
        // const personResponse = await fetch(personImage);
        // const personBlob = await personResponse.blob();
        const personBlob = await fetch(imageSrc).then(res => res.blob());
        const personBlobUrl = URL.createObjectURL(personBlob);

        //--------------------------
        // navigate('/view-photo', { state: { takeImage: personBlobUrl, background: backgroundImage } });
        //--------------------------
        
        // Fetch the landscape image
        const imageResponse = await fetch(backgroundImage);
        const landscapeBlob = await imageResponse.blob();

        // Create FormData and append both images
        // const formData = new FormData();
        // formData.append('person_image', personBlob, 'person.jpg');
        // formData.append('landscape_image', landscapeBlob, 'background.jpg');

        // const response = await fetch(`${process.env.REACT_APP_API_URL}/merge-picture`, {
        //   method: 'POST',
        //   body: formData,
        // });

        // if (response.ok) {
        //   const result = await response.json();
        //   console.log('Image merged successfully:', result);
        //   navigate('/view-photo', { state: { takeImage: result.url + '?t=' + new Date().getTime(), background: backgroundImage } });
        // } else {
        //   console.error('Failed to merge image');
        // }
      } catch (error) {
        console.error('Error merging image:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsWebcamOpen(true);
    }
  };

  const handleCloseWebcam = () => {
    setIsWebcamOpen(false);
  };

  const handleColorSelect = (color) => {
    if (color === selectedColor) return;
    
    setSelectedColor(color);
    setIsLoading(true);
    
    try {
      const newBackgroundImage = colorImages[selectedOption][color];
      setBackgroundImage(newBackgroundImage);
    } catch (error) {
      console.error('Error updating background image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const lightenColor = (color) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `#${Math.min(255, r + 40).toString(16).padStart(2, '0')}${Math.min(255, g + 40).toString(16).padStart(2, '0')}${Math.min(255, b + 40).toString(16).padStart(2, '0')}`;
  };


  const colors = ['#F5F5F1', '#B1B3B3', '#4E5D5E', '#1A1A1A', '#C51C1C', '#7B4B38', '#2C3E83', '#F8F8F7'];
  

  const onResults = async (results) => {
    const img = document.getElementById('vbackground')
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    // Only overwrite existing pixels.
    canvasCtx.globalCompositeOperation = 'destination-atop';
    canvasCtx.drawImage(results.segmentationMask, 0, 0, canvasElement.width, canvasElement.height);

    // Only overwrite missing pixels.

    canvasCtx.globalCompositeOperation = 'destination-over';
    canvasCtx.drawImage(img, 0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.restore();
    setLoad(true);
  }

  useEffect(() => {
    const selfieSegmentation = new SelfieSegmentation({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;
      },
    });

    selfieSegmentation.setOptions({
      modelSelection: 1,
    });

    selfieSegmentation.onResults(onResults);

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      try {
        const camera = new cam.Camera(webcamRef.current.video, {
          onFrame: async () => {
            try {
              await selfieSegmentation.send({ image: webcamRef.current.video });
            } catch (error) {
              console.error("Error sending image to selfie segmentation:", error);
            }
          },
          width: 1280,
          height: 720
        });

        camera.start();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }, [isWebcamOpen]);

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
      {capturedImage && ( // Hiển thị ảnh chụp nếu có
            <div className="captured-image-container">
                <img src={capturedImage} alt="Captured" style={{ width: '100%', height: 'auto' }} />
            </div>
        )}
      {!isWebcamOpen && (
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
      )}
      <div className="car-image-container">
        {isWebcamOpen ? (
          <div >
            <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                style={{
                  display: "none",
                  width: "100%",
                  height: "100%"
                }}
              />
              <canvas
                ref={canvasRef}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              ></canvas>
              <img id="vbackground" src={backgroundImage} alt="The Screan" style={{ display: 'none' }} />
          </div>
        ) : (
          <img src={backgroundImage} alt="Selected background" className="background-image-type-of-car" />
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
      {isLoading && <div className="loading-overlay">Đang xử lý...</div>}
    </div>
  );
}

export default TypeOfCar;