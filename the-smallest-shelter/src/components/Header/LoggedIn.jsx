import React, { useEffect, useState } from "react"
import { Badge, Dropdown, Space } from 'antd';
import { AiOutlineDown } from 'react-icons/ai';
import style from "./LoggedIn.module.css";
import userIcon from '../../assets/img/Ellipse 36.png';
import { Link } from "react-router-dom";
import { storeService } from '../../fbase';
import dummy from '../Chat/DirectMessageData.json';
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { useRecoilValue, useRecoilState } from "recoil";
import { LoginRole, LoginState, LoginUserId, LoginUserName, LoginUserOrgName } from "../../states/LoginState";
import { Received } from "../../states/ChatState";

function LoggedIn() {
  const [msgCnt, setMsgCnt] = useState(0);
  const [messages, setMessages] = useState([]); // check가 false인 쪽지 내역

  const chatRoomId = Object.keys(dummy)[0]// (userId-currentUserId) 지금은 하나라 0번 인덱스만 접근
  const currUserId = 'JNVe6U0iGlP4A5Pm65UfXgZju0Z2';  // 현재 사용자 id
  const userId = chatRoomId.split('-').filter(e => e !== currUserId).join();
  
  const loginUserName = useRecoilValue(LoginUserName);
  const loginRole = useRecoilValue(LoginRole);
  const loginUserOrgName = useRecoilValue(LoginUserOrgName);
  const received = useRecoilValue(Received);

  useEffect(() => {
    // 받은 쪽지 중 checked가 false인 message Array
    // console.log(received)
    //const messageArray = received.filter((chat) => !chat.checked)
    // console.log(messageArray)
    //setMessages(messageArray);
    //setMsgCnt(messageArray.length);
    // const q = query(collection(storeService, chatRoomId), where('sentUser.id', "not-in", [currUserId]));
    // onSnapshot(q, (snapshot) => {
    //   const all = snapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data(),
    //   }));
    //   const messageArray = all.filter(e => !e.checked)
    //   setMessages(messageArray);
    //   setMsgCnt(messageArray.length);
    // })
  }, [])

  return (
    <div>
      {/* <Link to="/mypage"> <Badge count={msgCnt} size="small" color="red">
        <span>쪽지</span>
      </Badge></Link>

      <span style={{ margin: "0 24px", fontWeight: "bold" }}>|</span> */}

      <Dropdown overlay={<Content loginUserName={loginUserName} loginRole={loginRole} loginUserOrgName={loginUserOrgName}/>} placement="bottomLeft">
        <Space style={{ verticalAlign: "middle" }}>
          <span>{loginUserName}님</span>
          <AiOutlineDown />
        </Space>
      </Dropdown>
    </div>
  )
};

const Content = ({loginUserName, loginRole, loginUserOrgName}) => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  let sessionStorage = window.sessionStorage;

  const handleLogOut = () => {
    console.log(isLoggedIn);

    sessionStorage.removeItem('id');
    sessionStorage.removeItem('pw');
    setIsLoggedIn(false);
    // window.location.href = '/';
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
            {loginRole==='ORGANIATION' ? `단체 (${loginUserOrgName})` : '개인'}
          </p>
        </div>
      </div>
      <div className={style.tabWrap}>
        <Link to="/mypage" style={{color: 'black'}}><p>마이페이지</p></Link>
        <p onClick={handleLogOut}>로그아웃</p>
      </div>
    </div>
  )
}

export default LoggedIn