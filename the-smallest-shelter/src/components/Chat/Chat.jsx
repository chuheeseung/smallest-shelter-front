import React, { Component } from 'react';
import { dbService } from '../../fbase';
import { child, onChildAdded, ref } from 'firebase/database';
import ChatForm from './ChatForm';
import ChatHeader from './ChatHeader';
import Message from './Message';
import style from './Chat.module.css';

export class Chat extends Component {

  state = {
    messages: [], // 모든 쪽지 내역
    messagesRef: ref(dbService, "messages"),
    currUser: this.props.currUser,
    organization: this.props.organization,
    chatRoomId: ''
  }

  componentDidMount() {
    const {currUser, organization} = this.state;

    const chatRoomId = this.getChatRoomId(currUser.id, organization.orgId);
    if (chatRoomId) {
      this.addMessagesListeners(chatRoomId)
    }
    this.setState({chatRoomId: chatRoomId})
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

  getChatRoomId = (currUserId, userId) => {
    return userId < currUserId
      ? `${userId}-${currUserId}`
      : `${currUserId}-${userId}`
  }

  render() {
    const { messages, chatRoomId } = this.state;
    return (
      <div className={style.chatContainer}>
        <ChatHeader/>
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
        <ChatForm chatRoomId={chatRoomId}/>
      </div>
    );
  }
}

export default Chat;