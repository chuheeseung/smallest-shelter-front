import React from 'react';
import style from "./Header.module.css";
import { Link } from 'react-router-dom';
import logo from '../../assets/img/Group8700.png';
import LoggedIn from './LoggedIn';
import { useRecoilValue } from 'recoil';
import { LoginRole, LoginState } from '../../states/LoginState';

function Header() {
  const loginState = useRecoilValue(LoginState);
  const loginRole = useRecoilValue(LoginRole);

  return (
    <div className={style.headerWrap}>
      <div className={style.headerLogo}>
        <Link to='/'><img src={logo} style={{ width: "32px", margin: "0 8px 0 24px"}}/></Link>
        <Link to="/" style={{color: "black", textDecoration: "none",fontSize: "20px", fontWeight: "normal"}}>
          <span style={{marginRight: "24px"}}>세작소</span>
        </Link>

        {loginRole === "ORGANIZATION" &&  <Link to='/register' style={{ textDecoration: "none", color: "black",fontSize: "14px" }}>등록하기</Link>}
      </div>

      <div className={style.headerRight}>
        {loginState ? <LoggedIn/> : <NotLoggedIn/>}
      </div>
    </div>
  );
}

const NotLoggedIn = () => {
  return (
    <div>
      <Link to="/signin" style={{color: 'black'}}><span>로그인</span></Link>
      <span style={{ margin: "0 24px", fontWeight: "bold" }}>|</span>
      <Link to="/signup" style={{color: 'black'}}><span>회원가입</span></Link>
    </div>
  )
};

export default Header;