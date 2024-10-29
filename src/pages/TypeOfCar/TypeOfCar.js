import React, { useState, useRef, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Webcam from 'react-webcam';
import './TypeOfCar.css';
import { SelfieSegmentation  } from '@mediapipe/selfie_segmentation'; // Add this line
import * as cam from "@mediapipe/camera_utils";
import { requestFullscreen } from '../../commonFunction/fullscreenUtils';

import option8White from '../../images/mux/F5F5F1.png';
import option8DarkGray from '../../images/mux/4E5D5E.png';
import option8Black from '../../images/mux/1A1A1A.png';
import option8Red from '../../images/mux/C51C1C.png';
import option8Blue from '../../images/mux/2C3E83.png';

import optionDMaxWhite from '../../images/dxmax/F5F5F1.png';
import optionDMaxDarkGray from '../../images/dxmax/4E5D5E.png';
import optionDMaxBlack from '../../images/dxmax/1A1A1A.png';
import optionDMaxRed from '../../images/dxmax/C51C1C.png';
import optionDMaxBlue from '../../images/dxmax/2C3E83.png';
import optionDMaxWhitePeal from '../../images/dxmax/DFDEDB.png';


function TypeOfCar() {
  const navigate = useNavigate();
  const location = useLocation();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const backgroundRef = useRef(null);
  const carImageContainerRef = useRef(null); // Thêm ref cho thẻ div
  
  const backgroundImageOriginal = location.state?.background;
  const folderOriginal = location.state?.folder;
  
  const [selectedColor, setSelectedColor] = useState(null);
  const [isWebcamOpen, setIsWebcamOpen] = useState(location.state?.openWebcam || false);
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(backgroundImageOriginal);
  const [load, setLoad] = useState(false);

  const colors = ['#F5F5F1', '#4E5D5E', '#1A1A1A', '#C51C1C', '#2C3E83'];
  const colorsDxmax = ['#F5F5F1', '#4E5D5E', '#1A1A1A', '#C51C1C', '#2C3E83', '#DFDEDB'];
  const isMobile = window.innerWidth <= 768; // Check if the current device is mobile

  const isDxmaxFolder = ['option4', 'option5', 'option8'].includes(folderOriginal); // Kiểm tra xem folderOriginal có thuộc về các tùy chọn không

  const colorsToUse = isDxmaxFolder ? colorsDxmax : colors; // Xác định màu sắc sẽ sử dụng

  
  const [selectedOption8Image, setSelectedOption8Image] = useState(isDxmaxFolder ? optionDMaxWhite : option8White);

  const colorImages = {
    dxmax: {
      '#F5F5F1': optionDMaxWhite,
      '#4E5D5E': optionDMaxDarkGray,
      '#1A1A1A': optionDMaxBlack,
      '#C51C1C': optionDMaxRed,
      '#2C3E83': optionDMaxBlue,
      '#DFDEDB': optionDMaxWhitePeal,
    },
    option8: {
      '#F5F5F1': option8White,
      '#4E5D5E': option8DarkGray,
      '#1A1A1A': option8Black,
      '#C51C1C': option8Red,
      '#2C3E83': option8Blue,
    },
  };

  const handleBack = () => {
    // requestFullscreen();
    navigate('/choose-background');
  };

  const handleCapture = async () => {
    // requestFullscreen();
    if (isWebcamOpen) {
      // const imageSrc = webcamRef.current.getScreenshot();
      
      try {
        const canvas = canvasRef.current;
        const imageSrc = canvas.toDataURL('image/jpg');
        // Convert data URL (imageSrc) to Blob
        const dataURLtoBlob = (dataurl) => {
          const arr = dataurl.split(',');
          const mime = arr[0].match(/:(.*?);/)[1];
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
              u8arr[n] = bstr.charCodeAt(n);
          }
          return new Blob([u8arr], { type: mime });
      };
        setIsLoading(true);
        const personBlob = dataURLtoBlob(imageSrc);

        // Create FormData and append both images
        const formData = new FormData();
        formData.append('person_image', personBlob, 'person.jpg');

        const response = await fetch(`${process.env.REACT_APP_API_URL}/merge-picture`, {
          method: 'POST',
          body: formData
        });
        console.log("response: ", response);
        if (response.ok) {
          setIsWebcamOpen(false);
          const result = await response.json();
          navigate('/view-photo', { state: { takeImage: result.url, background: backgroundImage } });
        } else {
          console.error('Failed to merge image');
        }
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
    // Stop the webcam stream if it's open
    if (webcamRef.current && webcamRef.current.video) {
      const stream = webcamRef.current.video.srcObject;
      if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop()); // Stop each track
          webcamRef.current.video.srcObject = null; // Set srcObject to null
      }
  }
  webcamRef.current.video = null;
  setIsWebcamOpen(false);
  setIsLoading(true); // Start loading when selecting a color
  setBackgroundImage(backgroundImageOriginal);
    try {
        const newImage = colorImages['option8']['#F8F8F7'];
        setSelectedOption8Image(newImage);
    } catch (error) {
        console.error('Error updating background image:', error);
    } finally {
        setTimeout(() => {
            setIsLoading(false); // Stop loading after 2 seconds
        }, 2000);
    }
  };

  const handleColorSelect = (color) => {
    if (color === selectedColor) return;

    setIsLoading(true); // Bắt đầu tải khi chọn màu
    setSelectedColor(color);

    try {
      const newImage = isDxmaxFolder
        ? colorImages['dxmax'][color] // Sử dụng màu dxmax
        : colorImages['option8'][color]; // Sử dụng màu option8 cho các trường hợp còn lại
      setSelectedOption8Image(newImage);
    } catch (error) {
      console.error('Error updating background image:', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false); // Dừng tải sau 2 giây
      }, 2000);
    }
  };

  const lightenColor = (color) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `#${Math.min(255, r + 40).toString(16).padStart(2, '0')}${Math.min(255, g + 40).toString(16).padStart(2, '0')}${Math.min(255, b + 40).toString(16).padStart(2, '0')}`;
  };

  let animationFrameId;
  const option8WhiteImage = new Image();
