import React, { Component } from "react";
import { dbService } from "../../fbase";
import { child, onChildAdded, onValue, ref } from "firebase/database";
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
    messagesRef: ref(dbService, "messages"),
    currChatRoomId: '',
    user: {}, // 클릭한 채팅방 상대 계정 
    allUser: {} // 채팅방 목록 가져올 때 상대 계정
  }

  // 사용자가 포함되어 있는 채팅방의 상대 정보 얻어오기
  componentDidMount() {
    let { messagesRef, loginUserId } = this.state;

    onValue((messagesRef), (snapshot) => {
      const userInfo = [];

      Object.values(snapshot.val()).map((user, idx) => {
        console.log(user)
        // if () {
        //   if (Object.values(user)[0].sentUser.id !== loginUserId)) {
        //     userInfo.push(Object.values(user)[idx].sentUser)
        //   }
        // }
        (Object.values(user)[0].sentUser.id !== loginUserId
        && Object.values(user)[0].sentUser.id !== loginUserId)
        && userInfo.push(Object.values(user)[idx].sentUser)
        // user.roomId.includes(this.loginUserId) && console.log(user)
        // user && userInfo.push(Object.values(user)[idx].sentUser)
      })
      this.setState({
        allUser: userInfo
      })
    })
  }

  changeChatRoom = (room) => {
    this.setState({ currChatRoomId: room })
    console.log(room)
    let messagesArray = [];
    let { messagesRef, loginUserId } = this.state;

    onValue(child(messagesRef, room), (snapshot) => {
      const values = Object.values(snapshot.val());
      const userInfo = values.filter(message => message.sentUser.id !== loginUserId);

      userInfo.length > 0 && this.setState({ user: userInfo[0].sentUser })
    })

    onChildAdded(child(messagesRef, room), snapshot => {
      messagesArray.push({
        id: snapshot.key,
        message: snapshot.val()
      });

      this.setState({
        messages: messagesArray,
        chatRoomClick: true
      })
    })
  }

  getChatRoomId = (currUserId, userId) => {
    return userId < currUserId
      ? `${userId}-${currUserId}`
      : `${currUserId}-${userId}`
  }

  renderChatRooms = (allUser, loginUserId) =>
    allUser.length > 0 &&
    allUser.map((user, idx) => (
      <div
        key={idx}
        onClick={() => this.changeChatRoom(this.getChatRoomId(loginUserId, user.id))}
        className={style.chatRoomInfo}
      >
        <img src={user.image} alt="상대방 이미지" />
        <span>{user.name}</span>
      </div>
    ))

  render() {
    const { currChatRoomId, messages, loginUserId, chatRoomClick, user, allUser } = this.state;

    return (
      <div className={style.container}>
        <div className={style.chatRoomWrap}>
          <div className={style.chatRoomHeader}></div>
          <div className={style.chatRoomList}>
            {this.renderChatRooms(allUser, loginUserId)}
          </div>
        </div>
        <div>
          {chatRoomClick
            ? (<div className={style.chatContainer}>
              <div className={chatStyle.headerWrap}>{user.name}</div>
              <div className={style.chatWrap}>
                {messages.length > 0 &&
                  messages.map((message) => (
                    <Message
                      key={message.id}
                      message={message.message.content}
                      sentUser={message.message.sentUser}
                      receivedUser={message.message.receivedUser}
                      time={message.message.time}
                    />
                  ))
                }
              </div>
              <ChatForm chatRoomId={currChatRoomId} />
            </div>)
            : <div className={style.empty}>
              <div><FiCheckCircle size={64} color="#969696" /></div>
              <p>대화할 사용자를 선택해주세요.</p>
            </div>}
        </div>
      </div>
    )
  }

}

export default ChatRoomList;