import React from 'react';
import logo from '../images/logo.png';
import imageBackground from '../images/isuzu-background.png';
import '../styles/global.css';

function Layout({ children }) {
  return (
    <div className="layout">
      <img src={logo} alt="ISUZU LIFESTYLE" className="logo" />
      {children}
      <div className="decorative-elements">
        <img src={imageBackground} alt="Isuzu car" className="car-image" />
      </div>
    </div>
  );
}

export default Layout;