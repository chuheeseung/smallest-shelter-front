import React, { Component } from "react";
import { dbService } from "../../fbase";
import { child, onChildAdded, onValue, ref } from "firebase/database";
import style from './ChatList.module.css';
import chatStyle from '../Chat/Chat.module.css';
import ChatWrap from "./ChatWrap";
import ChatHeader from "../Chat/ChatHeader";
import Message from "../Chat/Message";
import ChatForm from "../Chat/ChatForm";
import {BiMessageAltEdit} from 'react-icons/bi'

export class ChatRoomList extends Component {

  state = {
    chatRoomId: [],  // 사용자가 포함되어 있는 채팅방 id 배열
    messages: [], // 클릭한 채팅방의 채팅 내역
    chatRoomClick: false,
    loginUserId: this.props.loginUserId,
    messagesRef: ref(dbService, "messages"),
    currChatRoomId: '',
    user: {}, // 상대 계정
  }

  // 사용자가 포함되어 있는 채팅방 배열 얻어오기
  componentDidMount() {
    let { messagesRef, loginUserId } = this.state;

    onValue((messagesRef), (snapshot) => {
      const roomId = [];
      Object.keys(snapshot.val()).map((id) => {
        id.includes(loginUserId) && roomId.push(id)
      })
      this.setState({
        chatRoomId: roomId,
      })
    })
  }

  changeChatRoom = (room) => {
    this.setState({ currChatRoomId: room })

    let messagesArray = [];
    let { messagesRef, loginUserId } = this.state;
    
    onValue(child(messagesRef, room), (snapshot) => {
      const values = Object.values(snapshot.val());
      const userInfo = values.filter(message => message.sentUser.id !== loginUserId);

      userInfo.length > 0 && this.setState({user: userInfo[0].sentUser})

      // values.map((val) => {
      //   const userInfo = val.sentUser.id !== loginUserId && val.sentUser
      //   this.setState({user: userInfo})
      //   console.log(userInfo)
      // })
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

  renderChatRooms = (chatRoomId, loginUserId) => 
    chatRoomId.length > 0 &&
    chatRoomId.map((room, idx) => (
      <li
        key={idx}
        onClick={() => this.changeChatRoom(room)}
      >
        # Chat with {room.split('-').filter(e => e !== loginUserId).join()}
      </li>
    ))
  
  render() {
    const { chatRoomId, currChatRoomId, messages, loginUserId, chatRoomClick, user } = this.state;

    return (
      <div className={style.container}>
        <div className={style.chatRoomList}>
          <ul>
            {this.renderChatRooms(chatRoomId, loginUserId)}
          </ul>
        </div>
        <div className={style.chat}>
          {chatRoomClick
          ? (<div className={chatStyle.chatContainer}>
            <ChatHeader user={user}/>
            <div className={chatStyle.chatWrap}>
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
          :  <div className={style.empty}>
            <BiMessageAltEdit size={64}/>
            </div>}    
        </div>
      </div>
    )
  }

}

export default ChatRoomList;