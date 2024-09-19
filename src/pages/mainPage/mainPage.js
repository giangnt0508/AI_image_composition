import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../images/mainPage.jpg';
import './mainPage.css';

function MainPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/choose-background');
  };

  return (
    <div className="main-page" onClick={handleStart}>
      <img src={backgroundImage} alt="Background" className="background-image-main" />
    </div>
  );
}

export default MainPage;