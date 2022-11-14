import React from 'react';
import style from './Chat.module.css';

function ChatHeader({organization, animalName}) {
  return (
    <div className={style.headerWrap}>
      {/* 이름 클릭하면 유행사 디테일 페이지로 넘어감 */}
      <span>{organization.name} ({animalName})</span>
    </div>
  );
}

export default ChatHeader;