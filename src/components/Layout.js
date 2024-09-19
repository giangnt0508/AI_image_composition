import React from 'react';
import logo from '../images/logo.png';
import imageBackground from '../images/isuzu-background.png';
import '../styles/global.css';

function Layout({ children }) {
  return (
    <div className="layout">
      <div className="content">
        <div className="logo-container">
          <img src={logo} alt="ISUZU LIFESTYLE" className="logo" />
        </div>
        {children}
      </div>
      <div className="background-image">
        <img src={imageBackground} alt="Isuzu background" />
      </div>
    </div>
  );
}

export default Layout;