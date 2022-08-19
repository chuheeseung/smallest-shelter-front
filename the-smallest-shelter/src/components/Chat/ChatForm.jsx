import React, { useState } from 'react';
import { dbService } from '../../fbase';
import { child, push, ref, set } from 'firebase/database';
import style from './Chat.module.css';
import { CgSmile } from 'react-icons/cg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { LoginUserId, LoginUserName } from '../../states/LoginState';
import { Organization } from '../../states/ChatState';

function ChatForm({ chatRoomId }) {
  const messagesRef = ref(dbService, "messages");

  const [content, setContent] = useState("");

  const loginUserId = useRecoilValue(LoginUserId);
  const loginUserName = useRecoilValue(LoginUserName);
  
  //const organization = useRecoilValue(Organization);
  // 상대 계정 정보
  const userId = chatRoomId.split('-').filter(e => e !== loginUserId).join();

  const currUser = {
    "id": loginUserId,
    "image": "http://gravatar.com/avatar/ba97c141500abffb0aee54dbcaee59ff?d=identicon",
    "name": loginUserName
  };

  const createMessage = () => {
    const chatRoomId = getChatRoomId(loginUserId, userId);

    const message = {
      roomId: chatRoomId,
      content: content,
      time: Date.now(),
      sentUser: {
        id: currUser.id,
        name: currUser.name,
        image: currUser.image
      },
      receivedUser: {
        id: userId,
        name: "KARA",
        image: 'http://gravatar.com/avatar/ba97c141500abffb0aee54dbcaee59ff?d=identicon'
       // name: organization.orgName,
        //image: organization.orgImg
      },
      checked: false,
    }
    return message;
  }

  const getChatRoomId = (currUserId, userId) => {
    return userId < currUserId
      ? `${userId}-${currUserId}`
      : `${currUserId}-${userId}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // realtime database 저장
      await set(push(child(messagesRef, chatRoomId)), createMessage());
      setContent("");
    } catch (error) {
      console.log(error.message)
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