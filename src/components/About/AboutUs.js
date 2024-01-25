import React from 'react';
import './AboutUs.css';

const AboutUsPage = () => {
  return (
    <div className="aboutus-container">
      <div className='aboutus-header'>
        <h1>About Us</h1>
      </div>
      <div className='aboutus-main'>
        <div className='aboutus-section'>
          <h2>Welcome to Our Store</h2>
          <p>We are a premier women's fashion store dedicated to providing high-quality clothing, accessories, and footwear to women of all ages.</p>
        </div>

        <div className='aboutus-section'>
          <h2>Our Mission</h2>
          <p>At our store, our mission is to empower women to express their unique style and confidence through our curated collection of fashionable and trendy clothing.</p>
        </div>

        <div className='aboutus-section'>
          <h2>Our Commitment</h2>
          <p>We are committed to delivering exceptional customer service and ensuring that every woman who shops with us has a positive and enjoyable experience. Our team of fashion experts is always ready to assist you in finding the perfect outfit.</p>
        </div>

        <div className='aboutus-section'>
          <h2>Visit Our Store</h2>
          <p>Explore our wide range of products in person by visiting our store located at:</p>
          <address>
            123 Fashion Avenue<br />
            City, State, ZIP
          </address>
        </div>
      </div>

      <div className='aboutus-footer'>
        <p style={{ fontSize: '13px' }}>&copy; 2023 Women's Fashion Store. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AboutUsPage;
