import React from 'react';
import { Button } from '@mui/material';
// Import images
import defaultPerson from '../../images/default-person.jpg';
import { useNavigate, useLocation } from 'react-router-dom';
import './ChoosePerson.css';
// Import commentPeople data
import commentPeople from './commentPeople.json';
import { requestFullscreen } from '../../commonFunction/fullscreenUtils';
import { LazyLoadImage } from 'react-lazy-load-image-component';


import imageDai from '../CommentPerson/image/Dai.png';
import imageDaoAnhPhi from '../CommentPerson/image/DaoAnhPhi.png';
import imageHiep from '../CommentPerson/image/Hiep.png';
import imageLyManhHung from '../CommentPerson/image/LyManhHung.png';
import imageNghiemGiaHy from '../CommentPerson/image/NghiemGiaHy.png';
import imageNguyenNgocThanh from '../CommentPerson/image/NguyenNgocThanh.png';
import imageNguyenVanDuy from '../CommentPerson/image/NguyenVanDuy.png';
import imageThanh from '../CommentPerson/image/Thanh.png';
import imageTranQuocDat from '../CommentPerson/image/TranQuocDat.png';

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
                <LazyLoadImage 
                    src={
                        person.ten === "Anh Đại" ? imageDai :
                        person.ten === "Anh Đào Ánh Phi" ? imageDaoAnhPhi :
                        person.ten === "Anh Hiệp" ? imageHiep :
                        person.ten === "Anh Lý Mạnh Hùng" ? imageLyManhHung :
                        person.ten === "Anh Nghiêm Gia Hỷ" ? imageNghiemGiaHy :
                        person.ten === "Anh Nguyễn Ngọc Thạnh" ? imageNguyenNgocThanh :
                        person.ten === "Anh Nguyễn Văn Duy" ? imageNguyenVanDuy :
                        person.ten === "Anh Thành" ? imageThanh :
                        person.ten === "Anh Trần Quốc Đạt" ? imageTranQuocDat :
                        defaultPerson // fallback image
                    } 
                    alt={person.ten} 
                    className="image-choose-person"
                    effect="blur" 
                />
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