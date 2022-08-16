import React, { Component } from "react";
import { dbService } from "../../fbase";
import { child, onChildAdded, onValue, ref } from "firebase/database";
import style from './ChatList.module.css';
import chatStyle from '../Chat/Chat.module.css';
import ChatHeader from "../Chat/ChatHeader";
import Message from "../Chat/Message";
import ChatForm from "../Chat/ChatForm";

export class ChatWrap extends Component {

  state = {
    messages: [], // 모든 쪽지 내역
    loginUserId: this.props.loginUserId,
    messagesRef: ref(dbService, "messages"),
    currChatRoomId: this.props.currChatRoomId,
  }

  componentDidMount() {
    const { currChatRoomId } = this.state;
    console.log(currChatRoomId)
    if (currChatRoomId) {
      this.addMessagesListeners(currChatRoomId)
    }
  }

  addMessagesListeners = (chatRoomId) => {
    console.log(chatRoomId)
    let messagesArray = [];
    let { messagesRef } = this.state;
    onChildAdded(child(messagesRef, chatRoomId), DataSnapshot => {
      messagesArray.push(DataSnapshot.val());
      this.setState({
        messages: messagesArray,
      })
      console.log(this.state.messages)
    })
  }

  render() {
    const { messages, currChatRoomId } = this.state;
    return (
      <div className={chatStyle.chatContainer}>
        <ChatHeader/>
        {/* <div className={chatStyle.chatWrap}>
          {messages.length > 0 &&
            messages.map((message) => (
              <Message
                key={message.id}
                message={message.content}
                sentUser={message.sentUser}
                receivedUser={message.receivedUser}
                time={message.time}
              />
            ))
          }
        </div> */}
        <ChatForm currChatRoomId={currChatRoomId}/>
      </div>
    );
  }

}

export default ChatWrap;