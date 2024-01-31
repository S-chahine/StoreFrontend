import React from 'react';
import logo from '../../public/assets/images/icons/logo.webp';
import './Header.css';

const Header = () => {
  return (
    <div className='header-container'>
      <header>
        <img src={logo} alt="Logo" />
      </header>
    </div>
  );
};

export default Header;
