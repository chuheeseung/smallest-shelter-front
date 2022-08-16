import React from 'react';
import { useRecoilValue } from 'recoil';
import { LoginUserId } from '../../states/LoginState';
import ChatRoomList from './ChatRoomList';

function ChatList() {
  const loginUserId = useRecoilValue(LoginUserId) // 현재 사용자 id

  return (
    <div>
      <ChatRoomList loginUserId={loginUserId}/>
    </div>
  );
}

export default ChatList;