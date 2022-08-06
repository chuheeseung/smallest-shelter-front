import React, { useState } from 'react';
import { dbService, storeService } from '../../fbase';
import { child, push, ref, set } from 'firebase/database';
import style from './ChatPage.module.css';
import { CgSmile } from 'react-icons/cg';
import { BiRightArrowAlt } from 'react-icons/bi';
import { addDoc, collection } from 'firebase/firestore';

function ChatForm() {
  const messagesRef = ref(dbService, "messages");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const currUser = {
    "id": "JNVe6U0iGlP4A5Pm65UfXgZju0Z2",
    "image": "http://gravatar.com/avatar/ba97c141500abffb0aee54dbcaee59ff?d=identicon",
    "name": "입양희망자"
  };
  const user = {
    "id": "VRHxfEj1c1g0pbsAiYut1x2VzvP2",
    "image": "http://gravatar.com/avatar/0f7c362b0125aaff368169c8acc4dd39?d=identicon",
    "name": "유행사"
  }

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

  const chatRoomId = getChatRoomId(currUser, user);

  function getChatRoomId(currUser, user) {
    const currUserId = currUser.id
    const userId = user.id
    return userId < currUserId
      ? `${userId}-${currUserId}`
      : `${currUserId}-${userId}`
  }

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
        id: user.id,
        name: user.name,
        image: user.image
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
      // firestore 저장
      await addDoc(collection(storeService, chatRoomId), createMessage())
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
      <form onSubmit={handleSubmit}>
        <div className={style.inputWrap}>
          <CgSmile size={24}/>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="메시지 입력..."
          />
          {content && <BiRightArrowAlt size={24} onClick={handleSubmit}/>}
        </div>
        <div>
      </div>
      </form>
    </div>
  );
}

export default ChatForm;