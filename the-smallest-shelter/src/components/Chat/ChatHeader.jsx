import React from 'react';
import { useRecoilValue } from 'recoil';
import { Organization } from '../../states/ChatState';
import style from './Chat.module.css';

function ChatHeader() {
  // 디테일 페이지에서 채팅할 때
  const organization = useRecoilValue(Organization);
    
  return (
    <div className={style.headerWrap}>
      {/* 이름 클릭하면 유행사 디테일 페이지로 넘어감 */}
      <span>{organization.orgName}</span>
    </div>
  );
}

export default ChatHeader;