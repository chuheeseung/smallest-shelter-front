import React, { Component } from 'react';
import { dbService } from '../../fbase';
import { child, onChildAdded, ref } from 'firebase/database';
import ChatForm from './ChatForm';
import ChatHeader from './ChatHeader';
import Message from './Message';
import style from './ChatPage.module.css';

export class ChatClass extends Component {
  state = {
    messages: [], // 모든 쪽지 내역
    currUserId: 'JNVe6U0iGlP4A5Pm65UfXgZju0Z2',  // 현재 사용자 id
    messagesRef: ref(dbService, "messages"),
    user: {
      id: 'VRHxfEj1c1g0pbsAiYut1x2VzvP2',
      name: "유행사",
      image: "http://gravatar.com/avatar/0f7c362b0125aaff368169c8acc4dd39?d=identicon"
    }
  }

  componentDidMount() {
    const chatRoomId = 'JNVe6U0iGlP4A5Pm65UfXgZju0Z2-VRHxfEj1c1g0pbsAiYut1x2VzvP2';
    if (chatRoomId) {
      this.addMessagesListeners(chatRoomId)
    }
  }

  addMessagesListeners = (chatRoomId) => {
    let messagesArray = [];
    let { messagesRef } = this.state;
    onChildAdded(child(messagesRef, chatRoomId), DataSnapshot => {
      messagesArray.push(DataSnapshot.val());
      this.setState({
        messages: messagesArray,
      })
    })
  }

  render() {
    const { messages, user } = this.state;
    return (
      <div className={style.chatContainer}>
        <ChatHeader user={user}/>
        <div className={style.chatWrap}>
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
        </div>
        <ChatForm/>
      </div>
    );
  }
}

export default ChatClass;