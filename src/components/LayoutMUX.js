import React from 'react';
import logoIsuzu from '../images/logo-isuzu.png';
import imageBackground from '../images/VetDo.png';
import '../styles/global.css';

function LayoutMUX({ children }) {
  return (
    <div className="layout-map">
      <div className="content">
        <div className="logo-container-map">
        <img src={logoIsuzu} alt="ISUZU logoIsuzu" className="logo-map" />
        </div>
        {children}
      </div>
        <img src={imageBackground} alt="Isuzu background" className="background-image-mux" />

    </div>
  );
}

export default LayoutMUX;