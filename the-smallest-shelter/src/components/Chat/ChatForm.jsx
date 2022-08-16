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
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // 임시 (유행사로 로그인 했을 때)
  // const user = {
  //   "id": "JNVe6U0iGlP4A5Pm65UfXgZju0Z2",
  //   "image": "http://gravatar.com/avatar/ba97c141500abffb0aee54dbcaee59ff?d=identicon",
  //   "name": "입양희망자"
  // };
  // const currUser = {
  //   "id": "VRHxfEj1c1g0pbsAiYut1x2VzvP2",
  //   "image": "http://gravatar.com/avatar/0f7c362b0125aaff368169c8acc4dd39?d=identicon",
  //   "name": "유행사"
  // }

  const createMessage = () => {
    const message = {
      content: content,
      time: Date.now(),
      sentUser: {
        id: currUser.id,
        name: currUser.name,
        image: currUser.image
      },
      receivedUser: {
        id: userId,
        name: "받는 사람 이름",
        image: '받는 사람 이미지'
       // name: organization.orgName,
        //image: organization.orgImg
      },
      checked: false,
    }
    return message;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content) {
      setErrors(prev => prev.concat("Type contents first"));
      return;
    }
    setLoading(true);
    try {
      // realtime database 저장
      await set(push(child(messagesRef, chatRoomId)), createMessage());
      setLoading(false);
      setContent("");
      setErrors([]);
    } catch (error) {
      setErrors(prev => prev.concat(error.message));
      setLoading(false);
      setTimeout(() => {
        setErrors([]);
      }, 5000)
    }
  }

  return (
    <div className={style.chatForm}>
      <div className={style.icon}><CgSmile size={21} color="gray" /></div>
      <form onSubmit={handleSubmit}>
        <div className={style.inputWrap}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="보낼 메시지를 입력하세요"
            style={{ resize: 'none' }}
          />
          {content && <button className={style.btn} onClick={handleSubmit}>전송</button>}
        </div>
        <div>
        </div>
      </form>
    </div>
  );
}

export default ChatForm;