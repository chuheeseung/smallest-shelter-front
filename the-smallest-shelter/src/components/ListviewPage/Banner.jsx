import React from 'react';
import style from './Banner.module.css';
import BannerImage from '../../assets/img/banner.png'; 

function Banner() {
  return (
    <>
      <img 
        className={style.bannerImage} 
        src={BannerImage} 
        alt={BannerImage}
      />
    </>
  )
}

export default Banner;