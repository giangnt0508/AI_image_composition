import React, { useEffect, useRef } from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import logoComment from '../../images/logoComment.png';
import backgroundImage from '../../images/option2.jpg';
import bottomLeftImage from '../../images/option2.jpg';
import middleRightImage from '../../images/option2.jpg';
import './CommentPerson.css';

function CommentPerson() {
  const navigate = useNavigate();
  const location = useLocation();
  const canvasRef = useRef(null);

  const selectedPerson = location.state?.selectedPerson;
  const nameCity = location.state?.nameCity;

  useEffect(() => {
    if (selectedPerson) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Set canvas size
      canvas.width = 700;
      canvas.height = 400;

      // Load images
      const logo = new Image();
      logo.src = logoComment;
      const bgImage = new Image();
      bgImage.src = backgroundImage;
      const blImage = new Image();
      blImage.src = bottomLeftImage;
      const mrImage = new Image();
      mrImage.src = middleRightImage;

      // Draw when all images are loaded
      Promise.all([
        new Promise(resolve => logo.onload = resolve),
        new Promise(resolve => bgImage.onload = resolve),
        new Promise(resolve => blImage.onload = resolve),
        new Promise(resolve => mrImage.onload = resolve)
      ]).then(() => {
        // Draw background
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

        // Function to draw image with white frame
        const drawImageWithFrame = (img, x, y, width, height, frameWidth = 5) => {
          ctx.fillStyle = 'white';
          ctx.fillRect(x - frameWidth, y - frameWidth, width + 2 * frameWidth, height + 2 * frameWidth);
          ctx.drawImage(img, x, y, width, height);
        };

        // Draw logo without white frame and with smaller width
        ctx.drawImage(logo, 0, 0, 80, 40);

        // Draw bottom left image with white frame
        drawImageWithFrame(blImage, 10, canvas.height - 150, 200, 140);

        // Draw middle right image (tilted) with white frame
        ctx.save();
        ctx.translate(canvas.width - 200, canvas.height / 2);
        ctx.rotate(Math.PI / 20);
        drawImageWithFrame(mrImage, -100, -75, 200, 150);
        ctx.restore();

        // Draw comment text
        ctx.font = '16px Arial';
        ctx.fillStyle = 'white';
        const maxWidth = 300; // Leaving 20px margin on each side
        const words = selectedPerson.cam_nghi.split(' ');
        let line = '';
        let y = canvas.height / 3; // Changed from canvas.height / 2 to canvas.height / 3
        
        for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            
            if (testWidth > maxWidth && i > 0) {
                ctx.fillText(line, 20, y);
                line = words[i] + ' ';
                y += 25; // Adjust line height as needed
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, 20, y);

        // Draw name text
        ctx.font = 'bold 20px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(selectedPerson.ten, canvas.width - 250, canvas.height - 50);
      });
    }
  }, [selectedPerson]);

  const handleBack = () => {
    navigate('/mux/choose-person', { state: { nameCity: nameCity } });
  };

  return (
    <div className="choose-background">
      <Button 
        variant="contained" 
        color="primary" 
        className="mui-button"
        disabled
      >
        {nameCity}
      </Button>
      <Box className="canvas-container">
        <canvas ref={canvasRef}></canvas>
      </Box>
      <Button 
        variant="contained" 
        color="secondary" 
        className="mui-button"
        onClick={handleBack}
      >
        TRỞ LẠI
      </Button>
    </div>
  );
}

export default CommentPerson;