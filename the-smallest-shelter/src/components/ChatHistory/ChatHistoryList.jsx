import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import style from "./ChatHistory.module.css";
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';

function ChatHistoryList({ message, sentUser, receivedUser, checkedItems, handleSingleChange, clicked }) {
  return (
    <div className={style.listWrap}>
      <label>
        <input 
          type="checkbox" 
          value={message} 
          checked={checkedItems.includes(message) ? true : false}
          onChange={(e) => handleSingleChange(e.target.checked, e.target.value)}
          style={{display: 'none'}}
        />
        {checkedItems.includes(message) ? <GrCheckboxSelected/> : <GrCheckbox/>}
      </label>
      <span style={{marginRight: '240px', marginLeft: '70px'}}>
        {clicked === 'sent' ? `${receivedUser.name}` : `${sentUser.name}`}
      </span>
      <span>{message}</span>
    </div>
  );
}

export default ChatHistoryList;