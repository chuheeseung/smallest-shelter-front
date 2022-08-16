import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const ChatRoodId = atom({
  key: 'ChatRoodId',
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// 단체 계정 정보 (detail page에서 채팅할 때 사용)
export const Organization = atom({
  key: 'organization',
  default: {
    orgId: '',
    orgName: '',
    orgImg: '',
  },
  effects_UNSTABLE: [persistAtom],
})

// 받은 쪽지 목록
export const Received = atom({
  key: 'received',
  default: {},
  effects_UNSTABLE: [persistAtom],
})

// 현재 채팅방 id (채팅방 목록에서 클릭할 때)
export const CurrChatRoomId = atom({
  key: 'currChatRoomId',
  default: '',
  effects_UNSTABLE: [persistAtom],
})