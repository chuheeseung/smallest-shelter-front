import React from 'react';
import { useRecoilValue } from 'recoil';
import { Organization } from '../../states/ChatState';
import style from './Chat.module.css';

function ChatHeader(user) {
  // 디테일 페이지에서 채팅할 때
  const organization = useRecoilValue(Organization);

  // 채팅방 목록에서 클릭할 때
  let userInfo, userLen;
  if (user.length > 0) {
    userInfo = Object.values(user)[0];
    userLen = Object.keys(userInfo).length;
  }
    
  return (
    <div className={style.headerWrap}>
      {/* 이름 클릭하면 유행사 디테일 페이지로 넘어감 */}
      <span>{userLen > 0 ? user.user.name : organization.orgName}</span>
    </div>
  );
}

export default ChatHeader;