option8WhiteImage.src = selectedOption8Image; // Đảm bảo rằng selectedOption8Image đã được định nghĩa và hợp lệ

// Cài đặt sự kiện onload cho hình ảnh
option8WhiteImage.onload = () => {
  setLoad(true); // Cập nhật trạng thái tải
};

  const onResults = async (results) => {
    if (webcamRef.current.video) {;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        drawCanvas(results);
      });
    }
  };

  const drawCanvas = (results) => {
    const img = backgroundRef.current;
    const videoWidth = 1920;
    const videoHeight = 1440;

    // Set canvas dimensions
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    // Calculate size for smaller webcam feed (35% of videoWidth and videoHeight)
    const scaledWidth = videoWidth * 0.35;
    const scaledHeight = isMobile ? videoHeight * 0.55 : videoHeight * 0.6;

    // Set webcam position to center the smaller feed on the canvas
    const xPosition = (videoWidth - scaledWidth) / 2;  // Center horizontally
    const yPosition = (videoHeight - scaledHeight) / 2; // Center vertically

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      if (img) {
      // Draw the background first
      canvasCtx.globalCompositeOperation = 'source-over';
      canvasCtx.drawImage(img, 0, 0, canvasElement.width, canvasElement.height);
  
      // Save canvas state before applying transformations
      canvasCtx.save();
  
      // Flip the webcam feed horizontally
      canvasCtx.translate(xPosition + scaledWidth / 2, yPosition + scaledHeight / 2); // Move context to the right by scaledWidth
      canvasCtx.scale(-1, 1); // Flip the context horizontally
  
      // Draw the flipped webcam feed in a small rectangle
      canvasCtx.drawImage(results.image, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight);
  
      // Only overwrite existing pixels for the segmentation mask
      canvasCtx.globalCompositeOperation = 'destination-atop';
      // Draw the flipped segmentation mask
      canvasCtx.drawImage(results.segmentationMask, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight);
  
      // Reset transformation for drawing the background
      canvasCtx.setTransform(1, 0, 0, 1, 0, 0);
  
      // Only overwrite missing pixels.
      canvasCtx.globalCompositeOperation = 'destination-over';
      canvasCtx.drawImage(img, 0, 0, canvasElement.width, canvasElement.height);
      
      // Đặt chế độ kết hợp để vẽ khung
      canvasCtx.globalCompositeOperation = 'source-over'; // Đảm bảo khung được vẽ trên cùng
      canvasCtx.strokeStyle = 'white';  // Đặt màu khung là trắng
      
      const scaleNumberMoblie = isMobile ? 10 : 50;

      // Vẽ khung bên trái và bên phải
      canvasCtx.lineWidth = 10;  // Đặt độ dày cho cạnh bên
      canvasCtx.strokeRect(xPosition - 2.5, yPosition -scaleNumberMoblie, 5, scaledHeight + scaleNumberMoblie);  // Vẽ cạnh bên trái
      canvasCtx.strokeRect(xPosition + scaledWidth - 2.5, yPosition - scaleNumberMoblie, 5, scaledHeight + scaleNumberMoblie);  // Vẽ cạnh bên phải
      
      // Vẽ khung trên và dưới
      canvasCtx.lineWidth = 15;  // Đặt độ dày cho cạnh trên và dưới
      canvasCtx.strokeRect(xPosition, yPosition - 15 -scaleNumberMoblie, scaledWidth, 15);  // Vẽ cạnh trên
      canvasCtx.strokeRect(xPosition, yPosition + scaledHeight, scaledWidth, 15);  // Vẽ cạnh dưới
      // canvasCtx.restore();
      // Draw option8WhiteImage
      drawOption8Image(canvasCtx, xPosition, yPosition, scaledHeight);
    } else {
      console.log('Background image is not loaded or invalid:', img);
    }
  };
  
  
  const drawOption8Image = (canvasCtx, xPosition, yPosition, scaledHeight) => {
    const scaleNumberMoblie = isMobile ? -20 : -100;
    const scaleNumberCarMoblie = isMobile ? 1.35 : 1.35;
    if (option8WhiteImage.complete) {
      const imgWidth = option8WhiteImage.width * scaleNumberCarMoblie;
      const imgHeight = option8WhiteImage.height * scaleNumberCarMoblie;
      canvasCtx.drawImage(
        option8WhiteImage,
        yPosition + scaledHeight + scaleNumberMoblie,
        isMobile ? xPosition + 320 : xPosition + 320,
        imgWidth,
        imgHeight);
    }
  };

  useEffect(() => {
    const selfieSegmentation = new SelfieSegmentation({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation@0.1/${file}`;
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
          width: 1920,
          height: 1440
        });

        camera.start();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }, [isWebcamOpen]);

  useEffect(() => {
    if (!isWebcamOpen) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = document.querySelector('.background-image-type-of-car');
        
        if (img) {
            canvas.width = 1920;
            canvas.height = 1440;
            const videoWidth = 1920;
            const videoHeight = 1440;
            const scaledWidth = videoWidth * 0.35;
            const scaledHeight = isMobile ? videoHeight * 0.55 : videoHeight * 0.6;
            const xPosition = (videoWidth - scaledWidth) / 2;  // Center horizontally
            const yPosition = (videoHeight - scaledHeight) / 2; // Center vertically
            const scaleNumberMoblie = isMobile ? 10 : 50;
            const scaleNumberCarMoblie = isMobile ? 1.35 : 1.35;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Đặt chế độ kết hợp để vẽ khung
            ctx.globalCompositeOperation = 'source-over'; // Đảm bảo khung được vẽ trên cùng
            ctx.strokeStyle = 'white';  // Đặt màu khung là trắng

            // Vẽ khung bên trái và bên phải
            ctx.lineWidth = 10;  // Đặt độ dày cho cạnh bên
            ctx.strokeRect(xPosition - 2.5, yPosition -scaleNumberMoblie, 5, scaledHeight + scaleNumberMoblie);  // Vẽ cạnh bên trái
            ctx.strokeRect(xPosition + scaledWidth - 2.5, yPosition - scaleNumberMoblie, 5, scaledHeight + scaleNumberMoblie);  // Vẽ cạnh bên phải
      
            // Vẽ khung trên và dưới
            ctx.lineWidth = 15;  // Đặt độ dày cho cạnh trên và dưới
            ctx.strokeRect(xPosition, yPosition - 15 -scaleNumberMoblie, scaledWidth, 15);  // Vẽ cạnh trên
            ctx.strokeRect(xPosition, yPosition + scaledHeight, scaledWidth, 15);  // Vẽ cạnh dưới
      
            // {{ edit_1 }}: Draw the option8White image diagonally at the corner
            const scaleNumberOption = isMobile ? -20 : -100;
            const option8WhiteImage = new Image();
            option8WhiteImage.src = selectedOption8Image; // Ensure option8White is defined in your imports
            option8WhiteImage.onload = () => {
              const imgWidth = option8WhiteImage.width * scaleNumberCarMoblie;
              const imgHeight = option8WhiteImage.height * scaleNumberCarMoblie;
              ctx.drawImage(
                option8WhiteImage,
                yPosition + scaledHeight + scaleNumberOption,
                isMobile ? xPosition + 320 : xPosition + 320,
                imgWidth,
                imgHeight);
            };
        }
    }
  }, [backgroundImage, isWebcamOpen, selectedOption8Image]);

  return (
    <div className="type-of-car">
      <Button 
        variant="contained" 
        color="primary" 
        className="mui-button"
        disabled
      >
        {!isWebcamOpen ? 'Chọn màu xe mà bạn yêu thích' : 'Mời bạn tạo dáng chụp'}
      </Button>
      {!isWebcamOpen && (
        <div className="color-grid">
          {colorsToUse.map((color, index) => (
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
      <div className="car-image-container" ref={carImageContainerRef}> {/* Thêm ref vào thẻ div */}
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
                  width: "100%", // Đặt chiều rộng canvas là 100%
                  height: "100%" // Đặt chiều cao canvas là 100%
                }}
              ></canvas>
              <img id="vbackground" ref={backgroundRef} src={backgroundImage} alt="The Screan"  className="background-image-type-of-car" style={{ display: 'none' }} />
          </div>
        ) : (
          <div className="image-frame-container"> {/* Added a container for the frame */}
            <img src={backgroundImage} alt="Selected background" className="background-image-type-of-car" />
            <canvas className="image-frame" ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }}></canvas> {/* Canvas for the frame */}
          </div>
          // <img src={backgroundImage} alt="Selected background" className="background-image-type-of-car" />
        )}
      </div>
      <Box className="grid-button">
        <Button 
          variant="contained" 
          color="secondary" 
          className="mui-button"
          onClick={handleCapture}
        >
          {isWebcamOpen ? 'CHỤP' : 'MỞ CAMERA'}
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          className="mui-button"
          onClick={isWebcamOpen ? handleCloseWebcam : handleBack}
        >
          {isWebcamOpen ? 'HỦY' : 'TRỞ LẠI'}
        </Button>
      </Box>
      {isLoading && <div className="loading-overlay">Đang xử lý...</div>}
    </div>
  );
}

export default TypeOfCar;
