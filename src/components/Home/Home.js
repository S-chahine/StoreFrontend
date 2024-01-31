import React from 'react'
import './Home.css';
import promo from '../../public/assets/images/promotions/promotion.webp';

const Home = () => {
  return (
    <div className='home-container'>

      <img src={promo} className="sale-image" alt="Promotion" ></img>

      <a href="http://www.freepik.com">Designed by rawpixel.com / Freepik</a>


    </div>
  )
}

export default Home

