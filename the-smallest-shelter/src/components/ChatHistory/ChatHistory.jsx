import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { dbService, storeService } from '../../fbase';
import style from "./ChatHistory.module.css";
import ChatHistoryList from './ChatHistoryList';
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';
import { arrayRemove, collection, deleteDoc, doc, FieldValue, getDocs, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { onValue, push, ref } from 'firebase/database';
import { useRecoilState, useRecoilValue } from 'recoil';
import { LoginUserId } from '../../states/LoginState';
import { Received } from '../../states/ChatState';

function ChatHistory() {
  const [msgIdArr, setMsgIdArr] = useState([]); // 사용자가 포함되어 있는 채팅방 id
  const [messages, setMessages] = useState([]); // 사용자가 포함되어 있는 모든 쪽지 내역
  const [message, setMessage] = useState([]);  // 받은/보낸 쪽지 내역
  const [clicked, setClicked] = useState("received");  // 받은/보낸 쪽지 클릭 시 색 변경을 위해 (default: 받는 쪽지)
  const [clickRead, setClickRead] = useState(false);  // 읽음 처리 
  const [checkedItems, setCheckedItems] = useState([]); // 쪽지 전체 선택/해제

  const loginUserId = useRecoilValue(LoginUserId) // 현재 사용자 id
  const [received, setReceived] = useRecoilState(Received);
  // const userId = chatRoomId.split('-').filter(e => e !== loginUserId).join();

  useEffect(() => {
    const storeRef = query(collection(storeService, "chatRooms"))
    let idArr = [];
    let messageArray = [];
    
    // 사용자가 포함된 채팅방 id 배열
    onSnapshot(storeRef, (snapshot) => {
      snapshot.docs.map((doc) => {
        const chatRoomId = doc.id;
        if (chatRoomId.includes(loginUserId)) {
          idArr.push(chatRoomId);
        }  
      })
      // setMessages(messageArray);
      // getMessage(messageArray)
      setMsgIdArr(idArr);
      allMessage(idArr)
    })

    // const q = query(collection(storeService, chatRoomId), orderBy("time", "desc"));
    // // time 기준으로 정렬한 쿼리 컬렉션
    // onSnapshot(q, (snapshot) => {
    //   const messagesArray = snapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data(),
    //   }));
    //   // getMessages(messagesArray);
    //   getMessage(messagesArray);
    //   setMessages(messagesArray);
    // })
  }, [])

  const allMessage = (idArr) => {
    idArr.map(id => {
      const ref = doc(collection(dbService, "chatRooms", id, "messages"));
      const q = query(ref, where("sentUser.id", "==", loginUserId));
      console.log(q)
    })
  }

  // default가 받은 쪽지 탭이라 받은 쪽지 목록 보여줌
  const getMessage = (messages) => {
    const messageArr = messages.filter(e => e.sentUser.id !== loginUserId);
    setMessage(messageArr)
    setReceived(messageArr)
  }

  const handleReceivedChat = () => {
    setCheckedItems([])
    setClicked("received");
    let tmp = messages.filter(e => e.sentUser.id !== loginUserId);
    setMessage(tmp);
  }

  const handleSentChat = () => {
    setCheckedItems([])
    setClicked("sent");
    let tmp = messages.filter(e => e.sentUser.id === loginUserId);
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
    msgIdArr.map((chatRoomId) => {
      const ref = collection(storeService, "chatRooms")
      const q = doc(ref, chatRoomId)
      checkedItems.map((id) => {
        onSnapshot(q, (snapshot) => {
          snapshot.data().messages.map((chatInfo) => {
            id === chatInfo.id && updateDoc(q, {checked: true})
          })
        })
      })
    })
    // checkedItems.map((id) => {
    //   const ref = doc(storeService, "ChatRooms", chatRoomId, "messages", id);
    //   updateDoc(ref, {
    //     checked: true
    //   })
    // })
    setClicked("received");
    setClickRead(prev => !prev);
    setCheckedItems([]);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    // msgIdArr.map((chatRoomId) => {
    //   checkedItems.map((id) => {
    //     const ref = doc(storeService, "ChatRooms", chatRoomId);
    //     const q = query.collection(storeService, `chatRooms/${chatRoomId}`);
    //     getDocs(q).then((qq) => {
    //       qq.forEach(doc => console.log(doc))
    //     })
    //   })
    // })
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
            {clicked === 'received'
              ? (<>
                <span style={{
                  color: checkedItems.length > 0 ? 'black' : '#969696', marginLeft: '8px'
                }}
                  onClick={handleReadCheck}>읽음</span>
                <span style={{
                  color: checkedItems.length > 0 ? 'red' : '#969696', marginLeft: '8px'
                }}
                  onClick={handleDelete}>삭제</span>
              </>)
              : (<span style={{
                color: checkedItems.length > 0 ? 'red' : '#969696', marginLeft: '8px'
              }}
                onClick={handleDelete}>삭제</span>)
            }
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