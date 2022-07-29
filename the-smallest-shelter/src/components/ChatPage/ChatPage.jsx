import React, { useEffect, useState } from 'react';
import dummy from './DirectMessageData.json';
import Message from './Message';
import style from './ChatPage.module.css';
import ChatHeader from './ChatHeader';
import ChatForm from './ChatForm';
import { dbService, storeService } from '../../fbase';
import { child, DataSnapshot, onChildAdded, ref } from 'firebase/database';
import { useParams } from 'react-router-dom';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

function ChatPage() {
  const {chatRoomId} = useParams();
  const messagesRef = ref(dbService, "messages");
  const [messages, setMessages] = useState([]); // 모든 쪽지 내역
  const [messagesLoading, setMessagesLoading] = useState(true);
  const currUserId = 'JNVe6U0iGlP4A5Pm65UfXgZju0Z2';  // 현재 사용자 id
  const userId = chatRoomId.split('-').filter(e => e !== currUserId).join();

  // 상대 정보 (리코일 사용할 것)
  const user = {
    id: userId,
    name: "유행사",
    image: "http://gravatar.com/avatar/0f7c362b0125aaff368169c8acc4dd39?d=identicon"
  }

  // useEffect(() => {
  //   addMessagesListeners(chatRoomId)
  // }, [])

  // const addMessagesListeners = (chatRoomId) => {
  //   let messagesArray = [];
  //   onChildAdded(child(messagesRef, chatRoomId), DataSnapshot => {
  //     messagesArray.push(DataSnapshot.val());
  //     setMessages(messagesArray);
  //     setMessagesLoading(false);
  //   })
  // }

  useEffect(() => {
    const q = query(collection(storeService, chatRoomId), orderBy("time"));
    onSnapshot(q, (snapshot) => {
      const messagesArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesArray);
    })
  }, [])

  return (
    <div className={style.chatContainer}>
      <ChatHeader user={user}/>
      <div className={style.chatWrap} style={{height: !messages.length && '200px'}}>
        {messages.length > 0 &&
          messages.map((message) => (
            <Message
              key={message.messageId}
              message={message.content}
              sentUser={message.sentUser}
              receivedUser={message.receivedUser}
            />
          ))
        }
      </div>
      <ChatForm/>
    </div>
  );
}

export default ChatPage;