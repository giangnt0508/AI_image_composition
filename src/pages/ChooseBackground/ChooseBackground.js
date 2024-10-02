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
import { requestFullscreen } from '../../commonFunction/fullscreenUtils';

function ChooseBackground() {
  const navigate = useNavigate();

  const handleBackgroundSelect = (selectedImage, folder) => {
    requestFullscreen();
    navigate('/type-of-car', { state: { background: selectedImage, folder: folder } });
  };

  const handleBack = () => {
    requestFullscreen();
    navigate('/main-page');
  };

  const images = [option1, option2, option3, option4, option5, option6];
  const folders = ['option1', 'option2', 'option3', 'option4', 'option5', 'option6'];

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
                onClick={() => handleBackgroundSelect(img, folders[index])}
            >
                <img src={img} alt={`Option ${index + 1}`} />
            </div>
            ))}
        </div>
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

export default ChooseBackground;