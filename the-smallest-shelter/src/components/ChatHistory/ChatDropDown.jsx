import React, {useState} from 'react';
import style from "./ChatHistory.module.css";
import { GrFormClose } from 'react-icons/gr';
import { dbService } from '../RegisterPage/fbase';
import { child, push, ref, set } from 'firebase/database';
import userIcon from '../assets/img/Ellipse 36.png';
import { useLocation } from 'react-router-dom';

function ChatDropDown() {
  const [msg, setMsg] = useState("");
  const messagesRef = ref(dbService, "messages");
  const currentUserId = '1234curr';
  const userId = '5678user';
  const ChatRoomId = `${currentUserId}${userId}`;
  const {pathname} = useLocation();

  const createMessage = () => {
    const message = {
      timestamp: new Date(),
      user: {
        id: currentUserId,
        name: '사용자 이름',
        image: userIcon
      }
    }
    if (msg !== null) message["content"] = msg;
    console.log(message)
    return message;
  }

  const handleSubmit = async () => {
    try {
      await set(push(child(messagesRef, ChatRoomId)), createMessage());
      setMsg("");
      // 쪽지 보내는 주소로 새로고침 
      window.location.replace(`${pathname}`)
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className={style.dropdownWrap}>
        <div className={style.title}>
          <span>쪽지 보내기</span>
          <GrFormClose size={24}/>
        </div>
        <div className={style.messageForm}>
          <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="내용"/>
          <input className={style.submitBtn} type="submit" value="보내기" onClick={handleSubmit}/> 
        </div>
      </div>
    </div>
  );
}

export default ChatDropDown;
