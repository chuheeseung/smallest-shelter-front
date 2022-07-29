import React from 'react';
import style from './Footer.module.css';

function Footer() {
  return (
    <div className={style.footerWrap}>
      <span>세작소</span>
      <span>팀 소개</span>
      <span>문의</span>
    </div>
  );
}

export default Footer;