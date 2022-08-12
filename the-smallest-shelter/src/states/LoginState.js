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

export const LoginUserIdx = atom({
  key: 'LoginUserIdx',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const LoginUserName = atom({
  key: 'LoginUserName',
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const LoginUserId = atom({
  key: 'LoginUserId',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const LoginUserPw = atom({
  key: 'LoginUserPw',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const LoginUserToken = atom({
  key: 'LoginUserToken',
  default: '',
  effects_UNSTABLE: [persistAtom],
});