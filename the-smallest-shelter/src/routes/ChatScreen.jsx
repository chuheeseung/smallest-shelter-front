import React from 'react';
import ChatPage from '../components/Chat/ChatPage';

function ChatScreen() {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center', 
        width: '70%', 
        margin: '0 auto',
        fontFamily: "Spoqa Han Sans Neo"
      }}>
      <ChatPage/>
    </div>
  );
}

export default ChatScreen;