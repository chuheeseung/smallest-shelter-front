import React, { useEffect, useState } from "react"
import { Badge, Dropdown, Space } from 'antd';
import { AiOutlineDown } from 'react-icons/ai';
import style from "./LoggedIn.module.css";
import userIcon from '../../assets/img/Ellipse 36.png';
import { Link } from "react-router-dom";
import { storeService } from '../../fbase';
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { useRecoilValue, useRecoilState } from "recoil";
import { 
  LoginState, 
  LoginRole, 
  LoginUserIdx, 
  LoginUserName, 
  LoginUserId, 
  LoginUserPw, 
  LoginUserToken, 
  LoginUserOrgName, 
  LoginImageIndex
} from '../../states/LoginState';

function LoggedIn() {
  const loginUserName = useRecoilValue(LoginUserName);
  const loginRole = useRecoilValue(LoginRole);
  const loginUserOrgName = useRecoilValue(LoginUserOrgName);

  return (
    <div>
      <Dropdown overlay={<Content loginUserName={loginUserName} loginRole={loginRole} loginUserOrgName={loginUserOrgName} />} placement="bottomRight">
        <Space style={{ verticalAlign: "middle" }}>
          <span>{loginUserName}님</span>
          <AiOutlineDown />
        </Space>
      </Dropdown>
    </div>
  )
};

const Content = ({ loginUserName, loginRole, loginUserOrgName }) => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [isRole, setIsRole] = useRecoilState(LoginRole);
  const [isUserIdx, setIsUserIdx] = useRecoilState(LoginUserIdx);
  const [isUserName, setIsUserName] = useRecoilState(LoginUserName);
  const [savedLoginId, setSavedLoginId] = useRecoilState(LoginUserId);
  const [savedLoginPw, setSavedLoginPw] = useRecoilState(LoginUserPw);
  const [savedUserToken, setSavedUserToken] = useRecoilState(LoginUserToken);
  const [userOrgName, setUserOrgName] = useRecoilState(LoginUserOrgName);
  const [loginImageIndex, setLoginImageIndex] = useRecoilState(LoginImageIndex);

  let sessionStorage = window.sessionStorage;

  const handleLogOut = () => {
    sessionStorage.removeItem("userIdx");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("organizationName");
    sessionStorage.removeItem("bearer_token");

    setIsLoggedIn(false);
    setIsUserIdx(0);
    setIsRole("");
    setIsUserName("");
    setUserOrgName("");
    setSavedLoginId("");
    setSavedLoginPw("");
    setSavedUserToken("");
    setLoginImageIndex(0);

    console.log("로그아웃");

    window.location.href = '/';
  };

  return (
    <div className={style.dropdownWrap}>
      <div className={style.userInfoWrap}>
        <div className={style.userIcon}>
          <img src={userIcon} style={{ width: "48px" }} />
        </div>
        <div className={style.userInfo}>
          <p style={{ fontSize: "16px", color: "black", fontWeight: "bold" }}>{loginUserName}</p>
          <p style={{ fontSize: "12px", color: "#969696" }}>
            {loginRole === 'ORGANIZATION' ? `단체 (${loginUserOrgName})` : '개인'}
          </p>
        </div>
      </div>
      <div className={style.tabWrap}>
        <Link to="/mypage" style={{ color: 'black' }}><p>마이페이지</p></Link>
        <p onClick={handleLogOut}>로그아웃</p>
      </div>
    </div>
  )
}

export default LoggedIn