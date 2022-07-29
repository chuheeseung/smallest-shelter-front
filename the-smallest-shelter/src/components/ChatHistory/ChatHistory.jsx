import { child, DataSnapshot, onChildAdded, ref } from 'firebase/database';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { dbService } from '../../fbase';
import style from "./ChatHistory.module.css";
import ChatHistoryList from './ChatHistoryList';
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';
import dummy from '../ChatPage/DirectMessageData.json';

function ChatHistory() {
  const [messages, setMessages] = useState([]); // 모든 쪽지 내역
  const [message, setMessage] = useState([]);  // 받은/보낸 쪽지 내역
  const [clicked, setClicked] = useState("sent");  // 받은/보낸 쪽지 클릭 시 색 변경을 위해 (default: 보낸 쪽지)
  const [checkedItems, setCheckedItems] = useState([]); // 쪽지 전체 선택/해제

  const messagesRef = ref(dbService, "messages");

  const chatRoomId = Object.keys(dummy)[0]// (userId-currentUserId) 지금은 하나라 0번 인덱스만 접근
  const currUserId = 'JNVe6U0iGlP4A5Pm65UfXgZju0Z2';  // 현재 사용자 id
  const userId = chatRoomId.split('-').filter(e => e !== currUserId).join();

  useEffect(() => {
    addMessagesListeners(chatRoomId)
  }, [])

  const addMessagesListeners = (chatRoomId) => {
    let messagesArray = [];
    let chatArr = [];
    onChildAdded(child(messagesRef, chatRoomId), DataSnapshot => {
      messagesArray.push(DataSnapshot.val());
      if (DataSnapshot.val().sentUser.id === currUserId) {
        chatArr.push(DataSnapshot.val());
        setMessage(chatArr);
        console.log(chatArr)
      }
      setMessages(messagesArray);  
    })

  }

  // useEffect(() => {
  //   let tmp = [];
  //   let chatArr = [];
  //   for (var i in dummy[chatRoomId]) {
  //     tmp.push(dummy[chatRoomId][i]);
  //     if (dummy[chatRoomId][i].sentUser.id === currUserId) {
  //       chatArr.push(dummy[chatRoomId][i]);
  //     }
  //   }
  //   setMessages(tmp);
  //   setMessage(chatArr)
  // }, [])

  const handleReceivedChat = () => {
    let tmp = messages.filter(e => e.sentUser.id !== currUserId);
    setMessage(tmp);
    setClicked("received");
    setCheckedItems([])
  }

  const handleSentChat = () => {
    let tmp = messages.filter(e => e.sentUser.id === currUserId);
    setMessage(tmp);
    setClicked("sent")
    setCheckedItems([])
  }

  const onCheckAll = (checked) => {
    if (checked) {
      const checkedChat = [];
      message.forEach(data => checkedChat.push(data.content));
      setCheckedItems(checkedChat);
    } else {
      setCheckedItems([]);
    }
  }

  const handleSingleChange = (checked, content) => {
    if (checked) {
      setCheckedItems([...checkedItems, content]);
    } else {
      setCheckedItems(checkedItems.filter((el) => el !== content));
    }
  }

  return (
    <div>
      <div className={style.listContainer}>
        <div className={style.listHeader}>
          <div style={{ fontWeight: 'bold' }}>쪽지 목록</div>
          <div style={{ fontWeight: 'bold', color: '#969696' }}>
            <span style={{ marginRight: '32px', color: clicked === 'received' && 'black' }} onClick={handleReceivedChat}>받은 쪽지</span>
            <span style={{ color: clicked === 'sent' && 'black' }} onClick={handleSentChat}>보낸 쪽지</span>
          </div>
        </div>
        <div className={style.listInfo}>
          <label>
            <input
              style={{ display: 'none' }}
              type="checkbox"
              onChange={(e) => onCheckAll(e.target.checked)}
              checked={checkedItems.length == message.length ? true : false}
            />
            {message.length > 0 && checkedItems.length == message.length ? <GrCheckboxSelected /> : <GrCheckbox />}
          </label>
          <span style={{ fontWeight: 'bold', marginRight: '250px', marginLeft: '70px' }}>
            {clicked === 'sent'
              ? '받는 사람'
              : '보낸 사람'
            } </span>
          <span style={{ fontWeight: 'bold' }}>내용</span>
        </div>


        {message.length > 0 &&
          message.map((message) => (
            <ChatHistoryList
              key={message.messageId}
              message={message.content}
              sentUser={message.sentUser}
              receivedUser={message.receivedUser}
              checkedItems={checkedItems}
              handleSingleChange={handleSingleChange}
              clicked={clicked}
            />
          ))
        }
      </div>
    </div>
  );
}

export default ChatHistory;