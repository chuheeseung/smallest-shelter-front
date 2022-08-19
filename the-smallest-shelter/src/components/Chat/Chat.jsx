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
    chatRoomId: '',
    animalInfo: this.props.animalInfo
  }

  componentDidMount() {
    const {currUser, organization, animalInfo} = this.state;

    const chatRoomId = this.getChatRoomId(currUser.id, organization.id, animalInfo);
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

  getChatRoomId = (currUserId, userId, animalInfo) => {
    return userId < currUserId
    ? `${userId}-${currUserId}-${animalInfo.animalIdx}`
    : `${currUserId}-${userId}-${animalInfo.animalIdx}`
      // ? `${userId}-${currUserId}-${String(this.props.animalIdx)}`
      // : `${currUserId}-${userId}-${String(this.props.animalIdx)}`
  }

  render() {
    const { messages, chatRoomId, organization, animalInfo} = this.state;
    return (
      <div className={style.chatContainer}>
        <ChatHeader organization={organization} animalName={animalInfo.animalName}/>
        <div className={style.chatWrap}>
          {messages.length > 0 &&
            messages.map((message) => (
              <Message
                key={message.id}
                message={message.content}
                sentUser={message.sentUser}
                user={organization}
                time={message.time}
              />
            ))
          }
        </div>
        <ChatForm chatRoomId={chatRoomId} organization={organization} animalInfo={animalInfo}/>
      </div>
    );
  }
}

export default Chat;