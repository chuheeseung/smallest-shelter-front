import React from 'react';
import style from "./ChatHistory.module.css";
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';

function ChatHistoryList({ messageId, message, sentUser, receivedUser, checkedItems, handleSingleChange, clicked, isRead }) {
  return (
    <div className={style.listWrap} style={{color: isRead && '#969696'}}>
      <label>
        <input 
          type="checkbox" 
          value={messageId} 
          checked={checkedItems.includes(messageId) ? true : false}
          onChange={(e) => handleSingleChange(e.target.checked, e.target.value)}
          style={{display: 'none'}}
        />
        {checkedItems.includes(messageId) ? <GrCheckboxSelected/> : <GrCheckbox/>}
      </label>
      <span style={{marginRight: '240px', marginLeft: '70px'}}>
        {clicked === "sent" ? `${receivedUser.name}` : `${sentUser.name}`}
      </span>
      <span>{message}</span>
    </div>
  );
}

export default ChatHistoryList;