import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { dbService, storeService } from '../../fbase';
import style from "./ChatHistory.module.css";
import ChatHistoryList from './ChatHistoryList';
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';
import dummy from '../ChatPage/DirectMessageData.json';
import { collection, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { onValue, ref } from 'firebase/database';

function ChatHistory() {
  const [messages, setMessages] = useState([]); // 모든 쪽지 내역
  const [message, setMessage] = useState([]);  // 받은/보낸 쪽지 내역
  const [clicked, setClicked] = useState("received");  // 받은/보낸 쪽지 클릭 시 색 변경을 위해 (default: 받는 쪽지)
  const [clickRead, setClickRead] = useState(false);  // 읽음 처리 
  const [checkedItems, setCheckedItems] = useState([]); // 쪽지 전체 선택/해제

  const chatRoomId = Object.keys(dummy)[0]// (userId-currentUserId) 지금은 하나라 0번 인덱스만 접근
  const currUserId = 'JNVe6U0iGlP4A5Pm65UfXgZju0Z2';  // 현재 사용자 id
  const userId = chatRoomId.split('-').filter(e => e !== currUserId).join();

  useEffect(() => { 
    const q = query(collection(storeService, chatRoomId), orderBy("time", "desc"));
    // time 기준으로 정렬한 쿼리 컬렉션
    onSnapshot(q, (snapshot) => {
      const messagesArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      getMessage(messagesArray);
      setMessages(messagesArray);
    })
  }, [])
  
  // default가 받은 쪽지 탭이라 받은 쪽지 목록 보여줌
  const getMessage = (messages) => {
    const messageArr = messages.filter(e => e.sentUser.id !== currUserId);
    setMessage(messageArr)
  }

  const handleReceivedChat = () => {
    setCheckedItems([])
    setClicked("received");
    let tmp = messages.filter(e => e.sentUser.id !== currUserId);
    setMessage(tmp);
  }

  const handleSentChat = () => {
    setCheckedItems([])
    setClicked("sent");
    let tmp = messages.filter(e => e.sentUser.id === currUserId);
    setMessage(tmp);
  }

  const onCheckAll = (checked) => {
    if (checked) {
      const checkedChat = [];
      message.forEach(data => checkedChat.push(data.id));
      setCheckedItems(checkedChat);
    } else {
      setCheckedItems([]);
    }
  }

  const handleSingleChange = (checked, id) => {
    if (checked) {
      setCheckedItems([...checkedItems, id]);
    } else {
      setCheckedItems(checkedItems.filter((el) => el !== id));
    }
  }

  const handleReadCheck = (e) => {
    e.preventDefault();
    checkedItems.map((id) => {
      const ref = doc(storeService, chatRoomId, id);
      updateDoc(ref, {
        checked: true
      })
    })
    setClicked("received");
    setClickRead(prev => !prev);
    setCheckedItems([]);
  }

  return (
    <div>
      <div className={style.listContainer}>
        <div className={style.listHeader}>
          <div style={{ fontWeight: 'bold' }}>
            <span>쪽지 목록</span>
            {clicked === 'received' &&
              <span style={{
                color: checkedItems.length > 0 ? 'black' : '#969696', marginLeft: '8px'
              }}
                onClick={handleReadCheck}>읽음</span>}
          </div>
          <div style={{ fontWeight: 'bold', color: '#969696' }}>
            <span
              style={{ marginRight: '32px', color: clicked === 'received' && 'black' }}
              onClick={handleReceivedChat}>받은 쪽지</span>
            <span
              style={{ color: clicked === 'sent' && 'black' }}
              onClick={handleSentChat}>보낸 쪽지</span>
          </div>
        </div>
        <div className={style.listInfo}>
          <label>
            <input
              style={{ display: 'none' }}
              type="checkbox"
              onChange={(e) => onCheckAll(e.target.checked)}
              checked={message.length > 0 && checkedItems.length > 0 && checkedItems.length == message.length ? true : false}
            />
            {message.length > 0 && checkedItems.length > 0 && checkedItems.length == message.length ? <GrCheckboxSelected /> : <GrCheckbox />}
          </label>
          <span style={{ fontWeight: 'bold', marginRight: '250px', marginLeft: '70px' }}>
            {clicked === 'sent'
              ? '받는 사람'
              : '보낸 사람'
            } </span>
          <span style={{ fontWeight: 'bold' }}>내용</span>
        </div>


        {message.length > 0 &&
          message.map((message, idx) => (
            <ChatHistoryList
              key={idx}
              message={message.content}
              sentUser={message.sentUser}
              receivedUser={message.receivedUser}
              messageId={message.id}
              checkedItems={checkedItems}
              handleSingleChange={handleSingleChange}
              clicked={clicked}
              isRead={message.checked}
            />
          ))
        }
      </div>
    </div>
  );
}

export default ChatHistory;