import React from 'react';
import logo from '../images/logo.png';
import imageBackground from '../images/isuzu-background.png';
import '../styles/global.css';

function Layout({ children }) {
  return (
    <div className="layout">
      <img src={logo} alt="ISUZU LIFESTYLE" className="logo" />
      {children}
      <div className="background-image">
        <img src={imageBackground} alt="Isuzu background" />
      </div>
    </div>
  );
}

export default Layout;