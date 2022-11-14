import React, { useState } from 'react';
import { dbService } from '../../fbase';
import { child, push, ref, set } from 'firebase/database';
import style from './Chat.module.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { LoginImageIndex, LoginUserId, LoginUserName } from '../../states/LoginState';
import { imageArr } from '../SignUpPage/InputForm';

function ChatForm({ chatRoomId, organization, userInfo, animalInfo }) {
  const messagesRef = ref(dbService, "messages");
  const [content, setContent] = useState("");

  const loginUserId = useRecoilValue(LoginUserId);
  const loginUserName = useRecoilValue(LoginUserName);
  const loginImageIndex = useRecoilValue(LoginImageIndex);

  const currUser = {
    "id": loginUserId,
    "image": imageArr[loginImageIndex],
    "name": loginUserName
  };

  const createMessage = () => {
    const message = {
      roomId: chatRoomId,
      animalInfo: animalInfo,
      content: content,
      time: Date.now(),
      sentUser: {
        id: currUser.id,
        name: currUser.name,
        image: currUser.image
      },
      checked: false,
    }
    if (organization === 'undefined') {
      message["receivedUser"] = {id: userInfo.id, name: userInfo.name, image: userInfo.image}
    } else {
      message["receivedUser"] = { 
      id: organization.id,
      name: organization.name,
      image: organization.image
      }
    }
    return message;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // realtime database 저장
      await set(push(child(messagesRef, chatRoomId)), createMessage());
      setContent("");
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={style.chatForm}>
      <form onSubmit={handleSubmit}>
        <div className={style.inputWrap}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="보낼 메시지를 입력하세요"
            style={{ resize: 'none' }}
          />
          <button className={style.btn} onClick={handleSubmit}>전송</button>
        </div>
        <div>
        </div>
      </form>
    </div>
  );
}

export default ChatForm;