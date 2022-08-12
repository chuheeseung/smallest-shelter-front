import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const LoginState = atom({ // 로그인 상태
  key: 'LoginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const LoginRole = atom({ // 로그인 유저의 역할 / PRAIVATE, ORGANIZATION
  key: 'LoginRole',
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const LoginUserIdx = atom({ // 로그인 유저 인덱스
  key: 'LoginUserIdx',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const LoginUserName = atom({ // 로그인 유저 이름
  key: 'LoginUserName',
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const LoginUserId = atom({ // 로그인 유저 아이디
  key: 'LoginUserId',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const LoginUserPw = atom({ // 로그인 유저 비밀번호
  key: 'LoginUserPw',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const LoginUserToken = atom({ // 로그인 유저 토큰 (Bearer)
  key: 'LoginUserToken',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const LoginUserOrgName = atom({ // 로그인 유저 단체 계정 (KARA, UHENGSA, null(개인))
  key: 'LoginUserOrgName',
  default: '',
  effects_UNSTABLE: [persistAtom],
});