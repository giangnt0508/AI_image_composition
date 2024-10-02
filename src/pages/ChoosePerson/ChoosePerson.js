import React from 'react';
import { Button } from '@mui/material';
// Import images
import defaultPerson from '../../images/default-person.jpg';
import { useNavigate, useLocation } from 'react-router-dom';
import './ChoosePerson.css';
// Import commentPeople data
import commentPeople from './commentPeople.json';
import { requestFullscreen } from '../../commonFunction/fullscreenUtils';

function ChoosePerson() {
  const navigate = useNavigate();
  const location = useLocation();

  const nameCity = location.state?.nameCity;

  const handlePersonSelect = (person) => {
    requestFullscreen();
    navigate('/mux/comment-person', { state: { nameCity: nameCity, selectedPerson: person } });
  };

  const handleBack = () => {
    requestFullscreen();
    navigate('/mux');
  };

  // Get the list of people for the selected city
  const peopleList = commentPeople[nameCity] || [];

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
        <h1>Chọn nhân vật</h1>
        <div className="image-grid-pr">
            {peopleList.map((person, index) => (
            <div 
                key={index} 
                className="image-grid-item-pr" 
                onClick={() => handlePersonSelect(person)}
            >
                <img src={defaultPerson} alt={`Person ${index + 1}`} />
                <div className="person-name">{person.ten}</div>
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

export default ChoosePerson;