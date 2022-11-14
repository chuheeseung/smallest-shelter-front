import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// 현재 채팅방 id (채팅방 목록에서 클릭할 때)
export const CurrChatRoomId = atom({
  key: 'currChatRoomId',
  default: '',
  effects_UNSTABLE: [persistAtom],
})