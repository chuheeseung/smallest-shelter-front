import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const LoginState = atom({
  key: 'LoginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const LoginRole = atom({
  key: 'LoginRole',
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const LoginUserID = atom({
  key: 'LoginUserID',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

