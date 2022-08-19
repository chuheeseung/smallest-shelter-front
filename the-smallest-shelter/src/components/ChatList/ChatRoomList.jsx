import React, { Component } from 'react';
import { dbService } from '../../fbase';
import { child, onChildAdded, onValue, ref } from 'firebase/database';
import style from './ChatList.module.css';
import chatStyle from '../Chat/Chat.module.css';
import Message from "../Chat/Message";
import ChatForm from "../Chat/ChatForm";
import { FiCheckCircle } from 'react-icons/fi'

export class ChatRoomList extends Component {
  state = {
    messages: [], // 클릭한 채팅방의 채팅 내역
    chatRoomClick: false,
    loginUserId: this.props.loginUserId,
    messagesRef: ref(dbService, 'messages'),
    currChatRoomId: '',
    user: {}, // 클릭한 채팅방 상대 계정
    allUser: {}, // 채팅방 목록 가져올 때 상대 계정
    animal: {},
    currAnimal: ''
  };

  // 사용자가 포함되어 있는 채팅방의 상대 정보 얻어오기
  componentDidMount() {
    let { messagesRef, loginUserId } = this.state;

    onValue(messagesRef, (snapshot) => {
      const userInfo = [];
      const animalInfo = [];
      Object.values(snapshot.val()).map((user) => {
        Object.values(user)[0].roomId.includes(loginUserId) 
        && 
        (Object.values(user)[0].sentUser.id !== loginUserId 
        ? userInfo.push(Object.values(user)[0].sentUser) && animalInfo.push(Object.values(user)[0].animalInfo)
        : userInfo.push(Object.values(user)[0].receivedUser) && animalInfo.push(Object.values(user)[0].animalInfo))
      })
      this.setState({
        allUser: userInfo,
        animal: animalInfo
      });
    });
  }

  changeChatRoom = (room, user, animalName) => {
    this.setState({ currChatRoomId: room, currAnimal: animalName })
    let messagesArray = [];
    let { messagesRef } = this.state;

    onChildAdded(child(messagesRef, room), snapshot => {
      messagesArray.push({
        id: snapshot.key,
        message: snapshot.val(),
      });
      this.setState({
        user: user,
        messages: messagesArray,
        chatRoomClick: true,
      });
    });
  };

  getChatRoomId = (currUserId, userId, animalIdx) => {
    return userId < currUserId
      ? `${userId}-${currUserId}-${animalIdx}`
      : `${currUserId}-${userId}-${animalIdx}`;
  };

  renderChatRooms = (allUser, loginUserId, animal) =>
    allUser.length > 0 &&
    allUser.map((user, idx) => (
      <div
        key={idx}
        onClick={() =>
          this.changeChatRoom(this.getChatRoomId(loginUserId, user.id, animal[idx].animalIdx), user, animal[idx].animalName)
        }
        className={style.chatRoomInfo}
      >
        <img src={user.image} alt="상대방 이미지" />
        <span>{user.name} ({animal[idx].animalName})</span>
      </div>
    ))

  render() {
    const {
      currChatRoomId,
      messages,
      loginUserId,
      chatRoomClick,
      user,
      allUser,
      animal,
      currAnimal
    } = this.state;

    return (
      <div className={style.container}>
        <div className={style.chatRoomWrap}>
          <div className={style.chatRoomHeader}></div>
          <div className={style.chatRoomList}>
            {this.renderChatRooms(allUser, loginUserId, animal)}
          </div>
        </div>
        <div>
          {chatRoomClick
          ? (<div className={style.chatContainer}>
            <div className={style.headerWrap}>{user.name} ({currAnimal})</div>
            <div className={style.chatWrap}>
              {messages.length > 0 &&
                messages.map((message) => (
                  <Message
                    key={message.id}
                    message={message.message.content}
                    sentUser={message.message.sentUser}
                    receivedUser={message.message.receivedUser}
                    user={user}
                    time={message.message.time}
                  />
                ))
              }
            </div>
            <ChatForm chatRoomId={currChatRoomId} userInfo={user} animalInfo={animal} organization="undefined"/>
          </div>)
          :  <div className={style.empty}>
              <div><FiCheckCircle size={64} color="#969696"/></div>
              <p>대화할 사용자를 선택해주세요.</p>
            </div>}    
        </div>
      </div>
    );
  }
}

export default ChatRoomList;
