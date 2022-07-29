import React from 'react';
import style from './ChatPage.module.css'

function Message({ message, sentUser, receivedUser }) {
  const currUserId = 'JNVe6U0iGlP4A5Pm65UfXgZju0Z2';  // 현재 사용자 id (나중에 리코일로 가져올 것)

  const isMessageMine = (sentUser) => {
    return currUserId === sentUser.id;
  }

  return (
    <div className={style.messageContainer} style={{ justifyContent: isMessageMine(sentUser) && "flex-end" }}>
      {!isMessageMine(sentUser) &&
        <img
          style={{ borderRadius: '50%', marginRight: '8px' }}
          width={32}
          height={32}
          className="mr-3"
          src={sentUser.image}
          alt={sentUser.name}
        />
      }
      <div className={style.userInfo}>
        {!isMessageMine(sentUser) && <p className={style.userName}>{sentUser.name}</p>}
        <div className={style.message} style={{ backgroundColor: isMessageMine(sentUser) && "#ECECEC" }}>
          <p>{message}</p>
        </div>
      </div>
    </div>
  )
}

export default Message;
