import React from 'react';
import { Button } from '@mui/material';
// Import images
import option1 from '../../images/option1.jpg';
import option2 from '../../images/option2.jpg';
import option3 from '../../images/option3.jpg';
import option4 from '../../images/option4.jpg';
import option5 from '../../images/option5.jpg';
import option6 from '../../images/option6.jpg';
import { useNavigate } from 'react-router-dom';
import './ChooseBackground.css';

function ChooseBackground() {
  const navigate = useNavigate();

  const handleBackgroundSelect = (selectedImage) => {
    navigate('/type-of-car', { state: { background: selectedImage } });
  };

//   const handleBack = () => {
//     // Implement back functionality
//     console.log('Back button clicked');
//   };

  const images = [option1, option2, option3, option4, option5, option6];

  return (
    <div className="choose-background">
        <Button 
            variant="contained" 
            color="primary" 
            className="mui-button"
            disabled
        >
            Chọn khung cảnh bạn yêu thích
        </Button>
        <div className="image-grid">
            {images.map((img, index) => (
            <div 
                key={index} 
                className="image-grid-item" 
                onClick={() => handleBackgroundSelect(img)}
            >
                <img src={img} alt={`Option ${index + 1}`} />
            </div>
            ))}
        </div>
    {/* <Button 
        variant="contained" 
        color="secondary" 
        className="mui-button"
        onClick={handleBack}
    >
        TRỞ LẠI
    </Button> */}
    </div>
  );
}

export default ChooseBackground;